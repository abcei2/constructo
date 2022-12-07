import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import uuid from "react-uuid"
import { useAuth } from "../../context/AuthContext"
import { saveProject } from "../../db/project"
import { ProdsProviders, Product } from "../../types/dbTypes"
import { ProductsFormType, WagesFormTypes } from "../../types/extraTypes"
import useProductsForm from "../../hooks/project/useProductsForm"
import useWagesForm from "../../hooks/project/useWagesForm"
import Stepper from "../Stepper"
import ProductsForm from "./prodsProviders/ProductsForm"
import WagesForm from "./wages/WagesForm"

const ProjectInitiation = () => {

    const { user } = useAuth();
    const router = useRouter();

    const [projectName, setProjectName] = useState<string>()
    
    const [categories, setCategories] = useState<Array<string>>([])
    const [currentCategory, setCurrentCategory] = useState<string>()
    const [buttonType, setButtonType] = useState < "button" | "submit" | "reset" | undefined >("button") 


    const stepNames = ["Nombrar proyecto", "Agregar categorías", "Crear cargos", "Crear productos"]
    const [stepIndex, setStepIndex] = useState<number>(0)

    const wagesFormUtils = useWagesForm()
    const productsFormUtils = useProductsForm()


    useEffect(
        ()=>stepIndex >= 2 ? setButtonType("submit") : setButtonType("button")      
    , [stepIndex])
    
    const indexIncrease = (stepIndex:number) => {
        if (stepIndex < stepNames.length - 1)
            setStepIndex(stepIndex + 1)
    }
    

    const nextStep = (saveData: boolean) => {
              
        
        switch(stepIndex){
            case 0:
                if (saveData && projectName && projectName != "")
                    indexIncrease(stepIndex)
                break;
            case 2 :
                if (!saveData)
                    wagesFormUtils.setValue("employeesWage",[])
                indexIncrease(stepIndex)
                break;
            case 3 :
                console.log(productsFormUtils.getValues())

                if (!saveData)
                    productsFormUtils.setValue("products", [])

                const projectData = { name: projectName ? projectName : "NO NAME"}

                const wagesData = wagesFormUtils.getValues("employeesWage").map((wage) => {
                    return {
                        ...wage,
                        ref: uuid()
                    }
                })
                const categoriesData = categories.map((name:string) => {                
                        return {
                            name,
                            ref: uuid()
                        }
                })

                const prodsProviders:ProdsProviders= {
                    concept:productsFormUtils.getValues("concept"),
                    manager: productsFormUtils.getValues("manager"),
                    updateDate: productsFormUtils.getValues("updateDate"),
                }
                
                const productsData:Array<Product> = []
                productsFormUtils.getValues("products").map((productFormData) => {
                    const { categoryIndex, ...product } = productFormData
                    const productCategory = categoriesData[categoryIndex]  
                    if (productCategory)                 
                        productsData.push( {
                            ...product,
                            category: productCategory,
                            ref: uuid()
                        })
                })
                const newProjectRef = uuid()
                saveProject(
                    newProjectRef,
                    user?.email?user.email:"",
                    projectData,
                    categoriesData, 
                    prodsProviders,
                    productsData,
                    wagesData
                )
                router.push( {
                    pathname: '/management',
                    query: { projectRef: newProjectRef }
                })
                break;
            default:
                indexIncrease(stepIndex)
                break;
        }
    }

    const prevStep = () => {
        if (stepIndex > 0)
            setStepIndex(stepIndex - 1)
    }

    const addCategory = () => {
        if (currentCategory){
            if (!categories.includes(currentCategory)){
                setCurrentCategory("")
                setCategories(oldCategories => [...oldCategories, currentCategory])
            }
        }
    }

    const removeCategory = (categoryIndex: number) => {
        const newCategories = categories.filter(
            (_, index: number) => index != categoryIndex            
        )
        productsFormUtils.setValue("products",[])
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

    const onWagesFormSubmit = (data: WagesFormTypes) =>{
        console.log(data)
        setStepIndex(stepIndex + 1)

    }


    const onProductsFormSubmit = (data: ProductsFormType) => {

        console.log(data)
        nextStep(true)

    }
    
    const whichStepContainer = () => {
        switch (stepIndex) {
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
                    wagesFormUtils={wagesFormUtils}
                    onFormSubmit={onWagesFormSubmit} />
            case 3:
                return <ProductsForm
                    productsFormUtils={productsFormUtils}
                    categories={categories.map(category => {return {name:category}})}
                    onFormSubmit={onProductsFormSubmit}/>
            default:
                return

        }
    }

    return <>
        {
            user && <div className="p-5">

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
                                onClick={stepIndex < stepNames.length - 2 ? ()=>nextStep(true):undefined}
                                className="button-primary"
                                type={buttonType}
                                form={stepIndex == stepNames.length - 2 ? wagesFormUtils.formId : stepIndex == stepNames.length - 1?productsFormUtils.formId:""}
                            >{stepIndex < stepNames.length - 2 ? "Next" : stepIndex == stepNames.length - 2?"Save and continue":"Save and finish"}</button>
                            {
                                stepIndex==0?undefined:
                                    <button onClick={() => nextStep(false)} className="button-secondary">
                                        {stepIndex < stepNames.length - 2 ? "Skip" : stepIndex == stepNames.length - 2 ? "Skip and continue" : "Skip and finish"}
                                </button> 
                            }
                        </div>
                    </div>
                </div>
            </div>
        }        
    </>

}
export default ProjectInitiation