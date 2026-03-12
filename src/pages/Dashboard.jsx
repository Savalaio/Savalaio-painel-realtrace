import Topbar from "../components/Topbar";
import MapView from "../components/MapView";
import StatsPanel from "../components/StatsPanel";
import AlertsPanel from "../components/AlertsPanel";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Topbar />

      <div className="content">
        <div className="map">
          <MapView />
        </div>

        <div className="rightpanel">
          <StatsPanel />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}
