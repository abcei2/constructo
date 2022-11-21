import { useFieldArray, useForm } from "react-hook-form";
import { ProductsFormType } from "../../types/extraTypes";

const useProductsForm = (defaultValues?: ProductsFormType) => {
    const formId = "products"
    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        getFieldState,
        reset,
        formState 
    } = useForm<ProductsFormType>({
        mode: "onBlur",
        defaultValues: defaultValues
    });

    const { fields, append, remove, update } = useFieldArray({
        name: formId,
        control
    });


    return { reset, register, setValue, control, getValues, fields, append, remove, update, handleSubmit, formId, getFieldState, formState }
}

export default useProductsForm