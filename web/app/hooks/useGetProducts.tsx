import { GetProducts } from "@/api/get_products";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts() {
    const { data, error } = useQuery({
        queryKey: ["product"],
        queryFn: GetProducts,
        refetchInterval: 3000,
    })
    return { DataProducts: data, ErrorProducts: error }
}