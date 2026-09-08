// =====================================================
// 1. ALL STOPS & COORDINATES DATABASE
// =====================================================
const COORDS = {
  // Deoria Stops
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

  // Gorakhpur Stops
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

  // Corridors & Connecting Depots
  "Dohrighat": [26.2612, 83.5234],
  "Mau": [25.9416, 83.5602],
  "Saidpur": [25.5492, 83.1932],
  "Varanasi Cantt ISBT": [25.3284, 82.9868],
  "Khalilabad": [26.7702, 83.0730],
  "Basti": [26.8148, 82.7621],
  "Ayodhya Dham": [26.7922, 82.1998],
  "Lucknow (Alambagh ISBT)": [26.8142, 80.9025]
};

// =====================================================
// 2. DISTRICT ROUTES & TIMETABLES
// =====================================================
const DISTRICT_DATA = {
  "Deoria": {
    stops: [
      "Deoria Sadar Bus Station", "Kacheri Bus Stand", "Kasya Dhala", "Overbridge / SSBL Gate",
      "Purva Chauraha", "Salempur Bus Stand", "Rudrapur Bus Station", "Barhaj Bus Stand",
      "Bhatpar Rani", "Lar Road / Lar", "Bhatni Bus Stand", "Gauri Bazar", "Baitalpur",
      "Tarkulwa", "Rampur Karkhana", "Khukhundoo", "Bhagalpur", "Kaparwar Ghat", "Mail", "Mehrauna Ghat"
    ],
    destinations: [
      "Gorakhpur Railway Bus Station", "Salempur Bus Stand", "Barhaj Bus Stand", 
      "Rudrapur Bus Station", "Varanasi Cantt ISBT"
    ],
    routes: [
      {
        from: "Deoria Sadar Bus Station",
        to: "Gorakhpur Railway Bus Station",
        type: "ordinary",
        typeLabel: "Ordinary",
        fare: 80,
        durationMinutes: 75,
        durationText: "1h 15m",
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
        durationMinutes: 65,
        durationText: "1h 05m",
        via: ["Baitalpur", "Gauri Bazar", "Chauri Chaura Bus Stand"],
        departures: ["06:00", "08:00", "11:30", "14:30", "17:00", "19:35", "21:30"]
      },
      {
        from: "Deoria Sadar Bus Station",
        to: "Salempur Bus Stand",
        type: "ordinary",
        typeLabel: "Local",
        fare: 30,
        durationMinutes: 45,
        durationText: "45m",
        via: ["Purva Chauraha", "Khukhundoo"],
        departures: ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00"]
      },
      {
        from: "Deoria Sadar Bus Station",
        to: "Barhaj Bus Stand",
        type: "ordinary",
        typeLabel: "Local",
        fare: 35,
        durationMinutes: 55,
        durationText: "55m",
        via: ["Mail", "Kaparwar Ghat"],
        departures: ["06:30","08:00","09:30","11:00","12:30","14:00","15:30","17:00","18:30","20:00"]
      },
      {
        from: "Deoria Sadar Bus Station",
        to: "Rudrapur Bus Station",
        type: "ordinary",
        typeLabel: "Local",
        fare: 28,
        durationMinutes: 40,
        durationText: "40m",
        via: ["Gauri Bazar"],
        departures: ["07:00","08:30","10:00","11:30","13:00","14:30","16:00","17:30","19:00"]
      },
      {
        from: "Deoria Sadar Bus Station",
        to: "Varanasi Cantt ISBT",
        type: "shatabdi",
        typeLabel: "Express",
        fare: 215,
        durationMinutes: 270,
        durationText: "4h 30m",
        via: ["Salempur Bus Stand", "Lar Road / Lar", "Dohrighat", "Mau", "Saidpur"],
        departures: ["05:30","07:00","08:45","11:00","13:15","15:30","18:00"]
      }
    ]
  },
  "Gorakhpur": {
    stops: [
      "Gorakhpur Railway Bus Station", "Gorakhpur Kachehri Bus Station", "Nausad Bus Station",
      "Mohaddipur Chowk Bus Stop", "Medical College (BRD) Bus Stop", "Sahjanwa Bus Stand",
      "Chauri Chaura Bus Stand", "Bansgaon Bus Stand", "Gola Bazar Bus Station",
      "Barhalganj Bus Station", "Campierganj Bus Stand", "Khajni Bus Stop", "Kauriram Bus Stop"
    ],
    destinations: [
      "Deoria Sadar Bus Station", "Barhalganj Bus Station", "Lucknow (Alambagh ISBT)", "Varanasi Cantt ISBT"
    ],
    routes: [
      {
        from: "Gorakhpur Railway Bus Station",
        to: "Deoria Sadar Bus Station",
        type: "ordinary",
        typeLabel: "Ordinary",
        fare: 80,
        durationMinutes: 75,
        durationText: "1h 15m",
        via: ["Chauri Chaura Bus Stand", "Gauri Bazar", "Baitalpur"],
        departures: [
          "05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30",
          "10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
          "15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30",
          "20:00","20:30","21:00","21:30","22:00","23:30"
        ]
      },
      {
        from: "Gorakhpur Railway Bus Station",
        to: "Deoria Sadar Bus Station",
        type: "janrath",
        typeLabel: "Janrath AC",
        fare: 115,
        durationMinutes: 65,
        durationText: "1h 05m",
        via: ["Chauri Chaura Bus Stand", "Gauri Bazar", "Baitalpur"],
        departures: ["06:30", "09:00", "12:00", "15:00", "17:30", "20:00", "22:15"]
      },
      {
        from: "Gorakhpur Railway Bus Station",
        to: "Barhalganj Bus Station",
        type: "ordinary",
        typeLabel: "Local",
        fare: 75,
        durationMinutes: 100,
        durationText: "1h 40m",
        via: ["Nausad Bus Station", "Kauriram Bus Stop"],
        departures: ["06:00","07:30","09:00","11:00","13:00","15:00","17:00","18:30"]
      },
      {
        from: "Gorakhpur Railway Bus Station",
        to: "Lucknow (Alambagh ISBT)",
        type: "ordinary",
        typeLabel: "Express",
        fare: 486,
        durationMinutes: 360,
        durationText: "6h 00m",
        via: ["Sahjanwa Bus Stand", "Khalilabad", "Basti", "Ayodhya Dham"],
        departures: ["05:00","06:30","08:00","10:00","12:00","14:00","16:30","18:30","21:00","23:00"]
      },
      {
        from: "Nausad Bus Station",
        to: "Varanasi Cantt ISBT",
        type: "shatabdi",
        typeLabel: "Express",
        fare: 320,
        durationMinutes: 315,
        durationText: "5h 15m",
        via: ["Kauriram Bus Stop", "Barhalganj Bus Station", "Dohrighat", "Mau", "Saidpur"],
        departures: ["06:00","08:00","10:00","12:00","14:00","16:00","18:00"]
      }
    ]
  }
};

