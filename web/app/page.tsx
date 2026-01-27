"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Boxes, LineChart, Network, CheckCircle2Icon, InfoIcon, XCircle } from "lucide-react"
import { useState } from "react"

export default function Page() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const check_endpoint = async () => {
        try {
            setError(false);
            setSuccess(false);
            const response = await fetch("/api/get-status");
            const result = await response.json()
            if (response.ok) {
                setSuccess(true);
            }
        } catch (error) {
            setError(true);
            console.log("Error:", error);
        }
    }

    return (
        <div>
            <div className="flex min-h-screen justify-center items-center flex-col gap-3">
                <Card className="w-full max-w-1/2 min-w-sm">
                    <CardHeader>
                        <div className="flex flex-row items-center gap-2">
                            <Server className="w-5 h-5"/>
                            <CardTitle>FastAPI-service prometheus</CardTitle>
                        </div>
                        <CardDescription>service with monitoring prometheus + grafana</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="w-full max-w-1/2 min-w-sm">
                    <CardHeader>
                        <div className="flex flex-row items-center gap-2">
                            <Boxes className="w-5 h-5"/>
                            <CardTitle>Infrastructure</CardTitle>
                        </div>
                        <CardDescription>Docker + Nginx reverse proxy, ready for Kubernetes</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="w-full max-w-1/2 min-w-sm">
                    <CardHeader>
                        <div className="flex flex-row items-center gap-2">
                            <LineChart className="w-5 h-5" />
                            <CardTitle>Grafana dashboards</CardTitle>
                        </div>
                        <CardDescription>Visualize Prometheus metrics for this FastAPI service</CardDescription>
                    </CardHeader>
                </Card>
                <div className="w-full max-w-1/2 min-w-sm border rounded-2xl"></div>
                <Card className="w-full max-w-1/2 min-w-sm">
                    <CardHeader>
                        <div className="flex flex-row items-center gap-2">
                            <Network className="w-5 h-5" />
                            <CardTitle>Test endpoint</CardTitle>
                        </div>
                        <CardDescription>Send a request to FastAPI through Nginx</CardDescription>
                        <Button onClick={check_endpoint} className="mt-1">Call</Button>
                    </CardHeader>
                </Card>
                {success && (
                    <Alert className="w-full max-w-1/2 min-w-sm">
                        <div className="flex flex-row gap-1">
                            <CheckCircle2Icon className="w-5 h-5"/>
                            <AlertTitle>Endpoint is healthy</AlertTitle>
                        </div>
                        <AlertDescription>/api/get-status responded with 200 through Nginx. Check metrics in Prometheus/Grafana.</AlertDescription>
                    </Alert>
                )}
                {error && (
                    <Alert className="w-full max-w-1/2 min-w-sm">
                        <div className="flex flex-row gap-1">
                            <XCircle className="w-5 h-5"/>
                            <AlertTitle>Health check failed</AlertTitle>
                        </div>
                        <AlertDescription>/api/get-status did not return 200. Check Nginx logs, FastAPI logs and Prometheus metrics.</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    )
}