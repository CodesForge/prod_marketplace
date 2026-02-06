export interface GetProductsResponse{
    status: string;
    products: GetProductsType[];
    total: string;
    message: string;
}

export interface GetProductsType{
    id: string;
    title: string;
    description: string;
    price: string;
    s3_image_key: string;
    created_at: string;
}