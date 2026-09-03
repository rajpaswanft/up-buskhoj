// =====================================================
// js/stops_coords.js
// Lat/Long for every stop the base network currently
// covers. Loaded before map.js and app.js since both
// depend on this global STOP_COORDS object.
//
// To add a new stop: add one line here with its
// [latitude, longitude], then reference it in a route's
// stop list anywhere else in the app.
// =====================================================

const STOP_COORDS = {
  "Deoria": [26.5020, 83.7791],
  "Baitalpur": [26.5505, 83.7431],
  "Gauri Bazar": [26.5861, 83.6933],
  "Chauri Chaura": [26.6432, 83.6062],
  "Gorakhpur": [26.7588, 83.3813],
  "Mau": [25.9417, 83.5610],
  "Saidpur": [25.5833, 83.2833],
  "Varanasi": [25.3176, 82.9739],
  "Lucknow": [26.8467, 80.9462],
};
