import type { DashboardChartResponse } from "../../../models/Dashboard/Responses/DashboardChartResponse";
import ErrorMessage from "../../Common/ErrorMessage";
import LoadingSpinner from "../../Common/LoadingSpinner";
import styles from "./DashboardCharts.module.css";
import RevenueChart from "./RevenueChart";

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
        <h3 className={styles.sidePanelTitle}>Hızlı Durum</h3>
        <div style={{ color: "#666", fontSize: "0.9rem", lineHeight: "1.6" }}>
          <p>
            ✅ Sistem durumu: <strong>Aktif</strong>
          </p>
          <p>
            📅 Güncelleme: <strong>{new Date().toLocaleDateString()}</strong>
          </p>
          <hr
            style={{
              margin: "1rem 0",
              border: "0",
              borderTop: "1px solid #eee",
            }}
          />
          <p style={{ fontStyle: "italic", color: "#999" }}>
            Kategori bazlı satış dağılım grafiği (Pie Chart) çok yakında...
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
