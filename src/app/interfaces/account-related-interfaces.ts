export interface LoginCredentials {
    email: string;
    password: string;
}

export enum AccountType{
    Candidate,
    Company
}

export enum CompanySize{
    Small, Medium, Large
}
