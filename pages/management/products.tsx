import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import uuid from "react-uuid"
import useProductsForm from "../../hooks/project/useProductsForm"
import ProductsForm from "../../components/project/prodsProviders/ProductsForm"
import { useAuth } from "../../context/AuthContext"
import { deleteProduct, getAllCategories, getAllProducts, getProductsData, saveProject } from "../../db/project"
import { Category } from "../../types/dbTypes"
import { CategoryFormType, ProductsFormType, ProductType } from "../../types/extraTypes"

const Products = () => {
    const productsFormUtils = useProductsForm()
    const { user } = useAuth()
    const router = useRouter()
    const [projectRef, setProjectRef] = useState<string | any>()

    const [categories, setCategories] = useState<Array<Category>>()
    const [retrievingData, setRetrievingData] = useState<boolean>(false)
    const [dataRetrieve, setDataRetrieve] = useState<boolean>(false)

    const { isDirty, dirtyFields } =  productsFormUtils.formState
  
    const onFieldRemove = (productField:ProductType)=> {
        if (categories && projectRef) {
            const { categoryIndex, ...productToRemove } = productField
            if (productToRemove.ref){
                const category = categories[categoryIndex]
                deleteProduct(projectRef, category.ref, productToRemove.ref)
            }
        }
    }

    const onProductsFormSubmit = (data: ProductsFormType |any) => {
        if (!dataRetrieve || !categories || !user)
            return
        let newProductsProvidersData = undefined
        if (dirtyFields.concept || dirtyFields.manager || !dirtyFields.updateDate){
            newProductsProvidersData = {
                concept: data.concept,
                manager: data.manager,
                updateDate: data.updateDate
            }
        }
        let productsToUpdate = undefined
        if(dirtyFields.products){
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
                            if (Object.keys(dirtyFields.products[productIndex]).includes("categoryIndex")){
                                const currentCategory = categories[productsFormUtils.fields[productIndex].categoryIndex]
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

        saveProject(projectRef, user.email, {
            name: ""
        }, undefined, newProductsProvidersData, productsToUpdate)

        productsFormUtils.reset(productsFormUtils.getValues(), {
            keepDirty: false,
            keepDirtyValues: false
        });
    }

    useEffect(() => {
        if (router.query.projectRef)
            setProjectRef(router.query.projectRef)
        else
            router.replace("/")
    }, [router])

    useEffect(() => {
        if (user && !retrievingData && !dataRetrieve && projectRef){
            setRetrievingData(true)
            getProductsData(projectRef).then(
                (projectData: any) => {
                    productsFormUtils.setValue("concept", projectData.concept)
                    productsFormUtils.setValue("manager", projectData.manager)
                    productsFormUtils.setValue("updateDate", projectData.updateDate)
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
                                                productsFormUtils.append({
                                                    ...product,
                                                    categoryIndex
                                                })
                                            }
                                        )
                                        productsFormUtils.reset(productsFormUtils.getValues(), {
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
        
    }, [dataRetrieve, productsFormUtils, retrievingData, user, projectRef])


    return (<>
        {
            !categories ? undefined :<div className="flex flex-col">

                <ProductsForm onFieldRemove={onFieldRemove} onFormSubmit={onProductsFormSubmit} categories={categories} productsFormUtils={productsFormUtils}></ProductsForm>
                <button
                    className={"button-primary max-w-lg self-end " + (isDirty ? "" : "disabled")}
                    type="submit"
                    disabled={!isDirty}
                    form={ productsFormUtils.formId }
                >Save </button>
            </div>
        }
    </>)
}
export default Products