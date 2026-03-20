import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { login, getDevices, getPositions, blockVehicle, unblockVehicle } from "../services/traccarApi";

const vehicleIconOnline = L.divIcon({
  className: "vehicle-marker",
  html: "🚛",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const vehicleIconOffline = L.divIcon({
  className: "vehicle-marker vehicle-marker-offline",
  html: "🚛",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const TRACCAR_EMAIL = "adm@adm.com";
const TRACCAR_PASSWORD = "12345678";

export default function MapView() {
  const [devices, setDevices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [blockedVehicles, setBlockedVehicles] = useState({});
  const [commandStatus, setCommandStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      await login(TRACCAR_EMAIL, TRACCAR_PASSWORD);
      const [devicesData, positionsData] = await Promise.all([
        getDevices(),
        getPositions(),
      ]);
      setDevices(devicesData);
      setPositions(positionsData);
      setError(null);
    } catch (err) {
      setError("Erro ao conectar com o servidor: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  function getPositionForDevice(deviceId) {
    return positions.find((p) => p.deviceId === deviceId);
  }

  function getSpeedKmh(speed) {
    if (!speed || speed === 0) return "0 km/h";
    return Math.round(speed * 1.852) + " km/h";
  }

  function getStatusLabel(device) {
    if (device.status === "online") return "Online";
    if (device.status === "offline") return "Offline";
    return "Desconhecido";
  }

  function getMovementLabel(position) {
    if (!position) return "Sem dados";
    if (position.attributes && position.attributes.motion) return "Em Movimento";
    return "Parado";
  }

  async function handleBlock(deviceId) {
    setCommandStatus((prev) => ({ ...prev, [deviceId]: "blocking" }));
    try {
      await blockVehicle(deviceId);
      setBlockedVehicles((prev) => ({ ...prev, [deviceId]: true }));
      setCommandStatus((prev) => ({ ...prev, [deviceId]: "blocked" }));
      setTimeout(() => {
        setCommandStatus((prev) => ({ ...prev, [deviceId]: null }));
      }, 3000);
    } catch (err) {
      setCommandStatus((prev) => ({ ...prev, [deviceId]: "error" }));
      setTimeout(() => {
        setCommandStatus((prev) => ({ ...prev, [deviceId]: null }));
      }, 3000);
    }
  }

  async function handleUnblock(deviceId) {
    setCommandStatus((prev) => ({ ...prev, [deviceId]: "unblocking" }));
    try {
      await unblockVehicle(deviceId);
      setBlockedVehicles((prev) => ({ ...prev, [deviceId]: false }));
      setCommandStatus((prev) => ({ ...prev, [deviceId]: "unblocked" }));
      setTimeout(() => {
        setCommandStatus((prev) => ({ ...prev, [deviceId]: null }));
      }, 3000);
    } catch (err) {
      setCommandStatus((prev) => ({ ...prev, [deviceId]: "error" }));
      setTimeout(() => {
        setCommandStatus((prev) => ({ ...prev, [deviceId]: null }));
      }, 3000);
    }
  }

  const devicesWithPosition = devices
    .map((d) => {
      const pos = getPositionForDevice(d.id);
      return { device: d, position: pos };
    })
    .filter((d) => d.position && d.position.latitude && d.position.longitude);

  const center =
    devicesWithPosition.length > 0
      ? [devicesWithPosition[0].position.latitude, devicesWithPosition[0].position.longitude]
      : [-1.4558, -48.4902];

  if (loading) {
    return (
      <div className="map-container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#22d3ee", fontSize: "16px" }}>Carregando veículos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
        <p style={{ color: "#ef4444", fontSize: "14px" }}>{error}</p>
        <button onClick={loadData} style={{ background: "#22d3ee", color: "#0f172a", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />

        {devicesWithPosition.map(({ device, position }) => {
          const isBlocked = blockedVehicles[device.id] || false;
          const status = commandStatus[device.id];
          const icon = device.status === "online" ? vehicleIconOnline : vehicleIconOffline;

          return (
            <Marker
              key={device.id}
              position={[position.latitude, position.longitude]}
              icon={icon}
            >
              <Popup>
                <div className="vehicle-popup">
                  <div className="popup-header">
                    <strong>{device.name}</strong>
                    {isBlocked && <span className="popup-blocked-badge">BLOQUEADO</span>}
                  </div>
                  <div className="popup-body">
                    <p className="popup-location">
                      {position.address || `${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`}
                    </p>
                    <div className="popup-stats">
                      <span className="popup-speed">{getSpeedKmh(position.speed)}</span>
                      <span className={`popup-status ${device.status === "online" ? "status-on" : "status-off"}`}>
                        {getStatusLabel(device)}
                      </span>
                    </div>
                    <p className="popup-driver">
                      {device.contact || device.phone || "—"}
                    </p>
                    <span className="popup-movement">{getMovementLabel(position)}</span>

                    {status === "error" && (
                      <p className="popup-cmd-error">Erro ao enviar comando</p>
                    )}
                    {status === "blocked" && (
                      <p className="popup-cmd-success">Comando de bloqueio enviado!</p>
                    )}
                    {status === "unblocked" && (
                      <p className="popup-cmd-success">Comando de desbloqueio enviado!</p>
                    )}

                    <div className="popup-actions">
                      <button
                        className="popup-btn btn-block"
                        onClick={() => handleBlock(device.id)}
                        disabled={isBlocked || status === "blocking"}
                      >
                        {status === "blocking" ? "Enviando..." : "🔒 Bloquear"}
                      </button>
                      <button
                        className="popup-btn btn-unblock"
                        onClick={() => handleUnblock(device.id)}
                        disabled={!isBlocked || status === "unblocking"}
                      >
                        {status === "unblocking" ? "Enviando..." : "🔓 Desbloquear"}
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="map-info-bar">
        <span className="map-info-item">
          Total: <strong>{devices.length}</strong>
        </span>
        <span className="map-info-item info-online">
          Online: <strong>{devices.filter((d) => d.status === "online").length}</strong>
        </span>
        <span className="map-info-item info-offline">
          Offline: <strong>{devices.filter((d) => d.status === "offline").length}</strong>
        </span>
      </div>

      <div className="map-controls">
        <button className="map-ctrl-btn" onClick={loadData} title="Atualizar">🔄</button>
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
          {["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map((t, i) => (
            <span key={i} className="timeline-time">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
