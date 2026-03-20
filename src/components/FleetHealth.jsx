export default function FleetHealth() {
  return (
    <div className="card fleet-health-card">
      <h3 className="card-title">Fleet Health</h3>
      <div className="fleet-health-content">
        <div className="fleet-chart">
          <div className="chart-bars">
            {[60, 80, 45, 70, 90, 55, 75].map((h, i) => (
              <div key={i} className="chart-bar" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="chart-labels">
            <span>1st</span><span>0o</span><span>0oo</span><span>1&lt;0m</span>
          </div>
        </div>
        <div className="fleet-gauge">
          <svg viewBox="0 0 120 120" className="gauge-svg">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#22d3ee" strokeWidth="10"
              strokeDasharray="314" strokeDashoffset="0" strokeLinecap="round"
              transform="rotate(-90 60 60)" />
            <text x="60" y="55" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">100%</text>
            <text x="60" y="72" textAnchor="middle" fill="#94a3b8" fontSize="8">Lost her Gefece</text>
            <text x="60" y="82" textAnchor="middle" fill="#94a3b8" fontSize="8">Peate</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
