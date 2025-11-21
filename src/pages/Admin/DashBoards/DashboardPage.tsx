import StatCard from "../../../components/Admin/Dashboard/StatCard";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useDashboard } from "../../../hooks/Dashboard/useDashboard";

const DashboardPage = () => {
  const { stats, loading, error } = useDashboard();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!stats) return <ErrorMessage message="Veri bulunamadı." />;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "2rem", color: "#333" }}>Genel Bakış</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <StatCard
          title="Toplam Gelir"
          value={formatCurrency(stats.totalRevenue)}
          color="#28a745"
        />

        <StatCard
          title="Satılan Bilet"
          value={stats.totalTicketsSold}
          color="#007bff"
        />

        <StatCard
          title="Aktif Etkinlik"
          value={stats.activeEventsCount}
          color="#ffc107"
        />

        <StatCard
          title="Toplam Üye"
          value={stats.totalUsersCount}
          color="#17a2b8"
        />
      </div>

      {/* İleride buraya Grafikler (Charts) eklenebilir */}
      <div
        style={{
          marginTop: "3rem",
          padding: "2rem",
          background: "#fff",
          borderRadius: "12px",
          color: "#999",
          textAlign: "center",
        }}
      >
        Grafikler ve Detaylı Analizler Yakında...
      </div>
    </div>
  );
};

export default DashboardPage;
