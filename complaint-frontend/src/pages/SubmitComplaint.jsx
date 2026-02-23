import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function SubmitComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "WATER",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!form.name.trim() || !form.phone.trim() || !form.description.trim()) {
      setError("Name, Phone, and Description are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/complaints", form);
      setResult(res.data);
    } catch (err) {
      console.log("Submit error:", err);
      console.log("Response:", err?.response?.data);
      setError(
        err?.response?.data?.message ||
          JSON.stringify(err?.response?.data) ||
          err.message ||
          "Failed to submit complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Submit Complaint</h3>

      {error && (
        <div style={{ background: "#ffe6e6", padding: 10, borderRadius: 6, marginBottom: 10 }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ background: "#e9ffe6", padding: 12, borderRadius: 8, marginBottom: 12 }}>
          <div>
            <b>Submitted!</b> Ticket No: <b>{result.ticketNo}</b>
          </div>
          <div>Status: {result.status}</div>
          <div>Created At: {String(result.createdAt)}</div>

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <button onClick={() => navigate(`/track?ticket=${encodeURIComponent(result.ticketNo)}`)}>
              Track this ticket
            </button>
            <button
              onClick={() => {
                setResult(null);
                setForm({ name: "", email: "", phone: "", category: "WATER", description: "" });
              }}
            >
              Submit another
            </button>
          </div>
        </div>
      )}

      <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 650 }}>
        <input name="name" placeholder="Name *" value={form.name} onChange={onChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="phone" placeholder="Phone *" value={form.phone} onChange={onChange} />

        <select name="category" value={form.category} onChange={onChange}>
          <option value="WATER">WATER</option>
          <option value="ROAD">ROAD</option>
          <option value="ELECTRICITY">ELECTRICITY</option>
          <option value="OTHER">OTHER</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe your issue *"
          rows={5}
          value={form.description}
          onChange={onChange}
        />

        <button disabled={loading} type="submit">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
