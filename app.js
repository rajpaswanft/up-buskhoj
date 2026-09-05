let currentDistrictData = null;

async function loadDistrictData(districtName) {
  try {
    const res = await fetch(`./districts/${districtName.toLowerCase()}.json`);
    if (!res.ok) throw new Error("File fetch failed");
    currentDistrictData = await res.json();
    
    populateStopsDropdown();
    populateDestinations();
    
    document.getElementById("statusMessage").innerText = `${currentDistrictData.district} ke ${currentDistrictData.stops.length} stops load ho gaye.`;
  } catch (err) {
    console.error(err);
    document.getElementById("statusMessage").innerText = "Data load nahi ho paya. File check karein.";
  }
}

// 1. "Kahan Se" Dropdown mein JSON ke sabhi stops bharein
function populateStopsDropdown() {
  const fromSelect = document.getElementById("fromStop");
  fromSelect.innerHTML = '<option value="">Sabhi Boarding Stops</option>';

  if (currentDistrictData && currentDistrictData.stops) {
    currentDistrictData.stops.forEach(stop => {
      const opt = document.createElement("option");
      opt.value = stop;
      opt.innerText = stop;
      fromSelect.appendChild(opt);
    });
  }
}

// 2. "Kahan Tak" Destination dropdown bharein
function populateDestinations() {
  const toSelect = document.getElementById("toStop");
  toSelect.innerHTML = '<option value="">Sabhi Routes Dekhein</option>';

  if (currentDistrictData && currentDistrictData.routes) {
    const destinations = [...new Set(currentDistrictData.routes.map(r => r.to))];
    destinations.forEach(dest => {
      const opt = document.createElement("option");
      opt.value = dest;
      opt.innerText = dest;
      toSelect.appendChild(opt);
    });
  }
}

function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// 3. Search Filter Logic
function renderResults() {
  if (!currentDistrictData) return;

  const fromFilter = document.getElementById("fromStop").value;
  const toFilter = document.getElementById("toStop").value;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let allSlots = [];

  currentDistrictData.routes.forEach(route => {
    // Check karein ki selected 'From' stop route ke 'from' ya 'via' list mein hai ya nahi
    const matchFrom = !fromFilter || route.from === fromFilter || (route.via && route.via.includes(fromFilter));
    const matchTo = !toFilter || route.to === toFilter;

    if (matchFrom && matchTo) {
      route.departures.forEach(time => {
        allSlots.push({
          time,
          minutes: parseTimeToMinutes(time),
          from: route.from,
          to: route.to,
          type: route.type,
          fare: route.fare,
          via: route.via || []
        });
      });
    }
  });

  allSlots.sort((a, b) => a.minutes - b.minutes);

  const upcomingSlots = allSlots.filter(s => s.minutes >= currentMinutes);
  const pastSlots = allSlots.filter(s => s.minutes < currentMinutes);

  const nextWrapper = document.getElementById("nextBusWrapper");
  const upcomingWrapper = document.getElementById("upcomingBusesWrapper");
  const pastList = document.getElementById("pastBusesList");
  const pastWrapper = document.getElementById("pastBusesWrapper");

  nextWrapper.innerHTML = "";
  upcomingWrapper.innerHTML = "";
  pastList.innerHTML = "";

  if (upcomingSlots.length > 0) {
    const nextBus = upcomingSlots[0];
    const diff = nextBus.minutes - currentMinutes;
    nextWrapper.innerHTML = `
      <div class="bus-card next-bus">
        <div class="bus-header">
          <span class="badge-type">${nextBus.type}</span>
          <span class="badge-fare">₹${nextBus.fare}</span>
        </div>
        <div class="bus-time-row">
          <div>
            <div class="time-val">${nextBus.time}</div>
            <div class="station-name">${nextBus.from}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight:700; color:#2563eb;">NEXT BUS</div>
            <div class="station-name">${diff === 0 ? 'Abhi rawana' : diff + ' min me'}</div>
          </div>
        </div>
        <div class="via-text">Via: ${nextBus.via.join(" ➔ ")} ➔ ${nextBus.to}</div>
        <button class="btn-track" onclick="openRouteMap('${nextBus.from}', '${nextBus.to}', ${JSON.stringify(nextBus.via).replace(/"/g, '&quot;')})">🗺️ Route Map & Live GPS</button>
      </div>
    `;

    upcomingSlots.slice(1).forEach(bus => {
      upcomingWrapper.innerHTML += createBusCardHTML(bus);
    });
  } else {
    nextWrapper.innerHTML = `<div class="status-msg">Is stop/route par koi bus nahi mili ya aaj ke liye timing khatam ho gayi hai.</div>`;
  }

  if (pastSlots.length > 0) {
    pastWrapper.classList.remove("hidden");
    pastSlots.forEach(bus => {
      pastList.innerHTML += createBusCardHTML(bus, true);
    });
  } else {
    pastWrapper.classList.add("hidden");
  }

  document.getElementById("statusMessage").innerText = "";
}

function createBusCardHTML(bus, isPast = false) {
  return `
    <div class="bus-card" style="${isPast ? 'opacity: 0.6;' : ''}">
      <div class="bus-header">
        <span class="badge-type">${bus.type}</span>
        <span class="badge-fare">₹${bus.fare}</span>
      </div>
      <div class="bus-time-row">
        <div>
          <div class="time-val">${bus.time}</div>
          <div class="station-name">${bus.from}</div>
        </div>
        <div style="text-align: right;">
          <div class="station-name">${bus.to}</div>
          <div style="font-size:0.75rem; color:#6b7280;">${isPast ? 'Departed' : 'Scheduled'}</div>
        </div>
      </div>
      <div class="via-text">Via: ${bus.via.join(" ➔ ")}</div>
      <button class="btn-track" onclick="openRouteMap('${bus.from}', '${bus.to}', ${JSON.stringify(bus.via).replace(/"/g, '&quot;')})">🗺️ Route Map</button>
    </div>
  `;
}

window.openRouteMap = function(from, to, via) {
  const fullRoute = [from, ...via, to];
  initRouteMap(fullRoute, `${from} ➔ ${to}`);
};

document.getElementById("searchBtn").addEventListener("click", renderResults);

document.getElementById("districtSelect").addEventListener("change", (e) => {
  loadDistrictData(e.target.value);
});

document.getElementById("togglePastBtn").addEventListener("click", () => {
  document.getElementById("pastBusesList").classList.toggle("hidden");
});

// App load hote hi Deoria ke saare stops load honge
loadDistrictData("deoria");
