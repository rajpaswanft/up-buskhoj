// =====================================================
// js/app.js
// Base-layer bootstrap for the modular rebuild.
//
// This file wires up everything that doesn't depend on
// a bus timetable yet: stop dropdowns (from STOP_COORDS),
// swap/search buttons, the live clock, and the map modal +
// GPS demo (using renderRouteMap/trackUserLiveLocation
// from js/map.js). It renders a route-preview card so the
// whole chain — search -> card -> "Route Dekhein" -> live
// map -> GPS tracking — is testable end-to-end today.
//
// NEXT STEP (not in this file yet): BUS_DATA with real
// schedules, the NEXT BUS / countdown / past-bus logic,
// and Load More pagination will replace the preview card
// in nextBusContainer / upcomingBusesContainer.
// =====================================================

const el = {
  fromStop: document.getElementById("fromStop"),
  toStop: document.getElementById("toStop"),
  swapBtn: document.getElementById("swapBtn"),
  searchBtn: document.getElementById("searchBtn"),
  statusText: document.getElementById("statusText"),

  nextBusContainer: document.getElementById("nextBusContainer"),
  upcomingBusesContainer: document.getElementById("upcomingBusesContainer"),
  upcomingCount: document.getElementById("upcomingCount"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
  toggleDepartedBtn: document.getElementById("toggleDepartedBtn"),
  departedBusesContainer: document.getElementById("departedBusesContainer"),

  liveClock: document.getElementById("liveClock"),

  mapModal: document.getElementById("mapModal"),
  mapModalBackdrop: document.getElementById("mapModalBackdrop"),
  mapModalCloseBtn: document.getElementById("mapModalCloseBtn"),
  mapModalTitle: document.getElementById("mapModalTitle"),
  gpsToggleBtn: document.getElementById("gpsToggleBtn"),
  gpsStats: document.getElementById("gpsStats"),
  gpsSpeed: document.getElementById("gpsSpeed"),
  gpsAccuracy: document.getElementById("gpsAccuracy"),
};

let activeMap = null;

// -----------------------------------------------------
// Stop dropdowns — driven entirely by STOP_COORDS
// -----------------------------------------------------
function populateStopDropdowns() {
  const names = Object.keys(STOP_COORDS).sort((a, b) => a.localeCompare(b));

  [el.fromStop, el.toStop].forEach((select) => {
    select.innerHTML = "";
    names.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
    select.disabled = names.length === 0;
  });
}

function pickSensibleDefaults() {
  const names = Object.keys(STOP_COORDS);
  if (names.includes("Deoria") && names.includes("Gorakhpur")) {
    el.fromStop.value = "Deoria";
    el.toStop.value = "Gorakhpur";
  } else if (names.length >= 2) {
    el.fromStop.value = names[0];
    el.toStop.value = names[1];
  }
}

// -----------------------------------------------------
// Live clock
// -----------------------------------------------------
function formatClock(date) {
  let h = date.getHours();
  const m = date.getMinutes();
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

function tickClock() {
  if (el.liveClock) el.liveClock.textContent = formatClock(new Date());
}

// -----------------------------------------------------
// Search — renders a route-preview card. Replaced by the
// real schedule engine (NEXT BUS / upcoming / departed)
// in the next build step.
// -----------------------------------------------------
function handleSearch() {
  const from = el.fromStop.value;
  const to = el.toStop.value;

  el.nextBusContainer.innerHTML = "";
  el.upcomingBusesContainer.innerHTML = "";
  el.upcomingCount.textContent = "";
  el.toggleDepartedBtn.hidden = true;
  el.departedBusesContainer.innerHTML = "";

  if (!from || !to) {
    el.statusText.textContent = "Kripya From aur To station chunein.";
    return;
  }

  if (from === to) {
    el.statusText.innerHTML = "Kripya alag <strong>From</strong> aur <strong>To</strong> station chunein.";
    el.nextBusContainer.innerHTML = '<p class="placeholder-text">Search karke dekhein agli bus kab hai.</p>';
    return;
  }

  el.statusText.innerHTML = `Route: <strong>${from} → ${to}</strong> — live schedule agle step mein add hoga.`;
  el.nextBusContainer.appendChild(renderPreviewCard(from, to));
}

function renderPreviewCard(from, to) {
  const hasCoords = Boolean(STOP_COORDS[from] && STOP_COORDS[to]);

  const card = document.createElement("div");
  card.className = "bus-card is-next";
  card.innerHTML = `
    <div class="bus-card-top">
      <span class="badge ordinary">Route Preview</span>
      <span class="next-badge">MAP READY</span>
    </div>
    <div class="countdown-timer next">Schedule data agle step mein add hoga</div>
    <div class="bus-time-row">
      <div>
        <span class="time">--:--</span>
        <span class="station">${from}</span>
      </div>
      <div class="duration-line">
        <span>route</span>
        <div class="line"></div>
      </div>
      <div>
        <span class="time">--:--</span>
        <span class="station">${to}</span>
      </div>
    </div>
    <div class="bus-card-footer">
      <span class="frequency-text">${hasCoords ? "Map data available" : "Map data abhi available nahi"}</span>
      <button type="button" class="view-route-btn">Route Dekhein</button>
    </div>
  `;

  card.querySelector(".view-route-btn").addEventListener("click", () => {
    openMapModal(`${from} → ${to}`, [from, to]);
  });

  return card;
}

// -----------------------------------------------------
// Map modal — thin controller around js/map.js
// -----------------------------------------------------
function openMapModal(title, stopNames) {
  el.mapModalTitle.textContent = title;
  el.mapModal.classList.remove("hidden");
  activeMap = renderRouteMap("routeMapContainer", stopNames);
  resetGpsUI();
}

function closeMapModal() {
  if (activeMap) {
    stopTrackingUserLocation(activeMap);
  }
  el.mapModal.classList.add("hidden");
  resetGpsUI();
}

function resetGpsUI() {
  el.gpsToggleBtn.classList.remove("active");
  el.gpsToggleBtn.textContent = "📍 Inside Bus (Track My Location)";
  el.gpsStats.hidden = true;
  el.gpsSpeed.textContent = "Speed: -- km/h";
  el.gpsAccuracy.textContent = "Accuracy: -- m";
}

function toggleGpsTracking() {
  if (!activeMap) return;

  if (activeMap._buskhojWatchId != null) {
    stopTrackingUserLocation(activeMap);
    resetGpsUI();
    return;
  }

  el.gpsToggleBtn.classList.add("active");
  el.gpsToggleBtn.textContent = "🔴 Tracking Band Karein";
  el.gpsStats.hidden = false;

  trackUserLiveLocation(
    activeMap,
    (info) => {
      el.gpsSpeed.textContent = `Speed: ${info.speedKmh != null ? info.speedKmh : "--"} km/h`;
      el.gpsAccuracy.textContent = `Accuracy: ${info.accuracy != null ? "±" + info.accuracy + " m" : "-- m"}`;
    },
    (error) => {
      el.gpsStats.hidden = false;
      el.gpsSpeed.textContent = "Location access fail ho gaya.";
      el.gpsAccuracy.textContent = error.message || "";
      resetGpsUI();
    }
  );
}

// -----------------------------------------------------
// Events
// -----------------------------------------------------
el.swapBtn.addEventListener("click", () => {
  const currentFrom = el.fromStop.value;
  el.fromStop.value = el.toStop.value;
  el.toStop.value = currentFrom;
});

el.searchBtn.addEventListener("click", handleSearch);
el.mapModalCloseBtn.addEventListener("click", closeMapModal);
el.mapModalBackdrop.addEventListener("click", closeMapModal);
el.gpsToggleBtn.addEventListener("click", toggleGpsTracking);

// -----------------------------------------------------
// Init
// -----------------------------------------------------
populateStopDropdowns();
pickSensibleDefaults();
tickClock();
setInterval(tickClock, 1000);
