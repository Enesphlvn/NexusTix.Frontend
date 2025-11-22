import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyRevenueResponse } from "../../../models/Dashboard/Responses/MonthlyRevenueResponse";
import styles from "./RevenueChart.module.css";

interface RevenueChartProps {
  data: MonthlyRevenueResponse[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.title}>Aylık Gelir Analizi (Son 6 Ay)</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f1f4"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6c757d", fontSize: 12 }}
            height={60}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6c757d", fontSize: 12 }}
            tickFormatter={(value) => `₺${value}`}
            width={60}
            dx={-10}
          />

          <Tooltip
            cursor={{ fill: "rgba(0, 123, 255, 0.05)" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
              backgroundColor: "#fff",
              padding: "12px",
              color: "#333",
              fontWeight: "600",
            }}
            itemStyle={{ color: "#007bff" }}
            formatter={(value: number) => [
              `${new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(value)}`,
              "Gelir",
            ]}
          />

          <Bar
            dataKey="amount"
            fill="#007bff"
            radius={[6, 6, 0, 0]}
            barSize={45}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
