import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/modules/auth/types';

interface AuthState {
    // State
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // Initial state
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: true,

            // Actions
            setUser: (user) => set({ user, isAuthenticated: !!user }),

            setToken: (token) => {
                if (token) {
                    Cookies.set('access_token', token, { expires: 7, secure: true, sameSite: 'lax' });
                } else {
                    Cookies.remove('access_token');
                }
                set({ token, isAuthenticated: !!token });
            },

            login: (user, token) => {
                Cookies.set('access_token', token, { expires: 7, secure: true, sameSite: 'lax' });
                set({ user, token, isAuthenticated: true, isLoading: false });
            },

            logout: () => {
                Cookies.remove('access_token');
                set({ user: null, token: null, isAuthenticated: false, isLoading: false });
            },

            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, token: state.token }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const token = Cookies.get('access_token');
                    state.isAuthenticated = !!token && !!state.user;
                    state.isLoading = false;
                }
            },
        }
    )
);
