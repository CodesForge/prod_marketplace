import { getFeedback } from "@/api/feedback";
import { useQuery } from "@tanstack/react-query";
import { feedbackType } from "../types/feedbackType";

export function useGetFeedback() {
    const { data, error } = useQuery({
        queryKey: ["feedback"],
        queryFn: getFeedback,
        refetchInterval: 3000,
    });
    return { data, error }
}