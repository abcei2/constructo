import { useFieldArray, useForm } from "react-hook-form";
import { Product } from "../../../types/dbTypes";
import { ProductsFormType } from "../../../types/extraTypes";

const useProductsForm = (defaultValues?: ProductsFormType) => {
    const formId = "products"
    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues
    } = useForm<ProductsFormType>({
        mode: "onBlur",
        defaultValues: defaultValues
    });

    const { fields, append, remove, update } = useFieldArray({
        name: formId,
        control
    });

    return { register, setValue, control, getValues, fields, append, remove, update, handleSubmit, formId }
}

export default useProductsForm