import { PersonalExpenses } from "@/components/personalExpenses/personalExpenses";
import { Input } from "@/components/ui/input";
import { AddExpenses } from "@/components/AddExpenses/AddExpenses";

export const Home = () => {
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