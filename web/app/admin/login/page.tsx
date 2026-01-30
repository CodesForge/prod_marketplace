'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { AdminTypeSchema, AdminShema } from "@/schemas/admin"
import { loginAdmin } from "@/api/admin"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

function LoginAdmin() {
    const router = useRouter();
    const [apiError, setApiError] = useState<string | null>(null); // ← строка вместо boolean
    const [loading, setLoading] = useState(false);

    const [showpassword, setShowpassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AdminTypeSchema>({
        resolver: zodResolver(AdminShema)
    })

    const ChangeShowPassword = () => {
        setShowpassword((prev) => !prev);
    }

    const OnSubmitAdmin =  async (data: AdminTypeSchema) => {
        try{
            setLoading(true);
            setApiError(null);
            const response = await loginAdmin(data)
            router.push("/admin/dashboard")
            console.log("data:", response);
        } catch (error: any) {
            setApiError(error.message || "Ошибка авторизации");
        } finally {
            setLoading(false);
            reset();
        }
    }

    return (
        <Card className="w-full max-w-sm border-2 scale-135">
            <CardHeader>
                {apiError && (
                    <Alert className="bg-red-200 border-red-500">
                        <div className="flex flex-row gap-1 items-center">
                            <AlertCircle className="h-5 w-5 text-red-500"/>
                            <AlertTitle className="text-red-500">{apiError}</AlertTitle>
                        </div>
                    </Alert>
                )}
                <CardTitle>Вход в аккаунт админа</CardTitle>
                <CardDescription>введите данные для входа в аккаунт</CardDescription>
                <form onSubmit={handleSubmit(OnSubmitAdmin)}>
                    <div className="mt-2">
                        <CardDescription>username</CardDescription>
                        <Input {...register('username')} placeholder="введите имя пользователя" aria-invalid={errors.username ? "true" : "false"} className={`mt-1 ${errors.username ? "border-red-600 bg-red-200 hover:shadow-red-500" : ""}`}></Input>
                        {errors.username && (
                            <div>
                                <p className="text-red-500 text-[12px]">{errors.username.message}</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-2">
                        <CardDescription>password</CardDescription>
                        <div className="relative w-full">
                            <Input {...register('password')} type={showpassword ? "text" : "password"} placeholder="Введите пароль" aria-invalid={errors.password ? "true" : "false"} className={`mt-1 ${errors.password ? "border-red-600 bg-red-200" : ""}`} />
                            <button type="button" onClick={ChangeShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">{showpassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        </div>
                        {errors.password && (
                            <div>
                                <p className="text-red-500 text-[12px]">{errors.password?.message}</p>
                            </div>
                        )}
                    </div>
                    <Button type="submit" className="mt-3 w-full">{loading ? "Загрузка..." : "Войти"}</Button>
                </form>
            </CardHeader>
        </Card>
    )
}

export default function Page() {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <LoginAdmin/>
        </div>
    )
}