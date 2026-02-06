export interface GetOneAdminResponse {
    message: string;
    admin: GetOneAdminType;
}

export interface GetOneAdminType {
    id: string;
    username: string;
    created_at: string;
}