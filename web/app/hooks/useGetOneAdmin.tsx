import { GetOneAdmin } from "@/api/get_one_admin";
import { useQuery } from "@tanstack/react-query";

export function useGetOneAdmin() {
    const { data, error } = useQuery({
        queryKey: ["admin"],
        queryFn: GetOneAdmin,
        refetchInterval: 3000,
    })
    return { OneAdminData: data, OneAdminError: error };
}