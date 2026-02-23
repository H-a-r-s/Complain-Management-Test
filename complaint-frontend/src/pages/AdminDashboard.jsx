import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import StatusBadge from "../components/StatusBadge";

const STATUSES = ["NEW", "IN_PROGRESS", "RESOLVED", "REJECTED"];

export default function AdminDashboard() {
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const size = 10;

  const fetchList = async () => {
    setError("");
    try {
      setLoading(true);
      const params = { page, size };
      if (statusFilter) params.status = statusFilter;

      const res = await api.get("/admin/complaints", { params });
      setRows(res.data.content || []);
    } catch (err) {
      console.log("Admin list error:", err?.response?.data || err);
      setError(
        err?.response?.data?.message ||
          JSON.stringify(err?.response?.data) ||
          "Failed to load complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter]);

  const updateStatus = async (complaintId, newStatus) => {
    const remark = prompt("Remark (optional):") || "";
    try {
      await api.patch(`/admin/complaints/${complaintId}/status`, {
        status: newStatus,
        remark,
      });
      await fetchList();
      alert("Status updated!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div>
      <h3>Admin Dashboard</h3>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <label>Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(0);
            setStatusFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button onClick={fetchList} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
            Prev
          </button>
          <span>Page: {page + 1}</span>
          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>

      {error && (
        <div style={{ background: "#ffe6e6", padding: 10, borderRadius: 6, marginBottom: 10 }}>
          {error}
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticket</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.ticketNo}</td>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.category}</td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td>{String(r.createdAt)}</td>
                <td>
                  <Link to={`/admin/complaints/${encodeURIComponent(r.ticketNo)}`}>View</Link>
                  <span style={{ margin: "0 8px" }}>|</span>

                  <select
                    defaultValue=""
                    onChange={(e) => {
                      const val = e.target.value;
                      e.target.value = "";
                      if (val) updateStatus(r.id, val);
                    }}
                  >
                    <option value="">Change...</option>
                    {STATUSES.filter((s) => s !== r.status).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}

            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "#555" }}>
        Tip: Use “View” to show timeline during demo.
      </div>
    </div>
  );
}
