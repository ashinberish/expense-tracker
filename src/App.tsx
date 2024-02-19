import { Layout } from "./pages/layout/layout";
import { useEffect } from "react";
import { supabase } from "./services/supabase";
import { Toaster } from "./components/ui/toaster";
import { useAppStore } from "@/context";
import { axios } from "./services/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const state = useAppStore();
  const { setSession } = state;

  const queryClient = new QueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.access_token) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${session.access_token}`;
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.access_token) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${session.access_token}`;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
