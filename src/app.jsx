import Sidebar from "./src/components/Sidebar";
import Dashboard from "./src/pages/Dashboard";

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
