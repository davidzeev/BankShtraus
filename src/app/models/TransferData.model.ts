export interface TransactionDataTable {
    date: string; // תאריך
    description: string; // תיאור תנועה (העברה בנקאית, חיוב חשבון וכו')
    amount: number; // זכות/חובה
    balance: number; // יתרה
}


export interface transactionAccount {
    accountNumber: number;
    fromDate: Date;
    toDate: Date;
}

export interface transaction {
    transactionNumber: number;
    bankNumberSender: number;
    accountNumberSender: number;
    branchNumberSender: number;
    accountNameSender: string;
    bankNumberReceiver: number;
    accountNumberReceiver: number;
    branchNumberReceiver: number;
    accountNameReceiver: string;
    amount: number;
    balance: number;
    date: Date;
    transactionType: number;
    comments?: string;
}