// =====================================================
// 3. LIVE CLOCK ENGINE
// =====================================================
function updateLiveClock() {
  const clockEl = document.getElementById("clockTime") || document.getElementById("liveClock");
  if (!clockEl) return;
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  clockEl.innerText = `${h}:${m}:${s} ${ampm}`;
}
setInterval(updateLiveClock, 1000);
updateLiveClock();

// =====================================================
// 4. DROPDOWN POPULATION (BOTH IDS SUPPORTED)
// =====================================================
const districtSelect = document.getElementById("districtSelect");
const fromStopSelect = document.getElementById("fromStop") || document.getElementById("fromCity");
const toStopSelect = document.getElementById("toStop") || document.getElementById("toCity");
const swapBtn = document.getElementById("swapBtn");
const searchBtn = document.getElementById("searchBtn");

function populateStopsForDistrict(dist) {
  const data = DISTRICT_DATA[dist];
  if (!data || !fromStopSelect || !toStopSelect) return;

  fromStopSelect.innerHTML = '<option value="">Sabhi Boarding Stops</option>';
  data.stops.forEach(st => {
    fromStopSelect.innerHTML += `<option value="${st}">${st}</option>`;
  });

  toStopSelect.innerHTML = '<option value="">Sabhi Destinations</option>';
  data.destinations.forEach(dest => {
    toStopSelect.innerHTML += `<option value="${dest}">${dest}</option>`;
  });

  if (dist === "Deoria") {
    fromStopSelect.value = "Deoria Sadar Bus Station";
    toStopSelect.value = "Gorakhpur Railway Bus Station";
  } else {
    fromStopSelect.value = "Gorakhpur Railway Bus Station";
    toStopSelect.value = "Deoria Sadar Bus Station";
  }
}

if (districtSelect) {
  districtSelect.addEventListener("change", (e) => {
    populateStopsForDistrict(e.target.value);
    renderSchedule();
  });
}

window.setQuickRoute = function(dist, from, to) {
  if (districtSelect) districtSelect.value = dist;
  populateStopsForDistrict(dist);
  if (fromStopSelect) fromStopSelect.value = from;
  if (toStopSelect) toStopSelect.value = to;
  renderSchedule();
};

if (swapBtn) {
  swapBtn.addEventListener("click", () => {
    const temp = fromStopSelect.value;
    fromStopSelect.value = toStopSelect.value;
    toStopSelect.value = temp;
    renderSchedule();
  });
}

