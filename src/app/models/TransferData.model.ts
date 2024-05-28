export interface TransactionAccount {
    accountNumber: number;
    fromDate: Date;
    toDate: Date;
}

export interface Transaction {
    amount: number;
    date: Date;
    transactionType: number;
    referenceNumber: string;
    comments?: string;
    accountNumber: number;
    incomeExpense: number;
    balance: number;
    counterpartyBankId: number;
    counterpartyAccountNumber: number;
    counterpartyBranchId: number;
    counterpartyAccountName: string;
}