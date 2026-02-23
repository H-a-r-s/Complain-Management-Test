import { Routes, Route, Link, Navigate } from "react-router-dom";
import SubmitComplaint from "./pages/SubmitComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaintDetail from "./pages/AdminComplaintDetail";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial", padding: 16, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Complaint Management</h2>

        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/submit">Submit</Link>
          <Link to="/track">Track</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <div style={{ marginLeft: "auto", fontSize: 12, color: "#555" }}>
          API: {import.meta.env.VITE_API_BASE_URL}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/submit" />} />
        <Route path="/submit" element={<SubmitComplaint />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaints/:ticketNo" element={<AdminComplaintDetail />} />
      </Routes>
    </div>
  );
}
