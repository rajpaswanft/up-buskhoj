const COORDS = {
  // Deoria
  "Deoria Sadar Bus Station": [26.5020, 83.7791],
  "Kacheri Bus Stand": [26.5058, 83.7842],
  "Kasya Dhala": [26.5112, 83.7885],
  "Overbridge / SSBL Gate": [26.5005, 83.7750],
  "Purva Chauraha": [26.4950, 83.7820],
  "Salempur Bus Stand": [26.3015, 83.9248],
  "Rudrapur Bus Station": [26.4385, 83.6214],
  "Barhaj Bus Stand": [26.2842, 83.7540],
  "Bhatpar Rani": [26.2482, 84.0531],
  "Lar Road / Lar": [26.2085, 83.9712],
  "Bhatni Bus Stand": [26.5684, 83.9721],
  "Gauri Bazar": [26.5861, 83.6933],
  "Baitalpur": [26.5505, 83.7431],
  "Tarkulwa": [26.6185, 83.8760],
  "Rampur Karkhana": [26.5695, 83.8210],
  "Khukhundoo": [26.3980, 83.8540],
  "Bhagalpur": [26.2150, 83.8230],
  "Kaparwar Ghat": [26.2750, 83.6890],
  "Mail": [26.3380, 83.7310],
  "Mehrauna Ghat": [26.1750, 84.0120],

  // Gorakhpur & Corridors
  "Gorakhpur Railway Bus Station": [26.7588, 83.3813],
  "Gorakhpur Kachehri Bus Station": [26.7620, 83.3750],
  "Nausad Bus Station": [26.7025, 83.3481],
  "Mohaddipur Chowk Bus Stop": [26.7505, 83.3985],
  "Medical College (BRD) Bus Stop": [26.7920, 83.3850],
  "Sahjanwa Bus Stand": [26.7725, 83.1812],
  "Chauri Chaura Bus Stand": [26.6432, 83.6062],
  "Bansgaon Bus Stand": [26.5580, 83.3510],
  "Gola Bazar Bus Station": [26.3520, 83.3540],
  "Barhalganj Bus Station": [26.2820, 83.5015],
  "Campierganj Bus Stand": [27.0250, 83.2750],
  "Khajni Bus Stop": [26.6510, 83.2210],
  "Kauriram Bus Stop": [26.5410, 83.3980],
  "Dohrighat": [26.2612, 83.5234],
  "Mau": [25.9416, 83.5602],
  "Saidpur": [25.5492, 83.1932],
  "Varanasi Cantt ISBT": [25.3284, 82.9868],
  "Lucknow (Alambagh ISBT)": [26.8142, 80.9025]
};

const BUS_DATA = [
  // Deoria -> Gorakhpur
  {
    from: "Deoria Sadar Bus Station",
    to: "Gorakhpur Railway Bus Station",
    type: "ordinary",
    typeLabel: "Ordinary",
    fare: 80,
    duration: "1h 15m",
    via: ["Baitalpur", "Gauri Bazar", "Chauri Chaura Bus Stand"],
    departures: [
      "04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00",
      "09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00",
      "14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00",
      "19:30","20:00","20:30","21:00","21:30","22:00","23:15"
    ]
  },
  {
    from: "Deoria Sadar Bus Station",
    to: "Gorakhpur Railway Bus Station",
    type: "janrath",
    typeLabel: "Janrath AC",
    fare: 115,
    duration: "1h 05m",
    via: ["Baitalpur", "Gauri Bazar", "Chauri Chaura Bus Stand"],
    departures: ["06:00", "08:00", "11:30", "14:30", "17:00", "19:35", "21:30"]
  },
  // Gorakhpur -> Deoria
  {
    from: "Gorakhpur Railway Bus Station",
    to: "Deoria Sadar Bus Station",
    type: "ordinary",
    typeLabel: "Ordinary",
    fare: 80,
    duration: "1h 15m",
    via: ["Chauri Chaura Bus Stand", "Gauri Bazar", "Baitalpur"],
    departures: [
      "05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30",
      "10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
      "15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30",
      "20:00","20:30","21:00","21:30","22:00","23:30"
    ]
  },
  // Deoria Locals
  {
    from: "Deoria Sadar Bus Station",
    to: "Salempur Bus Stand",
    type: "ordinary",
    typeLabel: "Local",
    fare: 30,
    duration: "45m",
    via: ["Purva Chauraha", "Khukhundoo"],
    departures: ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00"]
  },
  {
    from: "Deoria Sadar Bus Station",
    to: "Barhaj Bus Stand",
    type: "ordinary",
    typeLabel: "Local",
    fare: 35,
    duration: "55m",
    via: ["Mail", "Kaparwar Ghat"],
    departures: ["06:30","08:00","09:30","11:00","12:30","14:00","15:30","17:00","18:30","20:00"]
  },
  {
    from: "Gorakhpur Railway Bus Station",
    to: "Lucknow (Alambagh ISBT)",
    type: "ordinary",
    typeLabel: "Express",
    fare: 486,
    duration: "6h 00m",
    via: ["Sahjanwa Bus Stand", "Khalilabad", "Basti", "Ayodhya Dham"],
    departures: ["05:00","06:30","08:00","10:00","12:00","14:00","16:30","18:30","21:00","23:00"]
  }
];

