import { useState, useEffect } from "react";
import { TrendData } from "@/types/TrendData";
import { fetchTrends } from "../api/trends";
import { useNavigate } from "react-router-dom";
  
  export const useTrends = () => {
    const [trends, setTrends] = useState<TrendData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onTrendClick = (trend: TrendData) => {
        navigate(`/posts/search?q=${trend.word}`);
    }

    useEffect(() => {
        const fetchTrendsData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchTrends();
                if (!data) {
                    throw new Error("No data received from the server");
                }

                setTrends(data.trends);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchTrendsData();
    }, []);

    return {
        trends,
        setTrends,
        loading,
        error,
        onTrendClick
    }
  };
  