export default function AdminPanel() {
  const items = [
    { icon: "✓", label: "Verify a Company" },
    { icon: "📦", label: "Asset Management" },
    { icon: "⚙️", label: "System Configuration" },
  ];

  return (
    <div className="card admin-card">
      <h3 className="card-title">Admin</h3>
      <div className="admin-list">
        {items.map((item, i) => (
          <div key={i} className="admin-item">
            <span className="admin-icon">{item.icon}</span>
            <span className="admin-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
