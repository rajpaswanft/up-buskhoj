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
// =====================================================
// UP BUSKHOJ — MASTER 75 DISTRICTS & TEHSILS DIRECTORY
// =====================================================

const UP_TEHSILS = {
  "Deoria": ["Deoria Sadar", "Salempur", "Rudrapur", "Barhaj", "Bhatpar Rani", "Bhatni", "Gauri Bazar", "Baitalpur", "Tarkulwa", "Rampur Karkhana", "Lar Road", "Khukhundoo", "Mail", "Bhagalpur"],
  "Gorakhpur": ["Gorakhpur Railway Station", "Chauri Chaura", "Sahjanwa", "Campierganj", "Bansgaon", "Khajni", "Gola Bazar", "Barhalganj", "Kauriram", "Pipraich", "Nausad Bus Station", "Mohaddipur"],
  "Kushinagar": ["Padrauna", "Kasya (Kushinagar)", "Hata", "Tamkuhi Raj", "Fazilnagar", "Kaptanganj", "Khadda", "Severahi"],
  "Maharajganj": ["Maharajganj Sadar", "Nautanwa", "Nichlaul", "Pharenda (Anandnagar)", "Siswa Bazar", "Sonauli Border"],
  "Basti": ["Basti Sadar", "Harraiya", "Rudhauli", "Bhanpur", "Babhnan", "Captainganj"],
  "Sant Kabir Nagar": ["Khalilabad", "Mehdawal", "Dhanghata", "Maghar", "Bakhira"],
  "Siddharthnagar": ["Naugarh", "Bansi", "Itwa", "Domariyaganj", "Shohratgarh", "Barhni Border", "Uska Bazar"],
  "Azamgarh": ["Azamgarh Sadar", "Lalganj", "Phoolpur", "Sagri (Jiyanpur)", "Mehnagar", "Burhanpur", "Nizamabad", "Atraulia", "Mubarakpur"],
  "Mau": ["Mau Sadar", "Ghosi", "Muhammadabad Gohna", "Madhuban", "Kopaganj", "Dohrighat"],
  "Ballia": ["Ballia Sadar", "Rasra", "Bairia", "Bansdih", "Belthara Road", "Sikanderpur"],
  "Varanasi": ["Varanasi Cantt ISBT", "Pindra", "Raja Talab", "Kashi Depot", "Golagaddah", "Babatpur"],
  "Ghazipur": ["Ghazipur Sadar", "Mohammadabad", "Zamania", "Saidpur", "Jakhanian", "Sevrai"],
  "Jaunpur": ["Jaunpur Sadar", "Shahganj", "Badlapur", "Machhlishahr", "Mariahu", "Kerakat"],
  "Lucknow": ["Alambagh ISBT", "Charbagh", "Qaiserbagh", "Kamta", "Polytechnic (Awadh)", "Mohanlalganj", "Bakshi Ka Talab", "Malihabad"],
  "Kanpur Nagar": ["Jhakarkati Central", "Chunni Ganj", "Rawatpur", "Bilhaur", "Ghatampur", "Kalyanpur"],
  "Kanpur Dehat": ["Akbarpur", "Bhognipur", "Derapur", "Rasoolabad", "Sikandra", "Maitha"],
  "Ayodhya": ["Ayodhya Dham", "Faizabad Civil Lines", "Rudauli", "Bikapur", "Milkipur", "Sohawal"],
  "Prayagraj": ["Civil Lines", "Zero Road", "Leader Road", "Phulpur", "Soraon", "Handia", "Karchhana", "Meja", "Koraon"],
  "Ambedkar Nagar": ["Akbarpur", "Tanda", "Jalalpur", "Alapur", "Bhiti"],
  "Sultanpur": ["Sultanpur Sadar", "Kadipur", "Jaisinghpur", "Lambhua", "Baldirai"],
  "Amethi": ["Gauriganj", "Amethi", "Musafirkhana", "Tiloi"],
  "Barabanki": ["Nawabganj", "Fatehpur", "Ramsanehighat", "Haidergarh", "Ramnagar"],
  "Gonda": ["Gonda Sadar", "Colonelganj", "Tarabganj", "Mankapur"],
  "Bahraich": ["Bahraich Sadar", "Nanpara", "Mahasi", "Kaiserganj", "Payagpur", "Mihinpurwa"],
  "Shravasti": ["Bhinga", "Ikauna", "Payagpur Road"],
  "Balrampur": ["Balrampur Sadar", "Tulsipur", "Utraula", "Gainsari"],
  "Fatehpur": ["Fatehpur Sadar", "Bindki", "Khaga"],
  "Pratapgarh": ["Pratapgarh Sadar", "Kunda", "Patti", "Raniganj", "Lalganj Ajhara"],
  "Kaushambi": ["Manjhanpur", "Chail", "Sirathu"],
  "Mirzapur": ["Mirzapur Sadar", "Chunar", "Lalganj", "Marihan"],
  "Sonbhadra": ["Robertsganj", "Duddhi", "Ghorawal", "Obra", "Renukoot"],
  "Bhadohi": ["Gyanpur", "Bhadohi", "Aurai"],
  "Agra": ["ISBT Transport Nagar", "Idgah", "Fatehabad", "Kheragarh", "Bah", "Etmadpur", "Kiraoli"],
  "Mathura": ["Mathura Old Stand", "Vrindavan", "Chhata", "Mant", "Goverdhan"],
  "Aligarh": ["Sootmil Stand", "Gandhi Park", "Masoodabad", "Khair", "Atrauli", "Iglas"],
  "Hathras": ["Hathras Sadar", "Sadabad", "Sasni", "Sikandra Rao"],
  "Kasganj": ["Kasganj Sadar", "Patiyali", "Sahawar"],
  "Etah": ["Etah Sadar", "Aliganj", "Jalesar"],
  "Mainpuri": ["Mainpuri Sadar", "Bhongaon", "Karhal", "Kishni", "Kurawali"],
  "Firozabad": ["Firozabad Sadar", "Shikohabad", "Sirsaganj", "Jasrana", "Tundla"],
  "Bareilly": ["Satellite Bus Station", "Old Roadways", "Baheri", "Aonla", "Nawabganj", "Faridpur"],
  "Budaun": ["Budaun Sadar", "Bisauli", "Sahaswan", "Bilsi", "Dataganj"],
  "Pilibhit": ["Pilibhit Sadar", "Bisalpur", "Puranpur", "Barkhera"],
  "Shahjahanpur": ["Shahjahanpur Sadar", "Tilhar", "Jalalabad", "Powayan"],
  "Moradabad": ["Moradabad Main", "Pital Nagri Depot", "Kanth", "Thakurdwara", "Bilari"],
  "Rampur": ["Rampur Sadar", "Bilaspur", "Milak", "Shahabad", "Swar"],
  "Bijnor": ["Bijnor Sadar", "Chandpur", "Dhampur", "Nagina", "Najibabad"],
  "Amroha": ["Amroha Sadar", "Dhanaura", "Hasanpur", "Naugawan Sadat"],
  "Sambhal": ["Sambhal Sadar", "Chandausi", "Gunnaur"],
  "Meerut": ["Bhainsali Stand", "Sohrab Gate", "Mawana", "Sardhana"],
  "Bulandshahr": ["Bulandshahr Sadar", "Khurja", "Sikandrabad", "Siana", "Anupshahr", "Debai"],
  "Ghaziabad": ["Old Bus Stand", "Kaushambi ISBT", "Mohan Nagar", "Modinagar", "Loni"],
  "Hapur": ["Hapur Sadar", "Garhmukteshwar", "Dhaulana"],
  "Gautam Buddha Nagar": ["Noida Sector 37", "Pari Chowk Greater Noida", "Jewar", "Dadri"],
  "Baghpat": ["Baghpat Sadar", "Baraut", "Khekra"],
  "Saharanpur": ["Saharanpur Main", "Deoband", "Nakur", "Behat", "Rampur Maniharan"],
  "Muzaffarnagar": ["Muzaffarnagar Sadar", "Budhana", "Jansath", "Khatauli"],
  "Shamli": ["Shamli Sadar", "Kairana", "Thana Bhawan"],
  "Jhansi": ["Jhansi Main Depot", "Moth", "Mauranipur", "Garautha", "Tahrauli"],
  "Lalitpur": ["Lalitpur Sadar", "Mahroni", "Talbehat", "Madawara"],
  "Jalaun": ["Orai Main Depot", "Jalaun", "Kalpi", "Madhogarh"],
  "Hamirpur": ["Hamirpur Sadar", "Maudaha", "Rath"],
  "Mahoba": ["Mahoba Sadar", "Charkhari", "Kulpahar"],
  "Banda": ["Banda Sadar", "Atarra", "Baberu", "Naraini"],
  "Chitrakoot": ["Karwi (Chitrakoot Dham)", "Mau", "Manikpur", "Rajapur"],
  "Hardoi": ["Hardoi Sadar", "Shahabad", "Bilgram", "Sandi", "Sandila"],
  "Sitapur": ["Sitapur Sadar", "Biswan", "Mahmoodabad", "Sidhauli", "Misrikh"],
  "Lakhimpur Kheri": ["Lakhimpur Sadar", "Gola Gokarannath", "Mohammadi", "Palia Kalan"],
  "Unnao": ["Unnao Sadar", "Safipur", "Purwa", "Bangarmau"],
  "Raebareli": ["Raebareli Sadar", "Lalganj", "Maharajganj", "Unchahar"],
  "Farrukhabad": ["Fatehgarh Depot", "Farrukhabad City", "Kaimganj"],
  "Kannauj": ["Kannauj Sadar", "Chhibramau", "Tirwa"],
  "Etawah": ["Etawah Sadar", "Bharthana", "Jaswantnagar", "Saifai"],
  "Auraiya": ["Auraiya Sadar", "Bidhuna", "Ajitmal"]
};

