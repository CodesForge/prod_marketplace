import api from "./client";

export async function GetAdmin(): Promise<GetAdminType> {
    const response = await api.get<GetAdminType>("/api/admins/get");
    return response.data;
}