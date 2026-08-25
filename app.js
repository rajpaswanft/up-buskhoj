// =====================================================
// UP BusKhoj — app.js
// "Time-Aware Schedule System" (Where Is My Train style)
//
// Everything is data-driven from BUS_DATA below — no
// fetch(), no build step. Add a route/slot to BUS_DATA
// and it flows through dropdowns, search, and the
// live NEXT BUS / countdown logic automatically.
// =====================================================

const BUS_DATA = [
  { bus_id: "DEO-GOR-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "04:30 AM", arrival_time: "05:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:00 AM", arrival_time: "06:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:30 AM", arrival_time: "06:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:00 AM", arrival_time: "07:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:30 AM", arrival_time: "07:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:00 AM", arrival_time: "08:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:30 AM", arrival_time: "08:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:00 AM", arrival_time: "09:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:30 AM", arrival_time: "09:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:00 AM", arrival_time: "10:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-11", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:30 AM", arrival_time: "10:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-12", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:00 AM", arrival_time: "11:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-13", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "11:00 AM", arrival_time: "12:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-14", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "12:00 PM", arrival_time: "01:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-15", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "01:00 PM", arrival_time: "02:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-16", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "02:00 PM", arrival_time: "03:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-17", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "03:00 PM", arrival_time: "04:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-18", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "04:00 PM", arrival_time: "05:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-19", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "05:00 PM", arrival_time: "06:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-20", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "06:00 PM", arrival_time: "07:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-21", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:00 PM", arrival_time: "08:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-22", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "08:00 PM", arrival_time: "09:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-23", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "09:00 PM", arrival_time: "10:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-24", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:00 PM", arrival_time: "11:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-ORD-25", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "10:30 PM", arrival_time: "11:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "DEO-GOR-JAN-01", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:00 AM", arrival_time: "08:05 AM", duration: "1h 5m", fare: 115, frequency: "4 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-02", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "11:00 AM", arrival_time: "12:05 PM", duration: "1h 5m", fare: 115, frequency: "4 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-03", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "03:00 PM", arrival_time: "04:05 PM", duration: "1h 5m", fare: 115, frequency: "4 fixed AC trips daily" },
  { bus_id: "DEO-GOR-JAN-04", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Gorakhpur", via_stops: ["Chauri Chaura", "Baitalpur", "Gauri Bazar"], departure_time: "07:30 PM", arrival_time: "08:35 PM", duration: "1h 5m", fare: 115, frequency: "4 fixed AC trips daily" },
  { bus_id: "GOR-DEO-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "04:30 AM", arrival_time: "05:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:00 AM", arrival_time: "06:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:30 AM", arrival_time: "06:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:00 AM", arrival_time: "07:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:30 AM", arrival_time: "07:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:00 AM", arrival_time: "08:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:30 AM", arrival_time: "08:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:00 AM", arrival_time: "09:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:30 AM", arrival_time: "09:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:00 AM", arrival_time: "10:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-11", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:30 AM", arrival_time: "10:45 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-12", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:00 AM", arrival_time: "11:15 AM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-13", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "11:00 AM", arrival_time: "12:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-14", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "12:00 PM", arrival_time: "01:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-15", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "01:00 PM", arrival_time: "02:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-16", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "02:00 PM", arrival_time: "03:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-17", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "03:00 PM", arrival_time: "04:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-18", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "04:00 PM", arrival_time: "05:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-19", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "05:00 PM", arrival_time: "06:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-20", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "06:00 PM", arrival_time: "07:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-21", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:00 PM", arrival_time: "08:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-22", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "08:00 PM", arrival_time: "09:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-23", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "09:00 PM", arrival_time: "10:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-24", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:00 PM", arrival_time: "11:15 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-ORD-25", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "10:30 PM", arrival_time: "11:45 PM", duration: "1h 15m", fare: 80, frequency: "Har 30-45 minute par" },
  { bus_id: "GOR-DEO-JAN-01", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:00 AM", arrival_time: "08:05 AM", duration: "1h 5m", fare: 115, frequency: "4 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-02", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "11:00 AM", arrival_time: "12:05 PM", duration: "1h 5m", fare: 115, frequency: "4 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-03", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "03:00 PM", arrival_time: "04:05 PM", duration: "1h 5m", fare: 115, frequency: "4 fixed AC trips daily" },
  { bus_id: "GOR-DEO-JAN-04", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Deoria", via_stops: ["Gauri Bazar", "Baitalpur", "Chauri Chaura"], departure_time: "07:30 PM", arrival_time: "08:35 PM", duration: "1h 5m", fare: 115, frequency: "4 fixed AC trips daily" },
  { bus_id: "GOR-LKO-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "05:00 AM", arrival_time: "10:30 AM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "06:30 AM", arrival_time: "12:00 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "08:00 AM", arrival_time: "01:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "09:30 AM", arrival_time: "03:00 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "11:00 AM", arrival_time: "04:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "01:00 PM", arrival_time: "06:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "03:00 PM", arrival_time: "08:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "05:00 PM", arrival_time: "10:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "07:00 PM", arrival_time: "12:30 AM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "09:00 PM", arrival_time: "02:30 AM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-LKO-JAN-01", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "06:00 AM", arrival_time: "11:00 AM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "GOR-LKO-JAN-02", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "10:00 AM", arrival_time: "03:00 PM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "GOR-LKO-JAN-03", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "02:00 PM", arrival_time: "07:00 PM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "GOR-LKO-JAN-04", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "06:00 PM", arrival_time: "11:00 PM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "GOR-LKO-JAN-05", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Gorakhpur", to: "Lucknow", via_stops: ["Khalilabad", "Basti", "Ayodhya", "Barabanki"], departure_time: "10:00 PM", arrival_time: "03:00 AM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-GOR-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "05:00 AM", arrival_time: "10:30 AM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "06:30 AM", arrival_time: "12:00 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "08:00 AM", arrival_time: "01:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "09:30 AM", arrival_time: "03:00 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "11:00 AM", arrival_time: "04:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "01:00 PM", arrival_time: "06:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "03:00 PM", arrival_time: "08:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "05:00 PM", arrival_time: "10:30 PM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "07:00 PM", arrival_time: "12:30 AM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "09:00 PM", arrival_time: "02:30 AM", duration: "5h 30m", fare: 486, frequency: "Din mein 10 trips" },
  { bus_id: "LKO-GOR-JAN-01", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "06:00 AM", arrival_time: "11:00 AM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-GOR-JAN-02", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "10:00 AM", arrival_time: "03:00 PM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-GOR-JAN-03", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "02:00 PM", arrival_time: "07:00 PM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-GOR-JAN-04", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "06:00 PM", arrival_time: "11:00 PM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-GOR-JAN-05", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Gorakhpur", via_stops: ["Barabanki", "Ayodhya", "Basti", "Khalilabad"], departure_time: "10:00 PM", arrival_time: "03:00 AM", duration: "5h", fare: 608, frequency: "Din mein 5 trips" },
  { bus_id: "GOR-KSN-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "05:30 AM", arrival_time: "06:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "06:30 AM", arrival_time: "07:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "07:30 AM", arrival_time: "08:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "08:30 AM", arrival_time: "09:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "10:00 AM", arrival_time: "11:20 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "12:00 PM", arrival_time: "01:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "02:00 PM", arrival_time: "03:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "04:00 PM", arrival_time: "05:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "06:00 PM", arrival_time: "07:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-KSN-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Kushinagar", via_stops: ["Hata"], departure_time: "08:00 PM", arrival_time: "09:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "05:30 AM", arrival_time: "06:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "06:30 AM", arrival_time: "07:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "07:30 AM", arrival_time: "08:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "08:30 AM", arrival_time: "09:50 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "10:00 AM", arrival_time: "11:20 AM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "12:00 PM", arrival_time: "01:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "02:00 PM", arrival_time: "03:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "04:00 PM", arrival_time: "05:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "06:00 PM", arrival_time: "07:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "KSN-GOR-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Kushinagar", to: "Gorakhpur", via_stops: ["Hata"], departure_time: "08:00 PM", arrival_time: "09:20 PM", duration: "1h 20m", fare: 60, frequency: "Har 25-30 minute par" },
  { bus_id: "GOR-VNS-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "05:00 AM", arrival_time: "09:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "07:00 AM", arrival_time: "11:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "09:00 AM", arrival_time: "01:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "11:00 AM", arrival_time: "03:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "01:00 PM", arrival_time: "05:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "03:00 PM", arrival_time: "07:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "05:00 PM", arrival_time: "09:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "07:00 PM", arrival_time: "11:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "09:00 PM", arrival_time: "01:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-VNS-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Varanasi", via_stops: ["Azamgarh", "Mau"], departure_time: "10:30 PM", arrival_time: "03:15 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "05:00 AM", arrival_time: "09:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "07:00 AM", arrival_time: "11:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "09:00 AM", arrival_time: "01:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "11:00 AM", arrival_time: "03:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "01:00 PM", arrival_time: "05:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "03:00 PM", arrival_time: "07:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "05:00 PM", arrival_time: "09:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "07:00 PM", arrival_time: "11:45 PM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "09:00 PM", arrival_time: "01:45 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "VNS-GOR-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Gorakhpur", via_stops: ["Mau", "Azamgarh"], departure_time: "10:30 PM", arrival_time: "03:15 AM", duration: "4h 45m", fare: 320, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "05:30 AM", arrival_time: "10:45 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "07:30 AM", arrival_time: "12:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "09:30 AM", arrival_time: "02:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "11:30 AM", arrival_time: "04:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "01:30 PM", arrival_time: "06:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "03:30 PM", arrival_time: "08:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "05:30 PM", arrival_time: "10:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "07:30 PM", arrival_time: "12:45 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "09:00 PM", arrival_time: "02:15 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "10:00 PM", arrival_time: "03:15 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "05:30 AM", arrival_time: "10:45 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "07:30 AM", arrival_time: "12:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "09:30 AM", arrival_time: "02:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "11:30 AM", arrival_time: "04:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "01:30 PM", arrival_time: "06:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-06", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "03:30 PM", arrival_time: "08:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-07", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "05:30 PM", arrival_time: "10:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-08", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "07:30 PM", arrival_time: "12:45 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-09", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "09:00 PM", arrival_time: "02:15 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-10", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "10:00 PM", arrival_time: "03:15 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "DEO-LKO-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "05:00 AM", arrival_time: "11:30 AM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "09:00 AM", arrival_time: "03:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "01:00 PM", arrival_time: "07:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "05:00 PM", arrival_time: "11:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "09:00 PM", arrival_time: "03:30 AM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "DEO-LKO-JAN-01", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "07:00 AM", arrival_time: "01:00 PM", duration: "6h", fare: 608, frequency: "Din mein 2 trips" },
  { bus_id: "DEO-LKO-JAN-02", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Lucknow", via_stops: ["Gorakhpur", "Ayodhya"], departure_time: "03:00 PM", arrival_time: "09:00 PM", duration: "6h", fare: 608, frequency: "Din mein 2 trips" },
  { bus_id: "LKO-DEO-ORD-01", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "05:00 AM", arrival_time: "11:30 AM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-ORD-02", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "09:00 AM", arrival_time: "03:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-ORD-03", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "01:00 PM", arrival_time: "07:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-ORD-04", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "05:00 PM", arrival_time: "11:30 PM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-ORD-05", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "09:00 PM", arrival_time: "03:30 AM", duration: "6h 30m", fare: 497, frequency: "Din mein 5 trips" },
  { bus_id: "LKO-DEO-JAN-01", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "07:00 AM", arrival_time: "01:00 PM", duration: "6h", fare: 608, frequency: "Din mein 2 trips" },
  { bus_id: "LKO-DEO-JAN-02", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Lucknow", to: "Deoria", via_stops: ["Ayodhya", "Gorakhpur"], departure_time: "03:00 PM", arrival_time: "09:00 PM", duration: "6h", fare: 608, frequency: "Din mein 2 trips" },
];
const BADGE_LABEL = {
  Ordinary: "UPSRTC Sadharan",
  Janrath: "Janrath 2x2 AC",
  Shatabdi: "Shatabdi (Premium AC)",
  "Pink Express": "UP Pink Express",
};

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
// Dropdown population — entirely data-driven
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
// Time helpers — the heart of the time-aware system
// -----------------------------------------------------

// Parses "04:30 AM" / "9:00 PM" style strings into
// minutes-since-midnight (0-1439).
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

// Reads the device's current local time.
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

// "Departs in 18 min" / "Departs in 2h 5m" / "Boarding Now"
function formatCountdown(diffMin) {
  if (diffMin <= 1) return "Boarding Now";
  if (diffMin < 60) return `Departs in ${diffMin} min`;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return m > 0 ? `Departs in ${h}h ${m}m` : `Departs in ${h}h`;
}

// "45 min ago" / "2h 10m ago" for past buses
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

// Pure logic (no DOM) so it's easy to reason about / test:
// splits matches into upcoming (sorted soonest-first) and
// past (sorted most-recently-departed-first) relative to
// nowMinutes, and flags the single soonest upcoming bus.
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
// Search + render
// -----------------------------------------------------
function search() {
  const from = el.fromSelect.value;
  const to = el.toSelect.value;

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

  // ---- upcoming buses ----
  if (upcoming.length === 0) {
    el.busList.appendChild(renderNoMoreBusesToday(from, to, matches, nowMinutes));
  } else {
    el.busList.classList.add("has-timeline");
    upcoming.forEach(({ bus, depMin }, idx) => {
      const isNext = idx === 0;
      const countdownText = formatCountdown(depMin - nowMinutes);
      el.busList.appendChild(renderBusCard(bus, from, to, { state: isNext ? "next" : "upcoming", countdownText }));
    });
  }

  // ---- past buses (toggle-controlled) ----
  if (past.length > 0) {
    el.togglePastBtn.hidden = false;
    el.pastBusList.classList.add("has-timeline");
    past.forEach(({ bus, depMin }) => {
      const agoText = formatAgo(nowMinutes - depMin);
      el.pastBusList.appendChild(renderBusCard(bus, from, to, { state: "past", countdownText: agoText }));
    });
  }

  updateToggleButton(past.length);
}

function updateToggleButton(pastCount) {
  const icon = showPastBuses ? "▴" : "▾";
  el.togglePastBtn.innerHTML = `<span class="toggle-icon">${icon}</span> ${
    showPastBuses ? "Past buses chhupayein" : "Pehle nikal chuki buses dekhein"
  } (${pastCount})`;
  el.pastBusList.classList.toggle("collapsed", !showPastBuses);
}

// -----------------------------------------------------
// Rendering
// -----------------------------------------------------
function renderBusCard(bus, searchFrom, searchTo, { state, countdownText }) {
  const route = fullRoute(bus);
  const isPartialTrip = bus.from !== searchFrom || bus.to !== searchTo;
  const badgeText = BADGE_LABEL[bus.bus_type] || bus.bus_name || bus.bus_type;
  const viaStops = Array.isArray(bus.via_stops) ? bus.via_stops : [];

  const card = document.createElement("div");
  card.className = `bus-card ${state}-bus`;
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
      <button class="track-btn" type="button">Route / Live Track</button>
    </div>
  `;
  card.querySelector(".track-btn").addEventListener("click", () => {
    alert(`${bus.bus_id} — ${bus.bus_name}\nFull route: ${route.join(" → ")}\nFare: ₹${bus.fare}\nDeparture: ${bus.departure_time}`);
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
  search();
});

el.searchBtn.addEventListener("click", search);
el.fromSelect.addEventListener("change", search);
el.toSelect.addEventListener("change", search);

el.togglePastBtn.addEventListener("click", () => {
  showPastBuses = !showPastBuses;
  el.pastBusList.classList.toggle("collapsed", !showPastBuses);
  const countText = el.togglePastBtn.textContent.match(/\((\d+)\)/);
  const count = countText ? countText[1] : el.pastBusList.children.length;
  const icon = showPastBuses ? "▴" : "▾";
  el.togglePastBtn.innerHTML = `<span class="toggle-icon">${icon}</span> ${
    showPastBuses ? "Past buses chhupayein" : "Pehle nikal chuki buses dekhein"
  } (${count})`;
});

// -----------------------------------------------------
// Init
// -----------------------------------------------------
populateCityDropdowns();
pickSensibleDefaults();
search();
tickClock();
setInterval(tickClock, 1000);
// Re-run the active search periodically so the NEXT BUS
// badge and countdowns stay accurate as time passes.
setInterval(() => {
  if (el.fromSelect.value && el.toSelect.value) search();
}, 15000);
