import { GetProduct, GetProductParams } from "@/api/get_product";
import { useQuery } from "@tanstack/react-query";

export function useGetProduct(params?: GetProductParams) {
    const { data, error } = useQuery({
        queryKey: ["product", params],
        queryFn: () => GetProduct(params),
        refetchInterval: 3000,
    })
    return { data, error };
}