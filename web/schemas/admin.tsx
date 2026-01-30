import { z } from "zod";

export const AdminShema = z.object({
    username: z.string()
        .min(5, "Имя пользователя не может быть меньше 5 символов")
        .max(32, "Имя пользователя не может быть больше 32 символов")
        .regex(/^[a-zA-Z0-9]+$/, "Неверный формат имени"),
    password: z.string()
        .min(8, "Пароль не может быть меньше 8 символов")
        .max(32, "Пароль не может быть больше 32 символов")
        .regex(/^[a-zA-Z0-9]+$/, "Неверный формат пароля"),
})
export type AdminTypeSchema = z.infer<typeof AdminShema>
