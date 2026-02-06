import { GetProductResponse } from "@/app/types/getProduct";
import api from "./client";

export type GetProductParams = {
    id?: number;
}

export async function GetProduct(params?: GetProductParams): Promise<GetProductResponse> {
    const response = await api.get<GetProductResponse>("/api/products/get-product", {
        params,
    });
    return response.data;
}