// =====================================================
// js/app.js — UP BusKhoj (district-JSON architecture)
// =====================================================
//
// DATA CONTRACT — expected shape of districts/<name>.json:
// {
//   "district": "Deoria",
//   "routes": [
//     {
//       "from": "Deoria",
//       "to": "Gorakhpur",
//       "via": ["Chauri Chaura", "Baitalpur", "Gauri Bazar"],
//       "departure_time": "06:00 AM",
//       "arrival_time": "07:15 AM",
//       "duration": "1h 15m",
//       "fare": 80,
//       "bus_type": "Ordinary",
//       "bus_name": "UPSRTC Sadharan",
//       "frequency": "Har 20 minute par"
//     }
//   ]
// }
// departure_time / arrival_time MUST be 12-hour strings
// like "6:00 AM" or "06:00 AM" — that's what parseTimeToMinutes()
// below understands.
//
// HTML CONTRACT — elements this file looks for by id:
//   #fromStop              <select> — doubles as the District selector
//   #toStop                <select> — Destination selector (auto-populated)
//   #searchBtn             <button> — "Buses Khojein"
//   #statusText            any element — status/error messages
//   #nextBusWrapper        container — the highlighted NEXT BUS card
//   #upcomingBusesWrapper  container — other upcoming buses
//   #pastBusesWrapper      container — departed buses (collapsible)
//   #togglePastBtn         <button> (optional) — toggles the past section
// Every lookup below is null-checked, so a missing element logs
// a console error and is skipped rather than throwing.
//
// MAP HOOK — js/map.js is expected to expose a global:
//   window.initRouteMap(stopNamesArray, routeTitle)
// This file exposes window.openRouteMap(from, to, via), which
// each bus card's "Route Map & Live GPS" button calls.
// =====================================================

const DISTRICTS = ["Deoria", "Gorakhpur"]; // extend as districts/<name>.json files are added

const BUS_TYPE_LABEL = {
  Ordinary: "Ordinary",
  Janrath: "AC Janrath",
  Shatabdi: "AC Shatabdi",
  "Pink Express": "Pink Express",
};

const el = {
  districtSelect: document.getElementById("fromStop"),
  toStop: document.getElementById("toStop"),
  searchBtn: document.getElementById("searchBtn"),
  statusText: document.getElementById("statusText"),
  nextBusWrapper: document.getElementById("nextBusWrapper"),
  upcomingBusesWrapper: document.getElementById("upcomingBusesWrapper"),
  pastBusesWrapper: document.getElementById("pastBusesWrapper"),
  togglePastBtn: document.getElementById("togglePastBtn"),
};

[
  "districtSelect", "toStop", "searchBtn", "statusText",
  "nextBusWrapper", "upcomingBusesWrapper", "pastBusesWrapper",
].forEach((key) => {
  if (!el[key]) {
    console.error(`[app.js] Expected element for "${key}" not found in the DOM (see HTML CONTRACT comment at top of app.js).`);
  }
});

let currentDistrictData = null; // parsed JSON of the currently loaded district
let currentDistrictName = "";
let showPastBuses = false;

// -----------------------------------------------------
// Status line
// -----------------------------------------------------
function setStatus(message, isError) {
  if (!el.statusText) return;
  el.statusText.textContent = message;
  el.statusText.classList.toggle("status-error", Boolean(isError));
}

