import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DatePicker } from "../ui/datepicker";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg?react";

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

                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Project name</label>
                                <input type="text" className="w-full mt-1" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>
            </Card>
        </>
    );
}