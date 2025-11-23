import type { DashboardChartResponse } from "../../../models/Dashboard/Responses/DashboardChartResponse";
import ErrorMessage from "../../Common/ErrorMessage";
import LoadingSpinner from "../../Common/LoadingSpinner";
import RevenueChart from "./RevenueChart";
import styles from "./DashboardCharts.module.css";
import { FaCheckCircle, FaClock, FaLock } from "react-icons/fa";

interface DashboardChartsProps {
  data: DashboardChartResponse | null;
  loading: boolean;
  error: string | null;
}

const DashboardCharts = ({ data, loading, error }: DashboardChartsProps) => {
  if (loading) {
    return (
      <div className={styles.chartsGrid}>
        <div
          className={styles.loadingContainer}
          style={{ gridColumn: "1 / -1" }}
        >
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.chartsGrid}>
      {data && <RevenueChart data={data.monthlyRevenues} />}

      <div className={styles.sidePanel}>
        <h3 className={styles.sidePanelTitle}>Sistem Durumu</h3>

        <div className={styles.statusList}>
          <div className={styles.statusItem}>
            <span className={styles.statusIcon} style={{ color: "#28a745" }}>
              <FaCheckCircle />
            </span>
            <span>
              API Bağlantısı: <strong>Aktif</strong>
            </span>
          </div>

          <div className={styles.statusItem}>
            <span className={styles.statusIcon} style={{ color: "#007bff" }}>
              <FaClock />
            </span>
            <span>
              Son Güncelleme: <strong>{new Date().toLocaleDateString()}</strong>
            </span>
          </div>

          <div className={styles.statusItem}>
            <span className={styles.statusIcon} style={{ color: "#ffc107" }}>
              <FaLock />
            </span>
            <span>
              Güvenlik: <strong>JWT + SSL</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
