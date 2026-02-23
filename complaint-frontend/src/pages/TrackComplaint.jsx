import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import StatusBadge from "../components/StatusBadge";

export default function TrackComplaint() {
  const [searchParams] = useSearchParams();

  const [ticketNo, setTicketNo] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTrack = async (t) => {
    setError("");
    setData(null);

    if (!t.trim()) {
      setError("Enter ticket number");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/complaints/track/${encodeURIComponent(t.trim())}`);
      setData(res.data);
    } catch (err) {
      console.log("Track error:", err?.response?.data || err);
      setError(err?.response?.data?.message || "Ticket not found");
    } finally {
      setLoading(false);
    }
  };

  const track = async () => fetchTrack(ticketNo);

  useEffect(() => {
    const t = searchParams.get("ticket");
    if (t) {
      setTicketNo(t);
      fetchTrack(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Track Complaint</h3>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="CMP-2026-000001"
          value={ticketNo}
          onChange={(e) => setTicketNo(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={track} disabled={loading}>
          {loading ? "Checking..." : "Track"}
        </button>
      </div>

      {error && <div style={{ background: "#ffe6e6", padding: 10, borderRadius: 6 }}>{error}</div>}

      {data && (
        <div style={{ background: "#f5f5f5", padding: 12, borderRadius: 8 }}>
          <div>
            <b>Ticket:</b> {data.ticketNo}
          </div>
          <div style={{ marginTop: 6 }}>
            <b>Status:</b> <StatusBadge status={data.status} />
          </div>
          <div style={{ marginTop: 6 }}>
            <b>Category:</b> {data.category}
          </div>
          <div style={{ marginTop: 10 }}>
            <b>Description:</b> {data.description}
          </div>
          <div style={{ marginTop: 10, color: "#555" }}>
            Created: {String(data.createdAt)} <br />
            Updated: {String(data.updatedAt)}
          </div>

          {Array.isArray(data.timeline) && data.timeline.length > 0 && (
            <>
              <h4 style={{ marginTop: 16 }}>Timeline</h4>
              <ul>
                {data.timeline.map((t, idx) => (
                  <li key={idx}>
                    {t.fromStatus ? `${t.fromStatus} → ` : ""}
                    <b>{t.toStatus}</b>
                    {t.remark ? ` — ${t.remark}` : ""} ({String(t.createdAt)})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
