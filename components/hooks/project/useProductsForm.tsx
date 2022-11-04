import { useFieldArray, useForm } from "react-hook-form";
import { Product } from "../../../types/dbTypes";
import { ProductsFormType } from "../../../types/extraTypes";

const useProductsForm = () => {
    const formId = "products"
    const {
        register,
        control,
        handleSubmit,
    } = useForm<ProductsFormType>({
        mode: "onBlur"
    });

    const { fields, append, remove, update } = useFieldArray({
        name: formId,
        control
    });

    return { register, fields, append, remove, update, handleSubmit, formId }
}

export default useProductsForm