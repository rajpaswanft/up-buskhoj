// =====================================================
// UP BusKhoj — app.js
// Step 1+2: Time-Aware Schedule System (NEXT BUS,
//   countdowns, past-bus toggle, Load More pagination)
// Step 3: Leaflet Map + Route Polyline + Live GPS Tracker
// Step 4: Statewide 74-district UPSRTC directory +
//   instant autocomplete search across every tehsil/
//   chauraha in UP, plus the named Deoria<->Varanasi
//   special corridors (Salempur-Mau & Rudrapur-Barhalganj)
//   and a completed Lucknow-Kanpur-Agra-Varanasi-Prayagraj
//   trunk mesh.
//
// SCOPE NOTE (read before extending the dataset):
// DISTRICT_DIRECTORY below is exhaustive — every stand,
// depot, and tehsil hub named in the official UP Roadways
// directory PDF, across all 74 districts it lists (the
// source PDF's own table of contents numbers 1-74 as
// districts; entry 75 is a corridor appendix, not a 75th
// district). It powers autocomplete so ANY of those ~1,480
// places is searchable. However, only the ~55 stops in
// STOP_COORDS + BUS_DATA have an actual live timetable,
// fare, and map route — accurate GPS coordinates and
// realistic schedules for all ~1,480 directory entries
// isn't something that can be responsibly fabricated.
// Searching a directory-only stop is valid and shows a
// clear "no live bus yet" message, exactly like a real
// transit app whose network doesn't cover every junction.
//
// Everything is data-driven — no fetch(), no build step.
// Leaflet is loaded via CDN in index.html; this file only
// calls the global `L`.
// =====================================================

// -----------------------------------------------------
// Stop coordinates — every from/to/via_stops value used
// anywhere in BUS_DATA has an entry here. Add a new stop
// to a route below AND to this table together.
// -----------------------------------------------------
const STOP_COORDS = {
  // Purvanchal core (Deoria <-> Gorakhpur corridor)
  "Deoria": [26.5020, 83.7791],
  "Baitalpur": [26.5505, 83.7431],
  "Gauri Bazar": [26.5861, 83.6933],
  "Chauri Chaura": [26.6432, 83.6062],
  "Gorakhpur": [26.7588, 83.3813],
  "Salempur": [26.2833, 83.8667],
  "Bhatni": [26.3833, 83.6833],
  "Hata": [26.7469, 83.7386],
  "Kushinagar": [26.7400, 83.8900],

  // Basti / Ayodhya / Barabanki corridor
  "Khalilabad": [26.7702, 83.0730],
  "Basti": [26.8148, 82.7621],
  "Ayodhya": [26.7922, 82.1998],
  "Barabanki": [26.9269, 81.1897],
  "Rudauli": [26.7500, 81.6333],
  "Gonda": [27.1333, 81.9667],
  "Ambedkar Nagar": [26.4300, 82.5300],

  // Azamgarh / Mau / Ghazipur / Varanasi
  "Azamgarh": [26.0736, 83.1836],
  "Mau": [25.9417, 83.5610],
  "Ghazipur": [25.5833, 83.5833],
  "Varanasi": [25.3176, 82.9739],
  "Ballia": [25.7600, 84.1500],

  // Lucknow hub + Sultanpur / Prayagraj corridor
  "Lucknow": [26.8467, 80.9462],
  "Sultanpur": [26.2648, 82.0722],
  "Pratapgarh": [25.8971, 81.9464],
  "Prayagraj": [25.4358, 81.8463],

  // Lucknow <-> Kanpur corridor
  "Mallawan": [27.0667, 80.1667],
  "Unnao": [26.5464, 80.4879],
  "Purwa": [26.4667, 80.7833],
  "Bilhaur": [26.8667, 80.0333],
  "Kanpur": [26.4499, 80.3319],

  // Prayagraj <-> Lucknow (Fatehpur corridor)
  "Fatehpur": [25.9308, 80.8134],

  // Lucknow <-> Agra corridor
  "Etawah": [26.7751, 79.0230],
  "Agra": [27.1767, 78.0081],

  // Agra <-> Jaipur / Delhi corridor
  "Mathura": [27.4924, 77.6737],
  "Bharatpur": [27.2152, 77.4909],
  "Alwar": [27.5665, 76.6250],
  "Jaipur": [26.9124, 75.7873],
  "Delhi": [28.7041, 77.1025],

  // Noida / Greater Noida city feeder
  "Botanical Garden": [28.5647, 77.3352],
  "Sector 18": [28.5697, 77.3260],
  "Sector 62": [28.6089, 77.3639],
  "Sector 125": [28.5449, 77.3919],
  "Kisan Chowk": [28.4744, 77.5040],
  "Ek Murti Chowk": [28.4595, 77.5031],
  "Jewar Link": [28.1179, 77.5822],
  // Deoria <-> Varanasi special corridors (Salempur-Mau & Rudrapur-Barhalganj)
  "Lar Road": [26.1667, 83.8333],
  "Rudrapur": [26.3333, 83.6167],
  "Gagaha": [26.4500, 83.5667],
  "Barhalganj": [26.4833, 83.5333],
  "Dohrighat": [26.2333, 83.5333],
  "Ghosi": [26.1667, 83.5667],
  "Kopaganj": [26.0000, 83.5667],
  "Mardah": [25.6333, 83.6667],
  "Saidpur": [25.5833, 83.2833],
  "Sarnath": [25.3810, 83.0227],
  "Bhadohi": [25.3968, 82.5687],

};

