import { useEffect } from "react";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {

  useEffect(() => {

    const map = L.map("map").setView([-1.4558, -48.4902], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "OpenStreetMap"
    }).addTo(map);

    L.marker([-1.4558, -48.4902])
      .addTo(map)
      .bindPopup("Veículo Online 🚗")
      .openPopup();

  }, []);

  return (
    <div style={{height:"100vh", width:"100%"}}>
      <div id="map" style={{height:"100%"}}></div>
    </div>
  );
}
