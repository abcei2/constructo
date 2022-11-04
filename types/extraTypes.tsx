import { EmployeeWage, Product } from "./dbTypes"


export type WagesFormTypes = {
    employeesWage: Array<EmployeeWage>
}

export type ProductsFormType = {
    concept: string,
    updateDate: Date;
    owner: string;
    products: Array<Product>
}