// Auto-fill all 75
const ALL_75_DISTRICTS = [
  "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh",
  "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti",
  "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah",
  "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur",
  "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur",
  "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar",
  "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura",
  "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
  "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur",
  "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
];

const DISTRICT_STOPS = {};
ALL_75_DISTRICTS.forEach(dist => {
  const tehsils = UP_TEHSILS[dist] || [`${dist} Main Bus Depot`, `${dist} Civil Lines`, `${dist} Kachehri`];
  DISTRICT_STOPS[dist] = [
    `${dist} Main Roadways Stand`,
    ...tehsils.map(t => t.includes("Stand") || t.includes("Station") ? t : `${t} Bus Stand`)
  ];
});

// Primary Real Schedule Data
const MASTER_ROUTES = [
  {
    from: "Deoria Sadar Bus Stand",
    to: "Gorakhpur Railway Station",
    type: "ordinary",
    typeLabel: "Ordinary Non-AC",
    fare: 80,
    duration: "1h 15m",
    durationMins: 75,
    via: ["Baitalpur Bus Stand", "Gauri Bazar Bus Stand", "Chauri Chaura"],
    departures: ["04:30","05:30","06:30","07:30","08:30","09:30","10:30","11:30","12:30","13:30","14:30","15:30","16:30","17:30","18:30","19:30","20:30","21:30","22:30","23:15"]
  },
  {
    from: "Deoria Sadar Bus Stand",
    to: "Salempur Bus Stand",
    type: "ordinary",
    typeLabel: "Local Service",
    fare: 30,
    duration: "45m",
    durationMins: 45,
    via: ["Purva Chauraha", "Khukhundoo Bus Stand"],
    departures: ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00"]
  },
  {
    from: "Gorakhpur Railway Station",
    to: "Deoria Sadar Bus Stand",
    type: "ordinary",
    typeLabel: "Ordinary Non-AC",
    fare: 80,
    duration: "1h 15m",
    durationMins: 75,
    via: ["Chauri Chaura", "Gauri Bazar Bus Stand", "Baitalpur Bus Stand"],
    departures: ["05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:30"]
  },
  {
    from: "Gorakhpur Railway Station",
    to: "Alambagh ISBT",
    type: "ordinary",
    typeLabel: "Express Service",
    fare: 486,
    duration: "6h 00m",
    durationMins: 360,
    via: ["Sahjanwa", "Khalilabad", "Basti Sadar", "Ayodhya Dham"],
    departures: ["05:00","07:00","09:30","12:00","14:30","17:00","19:30","22:00","23:30"]
  }
];

