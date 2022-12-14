export type Project = {
    name: string
}

export type EmployeeWage = {
    ref:string,
    roleName: string,
    estimatedIncrease: number | undefined,
    transportAllowance: number | undefined,
    socialWelfare: number | undefined,
    welfareBenefits: number | undefined,
    workProvisions: number | undefined,
    totalWage: number | undefined
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


export type Stage = {
    ref:string;
    description:string;
    balance: number;

}

export type StageCategory = {
    balance:number,
    ref:string
}

export type StageProduct = {
    ref:string,
    quantity: number


}