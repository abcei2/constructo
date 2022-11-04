import { useFieldArray, useForm } from "react-hook-form";
import { Product } from "../../../types/dbTypes";

const useProjectForm = () =>{
    const {
        register,
        control,
        handleSubmit,
    } = useForm<{
        concept: string,
        updateDate: Date;
        owner: string;
        products: Array<Product>
    }>({
        mode: "onBlur"
    });

    const { fields, append, remove, update } = useFieldArray({
        name: "products",
        control
    });

    return { register, fields, append, remove, update, handleSubmit }
}

 export default useProjectForm