// =====================================================
// js/map.js
// Thin, reusable wrapper around Leaflet for UP BusKhoj.
// Depends on:
//   - STOP_COORDS (from js/stops_coords.js, loaded first)
//   - the global `L` (from the Leaflet CDN, loaded in <head>)
// Exposes:
//   - renderRouteMap(containerId, stopNames)
//   - trackUserLiveLocation(mapInstance, onUpdate, onError)
//   - stopTrackingUserLocation(mapInstance)
// =====================================================

// Keeps one Leaflet map instance per container so calling
// renderRouteMap() again on the same containerId (e.g. the
// person opens the map modal for a different bus) cleanly
// replaces the old map instead of throwing Leaflet's
// "Map container is already initialized" error.
const _routeMapRegistry = {};

/**
 * Draws a route on the map: connects `stopNames` in order
 * with a polyline and drops a marker on each stop that has
 * known coordinates. Stops missing from STOP_COORDS are
 * skipped (not fabricated) so a route never renders a wrong
 * position.
 *
 * @param {string} containerId - id of an empty <div> already in the DOM.
 * @param {string[]} stopNames - ordered stop names, e.g. ["Deoria", "Baitalpur", ...].
 * @returns {L.Map|null} the Leaflet map instance, or null if there
 *   weren't at least 2 stops with known coordinates to draw.
 */
function renderRouteMap(containerId, stopNames) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`[map.js] renderRouteMap: no element with id "${containerId}"`);
    return null;
  }

  // Clean up any previous map bound to this container.
  if (_routeMapRegistry[containerId]) {
    stopTrackingUserLocation(_routeMapRegistry[containerId]);
    try {
      _routeMapRegistry[containerId].remove();
    } catch (e) {
      /* already gone — safe to ignore */
    }
    delete _routeMapRegistry[containerId];
  }
  container.innerHTML = "";

  const stops = (stopNames || [])
    .map((name) => ({ name, coord: STOP_COORDS[name] }))
    .filter((s) => Array.isArray(s.coord));

  if (stops.length < 2) {
    container.innerHTML =
      '<div class="map-unavailable">Is route ke stops ka map data abhi available nahi hai.</div>';
    return null;
  }

  const map = L.map(containerId, { zoomControl: true, attributionControl: true });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const latlngs = stops.map((s) => s.coord);
  const polyline = L.polyline(latlngs, {
    color: "#146356",
    weight: 4,
    opacity: 0.85,
    lineJoin: "round",
  }).addTo(map);

  stops.forEach((s, i) => {
    const kind = i === 0 ? "origin" : i === stops.length - 1 ? "destination" : "mid";
    L.marker(s.coord, { icon: _stopIcon(kind) })
      .addTo(map)
      .bindPopup(`<strong>${s.name}</strong>`);
  });

  map.fitBounds(polyline.getBounds(), { padding: [24, 24] });

  _routeMapRegistry[containerId] = map;

  // Leaflet sometimes mis-measures tiles if the container's
  // final size settles a moment after init (e.g. a modal's
  // open animation). One safety re-check is cheap and fixes it.
  setTimeout(() => {
    try {
      map.invalidateSize();
    } catch (e) {
      /* map may have been closed already — safe to ignore */
    }
  }, 300);

  return map;
}

/**
 * Starts watching the device's live GPS position and shows it
 * as a marker on `mapInstance`, re-centering the map on every
 * update. Call stopTrackingUserLocation(mapInstance) to stop.
 *
 * @param {L.Map} mapInstance - a map returned by renderRouteMap().
 * @param {(info: {latitude:number, longitude:number, speedKmh:number|null, accuracy:number|null}) => void} [onUpdate]
 * @param {(error: {code?:number, message:string}) => void} [onError]
 * @returns {number|null} the geolocation watch id, or null if tracking couldn't start.
 */
function trackUserLiveLocation(mapInstance, onUpdate, onError) {
  if (!mapInstance) return null;

  if (!("geolocation" in navigator)) {
    if (onError) onError({ message: "Is browser/device par GPS location available nahi hai." });
    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, speed, accuracy } = position.coords;
      const latlng = [latitude, longitude];

      if (mapInstance._buskhojLiveMarker) {
        mapInstance._buskhojLiveMarker.setLatLng(latlng);
      } else {
        mapInstance._buskhojLiveMarker = L.marker(latlng, { icon: _liveUserIcon() }).addTo(mapInstance);
      }

      const currentZoom = typeof mapInstance.getZoom === "function" ? mapInstance.getZoom() : 13;
      mapInstance.setView(latlng, Math.max(currentZoom || 13, 13));

      if (onUpdate) {
        onUpdate({
          latitude,
          longitude,
          speedKmh: typeof speed === "number" && speed !== null ? Math.round(speed * 3.6 * 10) / 10 : null,
          accuracy: typeof accuracy === "number" ? Math.round(accuracy) : null,
        });
      }
    },
    (error) => {
      if (onError) onError(error);
    },
    { enableHighAccuracy: true, maximumAge: 2000, timeout: 15000 }
  );

  mapInstance._buskhojWatchId = watchId;
  return watchId;
}

/**
 * Stops any active GPS watch on `mapInstance` and removes the
 * live-position marker it was updating.
 * @param {L.Map} mapInstance
 */
function stopTrackingUserLocation(mapInstance) {
  if (!mapInstance) return;

  if (mapInstance._buskhojWatchId != null && "geolocation" in navigator) {
    navigator.geolocation.clearWatch(mapInstance._buskhojWatchId);
    mapInstance._buskhojWatchId = null;
  }
  if (mapInstance._buskhojLiveMarker) {
    try {
      mapInstance.removeLayer(mapInstance._buskhojLiveMarker);
    } catch (e) {
      /* map may already be removed — safe to ignore */
    }
    mapInstance._buskhojLiveMarker = null;
  }
}

// -----------------------------------------------------
// Internal icon helpers — plain CSS divIcons, no external
// marker image assets to keep loading (and this file)
// dependency-free beyond the Leaflet CDN itself.
// -----------------------------------------------------
function _stopIcon(kind) {
  const size = kind === "mid" ? 14 : 20;
  return L.divIcon({
    className: "",
    html: `<div class="stop-pin ${kind}"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function _liveUserIcon() {
  return L.divIcon({
    className: "",
    html: '<div class="live-user-marker"><div class="live-user-ring"></div><div class="live-user-dot"></div></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}
