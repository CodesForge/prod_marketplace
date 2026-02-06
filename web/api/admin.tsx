import { useAuth } from "@/app/store/auth";

export async function loginAdmin(data: { username: string, password: string }) {
    try {
        const response = await fetch("/admins/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const result = await response.json()
        if (result?.access_token) {
            useAuth.getState().setToken(result.access_token)
        }
        return result
    } catch (error) {
        throw new Error("error");
    }
}