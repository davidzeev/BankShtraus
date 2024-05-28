export interface BankTransferRequest {
    beneficiaryName: string | null,
    bankCode: number | null,
    branchCode: number | null,
    accountNumber: number | null,
    amount: number | null,
    transferPurpose: number | null,
    otherPurpose: string | null,
}

export interface BankTransferDTO {
    accountNumberSender: number | null,
    beneficiaryName: string | null,
    bankID: number | null,
    branchID: number | null,
    accountNumber: number | null,
    amount: number | null,
    transferPurpose: number | null,
    otherPurpose: string | null,
}
