import { GetAdmin } from "@/api/get_admin";
import { useQuery } from "@tanstack/react-query";

export function useGetAdmins() {
    const { data, error } = useQuery({
        queryKey: ["admin"],
        queryFn: GetAdmin,
        refetchInterval: 3000,
    })
    return { admin_data: data, admin_error: error }
}