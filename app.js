// =====================================================
// UP BusKhoj — app.js (standalone, no fetch)
// All bus data lives in BUS_DATA below. To add a city or
// route, just add another object to this array — the
// dropdowns and search both read from it automatically.
// =====================================================

const BUS_DATA = [
  // ---------- Deoria ⇄ Gorakhpur ----------
  {
    bus_id: "UP-DEO-GOR-01",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Deoria",
    to: "Gorakhpur",
    via_stops: ["Chauri Chaura"],
    departure_time: "6:00 AM",
    arrival_time: "7:15 AM",
    duration: "1h 15m",
    fare: 65,
    frequency: "Har 15-20 minute par",
  },
  {
    bus_id: "UP-DEO-GOR-02",
    bus_name: "Janrath 2x2 AC",
    bus_type: "Janrath",
    from: "Deoria",
    to: "Gorakhpur",
    via_stops: ["Chauri Chaura"],
    departure_time: "2:30 PM",
    arrival_time: "3:35 PM",
    duration: "1h 5m",
    fare: 95,
    frequency: "Har 15-20 minute par",
  },
  {
    bus_id: "UP-GOR-DEO-03",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Gorakhpur",
    to: "Deoria",
    via_stops: ["Chauri Chaura"],
    departure_time: "7:00 AM",
    arrival_time: "8:15 AM",
    duration: "1h 15m",
    fare: 65,
    frequency: "Har 15-20 minute par",
  },
  {
    bus_id: "UP-GOR-DEO-04",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Gorakhpur",
    to: "Deoria",
    via_stops: ["Chauri Chaura"],
    departure_time: "5:30 PM",
    arrival_time: "6:45 PM",
    duration: "1h 15m",
    fare: 65,
    frequency: "Har 15-20 minute par",
  },

  // ---------- Gorakhpur ⇄ Lucknow ----------
  {
    bus_id: "UP-GOR-LKO-05",
    bus_name: "Shatabdi AC",
    bus_type: "Shatabdi",
    from: "Gorakhpur",
    to: "Lucknow",
    via_stops: ["Basti", "Ayodhya", "Barabanki"],
    departure_time: "5:30 AM",
    arrival_time: "10:45 AM",
    duration: "5h 15m",
    fare: 480,
    frequency: "Din mein 6 trips",
  },
  {
    bus_id: "UP-GOR-LKO-06",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Gorakhpur",
    to: "Lucknow",
    via_stops: ["Basti", "Ayodhya", "Barabanki"],
    departure_time: "11:00 AM",
    arrival_time: "4:45 PM",
    duration: "5h 45m",
    fare: 320,
    frequency: "Din mein 6 trips",
  },
  {
    bus_id: "UP-LKO-GOR-07",
    bus_name: "Janrath 2x2 AC",
    bus_type: "Janrath",
    from: "Lucknow",
    to: "Gorakhpur",
    via_stops: ["Barabanki", "Ayodhya", "Basti"],
    departure_time: "7:15 AM",
    arrival_time: "1:00 PM",
    duration: "5h 45m",
    fare: 420,
    frequency: "Din mein 6 trips",
  },
  {
    bus_id: "UP-LKO-GOR-08",
    bus_name: "UP Pink Express",
    bus_type: "Pink Express",
    from: "Lucknow",
    to: "Gorakhpur",
    via_stops: ["Barabanki", "Ayodhya", "Basti"],
    departure_time: "9:30 PM",
    arrival_time: "3:15 AM",
    duration: "5h 45m",
    fare: 380,
    frequency: "Din mein 6 trips",
  },

  // ---------- Gorakhpur ⇄ Kushinagar ----------
  {
    bus_id: "UP-GOR-KSN-09",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Gorakhpur",
    to: "Kushinagar",
    via_stops: ["Hata"],
    departure_time: "6:15 AM",
    arrival_time: "7:40 AM",
    duration: "1h 25m",
    fare: 55,
    frequency: "Har 25-30 minute par",
  },
  {
    bus_id: "UP-GOR-KSN-10",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Gorakhpur",
    to: "Kushinagar",
    via_stops: ["Hata"],
    departure_time: "1:45 PM",
    arrival_time: "3:10 PM",
    duration: "1h 25m",
    fare: 55,
    frequency: "Har 25-30 minute par",
  },
  {
    bus_id: "UP-KSN-GOR-11",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Kushinagar",
    to: "Gorakhpur",
    via_stops: ["Hata"],
    departure_time: "8:00 AM",
    arrival_time: "9:25 AM",
    duration: "1h 25m",
    fare: 55,
    frequency: "Har 25-30 minute par",
  },

  // ---------- Gorakhpur ⇄ Varanasi ----------
  {
    bus_id: "UP-GOR-VNS-12",
    bus_name: "Janrath 2x2 AC",
    bus_type: "Janrath",
    from: "Gorakhpur",
    to: "Varanasi",
    via_stops: ["Azamgarh", "Mau"],
    departure_time: "6:30 AM",
    arrival_time: "11:15 AM",
    duration: "4h 45m",
    fare: 260,
    frequency: "Din mein 5 trips",
  },
  {
    bus_id: "UP-GOR-VNS-13",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Gorakhpur",
    to: "Varanasi",
    via_stops: ["Azamgarh", "Mau"],
    departure_time: "3:00 PM",
    arrival_time: "8:15 PM",
    duration: "5h 15m",
    fare: 220,
    frequency: "Din mein 5 trips",
  },
  {
    bus_id: "UP-VNS-GOR-14",
    bus_name: "UP Pink Express",
    bus_type: "Pink Express",
    from: "Varanasi",
    to: "Gorakhpur",
    via_stops: ["Mau", "Azamgarh"],
    departure_time: "7:45 AM",
    arrival_time: "12:30 PM",
    duration: "4h 45m",
    fare: 240,
    frequency: "Din mein 5 trips",
  },

  // ---------- Deoria ⇄ Varanasi ----------
  {
    bus_id: "UP-DEO-VNS-15",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Deoria",
    to: "Varanasi",
    via_stops: ["Salempur", "Ballia"],
    departure_time: "6:45 AM",
    arrival_time: "10:15 AM",
    duration: "3h 30m",
    fare: 180,
    frequency: "Din mein 4 trips",
  },
  {
    bus_id: "UP-VNS-DEO-16",
    bus_name: "Janrath 2x2 AC",
    bus_type: "Janrath",
    from: "Varanasi",
    to: "Deoria",
    via_stops: ["Ballia", "Salempur"],
    departure_time: "4:30 PM",
    arrival_time: "7:40 PM",
    duration: "3h 10m",
    fare: 230,
    frequency: "Din mein 4 trips",
  },

  // ---------- Lucknow ⇄ Varanasi ----------
  {
    bus_id: "UP-LKO-VNS-17",
    bus_name: "Shatabdi AC",
    bus_type: "Shatabdi",
    from: "Lucknow",
    to: "Varanasi",
    via_stops: ["Sultanpur", "Jaunpur"],
    departure_time: "6:00 AM",
    arrival_time: "10:45 AM",
    duration: "4h 45m",
    fare: 460,
    frequency: "Din mein 5 trips",
  },
  {
    bus_id: "UP-VNS-LKO-18",
    bus_name: "UPSRTC Sadharan",
    bus_type: "Ordinary",
    from: "Varanasi",
    to: "Lucknow",
    via_stops: ["Jaunpur", "Sultanpur"],
    departure_time: "8:15 AM",
    arrival_time: "1:30 PM",
    duration: "5h 15m",
    fare: 280,
    frequency: "Din mein 5 trips",
  },
];

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

