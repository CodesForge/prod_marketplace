import { AddProductsTypeSchema } from "@/schemas/addProducts";
import api from "./client";
import { ProductsResponseType } from "@/app/types/productsResponseType";

export async function AddProducts(data: AddProductsTypeSchema): Promise<ProductsResponseType> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('file', data.file[0]);
    const response = await api.post<ProductsResponseType>("/api/products/add", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
}