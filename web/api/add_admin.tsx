import api from "./client";
import { AdminAddTypeSchema } from "@/schemas/addAdmin";
import { AdminResponseType } from "@/app/types/adminResponseType";

export async function AdminAdd(data: AdminAddTypeSchema): Promise<AdminResponseType> {
    const response = await api.post<AdminResponseType>("/api/admins/add", data);
    return response.data;
}