import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/context";
import { supabase } from "@/services/supabase";
import { useState } from "react";

import LoaderSVG from "@/assets/icons/loader.svg?react";
import { ETCurrencyIdToName, fullNamesConcat } from "@/lib/utils";

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const state = useAppStore();
    const { user } = state;

    async function signOut() {
        console.log('signing out');
        if (isLoading) return;
        setIsLoading(true);
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast({ variant: "destructive", title: error.message })
        } else {
            toast({ title: "Signed out successfully" })
        }
        setIsLoading(false);
    }
    
    const settingsItems = [
        {
            id: 1,
            settingsName: "Name",
            settingsValue: fullNamesConcat(user?.first_name || "", user?.last_name || ""),
        },
        {
            id: 2,
            settingsName: "Email",
            settingsValue: user?.email || "",
        },
        {
            id: 3,
            settingsName: "Phone",
            settingsValue: user?.phone_number || "",
        },
        {
            id: 4,
            settingsName: "Currency",
            settingsValue: ETCurrencyIdToName(user?.default_currency || 0),
        },
    ];

    return (
        <div className="mt-20">
            <div className="w-11/12 m-auto">
                <div className="px-4">
                    <img alt="avatar" className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={user?.avatar_url || 'https://api.dicebear.com/7.x/identicon/svg'} />
                </div>
                <div className="p-4">
                    {settingsItems.map((item) => (
                        <>
                            <div key={item.id} className="flex justify-between my-4">
                                <p>{item.settingsName}</p>
                                <p>{item.settingsValue}</p>
                            </div>
                            <Separator />
                        </>
                    ))}
                </div>
                <Button size="lg" variant="destructive" className="w-full mt-5" onClick={signOut}>{isLoading && <LoaderSVG className="mr-2 h-4 w-4 animate-spin" /> }Sign out</Button>
            </div>

        </div>
    );
}