export default function Sidebar() {
  const menuItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Map View", icon: "🗺️", active: true },
    { label: "Vehicles", icon: "🚛" },
    { label: "Geofences", icon: "📍", badge: 3 },
    { label: "Alerts", icon: "🔔" },
    { label: "Reports", icon: "📄" },
    { label: "Users", icon: "👥" },
    { label: "Admin", icon: "⚙️" },
    { label: "Settings", icon: "🔧" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">📡</span>
        <span className="logo-text">REAL <span className="logo-highlight">TRACE</span></span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item${item.active ? " sidebar-item-active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
}
