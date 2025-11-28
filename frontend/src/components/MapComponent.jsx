import {
  GoogleMap,
  useLoadScript,
  Circle,
  Marker,
} from "@react-google-maps/api";

import { useState, useCallback } from "react";
import axios from "axios";
import { generateRandomPoint } from "../utils/simulator";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946,
};

export default function MapComponent({ radius }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [centerPoint, setCenterPoint] = useState(null);
  const [vehiclePos, setVehiclePos] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // When user clicks on the map
  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCenterPoint({ lat, lng });
    console.log("Geofence Center Selected:", lat, lng);
  }, []);

  // Save geofence to backend
  const saveGeofenceToBackend = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/zone", {
        center: centerPoint,
        radius: Number(radius),
      });

      console.log("Zone saved:", res.data);
      alert("Geofence saved successfully!");
    } catch (err) {
      console.error("Error saving zone:", err);
      alert("Failed to save geofence.");
    }
  };

  // START SIMULATION
  const startSimulation = () => {
    if (!centerPoint) {
      alert("Select a center first!");
      return;
    }

    if (isSimulating) return; // prevent duplicates

    setIsSimulating(true);

    const intervalId = setInterval(async () => {
      const randomPos = generateRandomPoint(
        centerPoint,
        Number(radius) * 1.5
      );

      setVehiclePos(randomPos);

      try {
        const res = await axios.post("http://localhost:5000/api/location", {
          vehicleId: "CAR1",
          lat: randomPos.lat,
          lng: randomPos.lng,
        });

        // Add logs to UI
        setLogs((prev) => [
          {
            event: res.data.event,
            lat: randomPos.lat,
            lng: randomPos.lng,
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);

        console.log("Backend Event:", res.data);
      } catch (err) {
        console.error("Error sending location:", err);
      }
    }, 2500);

    window.simulationInterval = intervalId;
  };

  // STOP SIMULATION
  const stopSimulation = () => {
    clearInterval(window.simulationInterval);
    setIsSimulating(false);
    console.log("Simulation stopped");
  };

  if (!isLoaded)
    return <div className="text-center text-lg">Loading Map...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden border p-4">

      {/* GOOGLE MAP */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPoint || defaultCenter}
        zoom={centerPoint ? 15 : 13}
        onClick={handleMapClick}
      >
        {/* CIRCLE */}
        {centerPoint && (
          <Circle
            center={centerPoint}
            radius={Number(radius)}
            options={{
              fillColor: "#3b82f6",
              fillOpacity: 0.15,
              strokeColor: "#1d4ed8",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}

        {/* VEHICLE MARKER */}
        {vehiclePos && (
          <Marker
            position={vehiclePos}
            icon={{
              url: "https://i.imgur.com/pW5HLiZ.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>

      {/* INFO BOX */}
      {centerPoint && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-lg text-blue-700 space-y-3">
          <p className="font-semibold">Selected Geofence Center:</p>
          <p>Latitude: {centerPoint.lat}</p>
          <p>Longitude: {centerPoint.lng}</p>
          <p>Radius: {radius} meters</p>

          <div className="space-x-3">
            <button
              onClick={saveGeofenceToBackend}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Save Geofence
            </button>

            {!isSimulating ? (
              <button
                onClick={startSimulation}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Start Simulation
              </button>
            ) : (
              <button
                onClick={stopSimulation}
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                Stop Simulation
              </button>
            )}
          </div>
        </div>
      )}

      {/* EVENT LOGS */}
      {logs.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border shadow max-h-64 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Event Logs
          </h2>

          <ul className="space-y-2">
            {logs.map((log, index) => (
              <li
                key={index}
                className="p-3 bg-white rounded-lg shadow border flex justify-between items-center"
              >
                <div>
                  <p className="font-bold capitalize">{log.event}</p>
                  <p className="text-sm text-gray-600">
                    Lat: {log.lat.toFixed(5)} | Lng: {log.lng.toFixed(5)}
                  </p>
                </div>

                <div className="text-blue-600 font-semibold">
                  {log.time}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
