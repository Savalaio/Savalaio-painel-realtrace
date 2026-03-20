export default function BottomPanel() {
  const locations = [
    { id: "V-101", time: "19:10", location: "Avenida Galvão" },
    { id: "V-102", speed: "90 Km/h", location: "Vertice Galvão" },
    { id: "Vehicle V-098", speed: "60 Km/h", location: "Veríssimo Veículos" },
  ];

  const alertsTable = [
    { priority: "Pigy", severity: "MARGOD1", user: "Menco Lima", source: "Em Movimento >", stones: "1.093 2000" },
    { priority: "Ag Ellert", severity: "MARGOD1", user: "Eagn no Sfas", source: "Emporian Amproves", stones: "0 one 3mrn >" },
    { priority: "Nedcin", severity: "MARGOD1", user: "Vehicle V-1008", source: "Emitical Gotmin Vorakl", stones: "01ost alsds" },
    { priority: "Gftcal", severity: "COARO", user: "Vehicle V-204", source: "Ac. Aldo Clade - Rison", stones: "6 mn 3ogu" },
  ];

  const users = [
    { name: "Arca Vrese", role: "Gestire", avatar: "👤" },
    { name: "Gadon Socoo", role: "Leanie", avatar: "👤" },
    { name: "Admno Soecia", role: "Usarie", avatar: "👤" },
  ];

  return (
    <div className="bottom-panel">
      <div className="bottom-section locations-section">
        <h4 className="bottom-title">Real-time Locations</h4>
        <div className="locations-list">
          {locations.map((loc, i) => (
            <div key={i} className="location-item">
              <span className="location-id">{loc.id}</span>
              <span className="location-speed">{loc.speed || loc.time}</span>
              <span className="location-place">{loc.location}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-section alerts-table-section">
        <div className="alerts-table-header">
          <h4 className="bottom-title">Alerts</h4>
          <span>Security 🔒</span>
        </div>
        <table className="alerts-table">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Source</th>
              <th>Stones</th>
            </tr>
          </thead>
          <tbody>
            {alertsTable.map((a, i) => (
              <tr key={i}>
                <td>
                  <span className={`alert-priority ${i < 2 ? "priority-high" : i === 2 ? "priority-med" : "priority-low"}`}>
                    {a.priority}
                  </span>
                  <span className="alert-severity">{a.severity}</span>
                </td>
                <td>{a.user}</td>
                <td>{a.source}</td>
                <td>{a.stones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bottom-section users-section">
        <h4 className="bottom-title">Users <span className="section-badge">Meter</span></h4>
        <div className="users-list">
          {users.map((u, i) => (
            <div key={i} className="user-item">
              <span className="user-avatar">{u.avatar}</span>
              <div className="user-info">
                <span className="user-name">{u.name} ▸</span>
                <span className="user-role">{u.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
