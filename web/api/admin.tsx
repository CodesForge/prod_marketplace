
export async function loginAdmin(data: { username: string, password: string }) {
    try {
        const response = await fetch("/api/admins/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const result = await response.json()
        if (result?.access_token) {
            localStorage.setItem("access_token", result.access_token)
        }
        return result
    } catch (error) {
        throw new Error("error");
    }
}