// Elements
const districtSelect = document.getElementById("districtSelect");
const fromStop = document.getElementById("fromStop");
const toStop = document.getElementById("toStop");
const searchBtn = document.getElementById("searchBtn");
const swapBtn = document.getElementById("swapBtn");
const statusMsg = document.getElementById("statusMessage");

// 1. Initialize All 75 Districts
function init75Districts() {
  if (!districtSelect) return;
  districtSelect.innerHTML = "";

  ALL_75_DISTRICTS.sort().forEach(dist => {
    const opt = document.createElement("option");
    opt.value = dist;
    opt.textContent = `${dist} (ज़िला)`;
    districtSelect.appendChild(opt);
  });

  districtSelect.value = "Deoria";
  populateStops("Deoria");
}

// 2. Populate Stops & Tehsils for District
function populateStops(dist) {
  const stops = DISTRICT_STOPS[dist] || [];

  fromStop.innerHTML = '<option value="">-- Boarding Stop Chunein --</option>';
  stops.forEach(st => {
    fromStop.innerHTML += `<option value="${st}">${st}</option>`;
  });

  toStop.innerHTML = '<option value="">-- Destination Chunein --</option>';
  // District stops
  stops.forEach(st => {
    toStop.innerHTML += `<option value="${st}">${st}</option>`;
  });

  // Major connecting UP Depots
  const majorDepots = [
    "Gorakhpur Railway Station",
    "Deoria Sadar Bus Stand",
    "Alambagh ISBT",
    "Varanasi Cantt ISBT",
    "Ayodhya Dham",
    "Civil Lines",
    "Jhakarkati Central"
  ];
  majorDepots.forEach(depot => {
    if (!stops.includes(depot)) {
      toStop.innerHTML += `<option value="${depot}">${depot}</option>`;
    }
  });

  if (stops.length > 0) fromStop.selectedIndex = 1;
  if (toStop.options.length > 2) toStop.selectedIndex = 2;

  if (statusMsg) statusMsg.innerText = `${dist} ke sabhi tehsils aur stands active hain.`;
  renderSchedule();
}