// Live Clock
function updateClock() {
  const el = document.getElementById("liveClock");
  if (!el) return;
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  el.innerText = `${h}:${m}:${s} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// Dropdowns
const fromCity = document.getElementById("fromCity");
const toCity = document.getElementById("toCity");
const swapBtn = document.getElementById("swapBtn");
const searchBtn = document.getElementById("searchBtn");

function initDropdowns() {
  const fromSet = new Set();
  const toSet = new Set();

  BUS_DATA.forEach(r => {
    fromSet.add(r.from);
    r.via.forEach(v => fromSet.add(v));
    toSet.add(r.to);
  });

  fromCity.innerHTML = '<option value="">Kahan Se (From)</option>';
  [...fromSet].sort().forEach(s => {
    fromCity.innerHTML += `<option value="${s}">${s}</option>`;
  });

  toCity.innerHTML = '<option value="">Kahan Tak (To)</option>';
  [...toSet].sort().forEach(s => {
    toCity.innerHTML += `<option value="${s}">${s}</option>`;
  });

  fromCity.value = "Deoria Sadar Bus Station";
  toCity.value = "Gorakhpur Railway Bus Station";
}

window.setQuickRoute = function(from, to) {
  fromCity.value = from;
  toCity.value = to;
  renderSchedule();
};

swapBtn.addEventListener("click", () => {
  const temp = fromCity.value;
  fromCity.value = toCity.value;
  toCity.value = temp;
  renderSchedule();
});

function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// 24-Hour Smart Loop Schedule
function renderSchedule() {
  const fromVal = fromCity.value;
  const toVal = toCity.value;
  const now = new Date();
  const curMin = now.getHours() * 60 + now.getMinutes();

  let matched = [];

  BUS_DATA.forEach(r => {
    const matchFrom = !fromVal || r.from === fromVal || r.via.includes(fromVal);
    const matchTo = !toVal || r.to === toVal;

    if (matchFrom && matchTo) {
      r.departures.forEach(time => {
        matched.push({
          time,
          minutes: toMinutes(time),
          from: r.from,
          to: r.to,
          type: r.type,
          typeLabel: r.typeLabel,
          fare: r.fare,
          duration: r.duration,
          via: r.via
        });
      });
    }
  });

  matched.sort((a, b) => a.minutes - b.minutes);

  const upcoming = matched.filter(m => m.minutes >= curMin);
  const past = matched.filter(m => m.minutes < curMin);

  const busList = document.getElementById("busList");
  const pastList = document.getElementById("pastBusList");
  const togglePastBtn = document.getElementById("togglePastBtn");
  const resultCount = document.getElementById("resultCount");

  busList.innerHTML = "";
  pastList.innerHTML = "";

  // Night Loop Fix: Agar aaj raat koi bus nahi bachi, to kal subah ki pehli bus ko Next Bus banayein
  if (upcoming.length === 0 && matched.length > 0) {
    const tomorrowFirstBus = matched[0];
    const minsUntilMidnight = (24 * 60) - curMin;
    const totalMins = minsUntilMidnight + tomorrowFirstBus.minutes;
    
    resultCount.innerText = `Subah ki pehli bus active`;
    busList.innerHTML += buildCard(tomorrowFirstBus, 0, totalMins, true, false, true);
  } else if (upcoming.length > 0) {
    resultCount.innerText = `${upcoming.length} available`;
    const next = upcoming[0];
    const diff = next.minutes - curMin;
    busList.innerHTML += buildCard(next, 0, diff, true, false, false);

    upcoming.slice(1).forEach((b, idx) => {
      busList.innerHTML += buildCard(b, idx + 1, b.minutes - curMin, false, false, false);
    });
  }

  // Past buses
  if (past.length > 0) {
    togglePastBtn.hidden = false;
    past.forEach((b, idx) => {
      pastList.innerHTML += buildCard(b, 100 + idx, 0, false, true, false);
    });
  } else {
    togglePastBtn.hidden = true;
  }
}

function buildCard(b, id, diff, isNext, isPast, isTomorrow = false) {
  let cardClass = "bus-card";
  let countdownHTML = "";

  if (isNext) {
    cardClass += " next-bus";
    const label = isTomorrow ? `Kal Subah (${b.time})` : (diff === 0 ? 'Abhi Rawana' : `${diff} min me`);
    countdownHTML = `<div class="countdown-tag next">● NEXT BUS: ${label}</div>`;
  } else if (isPast) {
    cardClass += " past-bus";
    countdownHTML = `<div class="countdown-tag past">Nikal chuki hai</div>`;
  } else {
    countdownHTML = `<div class="countdown-tag upcoming">${diff} min baad</div>`;
  }

  return `
    <article class="${cardClass}">
      <span class="timeline-dot"></span>
      <div class="bus-card-top">
        <span class="badge ${b.type}">${b.typeLabel}</span>
        ${isNext ? '<span class="next-badge">NEXT BUS</span>' : ''}
        <span class="fare">₹${b.fare}</span>
      </div>

      ${countdownHTML}

      <div class="bus-time-row">
        <div>
          <span class="time">${b.time}</span>
          <span class="station">${b.from}</span>
        </div>
        <div class="duration-line">
          <div class="line"></div>
          <span>${b.duration}</span>
        </div>
        <div>
          <span class="time">--:--</span>
          <span class="station">${b.to}</span>
        </div>
      </div>

      <div class="via-note">
        <strong>Via:</strong> ${b.via.join(" &bull; ")}
      </div>

      <div class="bus-card-footer">
        <span>UPSRTC Official Route</span>
        <button class="track-btn" id="btn-${id}" onclick="toggleMapSection(${id}, '${b.from}', '${b.to}', ${JSON.stringify(b.via).replace(/"/g, '&quot;')})">
          Route / Live Track
        </button>
      </div>

      <div id="mapSec-${id}" class="map-section">
        <div class="map-container" id="mapBox-${id}"></div>
        <div class="map-controls">
          <button class="gps-toggle-btn" id="gpsBtn-${id}" onclick="toggleGpsTracker(${id})">📍 Live GPS Track</button>
          <div class="gps-status">
            <span class="gps-chip" id="gpsChip-${id}">GPS Ready</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

