'use client'

import { useAddAdmin } from "@/app/hooks/useAddAdmin"
import { useGetAdmins } from "@/app/hooks/useGetAdmins"
import { useGetFeedback } from "@/app/hooks/useGetFeedback"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { AdminAddSchema } from "@/schemas/addAdmin"
import { AdminTypeSchema } from "@/schemas/admin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Users, ShoppingCart, User, MessageCircle} from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

function DashBoard() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AdminTypeSchema>({
        resolver: zodResolver(AdminAddSchema),
    });

    const addmutate = useAddAdmin();
    const { admin_data, admin_error } = useGetAdmins();
    const { data, error } = useGetFeedback();
    const [activeTab, setActiveTab] = useState<'admin' | 'goods' | 'feedback' | null>(null);

    const OnSubmit = (data: AdminTypeSchema) => {
        addmutate.mutate({ username: data.username, password: data.password })
        reset();
    }

    const toggleTab = (tab: 'admin' | 'goods' | 'feedback') => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    return (
        <div className="p-5">
            <Card className="border">
                <CardHeader>
                    <div className="flex flex-row gap-2 items-center">
                        <div className="bg-neutral-200 p-1 rounded-2xl">
                            <User/>
                        </div>
                        <CardTitle>Пользователь</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <div className="flex flex-row gap-5 mt-3">
                <Card className="border px-5 min-w-70 max-h-65">
                    <button onClick={() => toggleTab('admin')} className={`bg-neutral-100 transition-all duration-150 ease-in-out rounded-[10px] p-3 max-w-sm ${activeTab === 'admin' ? "border-neutral-400 border" : ""}`}>
                        <div className="flex flex-row items-center gap-3">
                            <Users className="h-6 w-6"/>
                            <p className="text-[18px]">Админы</p>
                        </div>
                    </button>
                    <button onClick={() => toggleTab('goods')} className={`bg-neutral-100 transition-all duration-150 ease-in-out rounded-[10px] p-3 max-w-sm ${activeTab === 'goods' ? "border-neutral-400 border" : ""}`}>
                        <div className="flex flex-row items-center gap-3">
                            <ShoppingCart className="h-6 w-6"/>
                            <p className="text-[18px]">Товары</p>
                        </div>
                    </button>
                    <button onClick={() => toggleTab('feedback')} className={`bg-neutral-100 transition-all duration-150 ease-in-out rounded-[10px] p-3 max-w-sm ${activeTab === 'feedback' ? "border-neutral-400 border" : ""}`}>
                        <div className="flex flex-row items-center gap-3">
                            <MessageCircle className="h-6 w-6"/>
                            <p className="text-[18px]">Обратная связь</p>
                        </div>
                    </button>
                </Card>
                {activeTab === 'admin' && (
                    <Card className="border w-full">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex flex-row items-center gap-3 justify-between">
                                    <div className="flex flex-row gap-3">
                                        <Users className="h-6 w-6"/>
                                        <p className="text-[18px]">Админы</p>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button className="bg-neutral-100 border-neutral-400 text-black hover:bg-neutral-200">Добавить админа</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Добавить админа</DialogTitle>
                                                <DialogDescription>
                                                    заполните данные для того что бы добавить нового администратора
                                                </DialogDescription>
                                                <form onSubmit={handleSubmit(OnSubmit)}>
                                                    <div className="mt-3">
                                                        <p>Имя админа</p>
                                                        <Input {...register("username")} aria-invalid={errors.username ? "true" : "false"} className={`mt-1 ${errors.username ? "border-red-600 bg-red-200" : ""}`} placeholder="Введите имя админа"></Input>
                                                        {errors.username && (
                                                            <p className="text-red-500">{errors.username.message}</p>
                                                        )}
                                                    </div>
                                                    <div className="mt-3">
                                                        <p>Пароль</p>
                                                        <Input {...register("password")} aria-invalid={errors.password ? "true" : "false"} className={`mt-1 ${errors.password ? "border-red-600 bg-red-200" : ""}`} placeholder="Введите пароль для админа"></Input>
                                                        {errors.password && (
                                                            <p className="text-red-500">{errors.password.message}</p>
                                                        )}
                                                    </div>
                                                    <Button className="mt-4 w-full">{addmutate.isPending ? `${<Spinner/>} загрузка` : "добавить"}</Button>
                                                </form>
                                                {addmutate.error && (
                                                    <Alert className="bg-red-200 border-red-500">
                                                        <AlertTitle className="text-red-500">{addmutate.error.message}</AlertTitle>
                                                    </Alert>
                                                )}
                                                {addmutate.isSuccess && (
                                                    <Alert className="bg-green-200 border-green-500">
                                                        <AlertTitle className="text-green-500">{addmutate.data.message}</AlertTitle>
                                                    </Alert>
                                                )}
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                {data && (
                                        <div>
                                            {admin_data?.admins?.map((item) => (
                                                <div key={item.id} className="mt-3 bg-neutral-100 rounded-[5px] p-2 border-2">
                                                    <p>Админ: @{item.username}</p>
                                                    <p>Айди админа: {item.id}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                )}
                {activeTab === 'goods' && (
                    <Card className="border w-full">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex flex-row items-center gap-3">
                                    <ShoppingCart className="h-6 w-6"/>
                                    <p className="text-[18px]">Товары</p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                )}
                {activeTab === 'feedback' && (
                    <Card className="border w-full">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex flex-row items-center gap-3">
                                    <MessageCircle className="h-6 w-6"/>
                                    <p className="text-[18px]">Обратная связь</p>
                                </div>
                                {data && (
                                        <div>
                                            {data?.feedbacks?.map((item) => (
                                                <div key={item.id} className="mt-3 bg-neutral-100 rounded-[5px] p-2 border-2">
                                                    <p>Имя: {item.name}</p>
                                                    <p>Контакт: {item.contact}</p>
                                                    <p>Организация: {item.type_of_organization}</p>
                                                    <p>Комментарий: {item.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <div className="bg-[#F1F1F1] min-h-screen">
            <DashBoard/>
        </div>
    )
}