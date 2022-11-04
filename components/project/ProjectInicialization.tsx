import { useState } from "react"
import { WagesFormTypes } from "../../types/extraTypes"
import useWagesForm from "../hooks/project/useWagesForm"
import Stepper from "../Stepper"
import WagesForm from "./WagesForm"

const ProjectInitiation = () => {
    const [whichStepIndex, setWhichStepIndex] = useState<number>(0)
    const [categories, setCategories] = useState<Array<string>>([])
    const [projectName, setProjectName] = useState<string>()
    const [currentCategory, setCurrentCategory] = useState<string>()

    const stepNames = ["Nombrar proyecto", "Agregar categorías", "Crear cargos"]

    const { register, fields, append, remove, update, handleSubmit, formId } = useWagesForm()

    const nextStep = () => {
        if (whichStepIndex < stepNames.length - 1)
            setWhichStepIndex(whichStepIndex + 1)
    }

    const prevStep = () => {
        if (whichStepIndex > 0)
            setWhichStepIndex(whichStepIndex - 1)
    }

    const addCategory = () => {
        if (currentCategory){
            if (!categories.includes(currentCategory))
                setCategories(oldCategories => [...oldCategories, currentCategory])
        }
    }

    const removeCategory = (categoryIndex: number) => {
        console.log(categoryIndex)
        const newCategories = categories.filter(
            (_, index: number) => index != categoryIndex            
        )
        setCategories(newCategories)
    }

    const onCategoryNameChange = (ev: React.ChangeEvent<HTMLInputElement>) =>{
        setCurrentCategory(ev.target.value);

    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addCategory()
        }
    }

    const onWageFormSubmit = (data: WagesFormTypes) =>{
        console.log(data)

    }
    const whichStepContainer = () => {
        switch (whichStepIndex) {
            case 0:
                return <div>
                    <div className="flex justify-center flex-col text-2xl text-center w-full">
                        Indique el nombre de su proyecto
                        <input value={projectName} onChange={(ev: React.ChangeEvent<HTMLInputElement>)=>setProjectName(ev.target.value)}
                        className="text-center border-teal-600 rounded border-2 my-5 max-w-xs self-center" />
                    </div>

                </div>
            case 1:
                return <div>
                    <div className="flex justify-center flex-col text-2xl text-center w-full">
                        Agregue categorías
                        <div className="flex  self-center overflow-hidden py-5 px-5 gap-2">
                            <input value={currentCategory} onKeyDown={handleKeyDown} onChange={onCategoryNameChange} className="border-teal-600 rounded border-2" />
                            <button onClick={addCategory} className="button-secondary">Add</button>
                        </div>

                        {
                            categories && categories.map(
                                (category: string, index: number) => {
                                    return <span
                                        key={index}
                                        className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                                        {category}
                                        <button onClick={()=>removeCategory(index)} className="bg-transparent hover focus:outline-none">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                                className="w-3 ml-3" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 352 512">
                                                <path fill="currentColor"
                                                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
                                                </path>
                                            </svg>
                                        </button>
                                    </span>
                                }
                            )
                        }
                    </div>

                </div>
            case 2:
                return <WagesForm 
                        register={register} fields={fields} 
                        append={append} remove={remove} update={update} 
                        handleSubmit={handleSubmit} formId={formId}
                        onFormSubmit={onWageFormSubmit} />
            default:
                return

        }
    }

    return (
        <div className="p-5">
            <Stepper whichStepIndex={whichStepIndex} setWhichStepIndex={setWhichStepIndex} stepNames={stepNames} />
            <div className="mt-8 p-4">
                
                <div>
                    {whichStepContainer()}
                </div>

                <div className="flex p-2 mt-4">
                    <button onClick={prevStep} className="button-normal">Previous</button>
                    <div className="flex-auto flex flex-row-reverse">
                        <button 
                            onClick={nextStep} 
                            className="button-primary"
                            type={whichStepIndex < stepNames.length - 1?"button":"submit"}
                            form={formId}
                        >{whichStepIndex < stepNames.length - 1?"Next":"Save"}</button>
                        {
                            whichStepIndex < stepNames.length - 1 && <button onClick={nextStep} className="button-secondary">Skip</button>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ProjectInitiation