if (districtSelect) {
  districtSelect.addEventListener("change", (e) => {
    populateStops(e.target.value);
  });
}

// Quick Chip Helper
window.setQuickRoute = function(dist, from, to) {
  if (districtSelect) districtSelect.value = dist;
  populateStops(dist);
  setTimeout(() => {
    if (fromStop) fromStop.value = from;
    if (toStop) toStop.value = to;
    renderSchedule();
  }, 50);
};

if (swapBtn) {
  swapBtn.addEventListener("click", () => {
    const temp = fromStop.value;
    fromStop.value = toStop.value;
    toStop.value = temp;
    renderSchedule();
  });
}

// Helpers
function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function calculateArrival(depTime, durMins) {
  const mins = (toMinutes(depTime) + (durMins || 60)) % (24 * 60);
  const h = String(Math.floor(mins / 60)).padStart(2, '0');
  const m = String(mins % 60).padStart(2, '0');
  return `${h}:${m}`;
}

// 3. Render Schedule Logic
function renderSchedule() {
  const fromVal = fromStop.value;
  const toVal = toStop.value;
  const now = new Date();
  const curMin = now.getHours() * 60 + now.getMinutes();

  let matched = [];

  MASTER_ROUTES.forEach(r => {
    const matchFrom = !fromVal || r.from === fromVal || r.via.includes(fromVal);
    const matchTo = !toVal || r.to === toVal;

    if (matchFrom && matchTo) {
      r.departures.forEach(time => {
        matched.push({
          time,
          minutes: toMinutes(time),
          arrivalTime: calculateArrival(time, r.durationMins),
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

  // Agar exact schedule na mile to default frequency generate karein
  if (matched.length === 0 && fromVal && toVal && fromVal !== toVal) {
    const defaultHours = ["06:00", "08:30", "11:00", "13:30", "16:00", "18:30", "21:00"];
    defaultHours.forEach(t => {
      matched.push({
        time: t,
        minutes: toMinutes(t),
        arrivalTime: calculateArrival(t, 90),
        from: fromVal,
        to: toVal,
        type: "ordinary",
        typeLabel: "Regular Service",
        fare: 65,
        duration: "1h 30m",
        via: ["Direct Tehsil Route"]
      });
    });
  }

  matched.sort((a, b) => a.minutes - b.minutes);

  const upcoming = matched.filter(m => m.minutes >= curMin);
  const past = matched.filter(m => m.minutes < curMin);

  const nextBusWrapper = document.getElementById("nextBusWrapper");
  const upcomingWrapper = document.getElementById("upcomingBusesWrapper");
  const pastWrapper = document.getElementById("pastBusesList");
  const togglePastBtn = document.getElementById("togglePastBtn");

  if (nextBusWrapper) nextBusWrapper.innerHTML = "";
  if (upcomingWrapper) upcomingWrapper.innerHTML = "";
  if (pastWrapper) pastWrapper.innerHTML = "";

  if (upcoming.length === 0 && matched.length > 0) {
    const tomorrowFirst = matched[0];
    const diff = (24 * 60 - curMin) + tomorrowFirst.minutes;
    const cardHTML = buildCard(tomorrowFirst, 0, diff, true, false, true);
    if (nextBusWrapper) nextBusWrapper.innerHTML = cardHTML;
  } else if (upcoming.length > 0) {
    const next = upcoming[0];
    const diff = next.minutes - curMin;
    if (nextBusWrapper) nextBusWrapper.innerHTML = buildCard(next, 0, diff, true, false, false);

    upcoming.slice(1).forEach((b, idx) => {
      if (upcomingWrapper) upcomingWrapper.innerHTML += buildCard(b, idx + 1, b.minutes - curMin, false, false, false);
    });
  } else {
    if (nextBusWrapper) nextBusWrapper.innerHTML = `<p class="placeholder-text">Is stand ke liye route chunein.</p>`;
  }

  if (past.length > 0 && pastWrapper) {
    if (togglePastBtn) togglePastBtn.hidden = false;
    past.forEach((b, idx) => {
      pastWrapper.innerHTML += buildCard(b, 100 + idx, 0, false, true, false);
    });
  } else if (togglePastBtn) {
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
          <span class="time arrival-time">${b.arrivalTime}</span>
          <span class="station">${b.to}</span>
        </div>
      </div>

      <div class="via-note">
        <strong>Via:</strong> ${b.via.join(" &bull; ")}
      </div>

      <div class="bus-card-footer">
        <span>UPSRTC Official Service</span>
        <button class="track-btn" onclick="alert('GPS Route: ' + '${b.from} se ${b.to}')">
          Route / Live Track
        </button>
      </div>
    </article>
  `;
}

// Live Clock
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

if (searchBtn) searchBtn.addEventListener("click", renderSchedule);

// Start
init75Districts();

