# 🚘 GeoTracker — Real-Time Geofence Vehicle Tracking System

GeoTracker is a full-stack real-time geofencing and vehicle monitoring system.  
It allows you to define a geofence on Google Maps, simulate moving vehicles, track their GPS coordinates, and detect **enter / exit / no-change** zone events in real time.  

Built with **React + Vite + Tailwind**, a **Node.js/Express backend**, **MongoDB**, and **Google Maps API**, it provides a professional fleet tracking dashboard similar to enterprise systems like **Uber Fleet, Rivigo, Locus, Ola Mobility Cloud**.

---

## 📌 Table of Contents
- [📖 Project Summary](#-project-summary)
- [🚀 Why I Built This](#-why-i-built-this)
- [🧰 Tech Stack](#-tech-stack)
- [✨ Features](#-features)
- [🧱 System Architecture](#-system-architecture)
- [📡 How Geofencing Works](#-how-geofencing-works)
- [🚗 How Vehicle Simulation Works](#-how-vehicle-simulation-works)
- [📂 Folder Structure](#-folder-structure)
- [⚙️ Backend Setup](#️-backend-setup)
- [🎨 Frontend Setup](#-frontend-setup)
- [🔌 API Endpoints](#-api-endpoints)
- [🧪 Testing the Project](#-testing-the-project)
- [🚀 Future Enhancements](#-future-enhancements)
- [👨‍💻 Author](#-author)
- [📄 License](#-license)

---

# 📖 Project Summary
GeoTracker is a **real-time fleet tracking dashboard** with:

- Geofence creation  
- Vehicle movement simulation  
- Live map updates  
- Real-time logs  
- Sidebar navigation  
- Analytics dashboard  

You can select any point on the map, define the radius, save the geofence to the backend, and track a simulated vehicle.  
The backend uses the **Haversine formula** to determine whether the vehicle is inside or outside the geofence.

---

# 🚀 Why I Built This
I built GeoTracker to understand and demonstrate how **real fleet management systems** work internally:

- Geofence monitoring  
- GPS coordinate processing  
- Real-time communication  
- Professional dashboard UI  
- Backend validation and event generation  

This project helped me master **full-stack development, mapping APIs, geospatial logic, UI/UX dashboards, event detection systems, and backend architecture**.

---

# 🧰 Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- @react-google-maps/api
- Axios

### **Backend**
- Node.js
- Express
- MongoDB + Mongoose
- CORS

### **External Services**
- Google Maps JavaScript API

---

# ✨ Features

### 🎯 **1. Geofence Management**
- Click anywhere on the map to set the zone center
- Adjust the radius dynamically
- Visualize zone using a blue circle
- Save geofence to backend

### 🚘 **2. Real-Time Vehicle Simulation**
- Vehicle position updates every 2.5 seconds
- Random movement around the geofence
- Marker moves smoothly on Google Maps

### 🔔 **3. Event Detection (Backend Logic)**
Backend returns:
- `"entered"` — vehicle entered geofence  
- `"exited"` — vehicle left geofence  
- `"no-change"` — vehicle is inside/outside with no change

### 📝 **4. Live Logs Panel**
Every event shows:
- Event type  
- Latitude & longitude  
- Timestamp  

### 📊 **5. Dashboard UI**
- Sidebar navigation  
- Dashboard analytics  
- Geofence page  
- Vehicles page  
- Logs page  

### 💾 **6. Clean and Modular Architecture**
- Controllers, routes, and utilities are fully separated  
- Frontend follows component-based structure  

---

# 🧱 System Architecture

┌───────────────────────┐
│ Frontend UI │
│ React + Tailwind │
│ │
│ • Dashboard │
│ • Geofence Page │
│ • Live Logs │
│ • Google Maps │
└─────────────▲─────────┘
│ Axios Requests
▼
┌───────────────────────┐
│ Backend API │
│ Node + Express │
│ │
│ • /api/zone │
│ • /api/location │
│ │
│ Geofence Logic: │
│ Haversine Distance │
└─────────────▲─────────┘
│
▼
┌───────────────────────┐
│ MongoDB │
│ Stores vehicle state │
│ and last known zone │
└────────────────────────┘


---

# 📡 How Geofencing Works

1. User selects geofence center on map  
2. User adjusts radius  
3. Backend saves:
   ```json
   {
     "center": { "lat": 12.97, "lng": 77.59 },
     "radius": 500
   }


For every GPS update:

Backend calculates distance using Haversine formula

Compares with radius

Detects zone event

Responds with "entered", "exited", "no-change"

This mimics actual fleet systems.

🚗 How Vehicle Simulation Works

A helper function picks a random coordinate within a radius:

generateRandomPoint(center, radius);


Every 2.5 seconds:

New coordinate generated

Sent to backend

Marker updates on map

Event logged

This simulates real GPS movement.

📂 Folder Structure
backend/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── utils/
 ├── server.js
 └── .env

frontend/
 ├── src/
 │   ├── pages/
 │   ├── layout/
 │   ├── components/
 │   ├── utils/
 │   ├── App.jsx
 │   ├── main.jsx
 │   └── index.css
 ├── public/
 ├── index.html
 ├── tailwind.config.js
 ├── postcss.config.js
 └── .env

⚙️ Backend Setup
1️⃣ Go to backend folder
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Add .env file
MONGO_URI=your_mongodb_uri
PORT=5000

4️⃣ Start backend
npm run dev

🎨 Frontend Setup
1️⃣ Go to frontend folder
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Add .env file
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key

4️⃣ Start frontend
npm run dev

Open in browser:
http://localhost:5173/

🔌 API Endpoints
POST /api/zone

Save geofence:

{
  "center": { "lat": 12.97, "lng": 77.59 },
  "radius": 500
}

GET /api/zone

Get current geofence.

POST /api/location

Send vehicle GPS:

{
  "vehicleId": "CAR1",
  "lat": 12.97,
  "lng": 77.59
}


Backend responds with:

{
  "event": "entered",
  "zoneStatus": "inside",
  "distance": 145,
  "timestamp": "2025-01-01T12:00:00Z"
}

🧪 Testing the Project
1. Open the Geofence page

👉 /geofence

2. Click on the map

This selects geofence center.

3. Adjust radius

Using the slider.

4. Click “Save Geofence”

Backend receives zone.

5. Click “Start Simulation”

Vehicle starts moving every 2.5 seconds.

6. Watch logs

Enter / exit / no-change events appear.

🚀 Future Enhancements

 Multiple vehicles

 WebSocket real-time updates

 Vehicle path polyline

 Sound alerts for enter/exit

 User login (JWT)

 Live dashboard analytics

 Admin panel

 Dark mode toggle

👨‍💻 Author
Kiran Ghosh (Kron)

Full-stack developer | Electronics & Communication Engineer
Passionate about maps, UI, real-time systems & AI.
