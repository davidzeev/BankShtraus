export enum Role {
    regular = 1,
    admin = 2,
}

export enum TransactionType {
    BankTransfer = 1,       // העברה בנקאית
    CreateDeposit = 2,      // יצירת פקדון
    CompleteDeposit = 3,    // סיום פקדון
    WithdrawalDeposit = 4,  // (משכית פקדון (בתחנות יציאה או לפני הזמן
    Loan = 5,               // הלוואה
    Fee = 6                 // עמלה
}
export enum IncomeExpenseType {
    Income = 1,     // הכנסות
    Expense = 2     // הוצאות
}

export enum ActionType {
    None = 0,      // לא נעשתה פעולה או מאופסת
    Success = 1,   // פעולה צלחה
    Failed = 2     // פעולה נכשלה
}

export enum Consts {
    accountNumberAdmin = 10000
}