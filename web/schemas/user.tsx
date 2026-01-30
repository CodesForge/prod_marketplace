import { z } from "zod"

const EmailOrPhone = z.union([
    z.string().email("Неверный формат email или номера"),
    z.string().regex(/^(\+7|8|7)?[\s\-\(\)]?(\d[\s\-\(\)]?){10}$/, "Неверный формат телефона"),
]);

export const FeedbackSchema = z.object({
    name: z.string()
        .min(3, "Имя не может быть меньше 3 символов")
        .max(32, "Имя не может быть больше 32 символов")
        .regex(/^[a-zA-Zа-яА-ЯЁё]+$/, "Неверный формат имени"),
    contact: EmailOrPhone,
    type_of_organization: z.string()
        .min(2, "Организация не может быть меньше 2 символов")
        .max(100, "Организация не может быть больше 100 символов")
        .regex(/^[a-zA-Zа-яА-ЯЁё0-9\s\-_.,&()#№]+$/, "Только буквы, цифры, пробелы и -_.(),#№"
    ),
    comment: z.string()
        .min(10, "Комментарий не может быть меньше 10 символов")
        .max(512, "Комментарий не может быть больше 512 символов"),
})
export type FeedbackTypeData = z.infer<typeof FeedbackSchema>