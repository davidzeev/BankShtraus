export enum Role {
    regular = 1,
    admin = 2,
}

export enum TransactionType {
    BankTransfer = 1,       // העברה בנקאית
    CreateDeposit = 2,      // יצירת פקדון
    CompleteDeposit = 3,    // סיום פקדון
    WithdrawalDeposit = 4,  // (משכית פקדון (בתחנות יציאה או לפני הזמן
    UpdateDeposit = 5,      // עדכון חסכון
    Loan = 6,               // הלוואה
    Fee = 7                 // עמלה
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
    accountNumberAdmin = 10000,
    BankId = 444
}

export enum PasswordStrength {
    VeryWeak = "סיסמה חלשה מאוד",
    Weak = "סיסמה חלשה",
    Medium = "סיסמה בינונית",
    Strong = "סיסמה חזקה",
    VeryStrong = "סיסמה חזקה מאוד"
}
