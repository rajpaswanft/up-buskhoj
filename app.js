// =====================================================
// UP BusKhoj — app.js
// Time-Aware Schedule System + realistic high-frequency
// UPSRTC dataset (Deoria<->Gorakhpur runs every 15-20 min,
// 140+ trips/day across both directions incl. passing
// buses). To keep the UI clean, only the NEXT BUS + next
// 5-6 upcoming slots are shown by default, with a
// "Load More Buses" button to reveal more — no clutter.
//
// Everything is data-driven from BUS_DATA below — no
// fetch(), no build step, no HTML/CSS changes needed
// (the Load More buttons are created dynamically here,
// reusing the existing .toggle-past-btn style).
// =====================================================

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
  { bus_id: "DEO-VNS-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "05:00 AM", arrival_time: "08:30 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "05:45 AM", arrival_time: "09:15 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "06:30 AM", arrival_time: "09:40 AM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "07:15 AM", arrival_time: "10:45 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "08:00 AM", arrival_time: "11:30 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "08:45 AM", arrival_time: "11:55 AM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "09:30 AM", arrival_time: "01:00 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "10:15 AM", arrival_time: "01:45 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "11:00 AM", arrival_time: "02:10 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "11:45 AM", arrival_time: "03:15 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "12:30 PM", arrival_time: "04:00 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-JAN-004", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "01:15 PM", arrival_time: "04:25 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "02:00 PM", arrival_time: "05:30 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "02:45 PM", arrival_time: "06:15 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-JAN-005", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "03:30 PM", arrival_time: "06:40 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "04:15 PM", arrival_time: "07:45 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "05:00 PM", arrival_time: "08:30 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-JAN-006", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "05:45 PM", arrival_time: "08:55 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "06:30 PM", arrival_time: "10:00 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "07:15 PM", arrival_time: "10:45 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-JAN-007", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "08:00 PM", arrival_time: "11:10 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "DEO-VNS-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Deoria", to: "Varanasi", via_stops: ["Salempur", "Ballia"], departure_time: "08:45 PM", arrival_time: "12:15 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "05:00 AM", arrival_time: "08:30 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "05:45 AM", arrival_time: "09:15 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-JAN-001", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "06:30 AM", arrival_time: "09:40 AM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "07:15 AM", arrival_time: "10:45 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "08:00 AM", arrival_time: "11:30 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-JAN-002", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "08:45 AM", arrival_time: "11:55 AM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "09:30 AM", arrival_time: "01:00 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "10:15 AM", arrival_time: "01:45 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-JAN-003", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "11:00 AM", arrival_time: "02:10 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "11:45 AM", arrival_time: "03:15 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "12:30 PM", arrival_time: "04:00 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-JAN-004", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "01:15 PM", arrival_time: "04:25 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "02:00 PM", arrival_time: "05:30 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "02:45 PM", arrival_time: "06:15 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-JAN-005", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "03:30 PM", arrival_time: "06:40 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-011", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "04:15 PM", arrival_time: "07:45 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-012", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "05:00 PM", arrival_time: "08:30 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-JAN-006", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "05:45 PM", arrival_time: "08:55 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-013", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "06:30 PM", arrival_time: "10:00 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-014", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "07:15 PM", arrival_time: "10:45 PM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-JAN-007", bus_name: "Janrath 2x2 AC", bus_type: "Janrath", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "08:00 PM", arrival_time: "11:10 PM", duration: "3h 10m", fare: 230, frequency: "Subah, dopahar aur shaam ke fixed slots" },
  { bus_id: "VNS-DEO-ORD-015", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Varanasi", to: "Deoria", via_stops: ["Ballia", "Salempur"], departure_time: "08:45 PM", arrival_time: "12:15 AM", duration: "3h 30m", fare: 180, frequency: "Subah, dopahar aur shaam ke fixed slots" },
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
  { bus_id: "GOR-PRG-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "05:30 AM", arrival_time: "10:45 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "07:30 AM", arrival_time: "12:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "09:30 AM", arrival_time: "02:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "11:30 AM", arrival_time: "04:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "01:30 PM", arrival_time: "06:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "03:30 PM", arrival_time: "08:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "05:30 PM", arrival_time: "10:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "07:30 PM", arrival_time: "12:45 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "09:00 PM", arrival_time: "02:15 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "GOR-PRG-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Gorakhpur", to: "Prayagraj", via_stops: ["Sultanpur"], departure_time: "10:00 PM", arrival_time: "03:15 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-001", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "05:30 AM", arrival_time: "10:45 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-002", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "07:30 AM", arrival_time: "12:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-003", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "09:30 AM", arrival_time: "02:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-004", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "11:30 AM", arrival_time: "04:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-005", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "01:30 PM", arrival_time: "06:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-006", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "03:30 PM", arrival_time: "08:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-007", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "05:30 PM", arrival_time: "10:45 PM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-008", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "07:30 PM", arrival_time: "12:45 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-009", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "09:00 PM", arrival_time: "02:15 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
  { bus_id: "PRG-GOR-ORD-010", bus_name: "UPSRTC Sadharan", bus_type: "Ordinary", from: "Prayagraj", to: "Gorakhpur", via_stops: ["Sultanpur"], departure_time: "10:00 PM", arrival_time: "03:15 AM", duration: "5h 15m", fare: 380, frequency: "Din mein 10 trips" },
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
// (also catches "passing" buses like Salempur/Bhatni
// services that travel through Deoria <-> Gorakhpur)
// -----------------------------------------------------
function findMatches(from, to) {
  return VALID_BUSES.filter((bus) => {
    const route = fullRoute(bus);
    const fromIdx = route.indexOf(from);
    const toIdx = route.indexOf(to);
    return fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx;
  });
}

// Pure logic (no DOM): splits matches into upcoming
// (soonest-first) and past (most-recently-departed-first).
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
// isNewQuery = true  -> user changed route/searched: reset "Load More" paging
// isNewQuery = false -> periodic auto-refresh: keep however much the user expanded
// -----------------------------------------------------
function search(isNewQuery = true) {
  const from = el.fromSelect.value;
  const to = el.toSelect.value;

  if (isNewQuery) {
    visibleUpcomingCount = PAGE_SIZE;
    visiblePastCount = PAGE_SIZE;
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

  // ---- upcoming buses (paginated: NEXT BUS + next 5-6, "Load More" for rest) ----
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

  // ---- past buses (toggle-controlled, also paginated) ----
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
  search(true);
});

el.searchBtn.addEventListener("click", () => search(true));
el.fromSelect.addEventListener("change", () => search(true));
el.toSelect.addEventListener("change", () => search(true));

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
pickSensibleDefaults();
search(true);
tickClock();
setInterval(tickClock, 1000);
// Re-run the active search periodically (without resetting
// "Load More" pagination) so NEXT BUS / countdowns stay
// accurate as time passes.
setInterval(() => {
  if (el.fromSelect.value && el.toSelect.value) search(false);
}, 15000);
