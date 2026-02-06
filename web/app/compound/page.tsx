'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Leaf, Boxes, HeartPulse, Ban, Server } from "lucide-react"

import dog6 from "@/images/dog6.png"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { FeedbackTypeData, FeedbackSchema } from "@/schemas/user"

export default function Page() {
  const router = useRouter()

  const [error_result, setError_result] = useState("")
  const [result, setResult] = useState("")
  const [success, setSuccess] = useState(false)
  const [send_error, setSend_error] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackTypeData>({
    resolver: zodResolver(FeedbackSchema),
  })

  const SendFeedbackData = async (data: FeedbackTypeData) => {
    try {
      setSuccess(false)
      setSend_error(false)
      const response = await fetch("/api/feedbacks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (response.ok) {
        setResult(result)
        setSuccess(true)
      } else {
        setSend_error(true)
        setError_result(result)
      }
      console.log("Ответ от сервера:", result)
    } catch (error) {
      setSend_error(true)
      setError_result(result)
      console.log("Error:", error)
    } finally {
      reset()
    }
  }

  return (
    <div>
      <header className="flex flex-row items-start justify-between w-full gap-3 pt-4 pr-5">
        <div className="pl-5">
          <div className="cursor-default hover:bg-neutral-100 rounded-[5px] p-2 transition-all duration-300 ease-in-out">
            <p className="text-3xl font-light" onClick={() => router.push("/")}>
              WellWet
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3 flex-wrap">
          <div className="bg-[#F3F4F6] rounded-[7px] flex">
            <Button
              onClick={() => router.push("/products")}
              className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg-white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]"
            >
              Продукты
            </Button>
            <Button className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg-white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]">
              Состав
            </Button>
            <Button onClick={() => router.push("/FAQ")} className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg-white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]">
              FAQ
            </Button>
          </div>
          <div className="rounded-[7px] flex h-full gap-2 ml-auto">
            <Button
              onClick={() => router.push("/company")}
              className="bg-[#F3F4F6] text-neutral-800 px-6 py-3 h-auto hover:bg-[#EAEBED] transition-colors rounded-[7px] font-normal"
            >
              О компании
            </Button>
            <Button onClick={() => router.push("/partners")} className="bg-[#06B2D3] text-white px-6 py-3 h-auto hover:bg-[#059DB9] active:scale-95 transition-all rounded-[7px] font-normal shadow-sm hover:shadow-md">
              Партнерам
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center flex-1 p-12">
        <div className="text-[55px] max-w-7xl">
          <p className="text-center">Состав</p>
          <CardDescription className="mt-3 text-center text-2xl">
            Натуральный рацион для здоровой и счастливой жизни питомца
          </CardDescription>
        </div>

       
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        
          <Card className="bg-[#F5F5F5] rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#C5E8EE] p-2 rounded-full border border-[#06B2D3]">
                  <Leaf className="text-[#06B2D3]" />
                </div>
                <CardTitle className="text-[22px]">Только натуральные ингредиенты</CardTitle>
              </div>
              <CardDescription className="text-[16px]">
                Мы используем продукты высшего качества, пригодные для человека: мясо, овощи, злаки и полезные
                добавки. Никаких сомнительных субпродуктов, консервантов и искусственных усилителей вкуса.
              </CardDescription>
            </CardHeader>
          </Card>

      
          <Card className="bg-[#F5F5F5] rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#FFE4D1] p-2 rounded-full border border-[#F97316]">
                  <Boxes className="text-[#F97316]" />
                </div>
                <CardTitle className="text-[22px]">Мясо и птица</CardTitle>
              </div>
              <CardDescription className="text-[16px] space-y-1">
                <p>Свежее мясо говядины, индейки, курицы и кролика.</p>
                <p>Содержание мяса — от 60% до 80% в рационе.</p>
                <p>Все поставщики сертифицированы и проходят ветеринарный контроль.</p>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-[#F5F5F5] rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#D9FBE4] p-2 rounded-full border border-[#16A34A]">
                  <HeartPulse className="text-[#16A34A]" />
                </div>
                <CardTitle className="text-[22px]">Овощи, злаки и добавки</CardTitle>
              </div>
              <CardDescription className="text-[16px] space-y-1">
                <p>Овощи: морковь, тыква, кабачок, брокколи — источники витаминов и клетчатки.</p>
                <p>Злаки: рис и гречка — для энергии и здорового пищеварения, без пестицидов и ГМО.</p>
                <p>Полезные добавки: льняное масло, рыбий жир, витаминно-минеральный комплекс для иммунитета.</p>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-[#F5F5F5] rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#FEE2E2] p-2 rounded-full border border-[#EF4444]">
                  <Ban className="text-[#EF4444]" />
                </div>
                <CardTitle className="text-[22px]">Без вредных компонентов</CardTitle>
              </div>
              <CardDescription className="text-[16px] space-y-1">
                <p>Без сои, кукурузы и пшеницы.</p>
                <p>Без искусственных красителей и ароматизаторов.</p>
                <p>Без костной муки и отходов производства.</p>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-[#F5F5F5] rounded-3xl lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#E0F2FE] p-2 rounded-full border border-[#3B82F6]">
                  <Server className="text-[#3B82F6]" />
                </div>
                <CardTitle className="text-[22px]">Свежесть и качество</CardTitle>
              </div>
              <CardDescription className="text-[16px] space-y-1">
                <p>Готовим небольшими партиями каждые 2–3 дня.</p>
                <p>Быстрая заморозка сохраняет питательные вещества и вкус.</p>
                <p>Храним при температуре −18°C до момента доставки.</p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

     
        <div className="flex flex-col items-center justify-center flex-1 p-12">
          <div className="text-[55px] max-w-4xl">
            <p className="text-center">Контакты</p>
            <CardDescription className="mt-3 text-center text-2xl">
              Если у вас есть вопросы о продукции или сотрудничестве, вы можете связаться с нами по электронной почте:
            </CardDescription>
          </div>
        </div>

        <Card className="w-full rounded-[10px] bg-[#F5F5F5]">
          <div className="flex flex-row justify-between px-10 py-3 flex-wrap gap-6">
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

      
        <div className="w-full flex flex-col items-center justify-center text-center mt-24">
          <div className="flex flex-row gap-3 w-full max-w-6xl">
            <div className="bg-[#FDCDE9] p-2 rounded-[10px]">
              <Image
                src={dog6}
                className="h-110 w-115 flex object-cover shrink-0"
                alt="cat.png"
              />
            </div>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-3xl text-left">Остались вопросы?</CardTitle>
                <form onSubmit={handleSubmit(SendFeedbackData)}>
                  <div className="max-w-xl">
                    <CardDescription className="text-[20px] text-left mt-3">
                      Мы поможем разобраться с выбором корма и ответим на вопросы о продукции WellWet.
                    </CardDescription>
                  </div>
                  <div className="flex flex-row gap-4 mt-3">
                    <div className="flex-1 flex-col gap-1">
                      <Input
                        {...register("name")}
                        placeholder="Ваше имя"
                        aria-invalid={errors.name ? "true" : "false"}
                        className={`bg-[#F2F2F2] p-6 ${
                          errors.name ? "border-red-600 bg-red-200 hover:shadow-red-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-left text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="flex-1 flex-col gap-1">
                      <Input
                        {...register("contact")}
                        aria-invalid={errors.contact ? "true" : "false"}
                        placeholder="Email или телефон"
                        className={`bg-[#F2F2F2] p-6 ${
                          errors.contact ? "border-red-600 bg-red-200 hover:shadow-red-500" : ""
                        }`}
                      />
                      {errors.contact && (
                        <p className="text-left text-red-500">{errors.contact.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Input
                      {...register("type_of_organization")}
                      placeholder="Тип организации"
                      aria-invalid={errors.type_of_organization ? "true" : "false"}
                      className={`bg-[#F2F2F2] p-6 ${
                        errors.type_of_organization
                          ? "border-red-600 bg-red-200 hover:shadow-red-500"
                          : ""
                      }`}
                    />
                    {errors.type_of_organization && (
                      <p className="text-left text-red-500">
                        {errors.type_of_organization?.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <Input
                      {...register("comment")}
                      placeholder="Ваш вопрос или комментарий"
                      aria-invalid={errors.comment ? "true" : "false"}
                      className={`bg-[#F2F2F2] p-6 ${
                        errors.comment ? "border-red-600 bg-red-200 hover:shadow-red-500" : ""
                      }`}
                    />
                    {errors.comment && (
                      <p className="text-left text-red-500">{errors.comment.message}</p>
                    )}
                  </div>
                  {send_error && (
                    <Alert className="mt-5 bg-red-200 border-red-500">
                      <AlertTitle className="text-red-500">
                        Ошибка при отправки формы на сервер
                      </AlertTitle>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="mt-5 bg-green-200 border-green-500">
                      <AlertTitle className="text-green-500">
                        Успешная отправка заявки на сервер
                      </AlertTitle>
                    </Alert>
                  )}
                  <div className="flex items-start">
                    <Button className="p-7 mt-8 bg-[#FDD5E9] text-black font-normal transition-all duration-300 hover:bg-[#FCA8D1] active:scale-95 group">
                      Отправить
                      <div className="bg-white rounded-[5px] w-8 h-8 flex items-center justify-center ml-3 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight style={{ strokeWidth: 3 }} className="text-[#F462AB]" />
                      </div>
                    </Button>
                  </div>
                </form>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      <footer className="bg-[#F2F2F2] py-12 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <div className="cursor-default hover:bg-neutral-100 rounded-[5px] p-2 mb-4">
              <p className="text-2xl font-light">WellWet</p>
            </div>
            <CardDescription className="text-neutral-700 max-w-sm">
              WellWet — бренд holistic-кормов для собак и кошек. Качество ингредиентов, понятный состав, реальные
              потребности питомцев.
            </CardDescription>
          </div>

          <div>
            <CardTitle className="text-lg font-normal mb-6 text-neutral-900">Продукты</CardTitle>
            <ul className="space-y-3 text-neutral-700">
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Сухие корма
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Влажные корма
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Лакомства
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Витамины
                </a>
              </li>
            </ul>
          </div>

          <div>
            <CardTitle className="text-lg font-normal mb-6 text-neutral-900">Компания</CardTitle>
            <ul className="space-y-3 text-neutral-700">
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Состав
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Партнерам
                </a>
              </li>
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
              <a href="#" className="hover:text-neutral-900 transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-neutral-900 transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
