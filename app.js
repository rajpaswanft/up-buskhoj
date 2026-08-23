// =====================================================
// UP BusKhoj — app.js
// Fully data-driven: nothing city/route-specific is
// hardcoded here. Everything comes from data.json, so
// adding a new city or bus only means editing that file.
// =====================================================

const DATA_URL = "./data.json";

const BADGE_LABEL = {
  Ordinary: "UP Roadways (Sadharan)",
  Janrath: "Janrath (AC Semi-Deluxe)",
  Shatabdi: "Shatabdi (Premium AC)",
  "Pink Express": "Pink Express",
};

const el = {
  fromSelect: document.getElementById("fromCity"),
  toSelect: document.getElementById("toCity"),
  swapBtn: document.getElementById("swapBtn"),
  searchBtn: document.getElementById("searchBtn"),
  busList: document.getElementById("busList"),
  resultHeading: document.getElementById("resultHeading"),
  resultCount: document.getElementById("resultCount"),
  statusText: document.getElementById("statusText"),
};

let BUSES = [];

// -----------------------------------------------------
// Data loading
// -----------------------------------------------------
async function loadData() {
  setLoadingState(true);
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    BUSES = Array.isArray(json.buses) ? json.buses : [];
    populateCityDropdowns(BUSES);
    setLoadingState(false);
    pickSensibleDefaults();
    search();
  } catch (err) {
    console.error("Failed to load data.json:", err);
    setLoadingState(false, true);
  }
}

function setLoadingState(isLoading, isError = false) {
  const placeholder = isError
    ? "Data load nahi ho payi"
    : isLoading
    ? "Loading cities…"
    : null;

  if (placeholder) {
    [el.fromSelect, el.toSelect].forEach((sel) => {
      sel.innerHTML = `<option value="">${placeholder}</option>`;
      sel.disabled = true;
    });
  } else {
    [el.fromSelect, el.toSelect].forEach((sel) => (sel.disabled = false));
  }

  if (isError) {
    el.statusText.textContent =
      "data.json load nahi ho saka. File path check karein aur page reload karein.";
  }
}

// -----------------------------------------------------
// Build the full stop sequence for a bus:
// [source, ...intermediateStops, destination]
// -----------------------------------------------------
function fullRoute(bus) {
  return [bus.source, ...(bus.intermediateStops || []), bus.destination];
}

// -----------------------------------------------------
// Dropdown population — every city comes from the data,
// nothing is hardcoded in HTML.
// -----------------------------------------------------
function populateCityDropdowns(buses) {
  const citySet = new Set();
  buses.forEach((bus) => fullRoute(bus).forEach((stop) => citySet.add(stop)));
  const cities = Array.from(citySet).sort((a, b) => a.localeCompare(b));

  [el.fromSelect, el.toSelect].forEach((sel) => {
    sel.innerHTML = "";
    cities.forEach((city) => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      sel.appendChild(opt);
    });
  });
}

// Pick two different cities as a friendly starting point
function pickSensibleDefaults() {
  const preferred = ["Deoria", "Gorakhpur"];
  const options = Array.from(el.fromSelect.options).map((o) => o.value);

  const from = preferred.find((c) => options.includes(c)) || options[0];
  const to =
    preferred.find((c) => c !== from && options.includes(c)) ||
    options.find((c) => c !== from) ||
    options[0];

  if (from) el.fromSelect.value = from;
  if (to) el.toSelect.value = to;
}

