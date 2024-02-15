import { PersonalExpenses } from "@/components/personalExpenses/personalExpenses";
import { Input } from "@/components/ui/input";
import { AddExpenses } from "@/components/AddExpenses/AddExpenses";
import { useAppStore } from "@/context";
import { useEffect } from "react";
import { axios } from "@/services/axios";

export const Home = () => {
    const { session } = useAppStore();
    
    useEffect(() => {
        axios.get('expense').then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    },[session?.access_token]);
    return (
        <div className="w-11/12 m-auto">
            <h2 className="text-2xl font-medium my-4">Expenses</h2>
            <Input
                placeholder="Search expenses"
                className="w-full my-4"
            />
            <div className="flex justify-between items-center my-4 ">
                <h3 className="font-bold text-xl">Today: $200</h3>
                <AddExpenses/>
            </div>
            <PersonalExpenses />
        </div>
    );
}