// -----------------------------------------------------
// DISTRICT_DIRECTORY — every bus stand, depot, tehsil
// hub, and highway chauraha named in the official UP
// Roadways directory PDF, grouped by district. This
// powers state-wide autocomplete search: a person can
// type ANY tehsil or chauraha name from anywhere in UP.
//
// IMPORTANT — directory vs. live schedule, be transparent:
// This directory is comprehensive (searchable), but only
// stops that also appear in STOP_COORDS + BUS_DATA below
// have an actual live timetable and map route. Searching
// a directory-only stop (e.g. a small tehsil chauraha) is
// valid and will show up in the dropdown, but the results
// panel will show "Is route par jald buses add hongi" —
// exactly like a real transport app whose network doesn't
// cover every single junction yet.
//
// NOTE ON COUNT: the source PDF's own table of contents
// numbers 1-74 as districts and reserves entry 75 for a
// "Special Corridor" appendix (Deoria<->Varanasi guide),
// so the directory below has 74 district groups, not 75 —
// carried over faithfully rather than padded to a round
// number.
// -----------------------------------------------------
const DISTRICT_DIRECTORY = {
  "Agra": ["ISBT Agra (Transport Nagar)", "Idgah Bus Stand", "Fort Bus Stand (Bijli Ghar)", "Taj Depot", "Foundry Nagar Depot", "Rambagh Chauraha", "Bhagwan Talkies Chauraha", "Guru Ka Taal Tiraha", "Water Works Chauraha", "Kamla Nagar", "Fatehabad", "Fatehpuri Sikri", "Kheragarh", "Bah", "Pinahat", "Shamsabad", "Jagner", "Achhnera", "Kiraoli", "Saiyan", "Khandauli", "Etmadpur", "Jarar", "Malpura"],
  "Aligarh": ["Sootmil Bus Stand", "Gandhi Park Bus Stand", "Masoodabad Bus Stand", "Old Bus Stand", "Sarsol Chauraha (GT Road)", "Kwarsi Chauraha", "Numaish Ground Tiraha", "Ramghat Road", "Khair", "Atrauli", "Iglas", "Gabhana", "Chharra", "Harduaganj", "Akrabad", "Jawan Sikandarpur", "Madrak", "Somna", "Tappal", "Beswan", "Barla", "Jalali"],
  "Ambedkar Nagar": ["Akbarpur Main Roadways Bus Station", "Shahzadpur Chauraha", "Patel Nagar Tiraha", "Collectorate Chauraha", "Dostpur Road Tiraha", "Malipur Road", "Tanda Bus Station", "Jalalpur", "Alapur (Ramnagar)", "Bhiti", "Katehari", "Baskhari", "Jahangirganj", "Hanswar", "Iltifatganj", "Mahrua", "Mijhaura", "Bewana"],
  "Amethi": ["Gauriganj Bus Station", "Amethi Roadways Bus Stand", "Collectorate Chauraha", "Musafirkhana Bus Station", "Tiloi", "Jagdishpur (NH-56)", "Jamo", "Sangrampur", "Bhetua", "Munshiganj", "Inhauna", "Shukul Bazar", "Semrota", "Shahgarh", "Bhadar", "Ramganj"],
  "Amroha (Jyotiba Phule Nagar)": ["Amroha Roadways Bus Station", "Joya Toll / Bypass Chauraha (NH-9)", "Court / Kachehri Chauraha", "Kotwali Tiraha", "Station Road", "Gajraula Bus Station", "Hasanpur", "Dhanoura (Mandi Dhanaura)", "Naugawan Sadat", "Bachhraon", "Rehra", "Tigri Dham (Ganga Ghat)", "Ujhani Link", "Saidnagli"],
  "Auraiya": ["Auraiya Roadways Bus Station", "Devkali Temple Tiraha", "Mahavir Ganj Chauraha", "NH-19 Bypass Chauraha", "Jalaun Road Tiraha", "Bidhuna Bus Station", "Dibiyapur (GAIL/NTPC)", "Achhalda", "Ajitmal (Babarpar)", "Erwa Katra", "Sahar", "Phaphund", "Bela", "Kudarkot", "Muradganj"],
  "Ayodhya (Faizabad)": ["Ayodhya Dham Bus Station", "Faizabad Main Roadways Bus Stand (Civil Lines)", "Naka Bypass Chauraha (NH-28)", "Devkali Chauraha", "Sahadatganj Tiraha", "Pushpraj Guest House Stop", "Rudauli Bus Station", "Bikapur", "Sohawal", "Milkipur", "Bhadarsa", "Goshainganj", "Kumarganj (ANDUAT Hub)", "Maya Bazar", "Chaure Bazar", "Pura Bazar", "Khandasa", "Ronahi (NH-28)"],
  "Azamgarh": ["Azamgarh Main Roadways Bus Station", "Brahamsthan Chauraha", "Narouli Bus Stand", "Sidhari Tiraha", "Collectorate / Court Chauraha", "Belisa Chauraha", "Phoolpur", "Sagri (Jiyanpur)", "Lalganj", "Mehnagar", "Nizamabad", "Mubarakpur", "Bilariaganj", "Atraulia", "Maharajganj", "Rani Ki Sarai", "Jahanaganj", "Saraimeer", "Thekma", "Bardah", "Tahbarpur"],
  "Baghpat": ["Baghpat Roadways Bus Station", "Delhi-Saharanpur Highway Bypass", "Yamuna Bridge Checkpost", "Collectorate Chauraha", "Vandana Chowk", "Baraut Bus Station", "Khekra", "Chhaprauli", "Binauli", "Aminagar Sarai", "Tikri", "Agarwal Mandi Tatiri", "Doghat", "Rataul", "Kotana", "Khekra Eastern Peripheral Expressway Cut"],
  "Bahraich": ["Bahraich Main Roadways Bus Station (Gonda Road)", "Diggi Chauraha", "Dargah Sharif Tiraha", "Nanpara Bus Stand (City)", "Medical College Chauraha", "Bypass Tiraha (NH-28C/730)", "Nanpara Bus Station", "Rupaidiha (Nepal Border/ICP)", "Jarwal Road", "Kaiserganj", "Mahasi", "Payagpur", "Mihinpurwa (Motipur)", "Fakharpur", "Huzoorpur", "Shivpur", "Visheshwarganj", "Katarniaghat"],
  "Ballia": ["Ballia Main Roadways Bus Station", "Chowk Bus Stand", "Baheri Chauraha", "Kadam Chauraha", "Bhrigu Ashram Tiraha", "Japlinganj Chauraha", "Tikhampur Bypass (NH-31)", "Rasra Bus Station", "Bairia", "Bansdih", "Sikanderpur", "Belthara Road", "Sahatwar", "Maniyar", "Dokati", "Reoti", "Chitbara Gaon", "Haldi", "Narahi (Bihar Border)", "Phephna", "Sukhpura", "Gadwar"],
  "Balrampur": ["Balrampur Main Roadways Bus Station", "Veer Vinay Chauraha", "Bhagwati Ganj Bus Stop", "Collectorate Chauraha", "Tulsipur Road Tiraha", "Bypass Chauraha (NH-730)", "Tulsipur Bus Station", "Utraula", "Gasri", "Pachperwa", "Rehra Bazar", "Maharajganj Tarai", "Shriduttganj", "Harraiya Satgharwa", "Jarwa (Nepal Border)", "Gainsari"],
  "Banda": ["Banda Main Roadways Bus Station", "Babu Lal Chauraha", "Kalwanganj Tiraha", "Chhavani Chauraha", "Aliganj Chauraha", "Kachehri Chauraha", "Banda-Kanpur Bypass (NH-35)", "Atarra Bus Station", "Naraini", "Baberu", "Tindwari", "Bisanda", "Badausa", "Kamasin", "Pailani", "Girwan", "Oran", "Mataundh", "Jaspura", "Kalinjar"],
  "Barabanki": ["Barabanki Roadways Bus Station", "Patel Tiraha", "Chhaya Chauraha", "Begumganj Chauraha", "Rasauli Bypass (NH-28)", "Kachehri Chauraha", "Safedabad Link", "Dewa Sharif", "Haidergarh", "Ramnagar (Lodheshwar Mahadev)", "Fatehpur", "Zaidpur", "Sirauli Gauspur", "Tikaitnagar", "Masauli", "Badosarai", "Suratganj", "Siddhaur", "Harakh", "Kursi", "Satrikh"],
  "Bareilly": ["Old Roadways Bus Stand (Ayub Khan Chauraha)", "Satellite Bus Terminal", "Bareilly Cantt Depot", "Delapeer Chauraha", "Chouki Chauraha", "Kutubkhana", "Koharapeer", "Aonla Bus Station", "Baheri", "Nawabganj", "Faridpur", "Mirganj", "Sirauli", "Fatehganj West", "Fatehganj East", "Shahi", "Shergarh", "Richha", "Bhuta", "Bithri Chainpur", "Kyoladia"],
  "Basti": ["Basti Roadways Bus Station", "Company Bagh Chauraha", "Gandhi Nagar Tiraha", "Fuwara Chauraha", "Patel Chowk", "Kachehri", "Bigraiya Bypass Chauraha (NH-28)", "Harraiya Bus Station", "Bhabhnan", "Rudhauli", "Khalilabad Link", "Vikramjot", "Kaptanganj", "Walterganj", "Saltaua Gopalpur", "Gaur", "Ramnagar", "Mahso", "Dubaulia", "Kalwari", "Chhavani"],
  "Bijnor": ["Bijnor Main Roadways Bus Station", "Numaish Ground Chauraha", "Shakti Chowk", "Kachehri Chauraha", "Jhalu Road Tiraha", "Ganga Barrage Link (NH-34/119)", "Najibabad Bus Station", "Chandpur", "Dhampur", "Nagina", "Kiratpur", "Seohara", "Noorpur", "Nehtaur", "Haldaur", "Afzalgarh", "Mandawar", "Sahanpur", "Sherkot", "Jhalu"],
  "Budaun (Badaun)": ["Budaun Main Roadways Bus Station", "Lalpul Chauraha", "Indra Chowk", "Kachehri Chauraha", "Bareilly Road Tiraha", "Ujhani Road Bypass", "Gandhi Ground Stop", "Ujhani Bus Station", "Sahaswan", "Bilsi", "Dataganj", "Islamnagar", "Wazirganj", "Bisauli", "Kakrala", "Alapur", "Gunnaur Link", "Usawan", "Samrer", "Salarpur", "Zarifnagar"],
  "Bulandshahr": ["Bulandshahr Main Roadways Bus Station", "Bhur Chauraha (Delhi GT Road)", "Kala Aam Chauraha", "Dhirendra Dham Tiraha", "DM Road Chauraha", "Jahangirabad Stand", "Khurja Bus Station", "Siyana", "Shikarpur", "Anupshahr", "Debai", "Jahangirabad", "Gulaothi", "Sikandrabad", "Narora (Atomic Plant)", "Bugrasi", "Pahasu", "Aurangabad", "Kakore", "Khanpur"],
  "Chandauli": ["Chandauli Roadways Bus Station", "Pandit Deen Dayal Upadhyaya Nagar (Mughalsarai) Bus Stand", "Chakia Tiraha", "Kachehri Chauraha", "NH-19 Bypass", "Chakia Bus Station", "Sakaldiha", "Dhanapur", "Saiyadraja (Bihar Border)", "Chandauli Majhwar", "Naugarh", "Baburi", "Chahaniya", "Alinagar", "Niamatabad", "Kamalpur", "Chandhasi"],
  "Chitrakoot": ["Karwi Roadways Bus Station", "Sitapur Bus Stand (Pilgrimage Center)", "Ramghat Auto/Bus Stand", "Shivrampur Tiraha", "Bedi Puliya (NH-35)", "Manikpur Bus Station", "Mau", "Rajapur", "Pahari", "Bharat Koop", "Kamtanath Parikrama Marg", "Gupt Godavari Stop", "Hanumaan Dhara Stop", "Bargarh"],
  "Deoria": ["Deoria Main Roadways Bus Station", "Purva Chauraha", "Bhatwaliya Chauraha (Salempur Exit)", "Kachehri Chauraha", "Sonughat", "SSBL College Tiraha", "Salempur Bus Station", "Bhatpar Rani", "Rudrapur", "Lar Road", "Lar Town", "Barhaj (Saryu-Rapti Sangam)", "Gauri Bazar", "Baitalpur", "Bhaluani", "Rampur Karkhana", "Tarkulwa", "Bankata", "Bhagalpur", "Mail", "Mehrauna"],
  "Etah": ["Etah Main Roadways Bus Station", "Shringarnagar Chauraha", "Aruna Nagar Tiraha", "Shikohabad Road Chauraha", "Kachehri Chauraha", "NH-34 Bypass", "Jalesar Bus Station", "Aliganj", "Kasganj Link", "Nidhauli Kalan", "Awagarh", "Sakit", "Marhara", "Jaithara", "Raja Ka Rampur", "Bagwala", "Mirhachi", "Pilua"],
  "Etawah": ["Etawah Main Roadways Bus Station", "Shastri Chauraha", "Purabia Tola Stand", "Safari Park Link Road", "Kachehri Chauraha", "NH-19 Bypass (Farrukhabad/Agra Cut)", "Saifai Bus Station", "Jaswantnagar", "Bharthana", "Chakarnagar", "Takha", "Bakewar", "Ekdil", "Lakhna (Kalka Devi Temple)", "Basrehar", "Udi Mor (Chambal/MP Border)", "Barhpura"],
  "Farrukhabad": ["Fatehgarh Roadways Bus Station", "Farrukhabad Cantt Bus Stand", "Lal Darwaza Chauraha", "ITI Chauraha", "Kachehri Chauraha", "Kadri Gate Tiraha", "Bholepur", "Kaimganj Bus Station", "Amritpur", "Kampil", "Mohammadabad", "Kamalganj", "Shamsabad", "Nawabganj", "Sankisa", "Rajepur", "Chhibramau Link"],
  "Fatehpur": ["Fatehpur Main Roadways Bus Station", "Jwala Ganj Bus Stand", "ITI Chauraha", "Patel Nagar Chauraha", "Collectorate Chauraha", "NH-19 Bypass Chauraha", "Bindki Bus Station", "Khaga", "Hathgam", "Ghazipur", "Bahuwa", "Haswa", "Asothar", "Dhata", "Airayan", "Malwan", "Amauli", "Jahanabad", "Husainganj", "Bhrigu Dham (Bithoor/Ganga Ghat link)"],
  "Firozabad": ["Firozabad Main Roadways Bus Station", "Subhash Chauraha", "Raja Ka Taal Tiraha", "Suhag Nagar Stop", "Asafabad Chauraha", "NH-19 Bypass", "Shikohabad Bus Station", "Tundla", "Sirsaganj", "Jasrana", "Eka", "Narkhi", "Matsena", "Hathwant", "Madanpur", "Fariha", "Makhanpur", "Urawar"],
  "Gautam Buddha Nagar (Noida / Greater Noida)": ["Sector 35 Morna UPSRTC Depot", "Botanical Garden Metro Bus Hub", "Sector 62 Chauraha", "Pari Chowk Bus Terminal", "Knowledge Park Depot", "Alpha 1 Commercial Belt", "Dadri Bus Station", "Jewar", "Dankaur", "Rabupura", "Bilaspur", "Kasna", "Surajpur", "Greater Noida West (Gaur City Chowk)", "Bhangel", "Salarpur"],
  "Ghaziabad": ["Old Bus Stand Ghaziabad", "Mohan Nagar Bus Terminal", "Anand Vihar Border UP Depot", "Kaushambi ISBT", "Sahibabad Depot", "Loni Road Bus Stand", "Lal Kuan (NH-9/GT Rd)", "Modinagar Bus Station (NH-58)", "Muradnagar", "Loni", "Dasna", "Pilkhuwa Link", "Bhojpur", "Niwari", "Govindpuri", "Crossings Republik Chauraha", "Raj Nagar Extension Tiraha"],
  "Ghazipur": ["Ghazipur Main Roadways Bus Station", "Rauza Bus Stand", "Vishveshwarganj Tiraha", "Lanka Chauraha", "Kachehri Chauraha", "PG College Tiraha", "NH-31 Bypass", "Saidpur (Bhitari) Bus Station", "Mohammadabad", "Zamania", "Jakhanian", "Kasimabad", "Sevrai", "Dildarnagar", "Sadat", "Bahariyabad", "Nandganj", "Birno", "Mardah", "Jangipur", "Reotipur", "Gahmar"],
  "Gonda": ["Gonda Main Roadways Bus Station", "Ambedkar Chauraha", "LBS Chauraha", "Utraula Road Tiraha", "Jhanjhari Block", "Station Road", "Balrampur Road Bypass", "Colonelganj Bus Station", "Tarabganj", "Mankapur", "Karnailganj", "Katra Bazar", "Nawabganj", "Paraspur", "Itiyathok", "Mujehana", "Wazirganj", "Belsar", "Chhapia (Swaminarayan Dham)", "Khargupur"],
  "Gorakhpur": ["Gorakhpur Main Roadways Bus Stand", "Gorakhpur University / Chhatrasangh Chauraha", "Mohaddipur Depot & Chauraha", "Asuran Chowk", "Medical College Road", "Gorakhnath Mandir Tiraha", "Nausad Bus Terminal", "Transport Nagar", "Padri Bazar", "Bargadwa", "Khorabar Bypass", "Jagatbela", "Sahjanwa", "Pipraich", "Campierganj", "Bansgaon", "Khajni", "Gola Bazar", "Barhalganj (Saryu River Hub)", "Chauri Chaura", "Belghat", "Gagaha", "Urwa", "Sikriganj", "Kauri Ram", "Bhathat", "Jungle Kauria"],
  "Hamirpur": ["Hamirpur Main Roadways Bus Station", "Yamuna Bridge Tiraha", "Betwa Ghat Stop", "Kachehri Chauraha", "Degree College Tiraha", "NH-34 Bypass", "Rath Bus Station", "Maudaha", "Sumerpur", "Sarila", "Muskara", "Kurara", "Gohand", "Biwar", "Bewar", "Khanna Link"],
  "Hapur": ["Hapur Main Roadways Bus Station", "Tehsil Chauraha", "Delhi Road Tiraha", "Bulandshahr Road Bypass", "Meerut Road Tiraha", "Babugarh Chauraha (NH-9)", "Garhmukteshwar Bus Station", "Pilkhuwa", "Dhaulana", "Simbhaoli", "Brijghat", "Bahadurgarh", "Hafizpur", "Kuchesar Fort Road"],
  "Hardoi": ["Hardoi Main Roadways Bus Station", "Cinema Chauraha", "Nuamysh Ground", "Railway Ganj Stop", "Circular Road Chauraha", "Lucknow-Shahjahanpur Link", "Sandila Bus Station", "Shahabad", "Bilgram", "Mallawan", "Sandi (Bird Sanctuary)", "Pihani", "Bawan", "Madhoganj", "Sawayajpur", "Bharawan", "Tandiwan", "Beniganj", "Kachhauna", "Harpalpur"],
  "Hathras (Mahamaya Nagar)": ["Hathras Main Roadways Bus Station", "Talab Chauraha", "Agra Road Stand", "Sasni Gate Bus Stop", "Murshan Gate", "Aligarh Road Bypass", "Sadabad Bus Station", "Sasni", "Sikandra Rao", "Sahpau", "Mursan", "Hasayan", "Mendu", "Purdilnagar", "Kachaura", "Jalesar Road"],
  "Jalaun (Orai)": ["Orai Main Roadways Bus Station", "Konch Bus Stand", "Jail Chauraha", "Sushil Nagar Tiraha", "NH-27 Kanpur-Jhansi Highway Bypass", "Jalaun Town Bus Station", "Konch", "Kalpi", "Madhogarh", "Kadaura", "Nadigaon", "Rampura", "Dakor", "Kotra", "Rendhar", "Bangra"],
  "Jaunpur": ["Jaunpur Main Roadways Bus Station (Polytechnic Chauraha)", "Line Bazar Bus Stand", "Olindganj", "Shahi Pul Tiraha", "Kachehri Chauraha", "Jagdishpur Link", "Shahganj Bus Station", "Machhlishahr", "Mariahu", "Kerakat", "Badlapur", "Mungra Badshahpur", "Jalalpur", "Chandwak", "Sujanganj", "Barsathi", "Sikrara", "Baksha", "Dharmapur", "Sirkoni", "Khutahan", "Gaurabadshahpur"],
  "Jhansi": ["Jhansi Main Roadways Bus Station (Elite Chauraha)", "BKD Chauraha", "Sipri Bazar Bus Stand", "Gwalior Road Tiraha", "Medical College Gate", "Kanpur Road Bypass (NH-27)", "Khajuraho Bypass", "Mauranipur Bus Station", "Moth", "Garautha", "Babina", "Chirgaon", "Samthar", "Baragaon", "Gursarai", "Ranipur", "Erich", "Poonch", "Bamaur", "Sakrar", "Raksa (MP Border)"],
  "Kannauj": ["Kannauj Main Roadways Bus Station", "Sarai Meera Bus Stand", "Makrand Nagar Chauraha", "GT Road Bypass", "Kachehri Chauraha", "Chhibramau Bus Station", "Tirwa", "Gursahaiganj", "Saurikh", "Talgram", "Indergarh", "Haseran", "Jalalabad", "Umarda", "Samdhan", "Mirzapur Link"],
  "Kanpur Dehat (Akbarpur-Mati)": ["Mati Collectorate / Administrative HQ Bus Stand", "Akbarpur Old Bus Stand", "Bara Toll Plaza (NH-19)", "Rania Industrial Area Stop", "Rura Bus Station", "Pukhrayan", "Bhognipur", "Derapur", "Rasulabad", "Sikandra", "Jhinjhak", "Amruthpur", "Rajpur", "Sandalpur", "Sarbankhera", "Chaubepur Link", "Malasa"],
  "Kanpur Nagar": ["Jhakarkati Inter-State Bus Terminal", "Chunni Ganj Bus Station", "Rawatpur Bus Station", "Fazalganj Depot", "Azad Nagar Bus Stand", "Vikas Nagar Depot", "Kidwai Nagar", "Barra Bypass", "Ramadevi Chauraha", "Tatmill Chauraha", "Vijay Nagar Chauraha", "Gol Chauraha", "Jarib Chowki", "Kalyanpur", "IIT Kanpur Gate", "Bithoor", "Bilhaur Bus Station", "Ghatampur", "Shivrajpur", "Chaubepur", "Sarsaul", "Maharajpur", "Sachendi", "Narwal", "Bidhnu", "Patara", "Kakwan"],
  "Kasganj (Kanshiram Nagar)": ["Kasganj Main Roadways Bus Station", "Bilram Gate Chauraha", "Soron Gate", "Nadrai Gate Tiraha", "Collectorate Chauraha", "Bareilly-Mathura Highway Link", "Soron Ji", "Patiali", "Sahawar", "Ganjdundwara", "Bilram", "Sidhpura", "Mohanpur", "Amanpur", "Bharghain", "Dholna"],
  "Kaushambi": ["Manjhanpur Bus Station", "Osa Chauraha", "Karari Bus Stand", "Bharwari Bus Stop (GT Road)", "Mooratganj Tiraha (NH-19)", "Sirathu Bus Station", "Chail", "Sarai Akil", "Kada Dham", "Ajhuwa", "Kaushambi Ruins", "Nevada", "Paschim Sharira", "Manjhanpur Bypass"],
  "Lakhimpur Kheri": ["Lakhimpur Main Roadways Bus Station", "Sankata Devi Chauraha", "Melaghat Road", "Collectorate Chauraha", "Rajgarh Tiraha", "Behjam Road", "Gola Gokarannath", "Mohammadi", "Palia Kalan (Dudhwa National Park Hub)", "Nighasan", "Dhaurahra", "Mailani", "Singahi", "Tikonia (Nepal Border)", "Khiri Town", "Phoolbehar", "Isanagar", "Bijua", "Bhejam"],
  "Kushinagar (Padrauna)": ["Padrauna Main Roadways Bus Station", "Kushinagar International Buddhist Pilgrimage Depot", "Kasia Bus Station", "Subhash Chowk", "Chhitanu Chauraha", "Hata Bus Station", "Tamkuhi Raj (NH-28/Bihar Border)", "Kaptanganj", "Khadda", "Severhi", "Fazilnagar", "Ramkola", "Dudhahi", "Sukrauli", "Nebua Naurangia", "Ahirauli Bazar", "Vishunpura", "Turkpatti"],
  "Lalitpur": ["Lalitpur Main UPSRTC Bus Station", "Varni Chauraha", "Tuvan Mandir Chauraha", "Savarkar Chowk", "Collectorate Chauraha", "Nehru Nagar Tiraha", "Jhansi-Sagar Bypass (NH-44)", "Elite Tiraha", "Mehroni", "Talbehat", "Pali", "Madawara", "Bar", "Deogarh", "Banpur", "Birdha", "Jakhaura", "Sojana", "Mata Tila Dam", "Balabehat", "Dhaura"],
  "Lucknow": ["Alambagh Bus Terminal (ISBT)", "Charbagh Bus Station", "Kaiserbagh Bus Station", "Kamta (Awadh) Bus Station", "Dubagga Depot", "Transport Nagar (TP Nagar) Depot", "Gomti Nagar Depot", "Nadarganj Depot", "Polytechnic Chauraha", "Engineering College", "Matiyari", "Ahimamau (Shaheed Path)", "Husariya", "Awadh Chauraha", "Sarojini Nagar", "Chowk/Koneshwar", "Telibagh", "SGPGI Gate", "Hazratganj", "Mohanlalganj", "Malihabad", "Bakshi Ka Talab (BKT)", "Gosainganj", "Nagram", "Itaunja", "Kakori", "Mal", "Banthra", "Nigohan", "Rahimabad"],
  "Maharajganj": ["Maharajganj UPSRTC Bus Station", "Collectorate Chauraha", "Saxena Chauraha", "Dhaneva Dhanei", "Shikarpur Tiraha", "Ballia Nala Tiraha", "Bypass Chauraha", "Sonauli (India-Nepal Border)", "Nautanwa", "Anandnagar (Pharenda)", "Nichlaul", "Siswa Bazar", "Thuthibari (Border)", "Kolhui", "Paniyara", "Ghughli", "Brijmanganj", "Partawal", "Ratanpur", "Bargadwa", "Laxmipur", "Sohagibarwa"],
  "Mahoba": ["Mahoba UPSRTC Bus Station", "Parmanand Chauraha", "Alha Chowk", "Collectorate Chauraha", "Polytechnic Chauraha", "Mahoba Bypass (NH-34/39)", "Keerat Sagar", "Chhatarpur Chungi", "Charkhari", "Kulpahar", "Kabrai", "Khanna", "Panwari", "Belatal (Jaitpur)", "Srinagar", "Mahobkanth", "Ajnar", "Kharela", "Supa", "Gaurhari"],
  "Mainpuri": ["Mainpuri UPSRTC Bus Station", "Bhawat Chauraha", "Karhal Chauraha", "Agra Road Chungi", "Kachehri Chauraha", "Jyoti Tiraha", "Mainpuri Bypass (NH-34)", "Isan River Bridge Tiraha", "Bewar", "Karhal", "Bhogaon", "Kishni", "Kurawali", "Ghiror", "Kusmara", "Barnahal", "Saman Bird Sanctuary Link", "Jagir", "Sultanganj", "Aoncha", "Nabiganj"],
  "Mathura": ["Mathura New Bus Stand (Maholi Road)", "Mathura Old Bus Stand (Deeg Gate)", "Bhuteshwar Tiraha", "Goverdhan Chauraha (NH-19)", "Tank Chauraha", "Masani Tiraha", "Kachehri Chauraha", "Mandi Chauraha", "Vrindavan", "Goverdhan", "Barsana", "Nandgaon", "Chhata", "Kosi Kalan", "Mahavan (Gokul)", "Baldeo (Dauji)", "Mant", "Raya", "Chhatikara", "Chaumuhan", "Saunkh", "Farah", "Bajna", "Nauhjheel", "Shergarh"],
  "Mau": ["Mau UPSRTC Bus Station", "Mirzahadipura Chauraha", "Ghazipur Tiraha", "Ballia Mor", "Collectorate", "Bheeti Chauraha", "Brahmsthan", "Mau Bypass (NH-24/29)", "Ghosi", "Muhammadabad Gohna", "Madhuban", "Dohrighat", "Kopaganj", "Chiraiyakot", "Ranipur", "Amila", "Kurthi Jafarpur", "Pahsa", "Khurhat", "Walidpur", "Ratanpura", "Fatehpur Mandav"],
  "Meerut": ["Bhaisali Bus Terminal", "Sohrab Gate Bus Station", "Meerut Cantt", "Begumpool", "Tejgarhi Chauraha", "Hapur Adda", "Baghpat Adda", "Partapur Bypass", "Commissionary", "Roorkee Road", "Sardhana", "Mawana", "Hastinapur", "Daurala", "Lawar", "Rohta", "Jani", "Kharkhoda", "Kithore", "Parikshitgarh", "Bahsuma", "Phalawda", "Sakoti", "Siwalkhas"],
  "Mirzapur": ["Mirzapur UPSRTC Bus Station", "Vindhyachal Bus Station", "Sankat Mochan Tiraha", "Shastri Bridge Chauraha", "Kachehri", "Baraundha Kachhar", "Dunkinganj", "Natwa Tiraha", "Chunar", "Lalganj (NH-135)", "Marihan", "Ahraura", "Haliya", "Kachhwa Bazar", "Cheelh", "Jigna", "Gaipura", "Pahari", "Seekhar", "Narayanpur", "Rajgarh", "Drummondganj"],
  "Moradabad": ["Moradabad New Roadways Bus Station", "Peetal Nagri Depot (Kanth Road)", "Old Roadways Bus Station", "Kashipur Tiraha (NH-9)", "Gandhi Nagar", "Collectorate", "Dalpatpur Bypass", "Majhola", "Bilari", "Kanth", "Thakurdwara", "Kundarki", "Bhojpur Dharampur", "Mundhapande", "Dilari", "Amroha Mor", "Chhajlet", "Agwanpur", "Sirsi Mor"],
  "Muzaffarnagar": ["Muzaffarnagar Main UPSRTC Bus Station", "Roadways Workshop Depot", "Shiv Chowk", "Meenakshi Chowk", "Mahaveer Chowk", "Bhopa Bus Stand", "Wahlan Bypass (NH-58)", "Rampur Tiraha", "Jansath Tiraha", "Khatauli", "Budhana", "Jansath", "Shukratal", "Miranpur", "Shahpur", "Charthawal", "Purkazi", "Morna", "Rohana Kalan", "Titawi", "Baghra", "Mansurpur"],
  "Pilibhit": ["Pilibhit Main UPSRTC Bus Station", "Station Road", "District Hospital/Kachehri", "Sungadhi Chauraha", "Gajaroula Road Tiraha", "Pilibhit Bypass", "Chhatrapati Shivaji Chowk", "Bisalpur", "Puranpur", "Kalinagar", "Amariya", "Barkhera", "Bilsanda", "Nyoria Husainpur", "Madhotanda", "Ghungchhai", "Deorania Mor", "Tiger Reserve Mor"],
  "Pratapgarh": ["Pratapgarh (Belha) UPSRTC Bus Station", "Ambedkar Chauraha", "Company Bagh", "Bhupiamau Chauraha (NH-31/330)", "Kachehri Chauraha", "Rajapal Chauraha", "Chilbila Tiraha", "Gayatri Nagar", "Kunda", "Lalganj Ajhara", "Patti", "Raniganj", "Baghray", "Babaganj", "Manikpur (Ganga Ghat)", "Heeraganj", "Sangipur", "Kohandaur", "Antu", "Mandhata", "Hathigawan"],
  "Prayagraj": ["Civil Lines Bus Station", "Zero Road Bus Station", "Leader Road Bus Station", "Jhunsi Bus Station", "Naini Depot", "Subhash Chauraha", "Medical College Chauraha", "Daraganj (Sangam)", "Teliyarganj (NH-30/31)", "Phaphamau Tiraha", "Alopibagh", "Leprosy Chauraha", "Andawa (NH-19)", "Nawabganj Bypass", "Chaka Block", "Phulpur (IFFCO)", "Handia", "Koraon", "Meja Road", "Karchhana", "Bara (Jasra)", "Shankargarh", "Lal Gopalganj", "Soraon", "Shringverpur Dham", "Sahson", "Manda", "Ghoorpur"],
  "Raebareli": ["Raebareli UPSRTC Bus Station", "Civil Lines", "Tripula Chauraha (NH-30 Bypass)", "Sultanpur Road Chauraha", "Saras Hotel Tiraha", "Kachehri", "Gora Bazar", "AIIMS Raebareli (Munshiganj)", "Ratapur Chauraha", "Lalganj (MCF Coach Factory)", "Salon", "Unchahar (NTPC)", "Maharajganj", "Tiloi", "Bachhrawan", "Dalmau (Ganga Ghat)", "Munshiganj", "Deeh", "Jagatpur", "Khiro", "Sareni", "Shivgarh", "Gurbakshganj", "Harchandpur"],
  "Rampur": ["Rampur UPSRTC Bus Station", "Gandhi Samadhi Chauraha", "Rampur Bypass (NH-9)", "Ambedkar Park Tiraha", "Collectorate", "Chaku Chauraha", "Hathi Khana", "Rajdwara", "Qila Gate", "Bilaspur (NH-109)", "Milak", "Swar", "Tanda Badli", "Shahbad", "Saifni", "Kemri", "Dadiyal", "Maswasi", "Dhamora", "Azimnagar", "Chamraua", "Patwai"],
  "Saharanpur": ["Saharanpur Main UPSRTC Bus Station", "Depot Workshop (Delhi Road)", "Ghanta Ghar Chauraha", "Court Road", "Hasanpur Chungi", "Delhi Road Bypass", "Chilkana Bus Stand", "Vishwakarma Chowk", "Deoband", "Nakur", "Behat", "Gangoh", "Rampur Maniharan", "Shakumbhari Devi Dham", "Sarsawa (Airport Hub)", "Nanauta", "Titron", "Chilkana", "Gagalheri", "Sadholi Qadeem", "Nagal", "Bargaon"],
  "Sambhal": ["Sambhal UPSRTC Bus Station (Chaudhary Sarai)", "Chandausi UPSRTC Bus Station", "Chaudhary Sarai Chauraha", "Hayat Nagar", "Bahjoi Collectorate Stop", "Moradabad Road Tiraha", "Fawwara Chowk (Chandausi)", "Bahjoi", "Gunnaur", "Babrala (Narora Link)", "Chandausi Bypass", "Sirsi", "Junawai", "Rajpura", "Panwasa", "Asmoli", "Sondhan", "Dhanari", "Kaila Devi Dham"],
  "Sant Kabir Nagar": ["Khalilabad UPSRTC Bus Station (NH-28)", "Mehdawal Bypass Chauraha", "Bardahiya Bazar Tiraha", "Collectorate Chauraha", "Banjariya Chauraha", "Dhanghata Tiraha", "Gola Bazar Mor", "Kante Bypass", "Maghar", "Mehdawal", "Dhanghata", "Bakhira (Bird Sanctuary)", "Haisar Bazar", "Nathnagar (Mahuli)", "Belhar Kalan", "Semariyawan", "Baghauli", "Pauli", "Mukhlispur", "Dharamsinghawa"],
  "Shahjahanpur": ["Shahjahanpur Main UPSRTC Bus Station", "Bareilly Mor (NH-30)", "Roza Junction Tiraha", "Khirni Bagh", "Town Hall", "Kachehri", "Azizganj Bypass", "Govindganj Tiraha", "Tilhar", "Powayan", "Jalalabad", "Miranpur Katra", "Kalan", "Kant", "Khudaganj", "Banda", "Nigohi", "Madnapur", "Khutar", "Jaitipur", "Sindhauli", "Allahganj"],
  "Shamli": ["Shamli Main UPSRTC Bus Station (Karnal Road)", "Old Bus Stand", "Vijay Chowk", "Dhimanpura", "Collectorate", "Karnal Bypass", "Muzaffarnagar Tiraha", "Delhi Road Bypass (NH-709B)", "Kairana", "Oon", "Kandhla", "Thana Bhawan", "Jhinjhana", "Jalalabad", "Babri", "Garhi Pukhta", "Chausana", "Ailum", "Bidoli (Haryana Border)", "Banat"],
  "Shravasti": ["Bhinga UPSRTC Bus Station", "Katra Shravasti", "Ikauna Bus Station (NH-730)", "Bhinga Main Chauraha", "Collectorate Chauraha", "Laxmanpur Tiraha", "Ikauna", "Payagpur Mor", "Sirsiya", "Jamunaha", "Malhipur", "Gilaula", "Sonwa", "Hardattnagar Girant", "Bhagwanpur", "Mishrauliya", "Tendwa", "Babaganj Mor"],
  "Siddharthnagar": ["Siddharthnagar (Naugarh) Main UPSRTC Bus Station", "Uska Bazar Tiraha", "Collectorate Chauraha", "Ambedkar Tiraha", "Sari Tiraha", "Naugarh Bypass", "Kapilvastu Tiraha", "Bansi", "Barhni (Nepal Border/NH-730)", "Domariyaganj", "Itwa", "Shohratgarh", "Kapilvastu", "Uska Bazar", "Khesraha", "Biskohar", "Lotan", "Birdpur", "Bharat Bhari"],
  "Sitapur": ["Sitapur Main UPSRTC Bus Station", "Nepalpur Workshop", "Lalbagh Chauraha", "Collectorate", "Eye Hospital Tiraha", "Sitapur Bypass (NH-30)", "Hardoi Chungi", "Lakhimpur Road", "Naimisharanya (Neemsar Dham)", "Misrikh (Dadhichi Kund)", "Mahmudabad", "Laharpur", "Biswan", "Sidhauli", "Maholi", "Tambaur", "Hargaon", "Khairabad", "Reusa", "Pahala", "Atariya", "Kamlapur"],
  "Sonbhadra": ["Robertsganj UPSRTC Bus Station (Chopan Road)", "Badhauli Chauraha", "Dharamshala Chowk", "Collectorate (Lodhi)", "Hinduari Tiraha", "Robertsganj Bypass (SH-5A)", "Urmaura Tiraha", "Renukoot (Hindalco)", "Shaktinagar (NTPC)", "Anpara", "Obra", "Chopan (Sone River Bridge)", "Ghorawal", "Dudhi", "Beejpur", "Pipri (Rihand Dam)", "Khaliyari", "Myorpur", "Babhani", "Windhamganj", "Dala", "Hathinala"],
  "Sultanpur": ["Sultanpur UPSRTC Bus Station (NH-731)", "Deewani/Collectorate Chauraha", "Payagipur Chauraha", "Golaghat", "Shahganj Chauraha", "Dariyapur", "Ambedkar Chauraha", "Amhat", "Kadipur", "Lambhua", "Jaisinghpur", "Baldirai", "Chanda", "Dostpur", "Kurebhar", "Kudwar", "Haliapur (Purvanchal Expressway Cut)", "Motigarpur", "Katka Khanpur", "Dhanpatganj", "Akhand Nagar"],
  "Unnao": ["Unnao Main UPSRTC Bus Station (NH-27)", "Gandhi Nagar Chauraha", "Hospital Road/Kachehri", "Dahi Chowki", "Unnao Bypass Chauraha", "Awas Vikas Tiraha", "Moti Nagar", "Shuklaganj", "Nawabganj (Bird Sanctuary)", "Safipur", "Bangarmau (Expressway Cut)", "Purwa", "Hasanganj", "Bighapur", "Maurawan", "Miyanganj", "Achalganj", "Auras", "Fatehpur Chaurasi", "Sohramau", "Patan"],
  "Varanasi": ["Varanasi Cantt Bus Station", "Kashi Depot", "Cantt City Bus Terminal", "Chaukaghat Bus Station", "Lahartara Depot", "Golgadda Depot", "Englishia Line", "Sigra", "Rathyatra", "Godowlia", "Chandpur Chauraha", "Rohaniya (NH-19)", "Babatpur Airport Tiraha", "Harhua Chauraha", "Shivpur", "Pandeypur", "Andhrapul", "Mohansarai", "Lanka/BHU Gate", "Ramnagar", "Sarnath", "Pindra", "Rajatalab", "Ramnagar Depot", "Mirzamurad", "Cholapur", "Badagaon", "Sewapuri", "Kapsethi", "Chiraigaon", "Phulpur (Sindhaura)", "Jansa", "Kachhwa Road", "Chaubeypur (Markandey Mahadev)"],
};

