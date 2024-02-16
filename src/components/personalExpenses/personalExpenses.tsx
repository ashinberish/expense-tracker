import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { DatePicker } from "../ui/datepicker";
import { Separator } from "../ui/separator";

import moment, { Moment } from "moment";
import { axios } from "@/services/axios";
import { ScrollArea } from "../ui/scroll-area";

import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg?react";

interface IExpense {
  id?: number;
  expense_name: string;
  expense_desc: string | null;
  expense_amount: number;
  expense_emoji: string;
  expense_ts: Date;
  user_id: string;
  group_id: string | null;
  created_at: Date;
}

export const PersonalExpenses = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  const changePrevDate = () => {
    setSelectedDate((o) => moment(o).subtract(1, "days"));
  };
  const changeNextDate = () => {
    setSelectedDate((o) => moment(o).add(1, "days"));
  };

  const getExpenses = () => {
    axios.get(
      `expense?specificDate=${moment(selectedDate).format("MM-DD-YYYY")}`,
    ).then(
      (res) => {
        console.log(res.data);
        setExpenses(res.data?.expenses);
      },
    ).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getExpenses();
  }, [selectedDate]);
  return (
    <>
      <Card className="w-full">
        <div className="flex justify-between my-2 px-4">
          <Button variant="outline" className="w-1/5" onClick={changePrevDate}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={(date: Moment) => {
              setSelectedDate(moment(date));
            }}
          />
          <Button
            variant="outline"
            disabled={moment(selectedDate).isSame(moment(), "date")}
            className="w-1/5"
            onClick={changeNextDate}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
      <div className="w-full mt-4">
        <ScrollArea className="px-4" style={{ height: "calc(100dvh - 330px)" }}>
          {expenses.map((expense: IExpense) => (
            <Fragment key={expense.id}>
              <div className="flex items-center justify-between my-4">
                <div className="flex gap-4 items-center">
                  <span className="rounded-md border w-10 h-10 flex items-center justify-center">
                    {expense.expense_emoji}
                  </span>
                  <p className="font-normal">{expense.expense_name}</p>
                </div>
                <p>${expense.expense_amount}</p>
              </div>
              <Separator />
            </Fragment>
          ))}
          {expenses.length === 0 && (
            <div className="flex justify-center items-center min-h-full">
              <p>No expenses for this day 🎉</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
};
