import { EmployeeWage, Product } from "./dbTypes"
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFieldArrayUpdate, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";

export type WagesFormTypes = {
    employeesWage: Array<EmployeeWage>
}

export type WagesFormHookParams = {
    formId?: string,
    register: UseFormRegister<WagesFormTypes>,
    fields: FieldArrayWithId<WagesFormTypes, "employeesWage", "id">[],
    append: UseFieldArrayAppend<WagesFormTypes, "employeesWage">,
    remove: UseFieldArrayRemove,
    update: UseFieldArrayUpdate<WagesFormTypes, "employeesWage">,
    handleSubmit: UseFormHandleSubmit<WagesFormTypes>,
    setValue: UseFormSetValue<WagesFormTypes>,
    getValues: UseFormGetValues<WagesFormTypes>
}

export type WagesFormPropsType = {
    wagesFormUtils: WagesFormHookParams
    onFormSubmit?: any,
    onFormError?: any,
    defaultValues?: WagesFormTypes,
}

export type ProductsFormType = {
    concept: string,
    updateDate: Date;
    owner: string;
    products: Array<Product>
}

export type ProductsFormHookParams = {
    formId?:string,
    register: UseFormRegister<ProductsFormType>,
    fields: FieldArrayWithId<ProductsFormType, "products", "id">[],
    append: UseFieldArrayAppend<ProductsFormType, "products">,
    remove: UseFieldArrayRemove,
    update: UseFieldArrayUpdate<ProductsFormType, "products">,
    handleSubmit: UseFormHandleSubmit<ProductsFormType>,
    setValue: UseFormSetValue<ProductsFormType>,
    getValues: UseFormGetValues<ProductsFormType>
}

export type ProductsFormPropsType = {
    productsFormUtils: ProductsFormHookParams 
    onFormSubmit?: any,
    onFormError?: any,
    defaultValues?: ProductsFormType ,
}

