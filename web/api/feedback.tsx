
import { feedbackResponse } from "@/app/types/feedbackType";
import api from "./client";

export async function getFeedback(): Promise<feedbackResponse> {
    const response = await api.get<feedbackResponse>("/feedbacks/get");
    return response.data;
}