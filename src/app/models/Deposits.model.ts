export interface DepositsDTO {
    accountNumber: number;
    sum: number;
    depositTypeId: number;
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
}

export interface DepositTypeDTO {
    depositTypeId: string;
    depositTypeName: string;
    interestRate: number;
    earlyRepaymentFee: number;
    depositPeriodMonths: number;
    minimumDeposit: number;
    monthlyWithdrawalDay: number;
}