// -----------------------------------------------------
// Bulletproof district fetch
// -----------------------------------------------------
async function loadDistrictData(districtNameRaw) {
  if (!districtNameRaw) return;

  const displayName = districtNameRaw.charAt(0).toUpperCase() + districtNameRaw.slice(1).toLowerCase();
  const fileSlug = districtNameRaw.toLowerCase();
  const url = `./districts/${fileSlug}.json`;

  currentDistrictName = displayName;
  currentDistrictData = null;
  clearResults();
  resetDestinationDropdown();
  setStatus(`"${displayName}" ka data load ho raha hai…`);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} — file nahi mili: ${url}`);
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.routes)) {
      throw new Error(`"${url}" ka JSON format galat hai — top-level "routes" array chahiye.`);
    }

    currentDistrictData = data;

    if (el.districtSelect) {
      const hasOption = Array.from(el.districtSelect.options).some((o) => o.value === displayName);
      if (hasOption) el.districtSelect.value = displayName;
    }

    populateDestinationDropdown(data.routes);
    setStatus(`${displayName} load ho gaya (${data.routes.length} route${data.routes.length === 1 ? "" : "s"}). Destination chunein aur "Buses Khojein" dabayein.`);
  } catch (err) {
    console.error(`[app.js] loadDistrictData("${districtNameRaw}") failed:`, err);
    currentDistrictData = null;
    setStatus(`Data load nahi ho saka: "${fileSlug}.json" nahi mili ya galat format mein hai. Details ke liye console dekhein.`, true);
  }
}

// -----------------------------------------------------
// Destination dropdown — driven by the loaded district's routes
// -----------------------------------------------------
function resetDestinationDropdown() {
  if (!el.toStop) return;
  el.toStop.innerHTML = "";
  el.toStop.appendChild(buildAllRoutesOption());
  el.toStop.value = "";
  el.toStop.disabled = true;
}

function populateDestinationDropdown(routes) {
  if (!el.toStop) return;

  const uniqueDestinations = Array.from(new Set(routes.map((r) => r.to).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );

  el.toStop.innerHTML = "";
  el.toStop.appendChild(buildAllRoutesOption());

  uniqueDestinations.forEach((dest) => {
    const opt = document.createElement("option");
    opt.value = dest;
    opt.textContent = dest;
    el.toStop.appendChild(opt);
  });

  el.toStop.value = "";
  el.toStop.disabled = false;
}

function buildAllRoutesOption() {
  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = "Sabhi Routes Dekhein";
  return opt;
}

// -----------------------------------------------------
// Time helpers — the time-aware engine's foundation
// -----------------------------------------------------
function parseTimeToMinutes(timeStr) {
  const match = String(timeStr || "").trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return null;

  let [, h, m, period] = match;
  h = parseInt(h, 10);
  m = parseInt(m, 10);
  if (period.toUpperCase() === "PM" && h !== 12) h += 12;
  if (period.toUpperCase() === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function formatCountdown(diffMin) {
  if (diffMin <= 0) return "Ab";
  if (diffMin < 60) return `${diffMin} min me`;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return m > 0 ? `${h}h ${m}m me` : `${h}h me`;
}

function formatAgo(diffMin) {
  if (diffMin < 1) return "Abhi nikli";
  if (diffMin < 60) return `${diffMin} min pehle nikal chuki`;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return m > 0 ? `${h}h ${m}m pehle nikal chuki` : `${h}h pehle nikal chuki`;
}

// -----------------------------------------------------
// Search + time-aware render engine
// -----------------------------------------------------
function handleSearch() {
  if (!currentDistrictData || !Array.isArray(currentDistrictData.routes)) {
    setStatus("Pehle koi district select karein — data abhi load nahi hua hai.", true);
    return;
  }

  const destination = el.toStop ? el.toStop.value : "";
  const routes = destination
    ? currentDistrictData.routes.filter((r) => r.to === destination)
    : currentDistrictData.routes.slice();

  clearResults();

  if (routes.length === 0) {
    renderNoDataMessage(destination);
    setStatus(
      destination
        ? `"${currentDistrictName} → ${destination}" ke liye abhi koi route data nahi hai.`
        : `"${currentDistrictName}" ke liye abhi koi route data nahi hai.`
    );
    return;
  }

  const nowMin = getCurrentMinutes();
  const withMinutes = routes
    .map((route) => ({ route, depMin: parseTimeToMinutes(route.departure_time) }))
    .filter((x) => x.depMin !== null);

  const skippedCount = routes.length - withMinutes.length;
  if (skippedCount > 0) {
    console.error(
      `[app.js] ${skippedCount} route(s) for "${currentDistrictName}" have an unparseable departure_time and were skipped from the schedule view.`
    );
  }

  // Current system time -> minutes, then sort every departure
  // time chronologically before splitting upcoming vs departed.
  const upcoming = withMinutes.filter((x) => x.depMin >= nowMin).sort((a, b) => a.depMin - b.depMin);
  const past = withMinutes.filter((x) => x.depMin < nowMin).sort((a, b) => b.depMin - a.depMin);

  if (upcoming.length === 0) {
    renderNoUpcomingMessage();
  } else {
    const [next, ...rest] = upcoming;
    renderNextBus(next.route, next.depMin, nowMin);
    renderUpcomingBuses(rest, nowMin);
  }

  renderPastBuses(past, nowMin);

  const routeLabel = destination ? `${currentDistrictName} → ${destination}` : `${currentDistrictName} ke saare routes`;
  setStatus(`${routeLabel}: ${upcoming.length} upcoming, ${past.length} departed.`);
}

function renderNextBus(route, depMin, nowMin) {
  if (!el.nextBusWrapper) return;
  el.nextBusWrapper.innerHTML = "";
  el.nextBusWrapper.appendChild(
    buildBusCard(route, { badge: "NEXT BUS", countdownText: formatCountdown(depMin - nowMin), variant: "next" })
  );
}

function renderUpcomingBuses(items, nowMin) {
  if (!el.upcomingBusesWrapper) return;
  el.upcomingBusesWrapper.innerHTML = "";
  items.forEach(({ route, depMin }) => {
    el.upcomingBusesWrapper.appendChild(
      buildBusCard(route, { countdownText: formatCountdown(depMin - nowMin), variant: "upcoming" })
    );
  });
}

function renderPastBuses(items, nowMin) {
  if (!el.pastBusesWrapper) return;
  el.pastBusesWrapper.innerHTML = "";

  if (items.length === 0) {
    el.pastBusesWrapper.innerHTML = '<p class="placeholder-text">Aaj is route par abhi koi bus nikli nahi hai.</p>';
    if (el.togglePastBtn) el.togglePastBtn.hidden = true;
    return;
  }

  items.forEach(({ route, depMin }) => {
    el.pastBusesWrapper.appendChild(
      buildBusCard(route, { countdownText: formatAgo(nowMin - depMin), variant: "past" })
    );
  });

  if (el.togglePastBtn) {
    el.togglePastBtn.hidden = false;
    el.togglePastBtn.textContent = showPastBuses
      ? "Departed Buses Chhupayein"
      : `Show Departed Buses (${items.length})`;
  }
  el.pastBusesWrapper.classList.toggle("collapsed", !showPastBuses);
}

function clearResults() {
  if (el.nextBusWrapper) el.nextBusWrapper.innerHTML = "";
  if (el.upcomingBusesWrapper) el.upcomingBusesWrapper.innerHTML = "";
  if (el.pastBusesWrapper) el.pastBusesWrapper.innerHTML = "";
  if (el.togglePastBtn) el.togglePastBtn.hidden = true;
}

function renderNoDataMessage(destination) {
  if (!el.nextBusWrapper) return;
  const msg = destination
    ? `"${currentDistrictName} → ${destination}" ke liye abhi koi route data nahi hai.`
    : `"${currentDistrictName}" ke liye abhi koi route data nahi hai.`;
  el.nextBusWrapper.innerHTML = `<p class="placeholder-text">${msg}</p>`;
}

function renderNoUpcomingMessage() {
  if (!el.nextBusWrapper) return;
  el.nextBusWrapper.innerHTML =
    '<p class="placeholder-text">Aaj ke liye is route ki saari buses nikal chuki hain. Neeche "Show Departed Buses" mein poori list dekhein.</p>';
}

// -----------------------------------------------------
// Bus card — fare (₹) and bus type always render cleanly,
// even if a field is missing from the source JSON.
// -----------------------------------------------------
function buildBusCard(route, { badge, countdownText, variant }) {
  const card = document.createElement("div");
  card.className = `bus-card${variant ? " is-" + variant : ""}`;

  const busTypeKey = route.bus_type || "Ordinary";
  const busTypeLabel = BUS_TYPE_LABEL[busTypeKey] || busTypeKey;
  const badgeClass = String(busTypeKey).toLowerCase().replace(/\s+/g, "-");
  const fareText = route.fare !== undefined && route.fare !== null && route.fare !== "" ? `₹${route.fare}` : "Fare N/A";
  const viaStops = Array.isArray(route.via) ? route.via : [];
  const fromLabel = route.from || currentDistrictName || "?";
  const toLabel = route.to || "?";

  card.innerHTML = `
    <div class="bus-card-top">
      <span class="badge ${badgeClass}">${busTypeLabel}</span>
      ${badge ? `<span class="next-badge">${badge}</span>` : ""}
      <span class="fare">${fareText}</span>
    </div>
    ${countdownText ? `<div class="countdown-timer ${variant || ""}">${countdownText}</div>` : ""}
    <div class="bus-time-row">
      <div>
        <span class="time">${route.departure_time || "--:--"}</span>
        <span class="station">${fromLabel}</span>
      </div>
      <div class="duration-line">
        <span>${route.duration || ""}</span>
        <div class="line"></div>
      </div>
      <div>
        <span class="time">${route.arrival_time || "--:--"}</span>
        <span class="station">${toLabel}</span>
      </div>
    </div>
    ${viaStops.length > 0 ? `<div class="via-note">Via: ${viaStops.join(", ")}</div>` : ""}
    <div class="bus-card-footer">
      <span class="frequency-text">${route.frequency || ""}</span>
      <button type="button" class="view-route-btn">Route Map &amp; Live GPS</button>
    </div>
  `;

  const mapBtn = card.querySelector(".view-route-btn");
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      window.openRouteMap(fromLabel, toLabel, viaStops);
    });
  }

  return card;
}

// -----------------------------------------------------
// Map integration hook — bridges bus cards to js/map.js
// -----------------------------------------------------
window.openRouteMap = function openRouteMap(from, to, via) {
  const stops = [from, ...(Array.isArray(via) ? via : []), to].filter(Boolean);
  const routeTitle = `${from || "?"} → ${to || "?"}`;

  if (typeof window.initRouteMap === "function") {
    window.initRouteMap(stops, routeTitle);
  } else {
    console.error(
      "[app.js] window.initRouteMap is not defined. Make sure js/map.js is loaded before js/app.js and exposes initRouteMap(stopNamesArray, routeTitle)."
    );
    setStatus("Map abhi available nahi hai (map module load nahi hua).", true);
  }
};

// -----------------------------------------------------
// Events
// -----------------------------------------------------
if (el.districtSelect) {
  el.districtSelect.addEventListener("change", () => loadDistrictData(el.districtSelect.value));
}

if (el.searchBtn) {
  el.searchBtn.addEventListener("click", handleSearch);
}

if (el.togglePastBtn && el.pastBusesWrapper) {
  el.togglePastBtn.addEventListener("click", () => {
    showPastBuses = !showPastBuses;
    el.pastBusesWrapper.classList.toggle("collapsed", !showPastBuses);
    const count = el.pastBusesWrapper.children.length;
    el.togglePastBtn.textContent = showPastBuses ? "Departed Buses Chhupayein" : `Show Departed Buses (${count})`;
  });
}

// -----------------------------------------------------
// Init
// -----------------------------------------------------
function initDistrictSelectOptions() {
  if (!el.districtSelect) return;
  if (el.districtSelect.options.length === 0) {
    DISTRICTS.forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      el.districtSelect.appendChild(opt);
    });
  }
}

initDistrictSelectOptions();
resetDestinationDropdown();
loadDistrictData("deoria");
