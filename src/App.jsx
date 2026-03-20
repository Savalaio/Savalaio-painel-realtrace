import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./style.css";

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
