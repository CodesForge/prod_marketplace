"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Boxes, PawPrint, CalendarCheck, CircleCheck, Ban, Leaf, ArrowRight, HeartPulse } from "lucide-react"
import { useState } from "react"

import dog6 from "@/images/dog6.png"
import cat3 from "@/images/cat3.png"
import dog5 from "@/images/dog5.png"
import dog4 from "@/images/dog4.png"
import cat2 from "@/images/cat2.png"
import cat from "@/images/cat.png"
import dog2 from "@/images/dog2.png"
import dog from "@/images/dog.png"
import dog3 from "@/images/dog3.png"
import Image from "next/image"
import { Input } from "@/components/ui/input"

export default function Page() {
   return(
    <div className="flex min-h-screen justify-start items-start p-6 flex-col gap-10">
        <div className="bg-[#E5E5E5] w-full rounded-[10px] flex flex-row">
            <div className="w-1/3 flex">
    <div className="mt-20">
      <Image src={dog} className="ml-55 h-150 w-160" alt="dog.png" />
    </div>
  </div>
            <div className="flex w-full justify-items-center items-center flex-col gap-5">
                <div className="flex flex-row gap-6 mt-5">
                    <div className="bg-[#F3F4F6] rounded-[7px] flex items-center">
                        <Button className="bg-[#F3F4F6] text-neutral-800 p-7">О нас</Button>
                        <Button className="bg-[#F3F4F6] text-neutral-800 p-7">Продукты</Button>
                        <Button className="bg-[#F3F4F6] text-neutral-800 p-7">Состав</Button>
                        <Button className="bg-[#F3F4F6] text-neutral-800 p-7">FAQ</Button>
                    </div>
                    <Button className="bg-[#F3F4F6] text-neutral-800 p-7">О компании</Button>
                    <Button className="bg-[#06B2D3] p-7">Партнерам</Button>
                </div>
                <Card className="w-full max-w-3xl min-w-sm p-12">
                    <CardHeader>
                        <CardTitle className="text-5xl leading-snug">Сухой полнорационный корм холистик для щенков, взрослых собак и кошек holistic</CardTitle>
                        <CardDescription className="mt-5 text-[18px] text-neutral-800">В полной мере обеспечивает физиологические потребности животных в питательных веществах, необходимых для поддержания нормальной жизнедеятельности их организма.</CardDescription>
                        <div className="flex items-start">
                            <Button className="p-7 mt-8 bg-[#06B2D3] text-black font-normal">Выбрать корм <div className="bg-white rounded-[5px] w-8 h-8 flex items-center justify-center ml-3"><ArrowRight style={{ strokeWidth: 3 }} className="text-[#06B2D3]"/></div></Button>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center text-center">
            <div className="max-w-3xl">
                <p className="text-4xl font-normal">
                Почему WellWet выбирают для ежедневного питания?
                </p>
            </div>
            <CardDescription className=" mt-3 max-w-4xl text-[20px]">
                Мы создаём корм, который подходит для регулярного рациона и поддерживает здоровье питомца без перегрузки организма.
            </CardDescription>
        </div>
        <div className="w-full flex justify-center mt-3 gap-5">
            <div className="w-full max-w-80 bg-[#FDD6EA] flex justify-end items-center rounded-[10px]">
                <Image src={cat} className="h-70 w-150 flex" alt="cat.png" />
            </div>
            <Card className="w-full max-w-80 bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-light mt-2">Натуральный состав</CardTitle>
                    <div className="items-center flex justify-center mt-3">
                        <div className="bg-[#FDD5E9] p-5 rounded-[10px]"><Leaf style={{ strokeWidth: 2 }} className="text-[#F457A6] w-13 h-13"/></div>
                    </div>
                    <CardDescription className="mt-5 max-w-65 text-center">
                        Только качественные источники белка и сбалансированные ингредиенты.
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card className="w-full max-w-80 bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-light mt-2">Холистик-подход</CardTitle>
                    <div className="items-center flex justify-center mt-3">
                        <div className="bg-[#FDD5E9] p-5 rounded-[10px]"><HeartPulse style={{ strokeWidth: 2 }} className="text-[#F457A6] w-13 h-13"/></div>
                    </div>
                    <CardDescription className="mt-5 max-w-65 text-center">
                        Рецепты разработаны с учётом природных потребностей собак и кошек.
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card className="w-full max-w-80 bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-light mt-2">Без кукурузы</CardTitle>
                    <div className="items-center flex justify-center mt-3">
                        <div className="bg-[#FDD5E9] p-5 rounded-[10px]"><Ban style={{ strokeWidth: 2 }} className="text-[#F457A6] w-13 h-13"/></div>
                    </div>
                    <CardDescription className="mt-5 text-center">
                        Подходит для питомцев с чувствительным пищеварением.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
        <div className="w-full flex justify-center mt-3 gap-5">
            <Card className="w-full max-w-80 bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-light mt-2">Контроль качества</CardTitle>
                    <div className="items-center flex justify-center mt-3">
                        <div className="bg-[#C5E8EE] p-5 rounded-[10px]"><CircleCheck style={{ strokeWidth: 2 }} className="text-[#99B659] w-13 h-13"/></div>
                    </div>
                    <CardDescription className="mt-5 max-w-65 text-center">
                        Каждый рецепт проходит проверку на всех этапах производства.
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card className="w-full max-w-80 bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-light mt-2">Ежедневное питание</CardTitle>
                    <div className="items-center flex justify-center mt-3">
                        <div className="bg-[#C5E8EE] p-5 rounded-[10px]"><CalendarCheck style={{ strokeWidth: 2 }} className="text-[#99B659] w-13 h-13"/></div>
                    </div>
                    <CardDescription className="mt-5 max-w-65 text-center">
                        Сбалансированный рацион без перегрузки организма.
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card className="w-full max-w-80 bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-light mt-2 text-nowrap">Чёткая линейка кормов</CardTitle>
                    <div className="items-center flex justify-center mt-3">
                        <div className="bg-[#C5E8EE] p-5 rounded-[10px]"><PawPrint style={{ strokeWidth: 2 }} className="text-[#99B659] w-13 h-13"/></div>
                    </div>
                    <CardDescription className="mt-5 max-w-65 text-center">
                        Легко подобрать корм под возраст, размер и особенности питомца.
                    </CardDescription>
                </CardHeader>
            </Card>
            <div className="w-full max-w-80 bg-[#F0F9A2] flex justify-end items-center rounded-[10px]">
                <Image src={dog2} className="h-70 w-150 flex" alt="cat.png" />
            </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center text-center">
            <div className="max-w-3xl">
                <p className="text-4xl font-normal">
                Состав, продуманный для здоровья питомца
                </p>
            </div>
            <CardDescription className=" mt-3 max-w-3xl text-[20px]">
                Мы подбираем ингредиенты так, чтобы корм подходил для ежедневного питания и поддерживал общее состояние питомца.
            </CardDescription>
        </div>
        <div className="w-full flex justify-center gap-5 px-63">
            <div className="w-full bg-[#FDC7E5] max-w-sm flex justify-end items-center rounded-[10px]">
                <Image src={dog3} className="h-50 w-150 flex" alt="cat.png" />
            </div>
            <Card className="w-full bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-3xl font-light mt-5">Омега-3 и Омега-6</CardTitle>
                    <CardDescription className="mt-8">Смесь животных жиров и лососевого жира — источник Омега-3 и Омега-6 жирных кислот, которые не синтезируются в организме животного и должны поступать с кормом.</CardDescription>
                </CardHeader>
            </Card>
        </div>
        <div className="w-full flex justify-center gap-5 px-63">
            <Card className="w-full bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-3xl font-light mt-5">Рыбий жир из лосося</CardTitle>
                    <CardDescription className="mt-8">Содержит Омега-3 жирные кислоты. Способствует поддержанию нормального состояния организма и общего самочувствия питомца.</CardDescription>
                </CardHeader>
            </Card>
            <div className="w-full bg-[#FDC7E5] max-w-sm flex justify-end items-center rounded-[10px]">
                <Image src={cat2} className="h-50 w-150 flex" alt="cat.png" />
            </div>
        </div>
        <div className="w-full flex justify-center gap-5 px-63">
            <div className="w-full bg-[#FDC7E5] max-w-sm flex justify-end items-center rounded-[10px]">
                <Image src={dog4} className="h-50 w-150 flex" alt="cat.png" />
            </div>
            <Card className="w-full bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-3xl font-light mt-5">Яблоки и тыква</CardTitle>
                    <CardDescription className="mt-8">Содержат микроэлементы и клетчатку, которая поддерживает работу пищеварительной системы и способствует усвоению питательных веществ.</CardDescription>
                </CardHeader>
            </Card>
        </div>
        <div className="w-full flex justify-center gap-5 px-63">
            <Card className="w-full bg-[#F5F5F5]">
                <CardHeader>
                    <CardTitle className="text-3xl font-light mt-5">Пробиотики и пребиотики</CardTitle>
                    <CardDescription className="mt-8">Способствуют формированию и поддержанию естественной микрофлоры кишечника и комфортного пищеварения.</CardDescription>
                </CardHeader>
            </Card>
            <div className="w-full bg-[#FDC7E5] max-w-sm flex justify-end items-center rounded-[10px]">
                <Image src={dog5} className="h-50 w-150 flex" alt="cat.png" />
            </div>
        </div>
        <div className="w-full flex justify-center gap-5 px-63">
            <div className="w-full bg-[#FDC7E5] max-w-sm flex justify-end items-center rounded-[10px]">
                <Image src={cat3} className="h-70 w-150 flex" alt="cat.png" />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <Card className="w-full bg-[#F5F5F5]">
                    <CardHeader>
                        <CardTitle className="text-3xl font-light mt-5">Экстракт юкки шидигера</CardTitle>
                        <CardDescription className="mt-8">Используется для поддержания нормального пищеварения и уменьшения неприятных запахов.</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="w-full bg-[#F5F5F5]">
                    <CardHeader>
                        <CardTitle className="text-3xl font-light mt-5">Глюкозамин и хондроитин</CardTitle>
                        <CardDescription className="mt-8">Используются для поддержания нормального состояния суставов и хрящевой ткани.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center text-center mt-8">
            <div className="max-w-3xl">
                <p className="text-4xl font-normal">
                Часто задаваемые вопросы
                </p>
            </div>
            <CardDescription className=" mt-3 max-w-3xl text-[20px]">
                Собрали ответы на вопросы, которые чаще всего возникают при выборе корма WellWet.
            </CardDescription>
            <Card className="mt-8 w-full bg-[#F5F5F5] max-w-6xl">
                <CardHeader>
                    <div className="flex flex-row justify-between">
                        <CardTitle className="text-2xl">Что значит holistic-корм?</CardTitle>
                        <div className="bg-[#C5E8EE] p-2 rounded-[100%] border border-[#06B2D3]">
                            <PawPrint className="text-[#06B2D3]"/>
                        </div>
                    </div>
                    <CardDescription className="text-left mt-3">Holistic-корм — это питание, разработанное с учётом естественных потребностей питомца. В таких кормах используется качественный белок, сбалансированный состав и исключаются лишние ингредиенты, не несущие питательной ценности.</CardDescription>
                </CardHeader>
            </Card>
            <Card className="mt-8 w-full bg-[#F5F5F5] max-w-6xl">
                <CardHeader>
                    <div className="flex flex-row justify-between">
                        <CardTitle className="text-2xl">Что значит holistic-корм?</CardTitle>
                        <div className="bg-[#C5E8EE] p-2 rounded-[100%] border border-[#06B2D3]">
                            <PawPrint className="text-[#06B2D3]"/>
                        </div>
                    </div>
                    <CardDescription className="text-left mt-3">Holistic-корм — это питание, разработанное с учётом естественных потребностей питомца. В таких кормах используется качественный белок, сбалансированный состав и исключаются лишние ингредиенты, не несущие питательной ценности.</CardDescription>
                </CardHeader>
            </Card>
            <Card className="mt-8 w-full bg-[#F5F5F5] max-w-6xl">
                <CardHeader>
                    <div className="flex flex-row justify-between">
                        <CardTitle className="text-2xl">Что значит holistic-корм?</CardTitle>
                        <div className="bg-[#C5E8EE] p-2 rounded-[100%] border border-[#06B2D3]">
                            <PawPrint className="text-[#06B2D3]"/>
                        </div>
                    </div>
                    <CardDescription className="text-left mt-3">Holistic-корм — это питание, разработанное с учётом естественных потребностей питомца. В таких кормах используется качественный белок, сбалансированный состав и исключаются лишние ингредиенты, не несущие питательной ценности.</CardDescription>
                </CardHeader>
            </Card>
            <Card className="mt-8 w-full bg-[#F5F5F5] max-w-6xl">
                <CardHeader>
                    <div className="flex flex-row justify-between">
                        <CardTitle className="text-2xl">Что значит holistic-корм?</CardTitle>
                        <div className="bg-[#C5E8EE] p-2 rounded-[100%] border border-[#06B2D3]">
                            <PawPrint className="text-[#06B2D3]"/>
                        </div>
                    </div>
                    <CardDescription className="text-left mt-3">Holistic-корм — это питание, разработанное с учётом естественных потребностей питомца. В таких кормах используется качественный белок, сбалансированный состав и исключаются лишние ингредиенты, не несущие питательной ценности.</CardDescription>
                </CardHeader>
            </Card>
        </div>
        <div className="w-full flex flex-col items-center justify-center text-center mt-8">
            <div className="flex flex-row gap-3 w-full max-w-6xl">
                <div className="bg-[#FDCDE9] p-2 rounded-[10px]">
                    <Image src={dog6} className="h-110 w-115 flex" alt="cat.png" />
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-3xl text-left">Заявка на сотрудничество</CardTitle>
                        <div className="max-w-xl">
                            <CardDescription className="text-[20px] text-left mt-3">Заполните форму и мы вышлем все материалы на вашу электронную почту</CardDescription>
                        </div>
                        <div className="flex flex-row gap-4 mt-3">
                            <Input placeholder="Ваше имя" className="bg-[#F2F2F2] p-6"></Input>
                            <Input placeholder="Email или телефон" className="bg-[#F2F2F2] p-6"></Input>
                        </div>
                        <div className="mt-4">
                            <Input placeholder="Тип организации" className="bg-[#F2F2F2] p-6"></Input>
                        </div>
                        <div className="mt-4">
                            <Input placeholder="Ваш вопрос или комментарий" className="bg-[#F2F2F2] p-6"></Input>
                        </div>
                        <div className="flex items-start">
                            <Button className="p-7 mt-8 bg-[#FDD5E9] text-black font-normal">Отправить<div className="bg-white rounded-[5px] w-8 h-8 flex items-center justify-center ml-3"><ArrowRight style={{ strokeWidth: 3 }} className="text-[#F462AB]"/></div></Button>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    </div>
   )
}