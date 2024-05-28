export interface LoginAccount {
    userId: number | null,
    userCode: string,
    password: string
}

export interface Account {
    accountNumber: number;
    branchNumber: number;
    userId: number;
    password: string;
    userCode: string;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    homePhone: string;
    address: string;
    role: number;
    qaGroup: string;
    balance: number;
    OverdraftLimit: number;
}
