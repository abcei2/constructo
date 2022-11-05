import { useFieldArray, useForm } from "react-hook-form";
import { WagesFormTypes } from "../../../types/extraTypes";

const useWagesForm = (defaultValues?:WagesFormTypes) =>{
    const formId = "employeesWage"
    const {
        register,
        control,
        handleSubmit,
        getValues,
        setValue
    } = useForm<WagesFormTypes>({
        mode: "onBlur",
        defaultValues:defaultValues
    });

    const { fields, append, remove, update } = useFieldArray({
        name: formId,
        control
    });

    return { register, setValue, control, getValues, fields, append, remove, update, handleSubmit, formId }
}

 export default useWagesForm