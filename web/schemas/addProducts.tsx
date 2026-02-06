import { z } from "zod";

export const AddProductsSchema = z.object({
    title: z.string()
        .min(3, "заголовок товара не может быть меньше 3 символов")
        .max(100, "заголовок товара не может быть больше 100 символов"),
    description: z.string()
        .min(10, "описание товара не может быть меньше 10 символов")
        .max(2000, "описание товара не может быть больше 2000 символов"),
    price: z.string()
        .min(0, "цена должна быть не меньше 0"),
    file: z.any().refine((files) => files?.length > 0, "Файл нужен!")
    
});

export type AddProductsTypeSchema = z.infer<typeof AddProductsSchema>;