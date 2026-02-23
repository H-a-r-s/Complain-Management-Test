export default function StatusBadge({ status }) {
  const map = {
    NEW: { bg: "#fff3cd", text: "#664d03" },
    IN_PROGRESS: { bg: "#cfe2ff", text: "#084298" },
    RESOLVED: { bg: "#d1e7dd", text: "#0f5132" },
    REJECTED: { bg: "#f8d7da", text: "#842029" },
  };
  const s = map[status] || { bg: "#e2e3e5", text: "#41464b" };

  return (
    <span
      style={{
        background: s.bg,
                color: s.text,
                padding: "4px 10px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 12,
                display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}
