export default function StatsPanel() {
  return (
    <div className="card stats-card">
      <h3 className="card-title">Total Vehicles</h3>
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-icon online">🚛</span>
          <span className="stat-number">98</span>
          <span className="stat-label">Online</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon offline">🚛</span>
          <span className="stat-number">47</span>
          <span className="stat-label">Offline</span>
        </div>
      </div>
    </div>
  );
}
