import { GetProductsResponse } from "@/app/types/getProducts";
import api from "./client";

export async function GetProducts(): Promise<GetProductsResponse> {
    const response = await api.get<GetProductsResponse>("/api/products/get")
    return response.data;
}