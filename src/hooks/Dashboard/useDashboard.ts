import { useEffect, useState } from "react";
import type { DashboardSummaryResponse } from "../../models/Dashboard/Responses/DashboardSummaryResponse";
import { getDashBoardSummary } from "../../api/Dashboard/dashboardService";

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const data = await getDashBoardSummary();

        setStats(data);
      } catch (err: any) {
        setError(err.message || "İstatistikler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