// =====================================================
// 5. SCHEDULE CALCULATION HELPERS
// =====================================================
function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function calculateArrivalTime(depTimeStr, durationMinutes) {
  const depMinutes = toMinutes(depTimeStr);
  const arrMinutes = (depMinutes + durationMinutes) % (24 * 60);
  const arrH = String(Math.floor(arrMinutes / 60)).padStart(2, '0');
  const arrM = String(arrMinutes % 60).padStart(2, '0');
  return `${arrH}:${arrM}`;
}

// =====================================================
// 6. RENDER LOGIC WITH MODAL & INLINE SUPPORT
// =====================================================
function renderSchedule() {
  const dist = districtSelect ? districtSelect.value : "Deoria";
  const fromVal = fromStopSelect ? fromStopSelect.value : "";
  const toVal = toStopSelect ? toStopSelect.value : "";
  const routes = DISTRICT_DATA[dist] ? DISTRICT_DATA[dist].routes : [];

  const now = new Date();
  const curMin = now.getHours() * 60 + now.getMinutes();

  let matched = [];

  routes.forEach(r => {
    const matchFrom = !fromVal || r.from === fromVal || r.via.includes(fromVal);
    const matchTo = !toVal || r.to === toVal;

    if (matchFrom && matchTo) {
      r.departures.forEach(time => {
        matched.push({
          time,
          minutes: toMinutes(time),
          arrivalTime: calculateArrivalTime(time, r.durationMinutes),
          from: r.from,
          to: r.to,
          type: r.type,
          typeLabel: r.typeLabel,
          fare: r.fare,
          durationText: r.durationText,
          via: r.via
        });
      });
    }
  });

  matched.sort((a, b) => a.minutes - b.minutes);

  const upcoming = matched.filter(m => m.minutes >= curMin);
  const past = matched.filter(m => m.minutes < curMin);

  const nextBusWrapper = document.getElementById("nextBusWrapper");
  const upcomingBusesWrapper = document.getElementById("upcomingBusesWrapper") || document.getElementById("busList");
  const pastBusList = document.getElementById("pastBusesList") || document.getElementById("pastBusList");
  const togglePastBtn = document.getElementById("togglePastBtn");
  const resultCount = document.getElementById("resultCount");

  if (nextBusWrapper) nextBusWrapper.innerHTML = "";
  if (upcomingBusesWrapper) upcomingBusesWrapper.innerHTML = "";
  if (pastBusList) pastBusList.innerHTML = "";

  if (upcoming.length === 0 && matched.length > 0) {
    const tomorrowFirst = matched[0];
    const diff = (24 * 60 - curMin) + tomorrowFirst.minutes;
    if (resultCount) resultCount.innerText = `Subah ki pehli bus active`;
    const cardHTML = buildCard(tomorrowFirst, 0, diff, true, false, true);
    if (nextBusWrapper) nextBusWrapper.innerHTML = cardHTML;
    else if (upcomingBusesWrapper) upcomingBusesWrapper.innerHTML = cardHTML;
  } else if (upcoming.length > 0) {
    if (resultCount) resultCount.innerText = `${upcoming.length} available`;
    const next = upcoming[0];
    const diff = next.minutes - curMin;
    const nextHTML = buildCard(next, 0, diff, true, false, false);

    if (nextBusWrapper) {
      nextBusWrapper.innerHTML = nextHTML;
      upcoming.slice(1).forEach((b, idx) => {
        upcomingBusesWrapper.innerHTML += buildCard(b, idx + 1, b.minutes - curMin, false, false, false);
      });
    } else if (upcomingBusesWrapper) {
      upcomingBusesWrapper.innerHTML += nextHTML;
      upcoming.slice(1).forEach((b, idx) => {
        upcomingBusesWrapper.innerHTML += buildCard(b, idx + 1, b.minutes - curMin, false, false, false);
      });
    }
  } else {
    if (resultCount) resultCount.innerText = `0 available`;
    const emptyMsg = `<div style="text-align:center; padding: 25px; color: var(--ink-soft);">Is route par koi direct bus nahi mili.</div>`;
    if (nextBusWrapper) nextBusWrapper.innerHTML = emptyMsg;
    else if (upcomingBusesWrapper) upcomingBusesWrapper.innerHTML = emptyMsg;
  }

  if (past.length > 0 && pastBusList) {
    if (togglePastBtn) togglePastBtn.hidden = false;
    past.forEach((b, idx) => {
      pastBusList.innerHTML += buildCard(b, 100 + idx, 0, false, true, false);
    });
  } else if (togglePastBtn) {
    togglePastBtn.hidden = true;
  }
}

