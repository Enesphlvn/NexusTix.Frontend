import DashboardCharts from "../../../components/Admin/Dashboard/DashboardCharts";
import DashboardStats from "../../../components/Admin/Dashboard/DashboardStats";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useDashboard } from "../../../hooks/Dashboard/useDashboard";
import { useDashboardCharts } from "../../../hooks/Dashboard/useDashboardCharts";
import styles from "./DashboardPage.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.header}>Genel Bakış</h1>

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
