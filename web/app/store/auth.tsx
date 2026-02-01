import { create } from "zustand";

interface AuthState{
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void
}

export const useAuth = create<AuthState>((set) => {
    const access_token = localStorage.getItem("access_token");

    return {
        token: access_token,

        setToken: (token) => {
            localStorage.setItem("access_token", token);
            set({ token });
        },
        logout: () => {
            localStorage.removeItem("access_token");
            set({ token: null });
        },
    };
});