export default function AlertsPanel() {
  const alerts = [
    { icon: "🔴", label: "Excessive Speed", vehicle: "Vehicle V-102", time: "21 hour ago", color: "#ef4444" },
    { icon: "🔴", label: "Geofence Exit", vehicle: "Vehicle V-098", time: "24 hours ago", color: "#ef4444" },
    { icon: "🔴", label: "Ignition On", vehicle: "Vehicle V-204", time: "11 hour ago", color: "#ef4444" },
  ];

  return (
    <div className="card alerts-card">
      <h3 className="card-title">Active Alerts</h3>
      <div className="alerts-list">
        {alerts.map((alert, i) => (
          <div key={i} className="alert-item">
            <span className="alert-icon" style={{ color: alert.color }}>{alert.icon}</span>
            <div className="alert-info">
              <span className="alert-label">{alert.label} - {alert.vehicle} ▸</span>
              <span className="alert-time">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
