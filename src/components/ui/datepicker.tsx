import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import moment, { Moment } from "moment";

import CalendarIcon from "@/assets/icons/calendar.svg?react";

export function DatePicker(props:{
  selectedDate: Moment,
  setSelectedDate: (date: Moment) => void,
}) {
  
  const selectDate = (date: Date | undefined) => {
    props.setSelectedDate(moment(date));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-2/4 justify-start text-left font-normal",
            !props.selectedDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.selectedDate
            ? moment(props.selectedDate).format('MMMM Do, YYYY')
            : <span>Goto a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.selectedDate.toDate()}
          onSelect={selectDate}
          toDate={new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
