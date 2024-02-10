import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/context";
import { supabase } from "@/services/supabase";
import { useState } from "react";
import moment from "moment";

import LoaderSVG from "@/assets/icons/loader.svg?react";

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
            settingsName: "Name",
            settingsValue: "Ashin Berish",
        },
        {
            settingsName: "Email",
            settingsValue: user?.email || "",
        },
        {
            settingsName: "Phone",
            settingsValue: "+91 284938372",
        },
        {
            settingsName: "Currency",
            settingsValue: "USD",
        },
    ];

    return (
        <div className="mt-20">
            <div className="w-11/12 m-auto">
                <div className="px-4">
                    <img alt="avatar" className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={"https://api.dicebear.com/7.x/identicon/svg"} />
                </div>
                <div className="p-4">
                    {settingsItems.map((item, index) => (
                        <>
                            <div key={index} className="flex justify-between my-4">
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