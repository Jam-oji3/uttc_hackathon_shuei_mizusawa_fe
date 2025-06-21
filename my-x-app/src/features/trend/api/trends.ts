import { apiFetch } from "../../../api/apiClient";
import { FetchTrendsResponse } from "@/types/api";

export const fetchTrends = async (since=72, limit=5) => {
    const query = new URLSearchParams({
        since: since.toString(),
        limit: limit.toString(),
    });
    const resJSON = await apiFetch<FetchTrendsResponse>(`/trends/top?${query.toString()}` );
    return resJSON;
}