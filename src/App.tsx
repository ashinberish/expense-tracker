import { Layout } from "./pages/layout/layout"
import { useEffect } from "react"
import { supabase } from "./services/supabase"
import { Toaster } from "./components/ui/toaster"
import { useAppStore } from "@/context"


function App() {
  const state = useAppStore()
  const { setSession, setUser } = state

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if(session){
        setUser(session.user)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if(session){
        setUser(session.user)
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
