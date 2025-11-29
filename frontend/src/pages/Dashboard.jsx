export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-700">Dashboard Overview</h1>

      {/* CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Vehicles */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold text-gray-700">Total Vehicles</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">1</p>
          <p className="text-sm text-gray-500 mt-1">Vehicle simulation active</p>
        </div>

        {/* Geofence Active */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold text-gray-700">Active Geofence</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">1</p>
          <p className="text-sm text-gray-500 mt-1">Geofence loaded from backend</p>
        </div>

        {/* Status */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold text-gray-700">System Status</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">Online</p>
          <p className="text-sm text-gray-500 mt-1">Backend connected</p>
        </div>

      </div>

      {/* Logs Preview */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activity</h2>

        <ul className="space-y-3">
          <li className="p-4 bg-gray-50 border rounded-lg shadow-sm">
            <p className="font-semibold text-gray-700">Vehicle Simulation Ready</p>
            <p className="text-sm text-gray-500">Waiting for movements...</p>
          </li>

          <li className="p-4 bg-gray-50 border rounded-lg shadow-sm">
            <p className="font-semibold text-gray-700">Geofence Module Active</p>
            <p className="text-sm text-gray-500">Click “Geofence” to set radius & start tracking</p>
          </li>
        </ul>
      </div>

    </div>
  );
}
