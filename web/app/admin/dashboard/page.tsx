'use client'

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, User, MessageCircle} from "lucide-react"
import { useState } from "react"

function DashBoard() {
    const [activeTab, setActiveTab] = useState<'admin' | 'goods' | 'feedback' | null>(null);

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
                                <div className="flex flex-row items-center gap-3">
                                    <Users className="h-6 w-6"/>
                                    <p className="text-[18px]">Админы</p>
                                </div>
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
                            </CardTitle>
                            <div className="bg-neutral-100 h-200 rounded-[10px] mt-5">
                            </div>
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