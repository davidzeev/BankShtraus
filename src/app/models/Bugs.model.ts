// BugDTO.ts
export interface BugDTO {
    id: string;
    bugId: number;
    name: string;
    description: string;
    bugType: number;
    difficultyLevel: number;
    version: number;
    frequency: number;
    data?: number;
}

// AccountBugCreateDTO.ts
export interface AccountBugCreate {
    id: string;
    data?: number;
    frequency: number;
}

// UpdateAccountBugsDTO.ts
export interface UpdateAccountBugsDTO {
    accountNumber: number;
    bugs: AccountBugCreate[];
}

// AccountBugDTO.ts
export interface AccountBug {
    bugId: number;
    name: string;
    description: string;
    bugType: number;
    frequency: number;
    counter: number;
    data?: number;
}

export interface BugsAndBugsAccountDTO {
    bugList: BugDTO[];
    accountBugs: AccountBug[];
}