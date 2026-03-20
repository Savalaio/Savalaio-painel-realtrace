export default function GeofencesPanel() {
  const geofences = [
    { name: "Empresa", vehicles: 3, color: "#22d3ee" },
    { name: "Basília Campos", vehicles: 5, color: "#22d3ee" },
    { name: "Container Amazonas", vehicles: 2, color: "#22d3ee" },
  ];

  return (
    <div className="card geofences-card">
      <div className="card-header">
        <h3 className="card-title">Geofences</h3>
        <span className="card-more">•••</span>
      </div>
      <div className="geofences-list">
        {geofences.map((gf, i) => (
          <div key={i} className="geofence-item">
            <span className="geofence-dot" style={{ background: gf.color }}></span>
            <span className="geofence-name">{gf.name}</span>
            <span className="geofence-count">{gf.vehicles} vehicles ▸</span>
          </div>
        ))}
      </div>
    </div>
  );
}
