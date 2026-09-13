const districtSelect = document.getElementById("districtSelect");
const fromStop = document.getElementById("fromStop");
const toStop = document.getElementById("toStop");
const searchBtn = document.getElementById("searchBtn");
const swapBtn = document.getElementById("swapBtn");

// 1. Districts populate karein (75 zila sorted)
function initDistricts() {
  if (!districtSelect || typeof DISTRICT_STOPS === "undefined") return;

  const districtNames = Object.keys(DISTRICT_STOPS).sort();
  districtSelect.innerHTML = "";

  districtNames.forEach(dist => {
    const opt = document.createElement("option");
    opt.value = dist;
    opt.textContent = `${dist} (${dist === "Deoria" ? "देवरिया" : dist === "Gorakhpur" ? "गोरखपुर" : "ज़िला"})`;
    districtSelect.appendChild(opt);
  });

  districtSelect.value = "Deoria";
  updateStopsList("Deoria");
}

// 2. Chune gaye zila ke saare Tehsils aur Stops dropdown mein dalein
function updateStopsList(dist) {
  const stops = DISTRICT_STOPS[dist] || [];

  fromStop.innerHTML = '<option value="">-- Boarding Stop Chunein --</option>';
  stops.forEach(st => {
    fromStop.innerHTML += `<option value="${st}">${st}</option>`;
  });

  toStop.innerHTML = '<option value="">-- Destination Chunein --</option>';
  // Pehle usi zila ke doosre stops (local ke liye)
  stops.forEach(st => {
    toStop.innerHTML += `<option value="${st}">${st}</option>`;
  });

  // Saath hi UP ke major hubs add karein
  const majorHubs = [
    "Gorakhpur Railway Bus Station",
    "Deoria Sadar Bus Station",
    "Alambagh ISBT Lucknow",
    "Varanasi Cantt ISBT",
    "Civil Lines Prayagraj",
    "Jhakarkati Central Kanpur",
    "Ayodhya Dham Bus Station"
  ];
  majorHubs.forEach(hub => {
    toStop.innerHTML += `<option value="${hub}">${hub}</option>`;
  });

  if (stops.length > 0) fromStop.selectedIndex = 1;
  if (toStop.options.length > 2) toStop.selectedIndex = 2;
}

if (districtSelect) {
  districtSelect.addEventListener("change", (e) => {
    updateStopsList(e.target.value);
  });
}

if (swapBtn) {
  swapBtn.addEventListener("click", () => {
    const temp = fromStop.value;
    fromStop.value = toStop.value;
    toStop.value = temp;
  });
}

// 3. Live Clock Ticker
function updateClock() {
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
setInterval(updateClock, 1000);
updateClock();

// Start
initDistricts();
