import { EmployeeWage } from "./dbTypes"

import { 
    FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove,
    UseFieldArrayUpdate, UseFormGetValues, UseFormHandleSubmit, 
    UseFormRegister, UseFormReset, UseFormResetField, UseFormSetValue 
} from "react-hook-form";

export type WagesFormTypes = {
    employeesWage: Array<EmployeeWage>
}

export type WagesFormHookParams = {
    formId?: string,
    register: UseFormRegister<WagesFormTypes>,
    fields: FieldArrayWithId<WagesFormTypes, "employeesWage", "id">[],
    append: UseFieldArrayAppend<WagesFormTypes, "employeesWage">,
    remove: UseFieldArrayRemove,
    resetField: UseFormResetField<WagesFormTypes>, 
    update: UseFieldArrayUpdate<WagesFormTypes, "employeesWage">,
    handleSubmit: UseFormHandleSubmit<WagesFormTypes>,
    setValue: UseFormSetValue<WagesFormTypes>,
    getValues: UseFormGetValues<WagesFormTypes>
}

export type WagesFormPropsType = {
    wagesFormUtils: WagesFormHookParams
    onFieldRemove?: any,
    onFormSubmit?: any,
    onFormError?: any,
    defaultValues?: WagesFormTypes,
}

export type ProductType= {
    ref?:string,
    categoryIndex: number,
    name: string,
    brand: string,
    provider: string,
    price: number | undefined,
    type: string,
    discount: number | undefined,
    performance: number | undefined
}
export type ProductsFormType = {
    ref?:string,
    concept: string,
    updateDate: Date;
    manager: string;
    products: Array<ProductType | any>
}

export type ProductsFormHookParams = {
    formId?:string,
    register: UseFormRegister<ProductsFormType>,
    fields: FieldArrayWithId<ProductsFormType, "products", "id">[],
    append: UseFieldArrayAppend<ProductsFormType, "products">,
    remove: UseFieldArrayRemove,
    reset: UseFormReset<ProductsFormType>,
    resetField: UseFormResetField<ProductsFormType>,
    update: UseFieldArrayUpdate<ProductsFormType, "products">,
    handleSubmit: UseFormHandleSubmit<ProductsFormType>,
    setValue: UseFormSetValue<ProductsFormType>,
    getValues: UseFormGetValues<ProductsFormType>
}
export type CategoryFormType = {
    ref?: string,
    name: string
}
export type ProductsFormPropsType = {
    productsFormUtils: ProductsFormHookParams ,
    categories:Array<CategoryFormType>,
    onFormSubmit?: any,
    onFormError?: any,
    onFormChange?:any,
    onFieldRemove?:any,
    defaultValues?: ProductsFormType ,
}

