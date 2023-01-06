import { useContext } from "react"
import { Category } from "../../types/dbTypes"
import Stepper from "../Stepper"
import ProductsForm from "./prodsProviders/ProductsFormDev"
import WagesForm from "./wages/WagesFormDev"
import { InitProjectContext } from "../../context/InitProjectContext"

const ProjectInitiation = () => {


    const {
        projectName, setProjectName, categories, setCategories,
        currentCategory, setCurrentCategory, buttonType,
        wagesFormUtils, productsFormUtils, stepNames, setStepIndex, stepIndex, nextStep
    } = useContext(InitProjectContext)


    const prevStep = () => {
        if (stepIndex > 0)
            setStepIndex(stepIndex - 1)
    }

    const addCategory = () => {
        if (currentCategory) {
            if (!categories.includes(currentCategory)) {
                setCurrentCategory("")
                setCategories((oldCategories: Array<Category>) => [...oldCategories, currentCategory])
            }
        }
    }

    const removeCategory = (categoryIndex: number) => {
        const newCategories = categories.filter(
            (_: any, index: number) => index != categoryIndex
        )
        productsFormUtils.setValue("products", [])
        setCategories(newCategories)
    }

    const onCategoryNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCategory(ev.target.value);

    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addCategory()
        }
    }

    const whichStepContainer = () => {
        switch (stepIndex) {
            case 0:
                return <div>
                    <div className="flex justify-center flex-col text-2xl text-center w-full">
                        Indique el nombre de su proyecto
                        <input value={projectName} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setProjectName(ev.target.value)}
                            className="text-center border-[var(--primary-color)] rounded border-2 my-5 max-w-xs self-center" />
                    </div>

                </div>
            case 1:
                return <div>
                    <div className="flex justify-center flex-col text-2xl text-center w-full">
                        Agregue categorías
                        <div className="flex  self-center overflow-hidden py-5 px-5 gap-2">
                            <input value={currentCategory} onKeyDown={handleKeyDown} onChange={onCategoryNameChange} className="border-[var(--primary-color)] rounded border-2" />
                            <button onClick={addCategory} className="button-secondary">Add</button>
                        </div>
                        {
                            categories && categories.map(
                                (category: string, index: number) => {
                                    return <span
                                        key={index}
                                        className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                                        {category}
                                        <button onClick={() => removeCategory(index)} className="bg-transparent hover focus:outline-none">
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
                return <WagesForm context={InitProjectContext} />
            case 3:
                return <ProductsForm context={InitProjectContext} />
            default:
                return

        }
    }

    return <div className="p-5">

        <Stepper stepIndex={stepIndex} stepNames={stepNames} />
        {stepIndex == stepNames.length - 2 ? wagesFormUtils.formId : stepIndex == stepNames.length - 1 ? productsFormUtils.formId : ""}
        <div className="mt-8 p-4">

            <div>
                {whichStepContainer()}
            </div>

            <div className="flex p-2 mt-4">
                <button onClick={prevStep} className="button-normal">Previous</button>
                <div className="flex-auto flex flex-row-reverse">
                    <button
                        onClick={stepIndex < stepNames.length - 2 ? () => nextStep(true) : undefined}
                        className="button-primary"
                        type={buttonType}
                        form={stepIndex == stepNames.length - 2 ? wagesFormUtils.formId : stepIndex == stepNames.length - 1 ? productsFormUtils.formId : ""}
                    >{stepIndex < stepNames.length - 2 ? "Next" : stepIndex == stepNames.length - 2 ? "Save and continue" : "Save and finish"}</button>
                    {
                        stepIndex == 0 ? undefined :
                            <button onClick={() => nextStep(false)} className="button-secondary">
                                {stepIndex < stepNames.length - 2 ? "Skip" : stepIndex == stepNames.length - 2 ? "Skip and continue" : "Skip and finish"}
                            </button>
                    }
                </div>
            </div>
        </div>
    </div>

}
export default ProjectInitiation