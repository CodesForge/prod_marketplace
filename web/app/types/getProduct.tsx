export interface GetProductResponse {
    message: string;
    product: GetProductType;
    status: string;
}

export interface GetProductType {
    title: string;
    description: string;
    price: string;
    s3_image_key: string;
    created_at: string;
}