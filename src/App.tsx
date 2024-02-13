import { Layout } from "./pages/layout/layout"
import { useEffect } from "react"
import { supabase } from "./services/supabase"
import { Toaster } from "./components/ui/toaster"
import { useAppStore } from "@/context"


function App() {
  const state = useAppStore()
  const { setSession } = state

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
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