// =====================================================
// 7. CARD BUILDER
// =====================================================
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
          <span>${b.durationText}</span>
        </div>
        <div>
          <span class="time arrival-time">${b.arrivalTime}</span>
          <span class="station">${b.to}</span>
        </div>
      </div>

      <div class="via-note">
        <strong>Via:</strong> ${b.via.join(" &bull; ")}
      </div>

      <div class="bus-card-footer">
        <span>UPSRTC Official Route</span>
        <button class="track-btn" id="btn-${id}" onclick="openMapModal('${b.from}', '${b.to}', ${JSON.stringify(b.via).replace(/"/g, '&quot;')})">
          Route / Live Track
        </button>
      </div>
    </article>
  `;
}

// =====================================================
// 8. LEAFLET MAP MODAL ENGINE
// =====================================================
let modalMap = null;
let currentPolyline = null;
let liveGpsWatch = null;

window.openMapModal = function(from, to, via) {
  const modal = document.getElementById("mapModal");
  const title = document.getElementById("mapRouteTitle");
  if (!modal) return;

  if (title) title.innerText = `${from} ➔ ${to}`;
  modal.classList.remove("hidden");

  setTimeout(() => {
    if (!modalMap) {
      modalMap = L.map("mapContainer").setView([26.5020, 83.7791], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
      }).addTo(modalMap);
    } else {
      modalMap.invalidateSize();
    }

    if (currentPolyline) {
      modalMap.removeLayer(currentPolyline);
    }

    const stops = [from, ...via, to];
    const points = [];

    stops.forEach((st, idx) => {
      const pt = COORDS[st];
      if (pt) {
        points.push(pt);
        const isTerminal = (idx === 0 || idx === stops.length - 1);
        const icon = L.divIcon({
          className: isTerminal ? 'stop-pin terminal' : 'stop-pin',
          iconSize: isTerminal ? [14, 14] : [10, 10]
        });
        L.marker(pt, { icon }).addTo(modalMap).bindPopup(`<b>${st}</b>`);
      }
    });

    if (points.length > 1) {
      currentPolyline = L.polyline(points, { color: "#1C4E36", weight: 4 }).addTo(modalMap);
      modalMap.fitBounds(currentPolyline.getBounds(), { padding: [25, 25] });
    }
  }, 200);
};

const closeMapBtn = document.getElementById("closeMapBtn");
const mapBackdrop = document.getElementById("mapBackdrop");

function closeMap() {
  const modal = document.getElementById("mapModal");
  if (modal) modal.classList.add("hidden");
  if (liveGpsWatch) {
    navigator.geolocation.clearWatch(liveGpsWatch);
    liveGpsWatch = null;
  }
}

if (closeMapBtn) closeMapBtn.addEventListener("click", closeMap);
if (mapBackdrop) mapBackdrop.addEventListener("click", closeMap);

// Live GPS Button inside Modal
const trackGpsBtn = document.getElementById("trackGpsBtn");
const gpsStatusText = document.getElementById("gpsStatusText");

if (trackGpsBtn) {
  trackGpsBtn.addEventListener("click", () => {
    if (liveGpsWatch) {
      navigator.geolocation.clearWatch(liveGpsWatch);
      liveGpsWatch = null;
      trackGpsBtn.classList.remove("active");
      if (gpsStatusText) gpsStatusText.innerText = "GPS Paused";
      return;
    }

    if (!navigator.geolocation) {
      if (gpsStatusText) gpsStatusText.innerText = "GPS Not Supported";
      return;
    }

    trackGpsBtn.classList.add("active");
    if (gpsStatusText) gpsStatusText.innerText = "Locating device...";

    liveGpsWatch = navigator.geolocation.watchPosition(pos => {
      const { latitude, longitude, speed } = pos.coords;
      const speedKm = speed ? (speed * 3.6).toFixed(0) : 0;
      if (gpsStatusText) gpsStatusText.innerText = `Speed: ${speedKm} km/h`;

      const userIcon = L.divIcon({ className: 'live-user-dot', iconSize: [16, 16] });
      L.marker([latitude, longitude], { icon: userIcon }).addTo(modalMap);
      modalMap.panTo([latitude, longitude]);
    });
  });
}

// =====================================================
// 9. EVENT LISTENERS & INITIALIZATION
// =====================================================
if (togglePastBtn) {
  togglePastBtn.addEventListener("click", () => {
    const pastBusList = document.getElementById("pastBusesList") || document.getElementById("pastBusList");
    if (pastBusList) {
      pastBusList.classList.toggle("collapsed");
      const icon = togglePastBtn.querySelector(".toggle-icon");
      if (icon) icon.innerText = pastBusList.classList.contains("collapsed") ? "▾" : "▴";
    }
  });
}

if (searchBtn) searchBtn.addEventListener("click", renderSchedule);

// Startup sequence
populateStopsForDistrict("Deoria");
renderSchedule();
