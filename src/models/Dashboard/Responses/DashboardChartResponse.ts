import type { CategorySalesResponse } from "./CategorySalesResponse";
import type { MonthlyRevenueResponse } from "./MonthlyRevenueResponse";

export interface DashboardChartResponse {
  monthlyRevenues: MonthlyRevenueResponse[];
  categorySales: CategorySalesResponse[];
}
