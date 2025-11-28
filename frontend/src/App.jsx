import DashboardLayout from "./layout/DashboardLayout";
import { Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Geofence from "./pages/Geofence";


export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/geofence" element={<Geofence />} />
      </Routes>
    </DashboardLayout>
  );
}
