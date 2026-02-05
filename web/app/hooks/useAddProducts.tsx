import { AddProducts } from "@/api/add_products";
import { AddProductsSchema, AddProductsTypeSchema } from "@/schemas/addProducts";
import { useMutation } from "@tanstack/react-query";

export function useAddProducts() {
    const mutation = useMutation({
        mutationFn: (data: AddProductsTypeSchema) => AddProducts(data),
    });
    return mutation
}