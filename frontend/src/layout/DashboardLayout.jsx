import { Link, useLocation } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const { pathname } = useLocation();

  const linkClasses = (path) =>
    `block px-2 py-2 rounded-lg cursor-pointer transition ${
      pathname === path
        ? "bg-blue-600 text-white font-semibold"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col space-y-6">

        <h2 className="text-2xl font-bold tracking-wide">GeoTracker</h2>

        <nav className="space-y-2">
          <Link to="/" className={linkClasses("/")}>
            Dashboard
          </Link>
          <Link to="/geofence" className={linkClasses("/geofence")}>
            Geofence
          </Link>
          <Link to="/vehicles" className={linkClasses("/vehicles")}>
            Vehicles
          </Link>
          <Link to="/logs" className={linkClasses("/logs")}>
            Logs
          </Link>
        </nav>

        <div className="mt-auto text-gray-400 text-sm">
          © 2025 NoirBytes
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100 overflow-y-auto p-6">
        {children}
      </div>

    </div>
  );
}
