import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState{
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void
}

export const useAuth = create<AuthState>((set) => {
    const access_token = typeof window !== "undefined" ? Cookies.get("access_token") ?? null : null;

    return {
        token: access_token,

        setToken: (token) => {
            Cookies.set("access_token", token, {
                expires: 7,
                path: "/",
                sameSite: "lax",
            });
            set({ token });
        },
        logout: () => {
            Cookies.remove("access_token");
            set({ token: null });
        },
    };
});