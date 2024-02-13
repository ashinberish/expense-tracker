import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AddIcon from "@/assets/icons/plus.svg?react";
import { supabase } from "@/services/supabase";
import { useAppStore } from "@/context";

export const AddExpenses = () => {
    const {user} = useAppStore();

    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button variant="default" className="flex items-center">
                    <AddIcon className="h-4 w-4 mr-2" />
                    Add Expense
                </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12">
                <DialogHeader>
                    <DialogTitle>Add a Expense</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name">
                            Expense Name
                        </Label>
                        <Input id="name" className="col-span-3" />
                    </div>
                    <div>
                        <Label htmlFor="desc" className="text-right">
                            Expense Description
                        </Label>
                        <Input id="desc" className="col-span-3" />
                    </div>
                    <div>
                        <Label htmlFor="spend" className="text-right">
                            Amount Spend (INR)
                        </Label>
                        <Input id="spend" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Add Expense</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}