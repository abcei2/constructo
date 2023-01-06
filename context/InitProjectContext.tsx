import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import { saveProject } from "../db/project";
import useProductsForm from "../hooks/project/useProductsForm";
import useWagesForm from "../hooks/project/useWagesForm";
import { EmployeeWage, ProdsProviders, Product } from "../types/dbTypes";

const InitProjectContext = createContext<any>(null);

const InitProjectContextProvider = (props: {
    children: React.ReactNode,
    projectOwner: string
}) => {
    const { children, projectOwner } = props
    const [projectName, setProjectName] = useState<string>() 

    const router = useRouter()

    const [categories, setCategories] = useState<Array<string>>([])
    const [currentCategory, setCurrentCategory] = useState<string>()
    const [buttonType, setButtonType] = useState<"button" | "submit" | "reset" | undefined>("button")


    const stepNames = ["Nombrar proyecto", "Agregar categorías", "Crear cargos", "Crear productos"]
    const [stepIndex, setStepIndex] = useState<number>(0)

    const wagesFormUtils = useWagesForm()
    const productsFormUtils = useProductsForm()

    useEffect( () => stepIndex >= 2 ? setButtonType("submit") : setButtonType("button"), [stepIndex])

    const indexIncrease = (stepIndex: number) => {
        if (stepIndex < stepNames.length - 1)
            setStepIndex(stepIndex + 1)
    }

    const nextStep = (saveData: boolean) => {


        switch (stepIndex) {
            case 0:
                if (saveData && projectName && projectName != "")
                    indexIncrease(stepIndex)
                break;
            case 2:
                if (!saveData)
                    wagesFormUtils.setValue("employeesWage", [])
                indexIncrease(stepIndex)
                break;
            case 3:
                console.log(productsFormUtils.getValues())

                if (!saveData)
                    productsFormUtils.setValue("products", [])

                const projectData = { name: projectName ? projectName : "NO NAME" }

                const wagesData = wagesFormUtils.getValues("employeesWage").map((wage: EmployeeWage) => {
                    return {
                        ...wage,
                        ref: uuid()
                    }
                })
                const categoriesData = categories.map((name: string) => {
                    return {
                        name,
                        ref: uuid()
                    }
                })

                const prodsProviders: ProdsProviders = {
                    concept: productsFormUtils.getValues("concept"),
                    manager: productsFormUtils.getValues("manager"),
                    updateDate: productsFormUtils.getValues("updateDate"),
                }

                const productsData: Array<Product> = []
                productsFormUtils.getValues("products").map((productFormData: any) => {
                    const { categoryIndex, ...product } = productFormData
                    const productCategory = categoriesData[categoryIndex]
                    if (productCategory)
                        productsData.push({
                            ...product,
                            category: productCategory,
                            ref: uuid()
                        })
                })
                const newProjectRef = uuid()
                saveProject(
                    newProjectRef,
                    projectOwner,
                    projectData,
                    categoriesData,
                    prodsProviders,
                    productsData,
                    wagesData
                )
                router.push({
                    pathname: '/management',
                    query: { projectRef: newProjectRef }
                })
                break;
            default:
                indexIncrease(stepIndex)
                break;
        }
    }

    const onWagesFormSubmit = () => setStepIndex(stepIndex + 1)

    const onProductsFormSubmit = () => nextStep(true)


    return (
        <InitProjectContext.Provider value={{
            projectName, setProjectName, categories, setCategories,
            currentCategory, setCurrentCategory, buttonType,
            wagesFormUtils, productsFormUtils, stepNames, setStepIndex, stepIndex, 
            projectOwner, onWagesFormSubmit, onProductsFormSubmit,
            nextStep
        }}>
            {children}
        </InitProjectContext.Provider>
    );
};

export { InitProjectContext, InitProjectContextProvider };