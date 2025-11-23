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

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6c757d", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6c757d", fontSize: 12 }}
              tickFormatter={(value) => `₺${value}`}
            />

            <Tooltip cursor={{ fill: "transparent" }} />

            <Bar
              dataKey="amount"
              fill="#007bff"
              radius={[4, 4, 0, 0]}
              barSize={40}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
