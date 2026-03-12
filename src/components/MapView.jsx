import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  return (
    <MapContainer
      center={[-1.45, -48.49]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[-1.45, -48.49]}>
        <Popup>
          Veículo V-102 <br />
          65 km/h
        </Popup>
      </Marker>
    </MapContainer>
  );
}
