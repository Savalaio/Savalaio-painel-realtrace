import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const vehicleIcon = L.divIcon({
  className: "vehicle-marker",
  html: "🚛",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const vehicles = [
  {
    id: "V-102",
    position: [-1.4558, -48.4902],
    speed: "65 km/h",
    status: "Ligado",
    movement: "Em Movimento",
    location: "Varzea, Belém Senei, Belém Spread",
    driver: "15 eng Artts",
  },
  {
    id: "V-101",
    position: [-1.42, -48.50],
    speed: "0 km/h",
    status: "Parado",
    movement: "Estacionado",
    location: "Avenida Galvão",
    driver: "Marcos Lima",
  },
  {
    id: "V-098",
    position: [-1.48, -48.46],
    speed: "60 km/h",
    status: "Ligado",
    movement: "Em Movimento",
    location: "Veríssimo Veículos",
    driver: "Carlos Souza",
  },
  {
    id: "P221",
    position: [-1.44, -48.52],
    speed: "0 km/h",
    status: "Parado",
    movement: "Versão 0",
    location: "Vehicle P221",
    driver: "",
  },
  {
    id: "P21",
    position: [-1.47, -48.51],
    speed: "0 km/h",
    status: "Alerta",
    movement: "Alerta",
    location: "Vehicle P21",
    driver: "",
  },
];

export default function MapView() {
  const [blockedVehicles, setBlockedVehicles] = useState({});

  function handleBlock(vehicleId) {
    setBlockedVehicles((prev) => ({ ...prev, [vehicleId]: true }));
  }

  function handleUnblock(vehicleId) {
    setBlockedVehicles((prev) => ({ ...prev, [vehicleId]: false }));
  }

  return (
    <div className="map-container">
      <MapContainer
        center={[-1.4558, -48.4902]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />

        {vehicles.map((v) => {
          const isBlocked = blockedVehicles[v.id] || false;
          return (
            <Marker key={v.id} position={v.position} icon={vehicleIcon}>
              <Popup>
                <div className="vehicle-popup">
                  <div className="popup-header">
                    <strong>{v.id}</strong>
                    {isBlocked && <span className="popup-blocked-badge">BLOQUEADO</span>}
                  </div>
                  <div className="popup-body">
                    <p className="popup-location">Location: {v.location}</p>
                    <div className="popup-stats">
                      <span className="popup-speed">{v.speed}</span>
                      <span className={`popup-status ${v.status === "Ligado" ? "status-on" : "status-off"}`}>
                        {v.status}
                      </span>
                    </div>
                    <p className="popup-driver">Driver: {v.driver}</p>
                    <span className="popup-movement">{v.movement}</span>
                    <div className="popup-actions">
                      <button
                        className="popup-btn btn-block"
                        onClick={() => handleBlock(v.id)}
                        disabled={isBlocked}
                      >
                        🔒 Bloquear
                      </button>
                      <button
                        className="popup-btn btn-unblock"
                        onClick={() => handleUnblock(v.id)}
                        disabled={!isBlocked}
                      >
                        🔓 Desbloquear
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="map-labels">
        <span className="map-label" style={{ top: "15%", right: "15%" }}>Restilia Cofferez ▾</span>
        <span className="map-label" style={{ bottom: "30%", right: "20%" }}>Container Amazonas ▾</span>
        <span className="map-label" style={{ bottom: "15%", right: "25%" }}>Container Amazonas ✕</span>
        <span className="map-label" style={{ top: "45%", right: "40%" }}>Emporex</span>
      </div>

      <div className="map-controls">
        <button className="map-ctrl-btn">⬆</button>
        <button className="map-ctrl-btn">⬇</button>
        <button className="map-ctrl-btn">—</button>
        <button className="map-ctrl-btn">📍</button>
        <button className="map-ctrl-btn">T</button>
      </div>

      <div className="timeline-bar">
        <button className="timeline-play">▶</button>
        <div className="timeline-track">
          <div className="timeline-progress"></div>
          <div className="timeline-thumb"></div>
        </div>
        <div className="timeline-labels">
          <span>Timeline</span>
          <span className="timeline-realtime">Real-time Locations 🔄</span>
        </div>
        <div className="timeline-times">
          {["11:00", "11:00", "11:00", "12:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map((t, i) => (
            <span key={i} className="timeline-time">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
