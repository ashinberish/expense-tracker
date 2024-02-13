import { User } from '@/models/user';
import { Session } from '@supabase/supabase-js';
import { StoreApi, UseBoundStore } from 'zustand'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ApplicationState = {
    session: Session | null;
    user: User | null;
    setUser: (user: User | null) => void;
    setSession: (session: Session | null) => void; 
}

const initialState: { [key: string]: any } = {
    session: null,
};

export const useAppStore:UseBoundStore<StoreApi<ApplicationState>> = create(persist(
    (set, get) => {
      return {
        session: get() ? get().session : null,
        user: get() ? get().user : null,
        setUser: (user: User | null) => set({ user }),
        setSession: (session: Session | null) => set({ session }),
        resetStore: () => {
            set(initialState);
        }
      };
    },
    {
      name: "expense-tracker",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);