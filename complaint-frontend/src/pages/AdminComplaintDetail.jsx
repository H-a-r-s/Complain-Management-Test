import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import StatusBadge from "../components/StatusBadge";

export default function AdminComplaintDetail() {
  const { ticketNo } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/complaints/track/${encodeURIComponent(ticketNo)}`);
        setData(res.data);
      } catch (e) {
        console.log("Admin detail error:", e?.response?.data || e);
        setErr(e?.response?.data?.message || "Not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [ticketNo]);

  if (loading) return <div>Loading...</div>;

  if (err)
    return (
      <div>
        <Link to="/admin">← Back</Link>
        <div style={{ marginTop: 10, background: "#ffe6e6", padding: 10, borderRadius: 6 }}>{err}</div>
      </div>
    );

  if (!data) return null;

  return (
    <div>
      <Link to="/admin">← Back</Link>
      <h3 style={{ marginTop: 10 }}>Complaint Detail</h3>

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
    </div>
  );
}
