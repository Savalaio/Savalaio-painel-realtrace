export default function Topbar() {
  const tabs = ["Map", "Geofences", "Alerts", "Reports", "Users", "Admin"];

  return (
    <div className="topbar">
      <div className="topbar-tabs">
        {tabs.map((tab) => (
          <span
            key={tab}
            className={`topbar-tab${tab === "Map" ? " topbar-tab-active" : ""}`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="topbar-right">
        <div className="topbar-admin">
          <span className="admin-avatar">👤</span>
          <span>Admin</span>
          <span className="dropdown-arrow">▾</span>
        </div>
        <div className="topbar-search">
          <span>🔍</span>
          <span>Global Search</span>
        </div>
        <span className="topbar-icon">🔔</span>
        <span className="topbar-icon">⚙️</span>
      </div>
    </div>
  );
}
