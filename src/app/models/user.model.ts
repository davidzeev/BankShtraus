export interface loginUser {
    userId: number | null,
    userCode: string,
    password: string
}

export interface User {
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
    adress: string;
    role: number;
    qaGroup: string;
    balance: number;
}
