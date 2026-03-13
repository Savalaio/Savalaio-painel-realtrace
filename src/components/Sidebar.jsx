export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>REAL TRACE</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>Dashboard</li>
        <li style={{ marginBottom: "10px" }}>Map View</li>
        <li style={{ marginBottom: "10px" }}>Vehicles</li>
        <li style={{ marginBottom: "10px" }}>Geofences</li>
        <li style={{ marginBottom: "10px" }}>Alerts</li>
        <li style={{ marginBottom: "10px" }}>Reports</li>
        <li style={{ marginBottom: "10px" }}>Users</li>
        <li style={{ marginBottom: "10px" }}>Admin</li>
        <li style={{ marginBottom: "10px" }}>Settings</li>
      </ul>
    </div>
  );
}
