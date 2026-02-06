import { GetOneAdminResponse } from "@/app/types/getOneAdmin";
import api from "./client";

export async function GetOneAdmin(): Promise<GetOneAdminResponse> {
    const response = await api.get<GetOneAdminResponse>("/api/admins/get-admin");
    return response.data;
}