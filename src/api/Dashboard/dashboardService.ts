import type { DashboardChartResponse } from "../../models/Dashboard/Responses/DashboardChartResponse";
import type { DashboardSummaryResponse } from "../../models/Dashboard/Responses/DashboardSummaryResponse";
import type { ServiceResult } from "../../models/ServiceResult";
import api from "../api";

export const getDashBoardSummary = async (): Promise<DashboardSummaryResponse> => {
    const response = await api.get<ServiceResult<DashboardSummaryResponse>>('/dashboards/summary');

    if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", ")); 

    return response.data.data;
}

export const getDashboardCharts = async (): Promise<DashboardChartResponse> => {
    const response = await api.get<ServiceResult<DashboardChartResponse>>('/dashboards/charts');

    if (!response.data.isSuccess) throw new Error(response.data.errorMessages.join(", "));

    return response.data.data;
}