import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { axios } from "@/services/axios";
import { useAppStore } from "@/context";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import AddIcon from "@/assets/icons/plus.svg?react";
import LoaderSVG from "@/assets/icons/loader.svg?react";
import { Cross2Icon } from "@radix-ui/react-icons";

export const AddExpenses = () => {
  const { session } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const expenseFormSchema = z.object({
    expenseName: z.string().min(2, {
      message: "Provide a name for the expense",
    }),
    expenseDesc: z.string().optional(),
    expenseAmount: z.number().min(1, {
      message: "Provide a expense amount",
    }),
  });

  const expenseForm = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      expenseName: "",
      expenseDesc: "",
      expenseAmount: 0,
    },
  });


  const handleAddExpense = (values: z.infer<typeof expenseFormSchema>) => {
    if (isLoading) return;

    setIsLoading(true);
    axios.post("expense", {
      expense: {
        expense_name: values.expenseName,
        expense_desc: values.expenseDesc,
        expense_amount: +values.expenseAmount,
        expense_emoji: "🍔", // TODO: add emoji picker in the UI
        expense_ts: new Date().toISOString(),
        user_id: session?.user.id,
        group_id: null, // TODO: future group implemenation
        created_at: new Date().toISOString(),
      },
    }).then(() => {
      setIsLoading(false);
      resetAndClose();
    }).catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
  };

  const resetAndClose = () => {
    expenseForm.reset();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(true)}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="flex items-center">
          <AddIcon className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Add a Expense</DialogTitle>
          <span
            onClick={resetAndClose}
            className="absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </span>
        </DialogHeader>
        <Form {...expenseForm}>
          <form onSubmit={expenseForm.handleSubmit(handleAddExpense)}>
            <FormField
              control={expenseForm.control}
              name="expenseName"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Expense Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Expense Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={expenseForm.control}
              name="expenseDesc"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Expense Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Expense Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={expenseForm.control}
              name="expenseAmount"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Expense Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Expense Amount"
                      {...field}
                      onChange={(event) => {
                        if (!isNaN(+event.target.value)) {
                          field.onChange(+event.target.value);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="submit">
                {isLoading && (
                  <LoaderSVG className="mr-2 h-4 w-4 animate-spin" />
                )}Add Expense
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
