'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Boxes, PawPrint, CalendarCheck, CircleCheck, Ban, Leaf, ArrowRight, HeartPulse } from "lucide-react"
import { useState } from "react"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FeedbackTypeData, FeedbackSchema } from "@/schemas/user"
import dog6 from "@/images/dog6.png"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import dog2 from "@/images/dog2.png"
import { useRouter } from "next/navigation"
import { useGetProducts } from "../hooks/useGetProducts"

export default function Page() {
        const router = useRouter();
    
        const { DataProducts, ErrorProducts } = useGetProducts();

        const [error_result, setError_result] = useState('');
        const [result, setResult] = useState('')
        const [success, setSuccess] = useState(false)
        const [send_error, setSend_error] = useState(false)
    
    return (
        <div>
            <header className="flex flex-row items-start justify-between w-full gap-3 pt-4 pr-5">
                <div className="pl-5">
                    <div className="cursor-default hover:bg-neutral-100 rounded-[5px] p-2 transition-all duration-300 ease-in-out">
                        <p className="text-3xl font-light" onClick={() => router.push("/")}>WellWet</p>
                    </div>
                </div>
                <div className="flex flex-row gap-3 flex-wrap">
                    <div className="bg-[#F3F4F6] rounded-[7px] flex">
                        <Button className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg-white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]">
                            Продукты
                        </Button>
                        <Button onClick={() => router.push("/compound")} className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg-white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]">
                            Состав
                        </Button>
                        <Button onClick={() => router.push("/FAQ")} className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg-white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]">
                            FAQ
                        </Button>
                    </div>
                    <div className="rounded-[7px] flex h-full gap-2 ml-auto">
                        <Button onClick={() => router.push("/company")} className="bg-[#F3F4F6] text-neutral-800 px-6 py-3 h-auto hover:bg-[#EAEBED] transition-colors rounded-[7px] font-normal">
                            О компании
                        </Button>
                        <Button onClick={() => router.push("/partners")} className="bg-[#06B2D3] text-white px-6 py-3 h-auto hover:bg-[#059DB9] active:scale-95 transition-all rounded-[7px] font-normal shadow-sm hover:shadow-md">
                        Партнерам
                        </Button>
                    </div>
                </div>
            </header>
            <div className="flex flex-col flex-1 p-12">
                <div className="text-[55px] max-w-7xl">
                    <p className="text-start">Каталог товаров</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {DataProducts?.products ? (
                        DataProducts?.products?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#F5F5F5] p-3 rounded-[10px] flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
                            >
                            <div className="w-full h-75 overflow-hidden rounded-xl bg-neutral-200">
                                <img
                                    src={item.s3_image_key}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    />
                            </div>
                            <p className="font-semibold text-[15px] line-clamp-1">{item.title}</p>
                            <CardDescription className="text-[13px] text-neutral-600 line-clamp-2">
                                {item.description}
                            </CardDescription>

                            <div className="mt-auto flex items-center justify-between">
                                <span className="font-semibold text-[14px]">{item.price} ₽</span>
                                <Button onClick={() => router.push(`/products/${item.id}`)} className="h-8 px-3 text-[13px]">Смотреть</Button>
                            </div>
                        </div>
                    ))
                    ) : (
                        <div className="bg-[#F3F4F6] rounded-[5px] p-5">
                            <p className="text-2xl">Товары не найдены</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center justify-center flex-1 p-12">
                    <div className="text-[55px] max-w-4xl">
                        <p className="text-center">Контакты</p>
                        <CardDescription className="mt-3 text-center text-2xl">Если у вас есть вопросы о продукции или сотрудничестве, вы можете связаться с нами по электронной почте:</CardDescription>
                    </div> 
                </div>
                <Card className="w-full rounded-[10px] bg-[#F5F5F5]">
                    <div className="flex flex-row justify-between px-10 py-3">
                        <div>
                            <CardTitle className="text-2xl">Почта:</CardTitle>
                            <CardDescription className="mt-2 text-[20px]">arnoldxxxx5@gmail.com</CardDescription>
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Телефон:</CardTitle>
                            <CardDescription className="mt-2 text-[20px]">+ 7 (960) 870-71-65</CardDescription>
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Telegram:</CardTitle>
                            <CardDescription className="mt-2 text-[20px]">@Vafitempo</CardDescription>
                        </div>  
                    </div>
                </Card>
            </div>
        <footer className="bg-[#F2F2F2] py-12 px-5">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start">
            <div className="cursor-default hover:bg-neutral-100 rounded-[5px] p-2 mb-4">
                <p className="text-2xl font-light">WellWet</p>
            </div>
            <CardDescription className="text-neutral-700 max-w-sm">
                WellWet — бренд holistic-кормов для собак и кошек. Качество ингредиентов, понятный состав, реальные потребности питомцев.
            </CardDescription>
        </div>

        <div>
            <CardTitle className="text-lg font-normal mb-6 text-neutral-900">Продукты</CardTitle>
            <ul className="space-y-3 text-neutral-700">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Сухие корма</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Влажные корма</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Лакомства</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Витамины</a></li>
            </ul>
        </div>

        <div>
            <CardTitle className="text-lg font-normal mb-6 text-neutral-900">Компания</CardTitle>
            <ul className="space-y-3 text-neutral-700">
                <li><a href="#" className="hover:text-neutral-900 transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Состав</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors">Партнерам</a></li>
            </ul>
        </div>

        <div>
            <CardTitle className="text-lg font-normal mb-6 text-neutral-900">Контакты</CardTitle>
            <div className="space-y-3 text-neutral-700">
                <p>arnoldxxxx5@gmail.com</p>
                <p>+7 (960) 870-71-65</p>
                <p className="flex items-center gap-2">@Vafitempo</p>
            </div>
        </div>
    </div>

    <div className="border-t border-neutral-400 pt-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm">
            <p>© 2026 WellWet. Все права защищены.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-neutral-900 transition-colors">Политика конфиденциальности</a>
                <a href="#" className="hover:text-neutral-900 transition-colors">Условия использования</a>
            </div>
        </div>
    </div>
</footer>

        </div>
    )
}