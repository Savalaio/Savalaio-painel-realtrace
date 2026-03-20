import Topbar from "../components/Topbar";
import MapView from "../components/MapView";
import StatsPanel from "../components/StatsPanel";
import AlertsPanel from "../components/AlertsPanel";
import GeofencesPanel from "../components/GeofencesPanel";
import FleetHealth from "../components/FleetHealth";
import BottomPanel from "../components/BottomPanel";
import AdminPanel from "../components/AdminPanel";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Topbar />

      <div className="content">
        <div className="main-area">
          <div className="map">
            <MapView />
          </div>
          <BottomPanel />
        </div>

        <div className="rightpanel">
          <StatsPanel />
          <AlertsPanel />
          <GeofencesPanel />
          <FleetHealth />
          <AdminPanel />
        </div>
      </div>
    </div>
  );
}
