
export interface feedbackResponse{
    message: string;
    feedbacks: feedbackType[];
    total: number;
}
export interface feedbackType {
    id: number;
    name: string;
    contact: string;
    type_of_organization: string;
    comment: string;
    created_at: string;
}