// -----------------------------------------------------
// Time helpers
// -----------------------------------------------------
function to12Hour(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

function addMinutes(hhmm, minutesToAdd) {
  const [h, m] = hhmm.split(":").map(Number);
  const total = (h * 60 + m + minutesToAdd) % (24 * 60);
  const newH = Math.floor(total / 60);
  const newM = total % 60;
  return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

function badgeClass(busType) {
  return busType.toLowerCase().replace(/\s+/g, "-");
}

// -----------------------------------------------------
// Search / filter
// -----------------------------------------------------
function findMatches(from, to) {
  return BUSES.filter((bus) => {
    const route = fullRoute(bus);
    const fromIdx = route.indexOf(from);
    const toIdx = route.indexOf(to);
    return fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx;
  });
}

function search() {
  const from = el.fromSelect.value;
  const to = el.toSelect.value;

  if (!from || !to) return;

  el.busList.innerHTML = "";
  el.resultHeading.textContent = `${from} → ${to}`;

  if (from === to) {
    el.resultCount.textContent = "";
    el.statusText.innerHTML = "Kripya alag <strong>From</strong> aur <strong>To</strong> station chunein.";
    el.busList.appendChild(renderEmptyState(from, to));
    return;
  }

  const matches = findMatches(from, to).sort((a, b) =>
    a.departureTime.localeCompare(b.departureTime)
  );

  if (matches.length === 0) {
    el.resultCount.textContent = "";
    el.statusText.innerHTML = `Route: <strong>${from} ⇄ ${to}</strong>`;
    el.busList.appendChild(renderEmptyState(from, to));
    return;
  }

  el.resultCount.textContent = `${matches.length} bus${matches.length > 1 ? "es" : ""} mili`;
  el.statusText.innerHTML = `Route: <strong>${from} ⇄ ${to}</strong> · ${matches.length} option${
    matches.length > 1 ? "s" : ""
  } available`;

  matches.forEach((bus) => el.busList.appendChild(renderBusCard(bus, from, to)));
}

// -----------------------------------------------------
// Rendering
// -----------------------------------------------------
function renderBusCard(bus, searchFrom, searchTo) {
  const route = fullRoute(bus);
  const isPartialTrip = bus.source !== searchFrom || bus.destination !== searchTo;
  const arrival = addMinutes(bus.departureTime, bus.durationMinutes);

  const card = document.createElement("div");
  card.className = "bus-card";
  card.innerHTML = `
    <div class="bus-card-top">
      <span class="badge ${badgeClass(bus.busType)}">${BADGE_LABEL[bus.busType] || bus.busType}</span>
      <span class="fare">₹${bus.fare}</span>
    </div>
    <div class="bus-time-row">
      <div>
        <span class="time">${to12Hour(bus.departureTime)}</span>
        <span class="station">${bus.source}</span>
      </div>
      <div class="duration-line">
        <span>~${formatDuration(bus.durationMinutes)}</span>
        <div class="line"></div>
      </div>
      <div>
        <span class="time">${to12Hour(arrival)}</span>
        <span class="station">${bus.destination}</span>
      </div>
    </div>
    ${
      isPartialTrip
        ? `<div class="via-note">Boarding: <strong>${searchFrom}</strong> · Alighting: <strong>${searchTo}</strong> — poore route (${route.join(
            " → "
          )}) ka time ऊपर dikhaya gaya hai.</div>`
        : route.length > 2
        ? `<div class="via-note">Via: ${bus.intermediateStops.join(", ")}</div>`
        : ""
    }
    <div class="bus-card-footer">
      <span>Frequency: ${bus.frequency}</span>
      <button class="track-btn" type="button">Route Dekhein</button>
    </div>
  `;
  card.querySelector(".track-btn").addEventListener("click", () => {
    alert(`Bus ${bus.busId}\nFull route: ${route.join(" → ")}`);
  });
  return card;
}

function renderEmptyState(from, to) {
  const div = document.createElement("div");
  div.className = "empty-state";
  div.innerHTML = `
    <span class="emoji">🚏</span>
    <strong>Is route par abhi seedhi bus nahi mili</strong>
    <p>${from} se ${to} tak koi direct ya connecting bus data mein nahi hai. Kisi bade junction se badal kar try karein.</p>
  `;
  return div;
}

// -----------------------------------------------------
// Events
// -----------------------------------------------------
el.swapBtn.addEventListener("click", () => {
  const currentFrom = el.fromSelect.value;
  el.fromSelect.value = el.toSelect.value;
  el.toSelect.value = currentFrom;
  search();
});

el.searchBtn.addEventListener("click", search);
el.fromSelect.addEventListener("change", search);
el.toSelect.addEventListener("change", search);

document.addEventListener("DOMContentLoaded", loadData);
