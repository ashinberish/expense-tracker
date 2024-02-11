import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DatePicker } from "../ui/datepicker";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg?react";
import { Separator } from "../ui/separator";

export const PersonalExpenses = () => {
    return (
        <>
            <Card className="w-full min-h-72">
                <div className="flex justify-between mt-2 px-4">
                    <Button variant="outline" className="w-1/5">
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <DatePicker />
                    <Button variant="outline" className="w-1/5">
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div> 
                <CardContent>
                <div className="flex justify-between my-4">
                     <p>Food</p>
                     <p>$200</p>
                </div>
                <Separator />
                <div className="flex justify-between my-4">
                     <p>Grocery</p>
                     <p>$200</p>
                </div>
                <Separator />
                </CardContent>
            </Card>
        </>
    );
}