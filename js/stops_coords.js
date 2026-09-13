// Master Directory of All 75 Districts & Their Tehsils/Stops
const DISTRICT_STOPS = {
  "Deoria": [
    "Deoria Sadar Bus Station", "Salempur Bus Stand", "Rudrapur Bus Station", "Barhaj Bus Stand",
    "Bhatpar Rani", "Lar Road / Lar", "Bhatni Bus Stand", "Gauri Bazar", "Baitalpur",
    "Tarkulwa", "Rampur Karkhana", "Khukhundoo", "Bhagalpur", "Kaparwar Ghat", "Mail", "Mehrauna Ghat"
  ],
  "Gorakhpur": [
    "Gorakhpur Railway Bus Station", "Gorakhpur Kachehri Bus Station", "Nausad Bus Station",
    "Mohaddipur Chowk Bus Stop", "Medical College (BRD) Bus Stop", "Sahjanwa Bus Stand",
    "Chauri Chaura Bus Stand", "Bansgaon Bus Stand", "Gola Bazar Bus Station",
    "Barhalganj Bus Station", "Campierganj Bus Stand", "Khajni Bus Stop", "Kauriram Bus Stop"
  ],
  "Kushinagar": [
    "Padrauna Bus Station", "Kasya (Kushinagar)", "Hata Bus Stand", "Tamkuhi Road",
    "Fazilnagar", "Kaptanganj", "Severahi", "Khadda"
  ],
  "Maharajganj": [
    "Maharajganj Main Roadways Stand", "Nautanwa Bus Stand", "Sonauli (Nepal Border)",
    "Nichlaul", "Anandnagar (Pharenda)", "Siswa Bazar", "Gadaura"
  ],
  "Basti": [
    "Basti Main Bus Station", "Harraiya Bus Stand", "Babhnan", "Captainganj (Basti)",
    "Rudhauli", "Bhanpur", "Chhawani Chauraha"
  ],
  "Sant Kabir Nagar": [
    "Khalilabad Main Bus Station", "Mehdawal Bus Stand", "Dhanghata", "Maghar", "Bakhira"
  ],
  "Siddharthnagar": [
    "Naugarh (Siddharthnagar Bus Stand)", "Bansi Bus Station", "Itwa", "Domariyaganj",
    "Shohratgarh", "Barhni (Nepal Border)", "Uska Bazar"
  ],
  "Azamgarh": [
    "Azamgarh Main Roadways Station", "Lalganj Bus Stand", "Phoolpur Bus Stand",
    "Sagri (Jiyanpur)", "Mehnagar", "Mubarakpur", "Atraulia", "Bilariyaganj"
  ],
  "Mau": [
    "Mau Main Roadways Bus Stand", "Ghosi Bus Stop", "Muhammadabad Gohna",
    "Madhuban", "Kopaganj", "Dohrighat"
  ],
  "Ballia": [
    "Ballia Main Roadways Stand", "Rasra Bus Stand", "Bairia Bus Stop",
    "Bansdih", "Belthara Road", "Sikanderpur"
  ],
  "Varanasi": [
    "Varanasi Cantt ISBT", "Kashi Bus Depot", "Chitbaragaon", "Golagaddah Bus Stand",
    "Pindra Tehsil", "Raja Talab", "Babatpur Airport Road"
  ],
  "Lucknow": [
    "Alambagh ISBT", "Charbagh Bus Stand", "Qaiserbagh Bus Stand", "Kamta Bus Stand",
    "Awadh Bus Stand (Polytechnic)", "Mohanlalganj", "Bakshi Ka Talab (BKT)", "Malihabad"
  ],
  "Ayodhya": [
    "Ayodhya Dham Bus Station", "Faizabad Civil Lines Bus Station", "Rudauli Bus Stand",
    "Bikapur", "Milkipur", "Sohawal", "Pura Bazar"
  ],
  "Prayagraj": [
    "Civil Lines Bus Station", "Zero Road Bus Station", "Leader Road Bus Stand",
    "Phulpur", "Soraon", "Handia", "Karchhana", "Meja Road", "Koraon"
  ],
  "Kanpur Nagar": [
    "Jhakarkati Central Bus Station", "Chunni Ganj Bus Stand", "Rawatpur Bus Stop",
    "Bilhaur", "Ghatampur", "Bithoor", "Kalyanpur"
  ],
  "Agra": [
    "ISBT Agra (Transport Nagar)", "Idgah Bus Stand", "Fort Bus Stand",
    "Fatehabad", "Kheragarh", "Bah", "Etmadpur", "Kiraoli"
  ],
  "Aligarh": [
    "Sootmil Bus Stand", "Gandhi Park Bus Stand", "Masoodabad Bus Stand",
    "Khair", "Atrauli", "Iglas", "Gabhana"
  ],
  "Meerut": [
    "Bhainsali Bus Stand", "Sohrab Gate Bus Stand", "Begum Bridge",
    "Mawana", "Sardhana", "Partapur Chauraha"
  ],
  "Bareilly": [
    "Satellite Bus Station", "Old Bus Stand Bareilly", "Ruhelkhand University Gate",
    "Baheri", "Aonla", "Nawabganj", "Faridpur", "Mirganj"
  ],
  "Moradabad": [
    "Moradabad Main Bus Stand", "Pital Nagri Depot", "Kanth", "Thakurdwara", "Bilari"
  ],
  "Saharanpur": [
    "Saharanpur Main Bus Stand", "Deoband Bus Stand", "Nakur", "Behat", "Rampur Maniharan"
  ],
  "Ghaziabad": [
    "Old Bus Stand Ghaziabad", "Kaushambi ISBT", "Mohan Nagar", "Modinagar", "Loni"
  ],
  "Gautam Buddha Nagar": [
    "Sector 37 Bus Stop Noida", "Botanical Garden Chauraha", "Pari Chowk Greater Noida",
    "Jewar Bus Stand", "Dadri"
  ]
};

// Auto-fill remaining districts with their HQ & Tehsil stops so that all 75 work out of the box
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

ALL_75_DISTRICTS.forEach(dist => {
  if (!DISTRICT_STOPS[dist]) {
    DISTRICT_STOPS[dist] = [
      `${dist} Main Roadways Bus Stand`,
      `${dist} Kachehri / Civil Lines`,
      `${dist} Tehsil Chauraha`,
      `${dist} Bypass Chauraha`
    ];
  }
});
