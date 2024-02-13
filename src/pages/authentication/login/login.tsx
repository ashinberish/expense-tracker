import { supabase } from "@/services/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import LoaderSVG from "@/assets/icons/loader.svg?react";
import { useAppStore } from "@/context";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const state = useAppStore();
    const { setUser } = state;

    const { toast } = useToast();
    const navigate = useNavigate();

    async function signInWithEmail() {
        if (isLoading) return;
        if (!email || !password) {
            toast({ variant: "destructive", title: "Please enter email and password" })
            return;
        }
        
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        
        if (data.session) {
            const { data: profile } = await supabase.from('profiles').select(
                'id, first_name, last_name, avatar_url, email, phone_number, default_currency, updated_at').eq('id', data.user.id).single()
            //console.log('profile',profile)
            setUser(profile)
            toast({ title: "Login successful" })
            navigate('/home')
        }
        if (error) {
            toast({ variant: "destructive", title: error.message })
        }
        setIsLoading(false);
    }
    return (
        <div className="min-h-dvh flex flex-col justify-center">
            <div className="w-11/12 m-auto">
                <h3 className="text-2xl font-base text-center mb-6">Login</h3>
                <form>
                    <Input type="email" className="my-3" autoComplete="off" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" className="my-3" autoComplete="off" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="button" size="lg" className="w-full my-2" onClick={signInWithEmail}>{isLoading && <LoaderSVG className="mr-2 h-4 w-4 animate-spin" /> }Login</Button>
                </form>
            </div>
        </div>
    );
}