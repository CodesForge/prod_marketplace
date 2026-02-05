import api from "./client";

export type GetAdminParams = {
    limit?: number;
    offset?: number;
}

export async function GetAdmin(params?: GetAdminParams): Promise<GetAdminType> {
    const response = await api.get<GetAdminType>("/api/admins/get", {
        params,
    });
    return response.data;
}