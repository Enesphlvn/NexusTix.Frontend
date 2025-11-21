import DashboardCharts from "../../../components/Admin/Dashboard/DashboardCharts";
import DashboardStats from "../../../components/Admin/Dashboard/DashboardStats";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useDashboard } from "../../../hooks/Dashboard/useDashboard";
import { useDashboardCharts } from "../../../hooks/Dashboard/useDashboardCharts";

const DashboardPage = () => {
  const { stats, loading: statsLoading, error: statsError } = useDashboard();
  const {
    chartData,
    loading: chartsLoading,
    error: chartsError,
  } = useDashboardCharts();

  if (statsLoading) return <LoadingSpinner />;
  if (statsError) return <ErrorMessage message={statsError} />;
  if (!stats) return <ErrorMessage message="Veri bulunamadı." />;

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ marginBottom: "2rem", color: "#333" }}>Genel Bakış</h1>

      <DashboardStats stats={stats} />

      <DashboardCharts
        data={chartData}
        loading={chartsLoading}
        error={chartsError}
      />
    </div>
  );
};

export default DashboardPage;
