import { useFieldArray, useForm } from "react-hook-form";
import { WagesFormTypes } from "../../../types/extraTypes";

const useWagesForm = () =>{
    const formId = "employeesWage"
    const {
        register,
        control,
        handleSubmit,
    } = useForm<WagesFormTypes>({
        mode: "onBlur"
    });

    const { fields, append, remove, update } = useFieldArray({
        name: formId,
        control
    });

    return { register, fields, append, remove, update, handleSubmit, formId }
}

 export default useWagesForm