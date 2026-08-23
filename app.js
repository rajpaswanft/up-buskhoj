// =====================================================
// UP BusKhoj — app.js
// Fully data-driven: fetches everything from data.json.
// No city or route is hardcoded here — add a new bus
// object to data.json and it just works.
// =====================================================

const DATA_URL = "./data.json";

const BADGE_LABEL = {
  Ordinary: "UPSRTC Sadharan",
  Janrath: "Janrath (AC Semi-Deluxe)",
  Shatabdi: "Shatabdi (Premium AC)",
  "Pink Express": "UP Pink Express",
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
    if (!res.ok) throw new Error(`HTTP ${res.status} while fetching ${DATA_URL}`);
    const json = await res.json();

    if (!Array.isArray(json.buses) || json.buses.length === 0) {
      throw new Error("data.json loaded but 'buses' array is empty or missing.");
    }

    BUSES = json.buses;
    populateCityDropdowns(BUSES);
    setLoadingState(false);
    pickSensibleDefaults();
    search();
  } catch (err) {
    console.error("[UP BusKhoj] Failed to load data.json:", err);
    setLoadingState(false, true, err);
  }
}

function setLoadingState(isLoading, isError = false, err = null) {
  if (isLoading) {
    [el.fromSelect, el.toSelect].forEach((sel) => {
      sel.innerHTML = `<option value="">Loading cities…</option>`;
      sel.disabled = true;
    });
    el.statusText.textContent = "Bus data load ho raha hai…";
    return;
  }

  [el.fromSelect, el.toSelect].forEach((sel) => (sel.disabled = false));

  if (isError) {
    const isFileProtocol = window.location.protocol === "file:";
    [el.fromSelect, el.toSelect].forEach((sel) => {
      sel.innerHTML = `<option value="">Data load nahi hui</option>`;
    });
    el.resultHeading.textContent = "Data load nahi ho payi";
    el.resultCount.textContent = "";
    el.busList.innerHTML = "";

    let hint = "data.json load nahi ho saka — file path ya server check karein.";
    if (isFileProtocol) {
      hint =
        "Browser file:// se seedha khola gaya hai, isliye fetch('data.json') block ho jaata hai (CORS). Ek local server chalayein — jaise 'python3 -m http.server' folder mein, ya VS Code Live Server — phir http://localhost par kholein. GitHub Pages par yeh apne aap sahi chalega.";
    }
    el.statusText.textContent = hint;
    el.busList.appendChild(renderErrorState(hint, err));
  }
}

function renderErrorState(hint, err) {
  const div = document.createElement("div");
  div.className = "empty-state";
  div.innerHTML = `
    <span class="emoji">⚠️</span>
    <strong>Bus data load nahi ho paya</strong>
    <p>${hint}</p>
  `;
  return div;
}

// -----------------------------------------------------
// Build the full stop sequence for a bus:
// [from, ...via_stops, to]
// -----------------------------------------------------
function fullRoute(bus) {
  return [bus.from, ...(bus.via_stops || []), bus.to];
}

// -----------------------------------------------------
// Dropdown population — every city comes from the data
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

// Pick two well-connected cities as a friendly starting point
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
// Time helpers — data.json stores times as "6:00 AM" etc.
// We only need to parse them for chronological sorting.
// -----------------------------------------------------
function toMinutesSinceMidnight(timeStr) {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return 0;
  let [, h, m, period] = match;
  h = parseInt(h, 10);
  m = parseInt(m, 10);
  if (period.toUpperCase() === "PM" && h !== 12) h += 12;
  if (period.toUpperCase() === "AM" && h === 12) h = 0;
  return h * 60 + m;
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
    el.busList.appendChild(renderEmptyState());
    return;
  }

  const matches = findMatches(from, to).sort(
    (a, b) => toMinutesSinceMidnight(a.departure_time) - toMinutesSinceMidnight(b.departure_time)
  );

  if (matches.length === 0) {
    el.resultCount.textContent = "";
    el.statusText.innerHTML = `Route: <strong>${from} ⇄ ${to}</strong>`;
    el.busList.appendChild(renderEmptyState());
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
  const isPartialTrip = bus.from !== searchFrom || bus.to !== searchTo;
  const badgeText = BADGE_LABEL[bus.bus_type] || bus.bus_name || bus.bus_type;

  const card = document.createElement("div");
  card.className = "bus-card";
  card.innerHTML = `
    <div class="bus-card-top">
      <span class="badge ${badgeClass(bus.bus_type)}">${badgeText}</span>
      <span class="fare">₹${bus.fare}</span>
    </div>
    <div class="bus-time-row">
      <div>
        <span class="time">${bus.departure_time}</span>
        <span class="station">${bus.from}</span>
      </div>
      <div class="duration-line">
        <span>~${bus.duration}</span>
        <div class="line"></div>
      </div>
      <div>
        <span class="time">${bus.arrival_time}</span>
        <span class="station">${bus.to}</span>
      </div>
    </div>
    ${
      isPartialTrip
        ? `<div class="via-note">Boarding: <strong>${searchFrom}</strong> · Alighting: <strong>${searchTo}</strong> — poore route (${route.join(
            " → "
          )}) ka samay upar dikhaya gaya hai.</div>`
        : bus.via_stops && bus.via_stops.length > 0
        ? `<div class="via-note">Via: ${bus.via_stops.join(", ")}</div>`
        : ""
    }
    <div class="bus-card-footer">
      <span>Frequency: ${bus.frequency}</span>
      <button class="track-btn" type="button">Route Dekhein</button>
    </div>
  `;
  card.querySelector(".track-btn").addEventListener("click", () => {
    alert(`${bus.bus_id} — ${bus.bus_name}\nFull route: ${route.join(" → ")}`);
  });
  return card;
}

function renderEmptyState() {
  const div = document.createElement("div");
  div.className = "empty-state";
  div.innerHTML = `
    <span class="emoji">🚏</span>
    <strong>Is route par jald buses add hongi</strong>
    <p>Abhi is stop-pair ke liye koi direct ya connecting bus data mein nahi hai. Kisi bade junction (Gorakhpur, Lucknow) se badal kar try karein.</p>
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
