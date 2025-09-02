import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'USER' | 'EDITOR' | 'ADMIN';
  avatar: string | null;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        setUser: (user) =>
          set(
            {
              user,
              isAuthenticated: !!user,
              error: null,
            },
            false,
            'setUser'
          ),

        setLoading: (loading) =>
          set({ isLoading: loading }, false, 'setLoading'),

        setError: (error) => set({ error }, false, 'setError'),

        clearError: () => set({ error: null }, false, 'clearError'),

        login: async (credentials) => {
          set({ isLoading: true, error: null }, false, 'login:start');

          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || 'Login failed');
            }

            set(
              {
                user: data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              },
              false,
              'login:success'
            );
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Login failed';
            
            set(
              {
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: errorMessage,
              },
              false,
              'login:error'
            );

            throw error;
          }
        },

        logout: () => {
          set(
            {
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            },
            false,
            'logout'
          );

          // Clear any stored session data
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-storage');
            sessionStorage.clear();
          }
        },

        refreshUser: async () => {
          const { isAuthenticated } = get();
          
          if (!isAuthenticated) return;

          try {
            const response = await fetch('/api/auth/me');
            
            if (response.ok) {
              const userData = await response.json();
              set(
                { user: userData.user },
                false,
                'refreshUser:success'
              );
            } else {
              // If refresh fails, logout
              get().logout();
            }
          } catch (error) {
            console.error('Failed to refresh user:', error);
            get().logout();
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
        version: 1,
        migrate: (persistedState: any, version: number) => {
          // Handle migration between versions
          if (version === 0) {
            // Migration from version 0 to 1
            return {
              ...persistedState,
              error: null,
              isLoading: false,
            };
          }
          return persistedState as AuthState;
        },
      }
    ),
    {
      name: 'auth-store',
    }
  )
);