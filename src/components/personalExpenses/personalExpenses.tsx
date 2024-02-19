import { Fragment, useEffect, useState } from "react";
import moment, { Moment } from "moment";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { axios } from "@/services/axios";

import { ExpenseType, PersonalExpenseResponeType } from "@/models/expense";
import { useQuery } from "@tanstack/react-query";

import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg?react";
import LoaderSVG from "@/assets/icons/loader.svg?react";

export const PersonalExpenses = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseType[]>([]);

  const changePrevDate = () => {
    setSelectedDate((o) => moment(o).subtract(1, "days"));
  };
  const changeNextDate = () => {
    setSelectedDate((o) => moment(o).add(1, "days"));
  };

  const getExpenses = async (selected_date: Moment) => {
    const res = await axios.get(
      `expense?specificDate=${moment(selected_date).format("MM-DD-YYYY")}`,
    )
    return res.data;
  };

  const { data, isLoading, isFetched, isError } = useQuery<PersonalExpenseResponeType>({
    queryKey: ["expenses", selectedDate],
    queryFn: () => getExpenses(selectedDate),
  });

  useEffect(() => {
    if (searchKey != "") {
      let filteredData = data?.expenses.filter((expense: ExpenseType) => {
        return expense["expense_name"].toLowerCase().includes(
          searchKey.toLowerCase(),
        );
      });
      setFilteredExpenses(filteredData!);
    } else {
      setFilteredExpenses(data?.expenses!);
    }
  }, [searchKey, data?.expenses]);

  return (
    <>
      <Card className="w-full">
        <div className="px-4">
          <Input
            onChange={(e) => setSearchKey(e.currentTarget.value)}
            placeholder="Search expenses"
            className="w-full my-4"
          />
        </div>
        <div className="flex justify-between my-4 px-4">
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
      {isError && (
        <div className="flex justify-center items-center min-h-full" style={{ height: "calc(100dvh - 330px)" }}>
          <p>Something went wrong!</p>
        </div>
      )}
      {(!isLoading && isFetched && !isError) && (
        <Fragment>
          <div className="flex justify-between items-center my-4 ">
            <div className="flex items-baseline">
              <h3 className="font-semibold text-slate-500 text-sm">
                {data?.total_amount != 0 &&
                  `Total Spends: ₹${data?.total_amount}`}
              </h3>
            </div>
          </div>
          <div className="w-full mt-4">
            <ScrollArea
              className="px-4 scroll-shadows"
              style={{ height: "calc(100dvh - 330px)" }}
            >
              {filteredExpenses?.map((expense: ExpenseType) => (
                <Fragment key={expense.id}>
                  <div className="flex items-center my-4 gap-2 relative">
                    <div className="rounded-md border w-10 h-10 flex items-center bg-slate-50 justify-center">
                      <span>
                        {expense.expense_emoji}
                      </span>
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="font-medium text-xs">
                        {expense.expense_name}
                      </p>

                      <p className="font-normal w-10/12 text-xs truncate overflow-hidden">
                        {expense.expense_desc}&nbsp;
                      </p>
                    </div>
                    <div className="absolute font-medium text-xs right-1 text-xs h-full">
                      <p>₹{expense.expense_amount}</p>
                    </div>
                  </div>
                  <Separator />
                </Fragment>
              ))}
              {data?.expenses.length === 0 && (
                <div className="flex justify-center items-center min-h-full">
                  <p>No expenses for this day. 🎉</p>
                </div>
              )}
              {(data?.expenses.length != 0 && filteredExpenses?.length === 0) &&
                (
                  <div className="flex justify-center items-center min-h-full">
                    <p>No expenses found. 🤔</p>
                  </div>
                )}
            </ScrollArea>
          </div>
        </Fragment>
      )}
      {isLoading && (
        <div
          className="flex items-center justify-center"
          style={{ height: "calc(100dvh - 330px)" }}
        >
          <LoaderSVG className="animate-spin" />
        </div>
      )}
    </>
  );
};
