export type Project = {
    name: string
}

export type EmployeeWage = {
    ref:string,
    roleName: string,
    estimatedIncrease: number,
    transportAllowance: number,
    socialWelfare: number,
    welfareBenefits: number,
    workProvisions: number,
    totalWage: number
}

type EmployeeAmount = {
    wageKind: EmployeeWage,
    amount: number
}

export type WorkTeams = {
    team: Array<EmployeeAmount>,
    totalWage: number
}
export type ProdsProviders = {
    ref?: string,
    concept: string,
    manager: string;
    updateDate: Date;
}

export type Category = {
    ref: string,
    name: string
}

export type Product = {
    ref:string,
    category: Category,
    name: string,
    brand: string,
    provider: string,
    price: number,
    type: string,
    discount: number,
    performance: number
}
export type User = {
    id: string,
    name: string,
    email: string,
}