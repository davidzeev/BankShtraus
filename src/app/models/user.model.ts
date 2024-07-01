export interface LoginAccount {
    userId: number | null,
    userCode: string,
    password: string
}

export interface Account {
    accountNumber: number;
    branchNumber: number;
    userId: number;
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
    overdraftLimit: number;
}

export interface CreateAccountRequestDTO {
    branchNumber: number;
    userId: number;
    password: string;
    firstName: string;
    lastName?: string;
    mail?: string;
    phone?: string;
    homePhone?: string;
    address?: string;
    role: number;
    qaGroup?: string;
    balance: number;
    overdraftLimit: number;
}

export interface UpdateAccountRequestDTO {
    branchNumber: number;
    userId: number;
    firstName: string;
    lastName?: string;
    mail?: string;
    phone?: string;
    homePhone?: string;
    address?: string;
    role: number;
    qaGroup?: string;
    balance: number;
    overdraftLimit: number;
}
