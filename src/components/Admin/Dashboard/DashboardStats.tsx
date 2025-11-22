import type { DashboardSummaryResponse } from "../../../models/Dashboard/Responses/DashboardSummaryResponse";
import StatCard from "./StatCard";
import styles from "./DashboardStats.module.css";

interface DashboardStatsProps {
  stats: DashboardSummaryResponse;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount);
  };

  return (
    <div className={styles.statsGrid}>
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
        title="Toplam Etkinlik"
        value={stats.totalEventsCount}
        color="#6610f2"
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
  );
};

export default DashboardStats;