// -----------------------------------------------------
// Safety check — every entry must have these fields, or
// we skip it rather than ever render "undefined".
// -----------------------------------------------------
const REQUIRED_FIELDS = [
  "bus_id",
  "bus_name",
  "bus_type",
  "from",
  "to",
  "departure_time",
  "arrival_time",
  "duration",
  "fare",
  "frequency",
];

function isValidBus(bus) {
  return REQUIRED_FIELDS.every((field) => bus[field] !== undefined && bus[field] !== null && bus[field] !== "");
}

const VALID_BUSES = BUS_DATA.filter(isValidBus);

if (VALID_BUSES.length !== BUS_DATA.length) {
  console.warn(
    `[UP BusKhoj] Skipped ${BUS_DATA.length - VALID_BUSES.length} bus entr${
      BUS_DATA.length - VALID_BUSES.length === 1 ? "y" : "ies"
    } missing required fields.`
  );
}

// -----------------------------------------------------
// Build the full stop sequence for a bus:
// [from, ...via_stops, to]
// -----------------------------------------------------
function fullRoute(bus) {
  return [bus.from, ...(Array.isArray(bus.via_stops) ? bus.via_stops : []), bus.to];
}

// -----------------------------------------------------
// Dropdown population — driven entirely by BUS_DATA
// -----------------------------------------------------
function populateCityDropdowns() {
  const citySet = new Set();
  VALID_BUSES.forEach((bus) => fullRoute(bus).forEach((stop) => citySet.add(stop)));
  const cities = Array.from(citySet).sort((a, b) => a.localeCompare(b));

  [el.fromSelect, el.toSelect].forEach((sel) => {
    sel.innerHTML = "";
    cities.forEach((city) => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      sel.appendChild(opt);
    });
    sel.disabled = cities.length === 0;
  });
}

// Pick two well-connected cities as a friendly starting point
function pickSensibleDefaults() {
  const preferred = ["Deoria", "Gorakhpur"];
  const options = Array.from(el.fromSelect.options).map((o) => o.value);
  if (options.length === 0) return;

  const from = preferred.find((c) => options.includes(c)) || options[0];
  const to =
    preferred.find((c) => c !== from && options.includes(c)) ||
    options.find((c) => c !== from) ||
    options[0];

  el.fromSelect.value = from;
  el.toSelect.value = to;
}

function badgeClass(busType) {
  return String(busType || "ordinary").toLowerCase().replace(/\s+/g, "-");
}

// -----------------------------------------------------
// Search / filter — direct AND via-route matches
// -----------------------------------------------------
function findMatches(from, to) {
  return VALID_BUSES.filter((bus) => {
    const route = fullRoute(bus);
    const fromIdx = route.indexOf(from);
    const toIdx = route.indexOf(to);
    return fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx;
  });
}

function search() {
  const from = el.fromSelect.value;
  const to = el.toSelect.value;

  el.busList.innerHTML = "";

  if (!from || !to) {
    el.resultHeading.textContent = "Available Buses";
    el.resultCount.textContent = "";
    el.statusText.textContent = "Kripya From aur To station chunein.";
    return;
  }

  el.resultHeading.textContent = `${from} → ${to}`;

  if (from === to) {
    el.resultCount.textContent = "";
    el.statusText.innerHTML = "Kripya alag <strong>From</strong> aur <strong>To</strong> station chunein.";
    el.busList.appendChild(renderEmptyState());
    return;
  }

  const matches = findMatches(from, to);

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
  const viaStops = Array.isArray(bus.via_stops) ? bus.via_stops : [];

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
        : viaStops.length > 0
        ? `<div class="via-note">Via: ${viaStops.join(", ")}</div>`
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

// -----------------------------------------------------
// Init — synchronous, no fetch, nothing to fail
// -----------------------------------------------------
populateCityDropdowns();
pickSensibleDefaults();
search();