// Map Engine
const activeMaps = {};
let liveWatchId = null;

window.toggleMapSection = function(id, from, to, via) {
  const section = document.getElementById(`mapSec-${id}`);
  const btn = document.getElementById(`btn-${id}`);
  const isExpanded = section.classList.contains("expanded");

  if (isExpanded) {
    section.classList.remove("expanded");
    btn.classList.remove("active");
    return;
  }

  section.classList.add("expanded");
  btn.classList.add("active");

  setTimeout(() => {
    if (!activeMaps[id]) {
      const container = document.getElementById(`mapBox-${id}`);
      const map = L.map(container).setView([26.5020, 83.7791], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OSM" }).addTo(map);

      const stops = [from, ...via, to];
      const points = [];

      stops.forEach((st, idx) => {
        const pt = COORDS[st];
        if (pt) {
          points.push(pt);
          const isTerminal = (idx === 0 || idx === stops.length - 1);
          const icon = L.divIcon({ className: isTerminal ? 'stop-pin terminal' : 'stop-pin', iconSize: [12, 12] });
          L.marker(pt, { icon }).addTo(map).bindPopup(`<b>${st}</b>`);
        }
      });

      if (points.length > 1) {
        const poly = L.polyline(points, { color: "#1C4E36", weight: 4 }).addTo(map);
        map.fitBounds(poly.getBounds(), { padding: [25, 25] });
      }
      activeMaps[id] = map;
    } else {
      activeMaps[id].invalidateSize();
    }
  }, 320);
};

window.toggleGpsTracker = function(id) {
  const chip = document.getElementById(`gpsChip-${id}`);
  const btn = document.getElementById(`gpsBtn-${id}`);
  const map = activeMaps[id];

  if (liveWatchId) {
    navigator.geolocation.clearWatch(liveWatchId);
    liveWatchId = null;
    btn.classList.remove("active");
    chip.innerText = "GPS Paused";
    return;
  }

  if (!navigator.geolocation) {
    chip.innerText = "No GPS Support";
    return;
  }

  btn.classList.add("active");
  chip.innerText = "Locating...";

  liveWatchId = navigator.geolocation.watchPosition(pos => {
    const { latitude, longitude, speed } = pos.coords;
    chip.innerText = `Speed: ${(speed ? (speed * 3.6).toFixed(0) : 0)} km/h`;
    const userIcon = L.divIcon({ className: 'live-user-dot', iconSize: [16, 16] });
    L.marker([latitude, longitude], { icon: userIcon }).addTo(map);
    map.panTo([latitude, longitude]);
  });
};

togglePastBtn.addEventListener("click", () => {
  const pastList = document.getElementById("pastBusList");
  pastList.classList.toggle("collapsed");
  togglePastBtn.querySelector(".toggle-icon").innerText = pastList.classList.contains("collapsed") ? "▾" : "▴";
});

searchBtn.addEventListener("click", renderSchedule);

initDropdowns();
renderSchedule();
