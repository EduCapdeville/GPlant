export type TransactionType = "receita" | "gasto";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: TransactionType;
  description: string;
  category: string;
}

export interface TransactionState {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  getBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
  getMaxExpense: () => number;
  getMinExpense: () => number;
}