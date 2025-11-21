import { useEffect, useState } from "react";
import type { DashboardChartResponse } from "../../models/Dashboard/Responses/DashboardChartResponse";
import { getDashboardCharts } from "../../api/Dashboard/dashboardService";

export const useDashboardCharts = () => {
  const [chartData, setChartData] = useState<DashboardChartResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true);

        const data = await getDashboardCharts();

        setChartData(data);
      } catch (err: any) {
        setError(err.message || "Grafik verileri yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  return { chartData, loading, error };
};
