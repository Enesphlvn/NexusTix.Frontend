import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import type { MonthlyRevenueResponse } from "../../../models/Dashboard/Responses/MonthlyRevenueResponse";
import styles from './RevenueChart.module.css';

interface RevenueChartProps {
  data: MonthlyRevenueResponse[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className={styles.chartContainer}>
      
      <h3 className={styles.title}>
        Aylık Gelir Analizi (Son 6 Ay)
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#888", fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#888", fontSize: 12 }} 
            tickFormatter={(value) => `₺${value}`} 
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            formatter={(value: number) => [`${value} ₺`, "Gelir"]}
          />
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
  );
};

export default RevenueChart;