
interface GetAdminType{
    message: string;
    admins: AdminsType[];
    total: number;
}

interface AdminsType{
    id: string;
    username: string;
    created_at: string;
}