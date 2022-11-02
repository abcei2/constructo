export type Project = {
    name:string
}

export type EmployeesWage = {
    roleName: string,
    estimatedIncrease: number,
    transportAllowance: number,
    socialWelfare: number,
    welfareBenefits: number,
    workProvisions: number,
    totalWage: number
}

type EmployeeAmount = {
    wageKind: EmployeesWage,
    amount: number
}

export type WorkTeams = {
    team: Array<EmployeeAmount>,
    totalWage: number
}


export type Category = {
    name: string
}

export type Product = {
    category: string,
    name: string,
    brand: string,
    provider: string,
    price: number,
    type: string,
    discount: number,
    performance: number
}