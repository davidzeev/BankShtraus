export interface DepositsDTO {
    accountNumber: number;
    sum: number;
    depositTypeId: number;
    // monthlyDepositAmount?: number;  // Optional: for savings accounts
    monthlyDepositDay?: number;     // Optional: for savings accounts
}


export interface DepositsAccountDTO {
    depositId: number;
    depositTypeName: string;
    interestRate: number;
    earlyRepaymentFee: number;
    depositPeriodMonths: number;
    monthlyWithdrawalDay: number;
    depositedAmount: number;
    dateStart: Date;
    dateEnd: Date;
    dateFinish?: Date;
    depositStatus: number;
    monthlyDepositAmount?: number;  // amount will update every month
    monthlyDepositDay?: number;     // the Day is will update the Saving
    isSavings: boolean;
}

export interface DepositTypeDTO {
    depositTypeId: string;
    depositTypeName: string;
    interestRate: number;
    earlyRepaymentFee: number;
    depositPeriodMonths: number;
    minimumDeposit: number;
    monthlyWithdrawalDay: number;
    isSavings: boolean;
}

