import { PersonalExpenses } from "@/components/personalExpenses/personalExpenses";
import { AddExpenses } from "@/components/AddExpenses/AddExpenses";

export const Home = () => {
  return (
    <div className="w-11/12 m-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium my-4">Expenses</h2>
        <AddExpenses />
      </div>
      <PersonalExpenses />
    </div>
  );
};
