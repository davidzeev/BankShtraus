export interface TransferData {
    date: string; // תאריך
    description: string; // תיאור תנועה (העברה בנקאית, חיוב חשבון וכו')
    rightsAndObligations: number; // זכות/חובה
    balance: number; // יתרה
}