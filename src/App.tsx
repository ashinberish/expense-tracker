import { Layout } from "./pages/layout/layout"
import { useEffect } from "react"
import { supabase } from "./services/supabase"
import { Toaster } from "./components/ui/toaster"
import { useAppStore } from "@/context"
import { axios } from "./services/axios"


function App() {
  const state = useAppStore()
  const { setSession } = state

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.access_token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${session.access_token}`;
      }
      
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.access_token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${session.access_token}`;
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <Layout />
      <Toaster />
    </>
  )
}

export default App
