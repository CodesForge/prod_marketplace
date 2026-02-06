'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PawPrint, ArrowRight } from 'lucide-react';

import dog6 from '@/images/dog6.png';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { FeedbackTypeData, FeedbackSchema } from '@/schemas/user';
import { useGetProduct } from '@/app/hooks/useGetProduct';

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const { data, error } = useGetProduct({ id: Number(id) });

  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackTypeData>({
    resolver: zodResolver(FeedbackSchema),
  });

  const SendFeedbackData = async (formData: FeedbackTypeData) => {
    try {
      setSuccess(false);
      setSendError(false);

      const response = await fetch('/api/feedbacks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setSendError(true);
        console.log('Server error:', result);
      }
    } catch (err) {
      setSendError(true);
      console.log('Error:', err);
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
     
      <header className="flex flex-row items-start justify-between w-full gap-3 pt-4 pr-5">
        <div className="pl-5">
          <div className="cursor-pointer hover:bg-neutral-100 rounded-[5px] p-2 transition-all duration-300 ease-in-out">
            <p
              className="text-3xl font-light"
              onClick={() => router.push('/')}
            >
              WellWet
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-3 flex-wrap">
          <div className="bg-[#F3F4F6] rounded-[7px] flex">
            <Button className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg:white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]">
              Продукты
            </Button>
            <Button onClick={() => router.push('/compound')} className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg:white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]">
              Состав
            </Button>
            <Button onClick={() => router.push('/FAQ')} className="bg-transparent text-neutral-800 px-6 py-3 h-auto hover:bg:white hover:shadow-sm transition-all duration-200 font-normal rounded-[5px]">
              FAQ
            </Button>
          </div>

          <div className="rounded-[7px] flex h-full gap-2 ml-auto">
            <Button
              onClick={() => router.push('/company')}
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

      <main className="flex-1 w-full">
       
        {data && (
          <section className="w-full bg-white pt-8">
            <div className="max-w-6xl mx-auto px-5 md:px-10 flex flex-col md:flex-row gap-12">

              <div className="flex flex-col gap-4 min-w-70 md:min-w-[320px]">
                <div className="w-full border-2 border-gray-100 rounded-2xl overflow-hidden">
                  <img
                    className="w-full object-contain h-120"
                    src={data?.product?.s3_image_key}
                    alt={String(id)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button className="h-10 px-4 uppercase bg-[#06B2D3] text-white transition-colors duration-200 hover:bg-[#0599B7]">
                    открыть на ozon
                  </Button>
                  <Button className="h-10 px-4 uppercase bg-[#06B2D3] text-white transition-colors duration-200 hover:bg-[#0599B7]">
                    открыть на wb
                  </Button>
                  <Button className="h-10 px-4 uppercase bg-[#06B2D3] text-white transition-colors duration-200 hover:bg-[#0599B7]">
                    на Яндекс Маркете
                  </Button>
                </div>
              </div>

             
              <div className="flex flex-col gap-6 flex-1">
                <div>
                  <h1 className="text-4xl md:text-5xl uppercase leading-tight mb-4">
                    {data?.product?.title}
                  </h1>
                  <div className="h-2 w-40 bg-[#06B2D3]" />
                </div>

                <div className="bg-[#F5F5F5] p-8 rounded-2xl border-l-8 border-[#06B2D3]">
                  <CardTitle className="text-2xl mb-4">
                    Описание товара
                  </CardTitle>
                  <CardDescription>{data?.product?.description}</CardDescription>
                </div>

                <Card className="mt-1 w-full bg-[#F5F5F5]">
                  <CardHeader>
                    <div className="flex flex-row justify-between">
                      <CardTitle className="text-2xl">
                        Что значит holistic-корм?
                      </CardTitle>
                      <div className="bg-[#C5E8EE] p-2 rounded-full border border-[#06B2D3]">
                        <PawPrint className="text-[#06B2D3]" />
                      </div>
                    </div>
                    <CardDescription className="text-left mt-3">
                      Holistic-корм — это питание, разработанное с учётом
                      естественных потребностей питомца. В таких кормах
                      используется качественный белок, сбалансированный состав
                      и исключаются лишние ингредиенты.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="mt-1 w-full bg-[#F5F5F5]">
                  <CardHeader>
                    <div className="flex flex-row justify-between">
                      <CardTitle className="text-2xl">
                        Ключевые характеристики
                      </CardTitle>
                      <div className="bg-[#C5E8EE] p-2 rounded-full border border-[#06B2D3]">
                        <PawPrint className="text-[#06B2D3]" />
                      </div>
                    </div>
                    <CardDescription className="text-left mt-3">
                      <ul className="list-none space-y-1">
                        <li>– Натуральные источники животного белка</li>
                        <li>– Low-grain рецепт</li>
                        <li>– Без кукурузы и пшеницы</li>
                        <li>– Без искусственных красителей и ароматизаторов</li>
                        <li>– Подходит для ежедневного питания</li>
                      </ul>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>
        )}

       
        <section className="w-full mt-16 mb-10">
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-5">
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="bg-[#FDCDE9] p-2 rounded-[10px] flex items-center justify-center">
                <Image
                  src={dog6}
                  className="h-70 w-75 object-cover"
                  alt="dog"
                />
              </div>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-3xl text-left">
                    Заявка на сотрудничество
                  </CardTitle>

                  <form onSubmit={handleSubmit(SendFeedbackData)} className="mt-4">
                    <div className="max-w-xl">
                      <CardDescription className="text-[20px] text-left">
                        Заполните форму и мы вышлем все материалы на вашу
                        электронную почту
                      </CardDescription>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-3">
                      <div className="flex-1 flex-col gap-1">
                        <Input
                          {...register('name')}
                          placeholder="Ваше имя"
                          aria-invalid={errors.name ? 'true' : 'false'}
                          className={`bg-[#F2F2F2] p-6 ${
                            errors.name
                              ? 'border-red-600 bg-red-200 hover:shadow-red-500'
                              : ''
                          }`}
                        />
                        {errors.name && (
                          <p className="text-left text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="flex-1 flex-col gap-1">
                        <Input
                          {...register('contact')}
                          aria-invalid={errors.contact ? 'true' : 'false'}
                          placeholder="Email или телефон"
                          className={`bg-[#F2F2F2] p-6 ${
                            errors.contact
                              ? 'border-red-600 bg-red-200 hover:shadow-red-500'
                              : ''
                          }`}
                        />
                        {errors.contact && (
                          <p className="text-left text-red-500">
                            {errors.contact.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <Input
                        {...register('type_of_organization')}
                        placeholder="Тип организации"
                        aria-invalid={errors.type_of_organization ? 'true' : 'false'}
                        className={`bg-[#F2F2F2] p-6 ${
                          errors.type_of_organization
                            ? 'border-red-600 bg-red-200 hover:shadow-red-500'
                            : ''
                        }`}
                      />
                      {errors.type_of_organization && (
                        <p className="text-left text-red-500">
                          {errors.type_of_organization.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <Input
                        {...register('comment')}
                        placeholder="Ваш вопрос или комментарий"
                        aria-invalid={errors.comment ? 'true' : 'false'}
                        className={`bg-[#F2F2F2] p-6 ${
                          errors.comment
                            ? 'border-red-600 bg-red-200 hover:shadow-red-500'
                            : ''
                        }`}
                      />
                      {errors.comment && (
                        <p className="text-left text-red-500">
                          {errors.comment.message}
                        </p>
                      )}
                    </div>

                    {sendError && (
                      <Alert className="mt-5 bg-red-200 border-red-500">
                        <AlertTitle className="text-red-500">
                          Ошибка при отправке формы на сервер
                        </AlertTitle>
                      </Alert>
                    )}

                    {success && (
                      <Alert className="mt-5 bg-green-200 border-green-500">
                        <AlertTitle className="text-green-500">
                          Успешная отправка заявки
                        </AlertTitle>
                      </Alert>
                    )}

                    <div className="flex items-start">
                      <Button className="p-7 mt-8 bg-[#FDD5E9] text-black font-normal transition-all duration-300 hover:bg-[#FCA8D1] active:scale-95 group">
                        Отправить
                        <div className="bg-white rounded-[5px] w-8 h-8 flex items-center justify-center ml-3 transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight
                            style={{ strokeWidth: 3 }}
                            className="text-[#F462AB]"
                          />
                        </div>
                      </Button>
                    </div>
                  </form>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#F2F2F2] py-12 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <div className="cursor-default hover:bg-neutral-100 rounded-[5px] p-2 mb-4">
              <p className="text-2xl font-light">WellWet</p>
            </div>
            <CardDescription className="text-neutral-700 max-w-sm">
              WellWet — бренд holistic-кормов для собак и кошек. Качество
              ингредиентов, понятный состав, реальные потребности питомцев.
            </CardDescription>
          </div>

          <div>
            <CardTitle className="text-lg font-normal mb-6 text-neutral-900">
              Продукты
            </CardTitle>
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
            <CardTitle className="text-lg font-normal mb-6 text-neutral-900">
              Компания
            </CardTitle>
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
            <CardTitle className="text-lg font-normal mb-6 text-neutral-900">
              Контакты
            </CardTitle>
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
  );
}
