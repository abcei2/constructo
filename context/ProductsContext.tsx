import { createContext, useState, useEffect } from "react"; 
import uuid from "react-uuid";
import { deleteProduct, getAllCategories, getAllProducts, getProductsData, saveProject } from "../db/project"
import useProductsForm from "../hooks/project/useProductsForm";
import { Category } from "../types/dbTypes"
import { CategoryFormType, ProductsFormType, ProductType } from "../types/extraTypes"

const ProductsFormContext = createContext<any>(null);

const ProductsFormContextProvider = (props: {
    children: React.ReactNode,
    projectOwner:string,
    projectRef:string,
    defaultValues?: ProductsFormType
}) => {
    const { children, defaultValues, projectOwner, projectRef} = props
    //FORM STATES
    const productsFormUtils = useProductsForm(defaultValues)
    const { fields, append, formState, reset, getValues, setValue } = productsFormUtils
    const { isDirty, dirtyFields } = formState  
    //DATA CONTROL STATES
    const [categories, setCategories] = useState<Array<Category>>()
    const [retrievingData, setRetrievingData] = useState<boolean>(false)
    const [dataRetrieve, setDataRetrieve] = useState<boolean>(false)

    useEffect(() => {
        if (!retrievingData && !dataRetrieve && projectRef) {
            setRetrievingData(true)
            getProductsData(projectRef).then(
                (projectData: any) => {
                    setValue("concept", projectData.concept)
                    setValue("manager", projectData.manager)
                    setValue("updateDate", projectData.updateDate)
                }
            )
            getAllCategories(projectRef).then(
                (dbCategories: any) => {

                    setCategories(dbCategories)

                    //Then get all products
                    dbCategories.forEach(
                        (category: CategoryFormType, categoryIndex: number) => {
                            if (category.ref) {
                                getAllProducts(projectRef, category.ref).then(
                                    productsDB => {
                                        productsDB.forEach(
                                            product => {
                                                append({
                                                    ...product,
                                                    categoryIndex
                                                })
                                            }
                                        )
                                        reset(getValues(), {
                                            keepDirty: false,
                                            keepDirtyValues: false
                                        });
                                    }

                                )
                            }

                        }
                    )

                    setDataRetrieve(true)
                    setRetrievingData(false)
                }
            )
        }

    }, [dataRetrieve, retrievingData, projectRef])


    const onFieldRemove = (productField: ProductType) => {
        if (categories && projectRef) {
            const { categoryIndex, ...productToRemove } = productField
            if (productToRemove.ref) {
                const category = categories[categoryIndex]
                deleteProduct(projectRef, category.ref, productToRemove.ref)
            }
        }
    }

    const onFormSubmit = (data: ProductsFormType | any) => {
        if (!dataRetrieve || !categories)
            return
        let newProductsProvidersData = undefined
        if (dirtyFields.concept || dirtyFields.manager || !dirtyFields.updateDate) {
            newProductsProvidersData = {
                concept: data.concept,
                manager: data.manager,
                updateDate: data.updateDate
            }
        }
        let productsToUpdate = undefined
        if (dirtyFields.products) {
            productsToUpdate = data.products.map(
                (productWithCategory: ProductType, productIndex: number) => {
                    const { categoryIndex, ...product } = productWithCategory

                    const updatedFields = {
                        category: categories[categoryIndex],
                        ref: product.ref
                    }

                    if (!product.ref) {
                        return {
                            ...product,
                            category: categories[categoryIndex],
                            ref: uuid()
                        }
                    }

                    Object.keys(product).filter(
                        (productKey) => {
                            if (dirtyFields.products)
                                if (dirtyFields.products[productIndex])
                                    if (Object.keys(dirtyFields.products[productIndex]).includes(productKey))
                                        return dirtyFields.products[productIndex][productKey]
                        }
                    ).forEach(
                        (productDirtyKey: string) => {
                            Object.assign(updatedFields, { [productDirtyKey]: data.products[productIndex][productDirtyKey] })
                            return { [productDirtyKey]: data.products[productIndex][productDirtyKey] }

                        }
                    )

                    if (dirtyFields.products) {
                        if (dirtyFields.products[productIndex])
                            if (Object.keys(dirtyFields.products[productIndex]).includes("categoryIndex")) {
                                const currentCategory = categories[fields[productIndex].categoryIndex]
                                deleteProduct(projectRef, currentCategory.ref, product.ref)
                                return { ...product, ...updatedFields }
                            }
                    }

                    if (Object.keys(updatedFields).length > 2)
                        return updatedFields

                }

            ).filter(
                (updatedFields: any) => updatedFields
            )

        }

        saveProject(projectRef, projectOwner, {
            name: ""
        }, undefined, newProductsProvidersData, productsToUpdate)

        reset(getValues(), {
            keepDirty: false,
            keepDirtyValues: false
        });
    }
    
    return (
        <ProductsFormContext.Provider value={
            {
                isDirty, dirtyFields,
                productsFormUtils,
                onFieldRemove,onFormSubmit,
                categories, setCategories, 
                retrievingData, setRetrievingData, 
                dataRetrieve, setDataRetrieve
            }}>
            {children}
        </ProductsFormContext.Provider>
    );
};

export { ProductsFormContext, ProductsFormContextProvider };