const BUS_DATA = [
  { bus_id: "DEO-GOR-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "04:30 AM", arrival_time: "05:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "04:45 AM", arrival_time: "06:00 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:05 AM", arrival_time: "06:20 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:20 AM", arrival_time: "06:35 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:40 AM", arrival_time: "06:55 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:55 AM", arrival_time: "07:10 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:15 AM", arrival_time: "07:30 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:30 AM", arrival_time: "07:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:50 AM", arrival_time: "08:05 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:05 AM", arrival_time: "08:20 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:25 AM", arrival_time: "08:40 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:40 AM", arrival_time: "08:55 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:00 AM", arrival_time: "09:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:15 AM", arrival_time: "09:30 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:35 AM", arrival_time: "09:50 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-016", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:50 AM", arrival_time: "10:05 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-017", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:10 AM", arrival_time: "10:25 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-018", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:25 AM", arrival_time: "10:40 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-019", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:45 AM", arrival_time: "11:00 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-020", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:00 AM", arrival_time: "11:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-021", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:20 AM", arrival_time: "11:35 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-022", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:35 AM", arrival_time: "11:50 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-023", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:55 AM", arrival_time: "12:10 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-024", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "11:10 AM", arrival_time: "12:25 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-025", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "11:30 AM", arrival_time: "12:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-026", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "11:45 AM", arrival_time: "01:00 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-027", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "12:05 PM", arrival_time: "01:20 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-028", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "12:20 PM", arrival_time: "01:35 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-029", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "12:40 PM", arrival_time: "01:55 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-030", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "12:55 PM", arrival_time: "02:10 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-031", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "01:15 PM", arrival_time: "02:30 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-032", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "01:30 PM", arrival_time: "02:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-033", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "01:50 PM", arrival_time: "03:05 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-034", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "02:05 PM", arrival_time: "03:20 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-035", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "02:25 PM", arrival_time: "03:40 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-036", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "02:40 PM", arrival_time: "03:55 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-037", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "03:00 PM", arrival_time: "04:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-038", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "03:15 PM", arrival_time: "04:30 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-039", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "03:35 PM", arrival_time: "04:50 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-040", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "03:50 PM", arrival_time: "05:05 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-041", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "04:10 PM", arrival_time: "05:25 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-042", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "04:25 PM", arrival_time: "05:40 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-043", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "04:45 PM", arrival_time: "06:00 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-044", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:00 PM", arrival_time: "06:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-045", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:20 PM", arrival_time: "06:35 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-046", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:35 PM", arrival_time: "06:50 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-047", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:55 PM", arrival_time: "07:10 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-048", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:10 PM", arrival_time: "07:25 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-049", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:30 PM", arrival_time: "07:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-050", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:45 PM", arrival_time: "08:00 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-051", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:05 PM", arrival_time: "08:20 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-052", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:20 PM", arrival_time: "08:35 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-053", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:40 PM", arrival_time: "08:55 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-054", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:55 PM", arrival_time: "09:10 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-055", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:15 PM", arrival_time: "09:30 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-056", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:30 PM", arrival_time: "09:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-057", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:50 PM", arrival_time: "10:05 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-058", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:05 PM", arrival_time: "10:20 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-059", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:25 PM", arrival_time: "10:40 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-060", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:40 PM", arrival_time: "10:55 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-061", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:00 PM", arrival_time: "11:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-ORD-062", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:15 PM", arrival_time: "11:30 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "DEO-GOR-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:00 AM", arrival_time: "07:05 AM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:00 AM", arrival_time: "09:05 AM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "11:30 AM", arrival_time: "12:35 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-004", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "02:30 PM", arrival_time: "03:35 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-005", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:00 PM", arrival_time: "06:05 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-006", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:35 PM", arrival_time: "08:40 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-007", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:30 PM", arrival_time: "10:35 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "GOR-DEO-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "04:30 AM", arrival_time: "05:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "04:45 AM", arrival_time: "06:00 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:05 AM", arrival_time: "06:20 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:20 AM", arrival_time: "06:35 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:40 AM", arrival_time: "06:55 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:55 AM", arrival_time: "07:10 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:15 AM", arrival_time: "07:30 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:30 AM", arrival_time: "07:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:50 AM", arrival_time: "08:05 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:05 AM", arrival_time: "08:20 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:25 AM", arrival_time: "08:40 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:40 AM", arrival_time: "08:55 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:00 AM", arrival_time: "09:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:15 AM", arrival_time: "09:30 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:35 AM", arrival_time: "09:50 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-016", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:50 AM", arrival_time: "10:05 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-017", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:10 AM", arrival_time: "10:25 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-018", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:25 AM", arrival_time: "10:40 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-019", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:45 AM", arrival_time: "11:00 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-020", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:00 AM", arrival_time: "11:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-021", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:20 AM", arrival_time: "11:35 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-022", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:35 AM", arrival_time: "11:50 AM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-023", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:55 AM", arrival_time: "12:10 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-024", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "11:10 AM", arrival_time: "12:25 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-025", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "11:30 AM", arrival_time: "12:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-026", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "11:45 AM", arrival_time: "01:00 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-027", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "12:05 PM", arrival_time: "01:20 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-028", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "12:20 PM", arrival_time: "01:35 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-029", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "12:40 PM", arrival_time: "01:55 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-030", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "12:55 PM", arrival_time: "02:10 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-031", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "01:15 PM", arrival_time: "02:30 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-032", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "01:30 PM", arrival_time: "02:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-033", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "01:50 PM", arrival_time: "03:05 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-034", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "02:05 PM", arrival_time: "03:20 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-035", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "02:25 PM", arrival_time: "03:40 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-036", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "02:40 PM", arrival_time: "03:55 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-037", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "03:00 PM", arrival_time: "04:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-038", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "03:15 PM", arrival_time: "04:30 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-039", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "03:35 PM", arrival_time: "04:50 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-040", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "03:50 PM", arrival_time: "05:05 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-041", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "04:10 PM", arrival_time: "05:25 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-042", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "04:25 PM", arrival_time: "05:40 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-043", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "04:45 PM", arrival_time: "06:00 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-044", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:00 PM", arrival_time: "06:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-045", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:20 PM", arrival_time: "06:35 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-046", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:35 PM", arrival_time: "06:50 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-047", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:55 PM", arrival_time: "07:10 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-048", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:10 PM", arrival_time: "07:25 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-049", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:30 PM", arrival_time: "07:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-050", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:45 PM", arrival_time: "08:00 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-051", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:05 PM", arrival_time: "08:20 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-052", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:20 PM", arrival_time: "08:35 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-053", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:40 PM", arrival_time: "08:55 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-054", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:55 PM", arrival_time: "09:10 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-055", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:15 PM", arrival_time: "09:30 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-056", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:30 PM", arrival_time: "09:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-057", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:50 PM", arrival_time: "10:05 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-058", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:05 PM", arrival_time: "10:20 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-059", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:25 PM", arrival_time: "10:40 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-060", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:40 PM", arrival_time: "10:55 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-061", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:00 PM", arrival_time: "11:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-ORD-062", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:15 PM", arrival_time: "11:30 PM", duration: "1h 15m", fare: 80, frequency: "Har 15-20 minute par" },
  { bus_id: "GOR-DEO-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:00 AM", arrival_time: "07:05 AM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:00 AM", arrival_time: "09:05 AM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "11:30 AM", arrival_time: "12:35 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-004", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "02:30 PM", arrival_time: "03:35 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-005", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:00 PM", arrival_time: "06:05 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-006", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:35 PM", arrival_time: "08:40 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-007", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:30 PM", arrival_time: "10:35 PM", duration: "1h 5m", fare: 115, frequency: "7 fixed AC trips daily" },
  { bus_id: "SLP-GOR-ORD-001", bus_name: "Salempur Depot Bus", bus_type: "Ordinary", from: "Salempur", to: "Gorakhpur", via_stops: ["Deoria", "Chauri Chaura"], departure_time: "05:15 AM", arrival_time: "06:50 AM", duration: "1h 35m", fare: 95, frequency: "Din mein 3 trips (Salempur Depot)" },
  { bus_id: "SLP-GOR-ORD-002", bus_name: "Salempur Depot Bus", bus_type: "Ordinary", from: "Salempur", to: "Gorakhpur", via_stops: ["Deoria", "Chauri Chaura"], departure_time: "10:15 AM", arrival_time: "11:50 AM", duration: "1h 35m", fare: 95, frequency: "Din mein 3 trips (Salempur Depot)" },
  { bus_id: "SLP-GOR-ORD-003", bus_name: "Salempur Depot Bus", bus_type: "Ordinary", from: "Salempur", to: "Gorakhpur", via_stops: ["Deoria", "Chauri Chaura"], departure_time: "04:15 PM", arrival_time: "05:50 PM", duration: "1h 35m", fare: 95, frequency: "Din mein 3 trips (Salempur Depot)" },
  { bus_id: "BHT-GOR-ORD-001", bus_name: "Bhatni-Gorakhpur Via Deoria", bus_type: "Ordinary", from: "Bhatni", to: "Gorakhpur", via_stops: ["Deoria", "Chauri Chaura"], departure_time: "06:45 AM", arrival_time: "08:25 AM", duration: "1h 40m", fare: 100, frequency: "Din mein 3 trips" },
  { bus_id: "BHT-GOR-ORD-002", bus_name: "Bhatni-Gorakhpur Via Deoria", bus_type: "Ordinary", from: "Bhatni", to: "Gorakhpur", via_stops: ["Deoria", "Chauri Chaura"], departure_time: "01:15 PM", arrival_time: "02:55 PM", duration: "1h 40m", fare: 100, frequency: "Din mein 3 trips" },
  { bus_id: "BHT-GOR-ORD-003", bus_name: "Bhatni-Gorakhpur Via Deoria", bus_type: "Ordinary", from: "Bhatni", to: "Gorakhpur", via_stops: ["Deoria", "Chauri Chaura"], departure_time: "06:45 PM", arrival_time: "08:25 PM", duration: "1h 40m", fare: 100, frequency: "Din mein 3 trips" },
  { bus_id: "GOR-SLP-ORD-001", bus_name: "Salempur Depot Bus", bus_type: "Ordinary", from: "Gorakhpur", to: "Salempur", via_stops: ["Chauri Chaura", "Deoria"], departure_time: "07:15 AM", arrival_time: "08:50 AM", duration: "1h 35m", fare: 95, frequency: "Din mein 3 trips (Salempur Depot)" },
  { bus_id: "GOR-SLP-ORD-002", bus_name: "Salempur Depot Bus", bus_type: "Ordinary", from: "Gorakhpur", to: "Salempur", via_stops: ["Chauri Chaura", "Deoria"], departure_time: "12:15 PM", arrival_time: "01:50 PM", duration: "1h 35m", fare: 95, frequency: "Din mein 3 trips (Salempur Depot)" },
  { bus_id: "GOR-SLP-ORD-003", bus_name: "Salempur Depot Bus", bus_type: "Ordinary", from: "Gorakhpur", to: "Salempur", via_stops: ["Chauri Chaura", "Deoria"], departure_time: "05:15 PM", arrival_time: "06:50 PM", duration: "1h 35m", fare: 95, frequency: "Din mein 3 trips (Salempur Depot)" },
  { bus_id: "GOR-BHT-ORD-001", bus_name: "Bhatni-Gorakhpur Via Deoria", bus_type: "Ordinary", from: "Gorakhpur", to: "Bhatni", via_stops: ["Chauri Chaura", "Deoria"], departure_time: "08:15 AM", arrival_time: "09:55 AM", duration: "1h 40m", fare: 100, frequency: "Din mein 3 trips" },
  { bus_id: "GOR-BHT-ORD-002", bus_name: "Bhatni-Gorakhpur Via Deoria", bus_type: "Ordinary", from: "Gorakhpur", to: "Bhatni", via_stops: ["Chauri Chaura", "Deoria"], departure_time: "02:45 PM", arrival_time: "04:25 PM", duration: "1h 40m", fare: 100, frequency: "Din mein 3 trips" },
  { bus_id: "GOR-BHT-ORD-003", bus_name: "Bhatni-Gorakhpur Via Deoria", bus_type: "Ordinary", from: "Gorakhpur", to: "Bhatni", via_stops: ["Chauri Chaura", "Deoria"], departure_time: "08:15 PM", arrival_time: "09:55 PM", duration: "1h 40m", fare: 100, frequency: "Din mein 3 trips" },
  { bus_id: "GOR-LKO-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "05:00 AM", arrival_time: "10:30 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "05:30 AM", arrival_time: "11:00 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "06:15 AM", arrival_time: "11:45 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "06:45 AM", arrival_time: "11:45 AM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "07:30 AM", arrival_time: "01:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "08:00 AM", arrival_time: "01:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "08:45 AM", arrival_time: "02:15 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "09:15 AM", arrival_time: "02:15 PM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "10:00 AM", arrival_time: "03:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "10:30 AM", arrival_time: "04:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "11:15 AM", arrival_time: "04:45 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "11:45 AM", arrival_time: "04:45 PM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "12:30 PM", arrival_time: "06:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "01:00 PM", arrival_time: "06:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "01:45 PM", arrival_time: "07:15 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-JAN-004", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "02:15 PM", arrival_time: "07:15 PM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "03:00 PM", arrival_time: "08:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "03:30 PM", arrival_time: "09:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "04:15 PM", arrival_time: "09:45 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-JAN-005", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "04:45 PM", arrival_time: "09:45 PM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-016", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "05:30 PM", arrival_time: "11:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-017", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "06:00 PM", arrival_time: "11:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-018", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "06:45 PM", arrival_time: "12:15 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-JAN-006", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "07:15 PM", arrival_time: "12:15 AM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-019", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "08:00 PM", arrival_time: "01:30 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-020", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "08:30 PM", arrival_time: "02:00 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-ORD-021", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "09:15 PM", arrival_time: "02:45 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-LKO-JAN-007", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "09:45 PM", arrival_time: "02:45 AM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "05:00 AM", arrival_time: "10:30 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "05:30 AM", arrival_time: "11:00 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "06:15 AM", arrival_time: "11:45 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "06:45 AM", arrival_time: "11:45 AM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "07:30 AM", arrival_time: "01:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "08:00 AM", arrival_time: "01:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "08:45 AM", arrival_time: "02:15 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "09:15 AM", arrival_time: "02:15 PM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "10:00 AM", arrival_time: "03:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "10:30 AM", arrival_time: "04:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "11:15 AM", arrival_time: "04:45 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "11:45 AM", arrival_time: "04:45 PM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "12:30 PM", arrival_time: "06:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "01:00 PM", arrival_time: "06:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "01:45 PM", arrival_time: "07:15 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-JAN-004", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "02:15 PM", arrival_time: "07:15 PM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "03:00 PM", arrival_time: "08:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "03:30 PM", arrival_time: "09:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "04:15 PM", arrival_time: "09:45 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-JAN-005", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "04:45 PM", arrival_time: "09:45 PM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-016", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "05:30 PM", arrival_time: "11:00 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-017", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "06:00 PM", arrival_time: "11:30 PM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-018", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "06:45 PM", arrival_time: "12:15 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-JAN-006", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "07:15 PM", arrival_time: "12:15 AM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-019", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "08:00 PM", arrival_time: "01:30 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-020", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "08:30 PM", arrival_time: "02:00 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-ORD-021", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "09:15 PM", arrival_time: "02:45 AM", duration: "5h 30m", fare: 486, frequency: "Har 30-45 minute par" },
  { bus_id: "LKO-GOR-JAN-007", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "09:45 PM", arrival_time: "02:45 AM", duration: "5h", fare: 608, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-KSN-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "05:30 AM", arrival_time: "06:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "05:50 AM", arrival_time: "07:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "06:10 AM", arrival_time: "07:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "06:30 AM", arrival_time: "07:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "06:50 AM", arrival_time: "08:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "07:10 AM", arrival_time: "08:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "07:30 AM", arrival_time: "08:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "07:50 AM", arrival_time: "09:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "08:10 AM", arrival_time: "09:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "08:30 AM", arrival_time: "09:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "08:50 AM", arrival_time: "10:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "09:10 AM", arrival_time: "10:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "09:30 AM", arrival_time: "10:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "09:50 AM", arrival_time: "11:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "10:10 AM", arrival_time: "11:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-016", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "10:30 AM", arrival_time: "11:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-017", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "10:50 AM", arrival_time: "12:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-018", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "11:10 AM", arrival_time: "12:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-019", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "11:30 AM", arrival_time: "12:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-020", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "11:50 AM", arrival_time: "01:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-021", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "12:10 PM", arrival_time: "01:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-022", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "12:30 PM", arrival_time: "01:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-023", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "12:50 PM", arrival_time: "02:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-024", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "01:10 PM", arrival_time: "02:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-025", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "01:30 PM", arrival_time: "02:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-026", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "01:50 PM", arrival_time: "03:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-027", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "02:10 PM", arrival_time: "03:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-028", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "02:30 PM", arrival_time: "03:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-029", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "02:50 PM", arrival_time: "04:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-030", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "03:10 PM", arrival_time: "04:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-031", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "03:30 PM", arrival_time: "04:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-032", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "03:50 PM", arrival_time: "05:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-033", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "04:10 PM", arrival_time: "05:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-034", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "04:30 PM", arrival_time: "05:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-035", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "04:50 PM", arrival_time: "06:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-036", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "05:10 PM", arrival_time: "06:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-037", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "05:30 PM", arrival_time: "06:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-038", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "05:50 PM", arrival_time: "07:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-039", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "06:10 PM", arrival_time: "07:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-040", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "06:30 PM", arrival_time: "07:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-041", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "06:50 PM", arrival_time: "08:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-042", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "07:10 PM", arrival_time: "08:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-043", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "07:30 PM", arrival_time: "08:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-044", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "07:50 PM", arrival_time: "09:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-045", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "08:10 PM", arrival_time: "09:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-046", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "08:30 PM", arrival_time: "09:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-047", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "08:50 PM", arrival_time: "10:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-048", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "09:10 PM", arrival_time: "10:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "GOR-KSN-ORD-049", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "09:30 PM", arrival_time: "10:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "05:30 AM", arrival_time: "06:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "05:50 AM", arrival_time: "07:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "06:10 AM", arrival_time: "07:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "06:30 AM", arrival_time: "07:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "06:50 AM", arrival_time: "08:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "07:10 AM", arrival_time: "08:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "07:30 AM", arrival_time: "08:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "07:50 AM", arrival_time: "09:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "08:10 AM", arrival_time: "09:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "08:30 AM", arrival_time: "09:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "08:50 AM", arrival_time: "10:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "09:10 AM", arrival_time: "10:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "09:30 AM", arrival_time: "10:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "09:50 AM", arrival_time: "11:10 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "10:10 AM", arrival_time: "11:30 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-016", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "10:30 AM", arrival_time: "11:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-017", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "10:50 AM", arrival_time: "12:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-018", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "11:10 AM", arrival_time: "12:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-019", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "11:30 AM", arrival_time: "12:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-020", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "11:50 AM", arrival_time: "01:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-021", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "12:10 PM", arrival_time: "01:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-022", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "12:30 PM", arrival_time: "01:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-023", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "12:50 PM", arrival_time: "02:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-024", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "01:10 PM", arrival_time: "02:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-025", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "01:30 PM", arrival_time: "02:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-026", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "01:50 PM", arrival_time: "03:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-027", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "02:10 PM", arrival_time: "03:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-028", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "02:30 PM", arrival_time: "03:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-029", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "02:50 PM", arrival_time: "04:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-030", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "03:10 PM", arrival_time: "04:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-031", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "03:30 PM", arrival_time: "04:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-032", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "03:50 PM", arrival_time: "05:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-033", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "04:10 PM", arrival_time: "05:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-034", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "04:30 PM", arrival_time: "05:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-035", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "04:50 PM", arrival_time: "06:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-036", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "05:10 PM", arrival_time: "06:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-037", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "05:30 PM", arrival_time: "06:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-038", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "05:50 PM", arrival_time: "07:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-039", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "06:10 PM", arrival_time: "07:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-040", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "06:30 PM", arrival_time: "07:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-041", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "06:50 PM", arrival_time: "08:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-042", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "07:10 PM", arrival_time: "08:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-043", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "07:30 PM", arrival_time: "08:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-044", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "07:50 PM", arrival_time: "09:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-045", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "08:10 PM", arrival_time: "09:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-046", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "08:30 PM", arrival_time: "09:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-047", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "08:50 PM", arrival_time: "10:10 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-048", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "09:10 PM", arrival_time: "10:30 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "KSN-GOR-ORD-049", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "09:30 PM", arrival_time: "10:50 PM", duration: "1h 20m", fare: 60, frequency: "Har 20 minute par" },
  { bus_id: "DEO-VNS-SLM-001", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "05:15 AM", arrival_time: "10:00 AM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-SLM-002", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "07:45 AM", arrival_time: "12:30 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-SLM-003", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "10:15 AM", arrival_time: "03:00 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-SLM-004", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "01:00 PM", arrival_time: "05:45 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-SLM-005", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "04:00 PM", arrival_time: "08:45 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-SLM-006", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "07:00 PM", arrival_time: "11:45 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-SLM-007", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "09:30 PM", arrival_time: "02:15 AM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-SLMJ-001", bus_name: "Janrath 2x2 AC (Salempur-Mau Corridor)", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "06:30 AM", arrival_time: "10:45 AM", duration: "4h 15m", fare: 260, frequency: "Din mein 2 AC trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-SLMJ-002", bus_name: "Janrath 2x2 AC (Salempur-Mau Corridor)", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Lar Road", "Dohrighat", "Ghosi", "Kopaganj", "Mau", "Mardah", "Saidpur", "Sarnath"], departure_time: "02:30 PM", arrival_time: "06:45 PM", duration: "4h 15m", fare: 260, frequency: "Din mein 2 AC trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLM-001", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "05:15 AM", arrival_time: "10:00 AM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLM-002", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "07:45 AM", arrival_time: "12:30 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLM-003", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "10:15 AM", arrival_time: "03:00 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLM-004", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "01:00 PM", arrival_time: "05:45 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLM-005", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "04:00 PM", arrival_time: "08:45 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLM-006", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "07:00 PM", arrival_time: "11:45 PM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLM-007", bus_name: "UPSRTC Sadharan (Salempur-Mau Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "09:30 PM", arrival_time: "02:15 AM", duration: "4h 45m", fare: 230, frequency: "Din mein 7 trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLMJ-001", bus_name: "Janrath 2x2 AC (Salempur-Mau Corridor)", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "07:30 AM", arrival_time: "11:45 AM", duration: "4h 15m", fare: 260, frequency: "Din mein 2 AC trips (Via Salempur/Mau)" },
  { bus_id: "VNS-DEO-SLMJ-002", bus_name: "Janrath 2x2 AC (Salempur-Mau Corridor)", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Sarnath", "Saidpur", "Mardah", "Mau", "Kopaganj", "Ghosi", "Dohrighat", "Lar Road", "Salempur"], departure_time: "03:30 PM", arrival_time: "07:45 PM", duration: "4h 15m", fare: 260, frequency: "Din mein 2 AC trips (Via Salempur/Mau)" },
  { bus_id: "DEO-VNS-RDB-001", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Rudrapur", "Gagaha", "Barhalganj", "Dohrighat", "Mau"], departure_time: "06:00 AM", arrival_time: "10:15 AM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "DEO-VNS-RDB-002", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Rudrapur", "Gagaha", "Barhalganj", "Dohrighat", "Mau"], departure_time: "09:00 AM", arrival_time: "01:15 PM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "DEO-VNS-RDB-003", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Rudrapur", "Gagaha", "Barhalganj", "Dohrighat", "Mau"], departure_time: "12:00 PM", arrival_time: "04:15 PM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "DEO-VNS-RDB-004", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Rudrapur", "Gagaha", "Barhalganj", "Dohrighat", "Mau"], departure_time: "03:00 PM", arrival_time: "07:15 PM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "DEO-VNS-RDB-005", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Rudrapur", "Gagaha", "Barhalganj", "Dohrighat", "Mau"], departure_time: "06:00 PM", arrival_time: "10:15 PM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "DEO-VNS-RDB-006", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Rudrapur", "Gagaha", "Barhalganj", "Dohrighat", "Mau"], departure_time: "08:30 PM", arrival_time: "12:45 AM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "VNS-DEO-RDB-001", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Mau", "Dohrighat", "Barhalganj", "Gagaha", "Rudrapur"], departure_time: "06:00 AM", arrival_time: "10:15 AM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "VNS-DEO-RDB-002", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Mau", "Dohrighat", "Barhalganj", "Gagaha", "Rudrapur"], departure_time: "09:00 AM", arrival_time: "01:15 PM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "VNS-DEO-RDB-003", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Mau", "Dohrighat", "Barhalganj", "Gagaha", "Rudrapur"], departure_time: "12:00 PM", arrival_time: "04:15 PM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "VNS-DEO-RDB-004", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Mau", "Dohrighat", "Barhalganj", "Gagaha", "Rudrapur"], departure_time: "03:00 PM", arrival_time: "07:15 PM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "VNS-DEO-RDB-005", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Mau", "Dohrighat", "Barhalganj", "Gagaha", "Rudrapur"], departure_time: "06:00 PM", arrival_time: "10:15 PM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "VNS-DEO-RDB-006", bus_name: "UPSRTC Sadharan (Rudrapur-Barhalganj Corridor)", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Mau", "Dohrighat", "Barhalganj", "Gagaha", "Rudrapur"], departure_time: "08:30 PM", arrival_time: "12:45 AM", duration: "4h 15m", fare: 210, frequency: "Din mein 6 trips (Via Rudrapur/Barhalganj)" },
  { bus_id: "VNS-PRG-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Prayagraj", via_stops: ["Bhadohi"], departure_time: "05:30 AM", arrival_time: "07:45 AM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "VNS-PRG-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Prayagraj", via_stops: ["Bhadohi"], departure_time: "08:00 AM", arrival_time: "10:15 AM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "VNS-PRG-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Prayagraj", via_stops: ["Bhadohi"], departure_time: "10:30 AM", arrival_time: "12:45 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "VNS-PRG-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Prayagraj", via_stops: ["Bhadohi"], departure_time: "01:00 PM", arrival_time: "03:15 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "VNS-PRG-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Prayagraj", via_stops: ["Bhadohi"], departure_time: "03:30 PM", arrival_time: "05:45 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "VNS-PRG-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Prayagraj", via_stops: ["Bhadohi"], departure_time: "06:00 PM", arrival_time: "08:15 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "VNS-PRG-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Prayagraj", via_stops: ["Bhadohi"], departure_time: "08:30 PM", arrival_time: "10:45 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "PRG-VNS-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Varanasi", via_stops: ["Bhadohi"], departure_time: "05:30 AM", arrival_time: "07:45 AM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "PRG-VNS-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Varanasi", via_stops: ["Bhadohi"], departure_time: "08:00 AM", arrival_time: "10:15 AM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "PRG-VNS-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Varanasi", via_stops: ["Bhadohi"], departure_time: "10:30 AM", arrival_time: "12:45 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "PRG-VNS-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Varanasi", via_stops: ["Bhadohi"], departure_time: "01:00 PM", arrival_time: "03:15 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "PRG-VNS-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Varanasi", via_stops: ["Bhadohi"], departure_time: "03:30 PM", arrival_time: "05:45 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "PRG-VNS-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Varanasi", via_stops: ["Bhadohi"], departure_time: "06:00 PM", arrival_time: "08:15 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "PRG-VNS-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Varanasi", via_stops: ["Bhadohi"], departure_time: "08:30 PM", arrival_time: "10:45 PM", duration: "2h 15m", fare: 140, frequency: "Din mein 7 trips" },
  { bus_id: "GOR-VNS-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "05:00 AM", arrival_time: "09:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "07:00 AM", arrival_time: "11:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "09:00 AM", arrival_time: "01:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "11:00 AM", arrival_time: "03:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "01:00 PM", arrival_time: "05:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "03:00 PM", arrival_time: "07:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "05:00 PM", arrival_time: "09:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "07:00 PM", arrival_time: "11:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "09:00 PM", arrival_time: "01:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "10:30 PM", arrival_time: "03:15 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "05:00 AM", arrival_time: "09:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "07:00 AM", arrival_time: "11:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "09:00 AM", arrival_time: "01:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "11:00 AM", arrival_time: "03:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "01:00 PM", arrival_time: "05:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "03:00 PM", arrival_time: "07:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "05:00 PM", arrival_time: "09:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "07:00 PM", arrival_time: "11:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "09:00 PM", arrival_time: "01:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "10:30 PM", arrival_time: "03:15 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "DEO-LKO-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "05:00 AM", arrival_time: "11:30 AM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "09:00 AM", arrival_time: "03:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "01:00 PM", arrival_time: "07:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "05:00 PM", arrival_time: "11:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "09:00 PM", arrival_time: "03:30 AM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "07:00 AM", arrival_time: "01:00 PM", duration: "6h", fare: 608, frequency: "Din mein 2 trips" },
  { bus_id: "DEO-LKO-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "03:00 PM", arrival_time: "09:00 PM", duration: "6h", fare: 608, frequency: "Din mein 2 trips" },
  { bus_id: "LKO-DEO-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "05:00 AM", arrival_time: "11:30 AM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "09:00 AM", arrival_time: "03:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "01:00 PM", arrival_time: "07:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "05:00 PM", arrival_time: "11:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "09:00 PM", arrival_time: "03:30 AM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "07:00 AM", arrival_time: "01:00 PM", duration: "6h", fare: 608, frequency: "Din mein 2 trips" },
  { bus_id: "LKO-DEO-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "03:00 PM", arrival_time: "09:00 PM", duration: "6h", fare: 608, frequency: "Din mein 2 trips" },
  { bus_id: "LKO-KNP-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "05:00 AM", arrival_time: "07:15 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "05:40 AM", arrival_time: "07:55 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ACE-001", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "06:30 AM", arrival_time: "08:20 AM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "07:10 AM", arrival_time: "09:25 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "08:00 AM", arrival_time: "10:15 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ACE-002", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "08:40 AM", arrival_time: "10:30 AM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "09:30 AM", arrival_time: "11:45 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "10:10 AM", arrival_time: "12:25 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ACE-003", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "11:00 AM", arrival_time: "12:50 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "11:40 AM", arrival_time: "01:55 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "12:30 PM", arrival_time: "02:45 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ACE-004", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "01:10 PM", arrival_time: "03:00 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "02:00 PM", arrival_time: "04:15 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "02:40 PM", arrival_time: "04:55 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ACE-005", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "03:30 PM", arrival_time: "05:20 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "04:10 PM", arrival_time: "06:25 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "05:00 PM", arrival_time: "07:15 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ACE-006", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "05:40 PM", arrival_time: "07:30 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "06:30 PM", arrival_time: "08:45 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "07:10 PM", arrival_time: "09:25 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ACE-007", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "08:00 PM", arrival_time: "09:50 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "08:40 PM", arrival_time: "10:55 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-KNP-ORD-016", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Kanpur", via_stops: ["Mallawan", "Unnao", "Purwa", "Bilhaur"], departure_time: "09:30 PM", arrival_time: "11:45 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "05:00 AM", arrival_time: "07:15 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "05:40 AM", arrival_time: "07:55 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ACE-001", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "06:30 AM", arrival_time: "08:20 AM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "07:10 AM", arrival_time: "09:25 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "08:00 AM", arrival_time: "10:15 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ACE-002", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "08:40 AM", arrival_time: "10:30 AM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "09:30 AM", arrival_time: "11:45 AM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "10:10 AM", arrival_time: "12:25 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ACE-003", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "11:00 AM", arrival_time: "12:50 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "11:40 AM", arrival_time: "01:55 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "12:30 PM", arrival_time: "02:45 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ACE-004", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "01:10 PM", arrival_time: "03:00 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "02:00 PM", arrival_time: "04:15 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "02:40 PM", arrival_time: "04:55 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ACE-005", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "03:30 PM", arrival_time: "05:20 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "04:10 PM", arrival_time: "06:25 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "05:00 PM", arrival_time: "07:15 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ACE-006", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "05:40 PM", arrival_time: "07:30 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "06:30 PM", arrival_time: "08:45 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "07:10 PM", arrival_time: "09:25 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ACE-007", bus_name: "AC E-Bus Express", bus_type: "Janrath", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "08:00 PM", arrival_time: "09:50 PM", duration: "1h 50m", fare: 150, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "08:40 PM", arrival_time: "10:55 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "KNP-LKO-ORD-016", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kanpur", to: "Lucknow", via_stops: ["Bilhaur", "Purwa", "Unnao", "Mallawan"], departure_time: "09:30 PM", arrival_time: "11:45 PM", duration: "2h 15m", fare: 120, frequency: "Har 40-50 minute par" },
  { bus_id: "LKO-VNS-AZM-001", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Azamgarh"], departure_time: "05:00 AM", arrival_time: "12:30 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "LKO-VNS-AZM-002", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Azamgarh"], departure_time: "07:30 AM", arrival_time: "03:00 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "LKO-VNS-AZM-003", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Azamgarh"], departure_time: "10:00 AM", arrival_time: "05:30 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "LKO-VNS-AZM-004", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Azamgarh"], departure_time: "12:30 PM", arrival_time: "08:00 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "LKO-VNS-AZM-005", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Azamgarh"], departure_time: "03:00 PM", arrival_time: "10:30 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "LKO-VNS-AZM-006", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Azamgarh"], departure_time: "05:30 PM", arrival_time: "01:00 AM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "LKO-VNS-AZM-007", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Azamgarh"], departure_time: "08:00 PM", arrival_time: "03:30 AM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "LKO-VNS-AZM-008", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Azamgarh"], departure_time: "10:00 PM", arrival_time: "05:30 AM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "LKO-VNS-GZP-001", bus_name: "Janrath 2x2 AC (Ghazipur route)", bus_type: "Janrath", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Ghazipur"], departure_time: "06:00 AM", arrival_time: "01:00 PM", duration: "7h", fare: 640, frequency: "Din mein 4 trips (Ghazipur via)" },
  { bus_id: "LKO-VNS-GZP-002", bus_name: "Janrath 2x2 AC (Ghazipur route)", bus_type: "Janrath", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Ghazipur"], departure_time: "09:00 AM", arrival_time: "04:00 PM", duration: "7h", fare: 640, frequency: "Din mein 4 trips (Ghazipur via)" },
  { bus_id: "LKO-VNS-GZP-003", bus_name: "Janrath 2x2 AC (Ghazipur route)", bus_type: "Janrath", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Ghazipur"], departure_time: "01:00 PM", arrival_time: "08:00 PM", duration: "7h", fare: 640, frequency: "Din mein 4 trips (Ghazipur via)" },
  { bus_id: "LKO-VNS-GZP-004", bus_name: "Janrath 2x2 AC (Ghazipur route)", bus_type: "Janrath", from: "Lucknow", to: "Varanasi", via_stops: ["Barabanki", "Rudauli", "Ayodhya", "Gonda", "Basti", "Ambedkar Nagar", "Ghazipur"], departure_time: "06:00 PM", arrival_time: "01:00 AM", duration: "7h", fare: 640, frequency: "Din mein 4 trips (Ghazipur via)" },
  { bus_id: "VNS-LKO-AZM-001", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Varanasi", to: "Lucknow", via_stops: ["Azamgarh", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "05:00 AM", arrival_time: "12:30 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "VNS-LKO-AZM-002", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Varanasi", to: "Lucknow", via_stops: ["Azamgarh", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "07:30 AM", arrival_time: "03:00 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "VNS-LKO-AZM-003", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Varanasi", to: "Lucknow", via_stops: ["Azamgarh", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "10:00 AM", arrival_time: "05:30 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "VNS-LKO-AZM-004", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Varanasi", to: "Lucknow", via_stops: ["Azamgarh", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "12:30 PM", arrival_time: "08:00 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "VNS-LKO-AZM-005", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Varanasi", to: "Lucknow", via_stops: ["Azamgarh", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "03:00 PM", arrival_time: "10:30 PM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "VNS-LKO-AZM-006", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Varanasi", to: "Lucknow", via_stops: ["Azamgarh", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "05:30 PM", arrival_time: "01:00 AM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "VNS-LKO-AZM-007", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Varanasi", to: "Lucknow", via_stops: ["Azamgarh", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "08:00 PM", arrival_time: "03:30 AM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "VNS-LKO-AZM-008", bus_name: "UPSRTC Sadharan (Azamgarh route)", bus_type: "Ordinary", from: "Varanasi", to: "Lucknow", via_stops: ["Azamgarh", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "10:00 PM", arrival_time: "05:30 AM", duration: "7h 30m", fare: 520, frequency: "Din mein 8 trips (Azamgarh via)" },
  { bus_id: "VNS-LKO-GZP-001", bus_name: "Janrath 2x2 AC (Ghazipur route)", bus_type: "Janrath", from: "Varanasi", to: "Lucknow", via_stops: ["Ghazipur", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "06:30 AM", arrival_time: "01:30 PM", duration: "7h", fare: 640, frequency: "Din mein 4 trips (Ghazipur via)" },
  { bus_id: "VNS-LKO-GZP-002", bus_name: "Janrath 2x2 AC (Ghazipur route)", bus_type: "Janrath", from: "Varanasi", to: "Lucknow", via_stops: ["Ghazipur", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "09:30 AM", arrival_time: "04:30 PM", duration: "7h", fare: 640, frequency: "Din mein 4 trips (Ghazipur via)" },
  { bus_id: "VNS-LKO-GZP-003", bus_name: "Janrath 2x2 AC (Ghazipur route)", bus_type: "Janrath", from: "Varanasi", to: "Lucknow", via_stops: ["Ghazipur", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "01:30 PM", arrival_time: "08:30 PM", duration: "7h", fare: 640, frequency: "Din mein 4 trips (Ghazipur via)" },
  { bus_id: "VNS-LKO-GZP-004", bus_name: "Janrath 2x2 AC (Ghazipur route)", bus_type: "Janrath", from: "Varanasi", to: "Lucknow", via_stops: ["Ghazipur", "Ambedkar Nagar", "Basti", "Gonda", "Ayodhya", "Rudauli", "Barabanki"], departure_time: "06:30 PM", arrival_time: "01:30 AM", duration: "7h", fare: 640, frequency: "Din mein 4 trips (Ghazipur via)" },
  { bus_id: "LKO-AGR-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "05:30 AM", arrival_time: "11:30 AM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "LKO-AGR-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "08:00 AM", arrival_time: "02:00 PM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "LKO-AGR-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "10:30 AM", arrival_time: "04:30 PM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "LKO-AGR-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "01:00 PM", arrival_time: "07:00 PM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "LKO-AGR-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "03:30 PM", arrival_time: "09:30 PM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "LKO-AGR-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "06:00 PM", arrival_time: "12:00 AM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "LKO-AGR-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "08:30 PM", arrival_time: "02:30 AM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "LKO-AGR-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "06:30 AM", arrival_time: "12:00 PM", duration: "5h 30m", fare: 550, frequency: "Din mein 3 trips" },
  { bus_id: "LKO-AGR-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "12:00 PM", arrival_time: "05:30 PM", duration: "5h 30m", fare: 550, frequency: "Din mein 3 trips" },
  { bus_id: "LKO-AGR-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Agra", via_stops: ["Mallawan", "Unnao", "Etawah"], departure_time: "07:00 PM", arrival_time: "12:30 AM", duration: "5h 30m", fare: 550, frequency: "Din mein 3 trips" },
  { bus_id: "AGR-LKO-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "05:30 AM", arrival_time: "11:30 AM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "AGR-LKO-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "08:00 AM", arrival_time: "02:00 PM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "AGR-LKO-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "10:30 AM", arrival_time: "04:30 PM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "AGR-LKO-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "01:00 PM", arrival_time: "07:00 PM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "AGR-LKO-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "03:30 PM", arrival_time: "09:30 PM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "AGR-LKO-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "06:00 PM", arrival_time: "12:00 AM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "AGR-LKO-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "08:30 PM", arrival_time: "02:30 AM", duration: "6h", fare: 450, frequency: "Din mein 7 trips" },
  { bus_id: "AGR-LKO-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "07:00 AM", arrival_time: "12:30 PM", duration: "5h 30m", fare: 550, frequency: "Din mein 3 trips" },
  { bus_id: "AGR-LKO-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "01:00 PM", arrival_time: "06:30 PM", duration: "5h 30m", fare: 550, frequency: "Din mein 3 trips" },
  { bus_id: "AGR-LKO-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Agra", to: "Lucknow", via_stops: ["Etawah", "Unnao", "Mallawan"], departure_time: "08:00 PM", arrival_time: "01:30 AM", duration: "5h 30m", fare: 550, frequency: "Din mein 3 trips" },
  { bus_id: "PRG-LKO-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "05:00 AM", arrival_time: "09:30 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "05:45 AM", arrival_time: "10:15 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "06:45 AM", arrival_time: "11:15 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "07:30 AM", arrival_time: "11:30 AM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "08:30 AM", arrival_time: "01:00 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "09:15 AM", arrival_time: "01:45 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "10:15 AM", arrival_time: "02:45 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "11:00 AM", arrival_time: "03:00 PM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "12:00 PM", arrival_time: "04:30 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "12:45 PM", arrival_time: "05:15 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "01:45 PM", arrival_time: "06:15 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "02:30 PM", arrival_time: "06:30 PM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "03:30 PM", arrival_time: "08:00 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "04:15 PM", arrival_time: "08:45 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "05:15 PM", arrival_time: "09:45 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-JAN-004", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "06:00 PM", arrival_time: "10:00 PM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "07:00 PM", arrival_time: "11:30 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "07:45 PM", arrival_time: "12:15 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "08:45 PM", arrival_time: "01:15 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-LKO-JAN-005", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Prayagraj", to: "Lucknow", via_stops: ["Fatehpur", "Kanpur", "Unnao"], departure_time: "09:30 PM", arrival_time: "01:30 AM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "05:00 AM", arrival_time: "09:30 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "05:45 AM", arrival_time: "10:15 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "06:45 AM", arrival_time: "11:15 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "07:30 AM", arrival_time: "11:30 AM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "08:30 AM", arrival_time: "01:00 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "09:15 AM", arrival_time: "01:45 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "10:15 AM", arrival_time: "02:45 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "11:00 AM", arrival_time: "03:00 PM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "12:00 PM", arrival_time: "04:30 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "12:45 PM", arrival_time: "05:15 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "01:45 PM", arrival_time: "06:15 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "02:30 PM", arrival_time: "06:30 PM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "03:30 PM", arrival_time: "08:00 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "04:15 PM", arrival_time: "08:45 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "05:15 PM", arrival_time: "09:45 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-JAN-004", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "06:00 PM", arrival_time: "10:00 PM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "07:00 PM", arrival_time: "11:30 PM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "07:45 PM", arrival_time: "12:15 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "08:45 PM", arrival_time: "01:15 AM", duration: "4h 30m", fare: 280, frequency: "Har 45-60 minute par" },
  { bus_id: "LKO-PRG-JAN-005", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Prayagraj", via_stops: ["Unnao", "Kanpur", "Fatehpur"], departure_time: "09:30 PM", arrival_time: "01:30 AM", duration: "4h", fare: 350, frequency: "Har 45-60 minute par" },
  { bus_id: "PRG-GOR-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "05:00 AM", arrival_time: "10:45 AM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "07:00 AM", arrival_time: "12:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "09:00 AM", arrival_time: "02:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "11:00 AM", arrival_time: "04:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "01:00 PM", arrival_time: "06:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "03:00 PM", arrival_time: "08:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "05:00 PM", arrival_time: "10:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "07:00 PM", arrival_time: "12:45 AM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "09:00 PM", arrival_time: "02:45 AM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Pratapgarh", "Sultanpur", "Ayodhya", "Gonda", "Basti"], departure_time: "10:30 PM", arrival_time: "04:15 AM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "05:00 AM", arrival_time: "10:45 AM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "07:00 AM", arrival_time: "12:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "09:00 AM", arrival_time: "02:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "11:00 AM", arrival_time: "04:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "01:00 PM", arrival_time: "06:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "03:00 PM", arrival_time: "08:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "05:00 PM", arrival_time: "10:45 PM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "07:00 PM", arrival_time: "12:45 AM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "09:00 PM", arrival_time: "02:45 AM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Basti", "Gonda", "Ayodhya", "Sultanpur", "Pratapgarh"], departure_time: "10:30 PM", arrival_time: "04:15 AM", duration: "5h 45m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "BOT-JWR-ORD-001", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "05:30 AM", arrival_time: "06:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-002", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "05:42 AM", arrival_time: "07:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-003", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "06:00 AM", arrival_time: "07:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-004", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "06:12 AM", arrival_time: "07:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-005", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "06:30 AM", arrival_time: "07:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-006", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "06:42 AM", arrival_time: "08:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-007", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "07:00 AM", arrival_time: "08:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-008", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "07:12 AM", arrival_time: "08:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-009", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "07:30 AM", arrival_time: "08:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-010", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "07:42 AM", arrival_time: "09:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-011", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "08:00 AM", arrival_time: "09:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-012", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "08:12 AM", arrival_time: "09:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-013", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "08:30 AM", arrival_time: "09:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-014", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "08:42 AM", arrival_time: "10:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-015", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "09:00 AM", arrival_time: "10:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-016", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "09:12 AM", arrival_time: "10:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-017", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "09:30 AM", arrival_time: "10:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-018", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "09:42 AM", arrival_time: "11:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-019", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "10:00 AM", arrival_time: "11:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-020", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "10:12 AM", arrival_time: "11:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-021", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "10:30 AM", arrival_time: "11:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-022", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "10:42 AM", arrival_time: "12:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-023", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "11:00 AM", arrival_time: "12:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-024", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "11:12 AM", arrival_time: "12:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-025", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "11:30 AM", arrival_time: "12:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-026", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "11:42 AM", arrival_time: "01:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-027", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "12:00 PM", arrival_time: "01:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-028", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "12:12 PM", arrival_time: "01:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-029", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "12:30 PM", arrival_time: "01:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-030", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "12:42 PM", arrival_time: "02:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-031", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "01:00 PM", arrival_time: "02:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-032", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "01:12 PM", arrival_time: "02:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-033", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "01:30 PM", arrival_time: "02:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-034", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "01:42 PM", arrival_time: "03:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-035", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "02:00 PM", arrival_time: "03:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-036", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "02:12 PM", arrival_time: "03:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-037", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "02:30 PM", arrival_time: "03:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-038", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "02:42 PM", arrival_time: "04:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-039", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "03:00 PM", arrival_time: "04:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-040", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "03:12 PM", arrival_time: "04:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-041", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "03:30 PM", arrival_time: "04:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-042", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "03:42 PM", arrival_time: "05:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-043", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "04:00 PM", arrival_time: "05:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-044", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "04:12 PM", arrival_time: "05:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-045", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "04:30 PM", arrival_time: "05:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-046", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "04:42 PM", arrival_time: "06:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-047", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "05:00 PM", arrival_time: "06:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-048", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "05:12 PM", arrival_time: "06:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-049", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "05:30 PM", arrival_time: "06:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-050", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "05:42 PM", arrival_time: "07:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-051", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "06:00 PM", arrival_time: "07:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-052", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "06:12 PM", arrival_time: "07:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-053", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "06:30 PM", arrival_time: "07:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-054", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "06:42 PM", arrival_time: "08:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-055", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "07:00 PM", arrival_time: "08:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-056", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "07:12 PM", arrival_time: "08:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-057", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "07:30 PM", arrival_time: "08:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-058", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "07:42 PM", arrival_time: "09:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-059", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "08:00 PM", arrival_time: "09:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-060", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "08:12 PM", arrival_time: "09:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-061", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "08:30 PM", arrival_time: "09:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-062", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "08:42 PM", arrival_time: "10:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-063", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "09:00 PM", arrival_time: "10:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-064", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "09:12 PM", arrival_time: "10:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-065", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "09:30 PM", arrival_time: "10:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-066", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "09:42 PM", arrival_time: "11:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-067", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "10:00 PM", arrival_time: "11:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-068", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "10:12 PM", arrival_time: "11:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "BOT-JWR-ORD-069", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Botanical Garden", to: "Jewar Link", via_stops: ["Sector 18", "Sector 62", "Sector 125", "Kisan Chowk", "Ek Murti Chowk"], departure_time: "10:30 PM", arrival_time: "11:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-001", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "05:30 AM", arrival_time: "06:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-002", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "05:42 AM", arrival_time: "07:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-003", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "06:00 AM", arrival_time: "07:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-004", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "06:12 AM", arrival_time: "07:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-005", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "06:30 AM", arrival_time: "07:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-006", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "06:42 AM", arrival_time: "08:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-007", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "07:00 AM", arrival_time: "08:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-008", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "07:12 AM", arrival_time: "08:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-009", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "07:30 AM", arrival_time: "08:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-010", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "07:42 AM", arrival_time: "09:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-011", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "08:00 AM", arrival_time: "09:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-012", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "08:12 AM", arrival_time: "09:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-013", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "08:30 AM", arrival_time: "09:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-014", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "08:42 AM", arrival_time: "10:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-015", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "09:00 AM", arrival_time: "10:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-016", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "09:12 AM", arrival_time: "10:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-017", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "09:30 AM", arrival_time: "10:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-018", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "09:42 AM", arrival_time: "11:07 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-019", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "10:00 AM", arrival_time: "11:25 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-020", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "10:12 AM", arrival_time: "11:37 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-021", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "10:30 AM", arrival_time: "11:55 AM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-022", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "10:42 AM", arrival_time: "12:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-023", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "11:00 AM", arrival_time: "12:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-024", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "11:12 AM", arrival_time: "12:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-025", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "11:30 AM", arrival_time: "12:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-026", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "11:42 AM", arrival_time: "01:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-027", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "12:00 PM", arrival_time: "01:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-028", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "12:12 PM", arrival_time: "01:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-029", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "12:30 PM", arrival_time: "01:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-030", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "12:42 PM", arrival_time: "02:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-031", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "01:00 PM", arrival_time: "02:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-032", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "01:12 PM", arrival_time: "02:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-033", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "01:30 PM", arrival_time: "02:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-034", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "01:42 PM", arrival_time: "03:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-035", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "02:00 PM", arrival_time: "03:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-036", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "02:12 PM", arrival_time: "03:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-037", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "02:30 PM", arrival_time: "03:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-038", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "02:42 PM", arrival_time: "04:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-039", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "03:00 PM", arrival_time: "04:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-040", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "03:12 PM", arrival_time: "04:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-041", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "03:30 PM", arrival_time: "04:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-042", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "03:42 PM", arrival_time: "05:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-043", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "04:00 PM", arrival_time: "05:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-044", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "04:12 PM", arrival_time: "05:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-045", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "04:30 PM", arrival_time: "05:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-046", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "04:42 PM", arrival_time: "06:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-047", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "05:00 PM", arrival_time: "06:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-048", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "05:12 PM", arrival_time: "06:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-049", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "05:30 PM", arrival_time: "06:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-050", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "05:42 PM", arrival_time: "07:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-051", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "06:00 PM", arrival_time: "07:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-052", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "06:12 PM", arrival_time: "07:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-053", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "06:30 PM", arrival_time: "07:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-054", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "06:42 PM", arrival_time: "08:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-055", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "07:00 PM", arrival_time: "08:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-056", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "07:12 PM", arrival_time: "08:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-057", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "07:30 PM", arrival_time: "08:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-058", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "07:42 PM", arrival_time: "09:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-059", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "08:00 PM", arrival_time: "09:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-060", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "08:12 PM", arrival_time: "09:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-061", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "08:30 PM", arrival_time: "09:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-062", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "08:42 PM", arrival_time: "10:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-063", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "09:00 PM", arrival_time: "10:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-064", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "09:12 PM", arrival_time: "10:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-065", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "09:30 PM", arrival_time: "10:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-066", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "09:42 PM", arrival_time: "11:07 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-067", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "10:00 PM", arrival_time: "11:25 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-068", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "10:12 PM", arrival_time: "11:37 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "JWR-BOT-ORD-069", bus_name: "NMRC/UPSRTC City Feeder", bus_type: "Ordinary", from: "Jewar Link", to: "Botanical Garden", via_stops: ["Ek Murti Chowk", "Kisan Chowk", "Sector 125", "Sector 62", "Sector 18"], departure_time: "10:30 PM", arrival_time: "11:55 PM", duration: "1h 25m", fare: 35, frequency: "Har 12-18 minute par" },
  { bus_id: "AGR-JAI-ORD-001", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Jaipur", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "05:00 AM", arrival_time: "10:00 AM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-JAI-ORD-002", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Jaipur", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "08:00 AM", arrival_time: "01:00 PM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-JAI-ORD-003", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Jaipur", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "11:00 AM", arrival_time: "04:00 PM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-JAI-ORD-004", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Jaipur", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "02:00 PM", arrival_time: "07:00 PM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-JAI-ORD-005", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Jaipur", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "05:00 PM", arrival_time: "10:00 PM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-JAI-ORD-006", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Jaipur", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "08:00 PM", arrival_time: "01:00 AM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "JAI-AGR-ORD-001", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Jaipur", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "05:00 AM", arrival_time: "10:00 AM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "JAI-AGR-ORD-002", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Jaipur", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "08:00 AM", arrival_time: "01:00 PM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "JAI-AGR-ORD-003", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Jaipur", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "11:00 AM", arrival_time: "04:00 PM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "JAI-AGR-ORD-004", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Jaipur", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "02:00 PM", arrival_time: "07:00 PM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "JAI-AGR-ORD-005", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Jaipur", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "05:00 PM", arrival_time: "10:00 PM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "JAI-AGR-ORD-006", bus_name: "UPSRTC/RSRTC Sadharan", bus_type: "Ordinary", from: "Jaipur", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "08:00 PM", arrival_time: "01:00 AM", duration: "5h", fare: 380, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-DEL-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Delhi", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "05:30 AM", arrival_time: "11:30 AM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-DEL-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Delhi", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "08:30 AM", arrival_time: "02:30 PM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-DEL-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Delhi", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "11:30 AM", arrival_time: "05:30 PM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-DEL-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Delhi", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "02:30 PM", arrival_time: "08:30 PM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-DEL-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Delhi", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "05:30 PM", arrival_time: "11:30 PM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "AGR-DEL-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Agra", to: "Delhi", via_stops: ["Mathura", "Bharatpur", "Alwar"], departure_time: "08:30 PM", arrival_time: "02:30 AM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "DEL-AGR-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Delhi", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "05:30 AM", arrival_time: "11:30 AM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "DEL-AGR-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Delhi", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "08:30 AM", arrival_time: "02:30 PM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "DEL-AGR-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Delhi", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "11:30 AM", arrival_time: "05:30 PM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "DEL-AGR-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Delhi", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "02:30 PM", arrival_time: "08:30 PM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "DEL-AGR-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Delhi", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "05:30 PM", arrival_time: "11:30 PM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
  { bus_id: "DEL-AGR-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Delhi", to: "Agra", via_stops: ["Alwar", "Bharatpur", "Mathura"], departure_time: "08:30 PM", arrival_time: "02:30 AM", duration: "6h", fare: 420, frequency: "Din mein 6 trips" },
];
const BADGE_LABEL = {
  Ordinary: "UPSRTC Sadharan",
  Janrath: "Janrath 2x2 AC",
  Shatabdi: "Shatabdi (Premium AC)",
  "Pink Express": "UP Pink Express",
};

const PAGE_SIZE = 6; // "NEXT BUS + agle 5-6 slots" per screen

const el = {
  fromSelect: document.getElementById("fromCity"),
  toSelect: document.getElementById("toCity"),
  swapBtn: document.getElementById("swapBtn"),
  searchBtn: document.getElementById("searchBtn"),
  busList: document.getElementById("busList"),
  pastBusList: document.getElementById("pastBusList"),
  togglePastBtn: document.getElementById("togglePastBtn"),
  resultHeading: document.getElementById("resultHeading"),
  resultCount: document.getElementById("resultCount"),
  statusText: document.getElementById("statusText"),
  liveClock: document.getElementById("liveClock"),
};

let showPastBuses = false;
let visibleUpcomingCount = PAGE_SIZE;
let visiblePastCount = PAGE_SIZE;

// -----------------------------------------------------
// Map / GPS state (Step 3) — keyed by bus_id since a bus
// only ever appears once (upcoming OR past) in a render.
// -----------------------------------------------------
const mapInstances = {};   // bus_id -> Leaflet map instance
const expandedMapIds = new Set(); // bus_id set: card's map section is open
const gpsWatches = {};     // bus_id -> navigator.geolocation watch id
const gpsMarkers = {};     // bus_id -> Leaflet marker for the live user dot
const MAP_TRANSITION_MS = 320; // must stay >= the CSS max-height transition

// -----------------------------------------------------
// Data integrity guard — never render "undefined"
// -----------------------------------------------------
const REQUIRED_FIELDS = [
  "bus_id", "bus_name", "bus_type", "from", "to",
  "departure_time", "arrival_time", "duration", "fare", "frequency",
];

function isValidBus(bus) {
  return REQUIRED_FIELDS.every(
    (field) => bus[field] !== undefined && bus[field] !== null && bus[field] !== ""
  );
}

const VALID_BUSES = BUS_DATA.filter(isValidBus);

if (VALID_BUSES.length !== BUS_DATA.length) {
  console.warn(
    `[UP BusKhoj] Skipped ${BUS_DATA.length - VALID_BUSES.length} bus entr${
      BUS_DATA.length - VALID_BUSES.length === 1 ? "y" : "ies"
    } missing required fields.`
  );
}

function fullRoute(bus) {
  return [bus.from, ...(Array.isArray(bus.via_stops) ? bus.via_stops : []), bus.to];
}

// -----------------------------------------------------
// Master searchable name list — used to power the
// From/To autocomplete AND to validate typed input.
//   ROUTABLE_STOPS  = stops that actually have coordinates
//                     and can appear on the map/polyline.
//   ALL_SEARCHABLE_NAMES = every routable stop PLUS every
//                     stand/depot/tehsil name from the full
//                     74-district UPSRTC directory, so a
//                     person can search literally anywhere
//                     in UP. A directory-only name is a
//                     valid, real place — it just may not
//                     have a live bus schedule yet, exactly
//                     like a real transit app whose network
//                     doesn't cover every junction.
// -----------------------------------------------------
const ROUTABLE_STOPS = new Set(Object.keys(STOP_COORDS));

const ALL_SEARCHABLE_NAMES = new Set(ROUTABLE_STOPS);
Object.values(DISTRICT_DIRECTORY).forEach((stops) => {
  stops.forEach((name) => ALL_SEARCHABLE_NAMES.add(name));
});

// -----------------------------------------------------
// Autocomplete UI — converts the two <select> elements
// (from the static HTML) into free-text <input list=...>
// fields bound to a shared <datalist>, so typing any
// tehsil/chauraha/depot name filters suggestions instantly
// via native browser autocomplete. No HTML/CSS file edits
// needed: markup + matching inline styles are created here.
// -----------------------------------------------------
function convertToAutocompleteInput(selectEl, datalistId) {
  const input = document.createElement("input");
  input.type = "text";
  input.id = selectEl.id;
  input.setAttribute("list", datalistId);
  input.setAttribute("autocomplete", "off");
  input.placeholder = "Sheher, tehsil ya chauraha type karein…";
  // Inline styles mirror the .search-card select rules in style.css
  // so the swap to <input> is visually seamless.
  input.style.cssText = `
    appearance: none; -webkit-appearance: none;
    font-family: var(--font-body); font-weight: 700; font-size: 0.92rem;
    color: var(--ink); background: var(--paper);
    border: 1.5px solid var(--line-hair); border-radius: 10px;
    padding: 10px 10px; width: 100%; box-sizing: border-box;
  `;
  selectEl.replaceWith(input);
  return input;
}

let cityDatalist = document.getElementById("cityAutocompleteList");
if (!cityDatalist) {
  cityDatalist = document.createElement("datalist");
  cityDatalist.id = "cityAutocompleteList";
  document.body.appendChild(cityDatalist);
}

// -----------------------------------------------------
// Dropdown -> autocomplete population — entirely data-driven
// -----------------------------------------------------
function populateCityDropdowns() {
  const allNames = Array.from(ALL_SEARCHABLE_NAMES).sort((a, b) => a.localeCompare(b));

  cityDatalist.innerHTML = "";
  allNames.forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    cityDatalist.appendChild(opt);
  });

  if (el.fromSelect.tagName !== "INPUT") {
    el.fromSelect = convertToAutocompleteInput(el.fromSelect, cityDatalist.id);
  }
  if (el.toSelect.tagName !== "INPUT") {
    el.toSelect = convertToAutocompleteInput(el.toSelect, cityDatalist.id);
  }

  el.fromSelect.disabled = allNames.length === 0;
  el.toSelect.disabled = allNames.length === 0;
}

function pickSensibleDefaults() {
  const preferred = ["Deoria", "Gorakhpur"];
  const options = Array.from(ROUTABLE_STOPS);
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
// Time helpers
// -----------------------------------------------------
function toMinutesSinceMidnight(timeStr) {
  const match = String(timeStr).trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return 0;
  let [, h, m, period] = match;
  h = parseInt(h, 10);
  m = parseInt(m, 10);
  if (period.toUpperCase() === "PM" && h !== 12) h += 12;
  if (period.toUpperCase() === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

function getNowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function formatClock(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const period = h >= 12 ? "PM" : "AM";
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

function formatCountdown(diffMin) {
  if (diffMin <= 1) return "Boarding Now";
  if (diffMin < 60) return `Departs in ${diffMin} min`;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return m > 0 ? `Departs in ${h}h ${m}m` : `Departs in ${h}h`;
}

function formatAgo(diffMin) {
  if (diffMin < 1) return "Abhi-abhi nikli";
  if (diffMin < 60) return `${diffMin} min pehle nikal chuki`;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return m > 0 ? `${h}h ${m}m pehle nikal chuki` : `${h}h pehle nikal chuki`;
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

function buildScheduleView(matches, nowMinutes) {
  const withMinutes = matches.map((bus) => ({
    bus,
    depMin: toMinutesSinceMidnight(bus.departure_time),
  }));

  const upcoming = withMinutes
    .filter((x) => x.depMin >= nowMinutes)
    .sort((a, b) => a.depMin - b.depMin);

  const past = withMinutes
    .filter((x) => x.depMin < nowMinutes)
    .sort((a, b) => b.depMin - a.depMin);

  return { upcoming, past };
}

// -----------------------------------------------------
// Map / GPS cleanup — called whenever the user starts a
// genuinely new search (new route), so old Leaflet map
// instances and geolocation watches don't leak.
// -----------------------------------------------------
function cleanupAllMapsAndGps() {
  Object.keys(gpsWatches).forEach((busId) => {
    navigator.geolocation.clearWatch(gpsWatches[busId]);
    delete gpsWatches[busId];
  });
  Object.keys(gpsMarkers).forEach((busId) => delete gpsMarkers[busId]);
  Object.keys(mapInstances).forEach((busId) => {
    try {
      mapInstances[busId].remove();
    } catch (e) {
      /* map already gone — safe to ignore */
    }
    delete mapInstances[busId];
  });
  expandedMapIds.clear();
}

// -----------------------------------------------------
// Search + render
// -----------------------------------------------------
function search(isNewQuery = true) {
  const from = el.fromSelect.value;
  const to = el.toSelect.value;

  if (isNewQuery) {
    visibleUpcomingCount = PAGE_SIZE;
    visiblePastCount = PAGE_SIZE;
    cleanupAllMapsAndGps();
  }

  el.busList.innerHTML = "";
  el.busList.classList.remove("has-timeline");
  el.pastBusList.innerHTML = "";
  el.pastBusList.classList.remove("has-timeline");
  el.togglePastBtn.hidden = true;

  if (!from || !to) {
    el.resultHeading.textContent = "Available Buses";
    el.resultCount.textContent = "";
    el.statusText.textContent = "Kripya From aur To station chunein.";
    return;
  }

  // Typed text that doesn't match ANY known UP stand/depot/tehsil
  // (not even in the full 74-district directory) gets a distinct
  // "unrecognized place" message — different from "recognized
  // place, no live bus yet" — so the person knows to pick from
  // the suggestions rather than assuming it's a typo in our data.
  const unrecognized = [!ALL_SEARCHABLE_NAMES.has(from) && from, !ALL_SEARCHABLE_NAMES.has(to) && to].filter(Boolean);
  if (unrecognized.length > 0) {
    el.resultHeading.textContent = `${from} → ${to}`;
    el.resultCount.textContent = "";
    el.statusText.innerHTML = `<strong>"${unrecognized.join('", "')}"</strong> UP directory mein nahi mila.`;
    el.busList.appendChild(renderUnrecognizedState(unrecognized));
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

  const nowMinutes = getNowMinutes();
  const { upcoming, past } = buildScheduleView(matches, nowMinutes);

  el.resultCount.textContent = `${matches.length} bus${matches.length > 1 ? "es" : ""} mili`;
  el.statusText.innerHTML = `Route: <strong>${from} ⇄ ${to}</strong> · Abhi ka samay: <strong>${formatClock(
    nowMinutes
  )}</strong>`;

  if (upcoming.length === 0) {
    el.busList.appendChild(renderNoMoreBusesToday(from, to, matches, nowMinutes));
  } else {
    el.busList.classList.add("has-timeline");
    const toShow = upcoming.slice(0, visibleUpcomingCount);
    toShow.forEach(({ bus, depMin }, idx) => {
      const isNext = idx === 0;
      const countdownText = formatCountdown(depMin - nowMinutes);
      el.busList.appendChild(renderBusCard(bus, from, to, { state: isNext ? "next" : "upcoming", countdownText }));
    });

    if (upcoming.length > visibleUpcomingCount) {
      const remaining = upcoming.length - visibleUpcomingCount;
      el.busList.appendChild(
        renderLoadMoreButton(`Load More Buses (${remaining} aur)`, () => {
          visibleUpcomingCount += PAGE_SIZE;
          search(false);
        })
      );
    }
  }

  if (past.length > 0) {
    el.togglePastBtn.hidden = false;
    el.pastBusList.classList.add("has-timeline");
    const pastToShow = past.slice(0, visiblePastCount);
    pastToShow.forEach(({ bus, depMin }) => {
      const agoText = formatAgo(nowMinutes - depMin);
      el.pastBusList.appendChild(renderBusCard(bus, from, to, { state: "past", countdownText: agoText }));
    });

    if (past.length > visiblePastCount) {
      const remaining = past.length - visiblePastCount;
      el.pastBusList.appendChild(
        renderLoadMoreButton(`Load More Past Buses (${remaining} aur)`, () => {
          visiblePastCount += PAGE_SIZE;
          search(false);
        })
      );
    }
  }

  updateToggleButton(past.length);

  // Re-open any map sections that were expanded before this
  // re-render (periodic refresh) recreated the card DOM.
  expandedMapIds.forEach((busId) => {
    const card = document.getElementById(`card-${busId}`);
    if (card) expandMapSection(card, busId, { skipTransitionDelay: true });
  });
}

function updateToggleButton(pastCount) {
  const icon = showPastBuses ? "▴" : "▾";
  el.togglePastBtn.innerHTML = `<span class="toggle-icon">${icon}</span> ${
    showPastBuses ? "Past buses chhupayein" : "Pehle nikal chuki buses dekhein"
  } (${pastCount})`;
  el.pastBusList.classList.toggle("collapsed", !showPastBuses);
}

// -----------------------------------------------------
// Rendering — bus card (now with map + GPS slot)
// -----------------------------------------------------
function renderBusCard(bus, searchFrom, searchTo, { state, countdownText }) {
  const route = fullRoute(bus);
  const isPartialTrip = bus.from !== searchFrom || bus.to !== searchTo;
  const badgeText = BADGE_LABEL[bus.bus_type] || bus.bus_name || bus.bus_type;
  const viaStops = Array.isArray(bus.via_stops) ? bus.via_stops : [];

  const card = document.createElement("div");
  card.className = `bus-card ${state}-bus`;
  card.id = `card-${bus.bus_id}`;
  card.innerHTML = `
    <div class="timeline-dot" aria-hidden="true"></div>
    <div class="bus-card-top">
      <span class="badge ${badgeClass(bus.bus_type)}">${badgeText}</span>
      ${state === "next" ? `<span class="next-badge">NEXT BUS</span>` : ""}
      <span class="fare">₹${bus.fare}</span>
    </div>
    <div class="countdown-tag ${state}">${countdownText}</div>
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
      <button class="track-btn" type="button">🗺️ Route / Live Track</button>
    </div>
    <div class="map-section" id="map-section-${bus.bus_id}">
      <div class="map-container" id="map-${bus.bus_id}"></div>
      <div class="map-controls">
        <button class="gps-toggle-btn" type="button">📍 Inside Bus (Track My Location)</button>
        <div class="gps-status" hidden>
          <span class="gps-chip gps-speed">Speed: —</span>
          <span class="gps-chip gps-accuracy">Accuracy: —</span>
        </div>
      </div>
    </div>
  `;

  card.querySelector(".track-btn").addEventListener("click", () => {
    toggleMapSection(card, bus.bus_id);
  });

  card.querySelector(".gps-toggle-btn").addEventListener("click", () => {
    toggleGpsTracking(bus, card);
  });

  return card;
}

function renderLoadMoreButton(label, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "toggle-past-btn load-more-btn";
  btn.innerHTML = `<span class="toggle-icon">＋</span> ${label}`;
  btn.addEventListener("click", onClick);
  return btn;
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

function renderUnrecognizedState(names) {
  const div = document.createElement("div");
  div.className = "empty-state";
  div.innerHTML = `
    <span class="emoji">🔎</span>
    <strong>"${names.join('", "')}" nahi pehchana gaya</strong>
    <p>Suggestions list se koi jagah chunein — typing shuru karte hi UP ke saare 74 districts ke stops/depots/tehsil dikhne lagenge.</p>
  `;
  return div;
}

function renderNoMoreBusesToday(from, to, matches, nowMinutes) {
  const earliestTomorrow = matches
    .map((bus) => toMinutesSinceMidnight(bus.departure_time))
    .sort((a, b) => a - b)[0];

  const div = document.createElement("div");
  div.className = "empty-state";
  div.innerHTML = `
    <span class="emoji">🌙</span>
    <strong>Aaj ke liye ${from} → ${to} buses khatam ho chuki hain</strong>
    <p>Agli bus kal subah <strong>${formatClock(earliestTomorrow)}</strong> baje hai. Neeche "Pehle nikal chuki buses dekhein" par tap karke aaj ki poori schedule dekh sakte hain.</p>
  `;
  return div;
}

// -----------------------------------------------------
// Step 3a — Route map (Leaflet) toggle + init
// -----------------------------------------------------
function toggleMapSection(card, busId) {
  if (expandedMapIds.has(busId)) {
    collapseMapSection(card, busId);
  } else {
    expandMapSection(card, busId);
  }
}

function expandMapSection(card, busId, { skipTransitionDelay = false } = {}) {
  const section = card.querySelector(".map-section");
  const btn = card.querySelector(".track-btn");
  if (!section) return;
  section.classList.add("expanded");
  if (btn) btn.classList.add("active");
  expandedMapIds.add(busId);

  const bus = VALID_BUSES.find((b) => b.bus_id === busId);
  if (!bus) return;

  const delay = skipTransitionDelay ? 0 : MAP_TRANSITION_MS;
  window.setTimeout(() => initOrRefreshRouteMap(bus), delay);
}

function collapseMapSection(card, busId) {
  const section = card.querySelector(".map-section");
  const btn = card.querySelector(".track-btn");
  if (section) section.classList.remove("expanded");
  if (btn) btn.classList.remove("active");
  expandedMapIds.delete(busId);
  // Riding-mode GPS only makes sense while the map is open.
  if (gpsWatches[busId] !== undefined) {
    stopGpsTracking(busId, card);
  }
}

function initOrRefreshRouteMap(bus) {
  if (typeof L === "undefined") {
    console.error("[UP BusKhoj] Leaflet (L) not loaded — check the CDN <script> tag in index.html.");
    return;
  }

  if (mapInstances[bus.bus_id]) {
    mapInstances[bus.bus_id].invalidateSize();
    return;
  }

  const containerId = `map-${bus.bus_id}`;
  const containerEl = document.getElementById(containerId);
  if (!containerEl) return;

  const stops = fullRoute(bus);
  const depMin = toMinutesSinceMidnight(bus.departure_time);
  const arrMin = toMinutesSinceMidnight(bus.arrival_time);
  // Arrival can wrap past midnight (e.g. a 10 PM bus arriving 3 AM) —
  // normalise so the interpolation below always moves forward in time.
  const totalTripMin = arrMin >= depMin ? arrMin - depMin : (1440 - depMin) + arrMin;

  const knownStopCoords = stops
    .map((name, idx) => ({ name, idx, latlng: STOP_COORDS[name] }))
    .filter((s) => Array.isArray(s.latlng));

  if (knownStopCoords.length < 2) {
    containerEl.innerHTML = `<div class="map-fallback">Is route ke stops ka map data abhi uplabdh nahi hai.</div>`;
    return;
  }

  const map = L.map(containerId, { scrollWheelZoom: false }).setView(knownStopCoords[0].latlng, 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const polyline = L.polyline(
    knownStopCoords.map((s) => s.latlng),
    { color: "#B4472C", weight: 4, opacity: 0.85, lineJoin: "round" }
  ).addTo(map);

  knownStopCoords.forEach((s) => {
    const isTerminal = s.idx === 0 || s.idx === stops.length - 1;
    const estMin = stops.length > 1 ? depMin + (totalTripMin * s.idx) / (stops.length - 1) : depMin;
    const estMinNormalised = Math.round(estMin) % 1440;

    const icon = L.divIcon({
      className: "",
      html: `<div class="stop-pin ${isTerminal ? "terminal" : ""}"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    L.marker(s.latlng, { icon })
      .addTo(map)
      .bindPopup(`<strong>${s.name}</strong><br>Estimated Passing: ${formatClock(estMinNormalised)}`);
  });

  map.fitBounds(polyline.getBounds(), { padding: [28, 28] });
  mapInstances[bus.bus_id] = map;
}

// -----------------------------------------------------
// Step 3b — Live GPS ("Inside Bus") tracker
// -----------------------------------------------------
function toggleGpsTracking(bus, card) {
  const busId = bus.bus_id;
  if (gpsWatches[busId] !== undefined) {
    stopGpsTracking(busId, card);
  } else {
    startGpsTracking(bus, card);
  }
}

function startGpsTracking(bus, card) {
  const busId = bus.bus_id;
  const btn = card.querySelector(".gps-toggle-btn");
  const statusEl = card.querySelector(".gps-status");

  if (!("geolocation" in navigator)) {
    if (statusEl) {
      statusEl.hidden = false;
      statusEl.innerHTML = `<span class="gps-chip gps-error">Geolocation is browser mein support nahi hai.</span>`;
    }
    return;
  }

  // Make sure the map exists before we try to drop a marker on it.
  initOrRefreshRouteMap(bus);

  if (btn) {
    btn.classList.add("active");
    btn.innerHTML = "🛑 Stop Tracking";
  }
  if (statusEl) {
    statusEl.hidden = false;
    statusEl.innerHTML = `<span class="gps-chip gps-speed">Speed: —</span><span class="gps-chip gps-accuracy">Locating…</span>`;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => handleGpsSuccess(bus, card, position),
    (error) => handleGpsError(bus, card, error),
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
  );

  gpsWatches[busId] = watchId;
}

function stopGpsTracking(busId, card) {
  if (gpsWatches[busId] !== undefined) {
    navigator.geolocation.clearWatch(gpsWatches[busId]);
    delete gpsWatches[busId];
  }

  const map = mapInstances[busId];
  if (map && gpsMarkers[busId]) {
    map.removeLayer(gpsMarkers[busId]);
    delete gpsMarkers[busId];
  }

  if (card) {
    const btn = card.querySelector(".gps-toggle-btn");
    const statusEl = card.querySelector(".gps-status");
    if (btn) {
      btn.classList.remove("active");
      btn.innerHTML = "📍 Inside Bus (Track My Location)";
    }
    if (statusEl) {
      statusEl.hidden = true;
      statusEl.innerHTML = "";
    }
  }
}

function handleGpsSuccess(bus, card, position) {
  const busId = bus.bus_id;
  const { latitude, longitude, speed, accuracy } = position.coords;
  const map = mapInstances[busId];
  if (!map) return;

  const latlng = [latitude, longitude];

  if (gpsMarkers[busId]) {
    gpsMarkers[busId].setLatLng(latlng);
  } else {
    const icon = L.divIcon({
      className: "",
      html: `<div class="live-user-dot"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    gpsMarkers[busId] = L.marker(latlng, { icon, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup("Aap yahan hain");
  }

  map.panTo(latlng, { animate: true });

  const statusEl = card ? card.querySelector(".gps-status") : null;
  if (statusEl) {
    const speedKmh = typeof speed === "number" && speed !== null ? (speed * 3.6).toFixed(1) : "—";
    const accuracyM = typeof accuracy === "number" ? Math.round(accuracy) : "—";
    statusEl.hidden = false;
    statusEl.innerHTML = `<span class="gps-chip gps-speed">Speed: ${speedKmh} km/h</span><span class="gps-chip gps-accuracy">Accuracy: ±${accuracyM} m</span>`;
  }
}

function handleGpsError(bus, card, error) {
  const statusEl = card ? card.querySelector(".gps-status") : null;
  let message = "Location fetch nahi ho paya.";
  if (error && error.code === error.PERMISSION_DENIED) {
    message = "Location access allow nahi hai. Browser settings check karein.";
  } else if (error && error.code === error.POSITION_UNAVAILABLE) {
    message = "Abhi location uplabdh nahi hai.";
  } else if (error && error.code === error.TIMEOUT) {
    message = "Location dhoondne mein zyada samay lag raha hai.";
  }
  if (statusEl) {
    statusEl.hidden = false;
    statusEl.innerHTML = `<span class="gps-chip gps-error">${message}</span>`;
  }
}

// -----------------------------------------------------
// Live clock (updates every second)
// -----------------------------------------------------
function tickClock() {
  if (!el.liveClock) return;
  el.liveClock.textContent = formatClock(getNowMinutes());
}

// -----------------------------------------------------
// Events
// -----------------------------------------------------
el.swapBtn.addEventListener("click", () => {
  const currentFrom = el.fromSelect.value;
  el.fromSelect.value = el.toSelect.value;
  el.toSelect.value = currentFrom;
  search(true);
});

el.searchBtn.addEventListener("click", () => search(true));

// Autocomplete inputs: fire a fresh search only once the typed
// text exactly matches a known place (from suggestions or an
// exact manual match) — avoids re-searching on every keystroke
// while the person is still mid-typo. Wired up in Init, below,
// AFTER populateCityDropdowns() has swapped the <select>s for
// real <input> elements — attaching here would bind to the
// soon-to-be-removed <select>s instead.
function wireAutocompleteInput(inputEl) {
  inputEl.addEventListener("input", () => {
    if (ALL_SEARCHABLE_NAMES.has(inputEl.value.trim())) {
      search(true);
    }
  });
  inputEl.addEventListener("change", () => search(true));
}

el.togglePastBtn.addEventListener("click", () => {
  showPastBuses = !showPastBuses;
  el.pastBusList.classList.toggle("collapsed", !showPastBuses);
  const countMatch = el.togglePastBtn.textContent.match(/\((\d+)\)/);
  const count = countMatch ? countMatch[1] : el.pastBusList.children.length;
  const icon = showPastBuses ? "▴" : "▾";
  el.togglePastBtn.innerHTML = `<span class="toggle-icon">${icon}</span> ${
    showPastBuses ? "Past buses chhupayein" : "Pehle nikal chuki buses dekhein"
  } (${count})`;
});

// -----------------------------------------------------
// Init
// -----------------------------------------------------
populateCityDropdowns();
wireAutocompleteInput(el.fromSelect);
wireAutocompleteInput(el.toSelect);
pickSensibleDefaults();
search(true);
tickClock();
setInterval(tickClock, 1000);

// Re-run the active search periodically (without resetting
// "Load More" pagination) so NEXT BUS / countdowns stay
// accurate. We skip this refresh entirely while any card's
// map is open or GPS tracking is running, so we never yank
// a Leaflet map or geolocation watch out from under a user
// who is actively viewing/riding a route.
setInterval(() => {
  const somethingLiveIsOpen = expandedMapIds.size > 0 || Object.keys(gpsWatches).length > 0;
  if (el.fromSelect.value && el.toSelect.value && !somethingLiveIsOpen) {
    search(false);
  }
}, 15000);
