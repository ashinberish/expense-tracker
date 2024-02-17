export type ExpenseType = {
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

export type PersonalExpenseResponeType = {
    total_amount: number;
    expenses: ExpenseType[];
  }
