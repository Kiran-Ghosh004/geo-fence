import { useState } from "react";
import MapComponent from "../components/MapComponent";

export default function Geofence() {
  const [radius, setRadius] = useState(500);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-700">Geofence Control Panel</h1>

      {/* Radius Selector */}
      <div className="bg-white shadow rounded-xl p-6 max-w-xl">
        <label className="block text-lg font-semibold">
          Radius: <span className="text-blue-600">{radius}m</span>
        </label>

        <input
          type="range"
          min="100"
          max="3000"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="w-full mt-3 accent-blue-600"
        />
      </div>

      <MapComponent radius={radius} />
    </div>
  );
}
