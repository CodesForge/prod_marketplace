import { GetAdmin } from "@/api/get_admin";
import { useQuery } from "@tanstack/react-query";
import { GetAdminParams } from "@/api/get_admin";

export function useGetAdmins(params?: GetAdminParams) {
    const { data, error } = useQuery({
        queryKey: ["admin", params],
        queryFn: () => GetAdmin(params),
        refetchInterval: 3000,
    })
    return { admin_data: data, admin_error: error }
}