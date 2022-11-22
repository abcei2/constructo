import { ChangeEvent, useEffect, useState } from "react"
import { getAllCategories } from "../../../db/project"
import { Category, StageCategory } from "../../../types/dbTypes"
import StageProducts from "./StageProducts"

const StageCategories = (props: {
    projectRef: string
}) => {
    const { projectRef } = props

    const [categories, setCategories] = useState<Array<Category>>([])
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0)

    const [stageCategories, setStageCategories] = useState<Array<{stageCategory:StageCategory,category:Category}>>([])

    const addStageCategory = () => {
        if (stageCategories.length < categories.length){
            setStageCategories(
                [
                    ...stageCategories, {
                        stageCategory: {balance:0,ref:""},
                        category: categories[currentCategoryIndex]
                    }
                ]
            )
            setCurrentCategoryIndex(0)
        }      
    }
    
    const getNotAddedCategories = () =>{
        return categories.filter(
            (category) => {
                if (stageCategories.length > 0) {
                    const currentStageCategoriesRefs = stageCategories.map(
                        (stageCategory) => stageCategory.category.ref
                    )
                    return !currentStageCategoriesRefs.includes(category.ref)
                }
                return true
            }
        )
    }

    useEffect(
        () => {
            if (projectRef) {
                getAllCategories(projectRef).then(
                    (categories: any) => setCategories(categories)
                )
                //getAllStageCategories()
            }
        }, [projectRef]
    )
    return !categories || categories.length == 0 ? <></> : <div>
        {
            stageCategories.length < categories.length ? <div className="flex m-5 gap-5 ">
                <select className="w-[100%] " onChange={
                    (e: ChangeEvent<HTMLSelectElement>) => {
                        setCurrentCategoryIndex(e.currentTarget.selectedIndex)
                    }
                }>
                    {
                        getNotAddedCategories().map(
                            (category, index) => <option key={index} value={category.ref}>
                                {category.name}
                            </option>
                        )

                    }

                </select>
                <button onClick={addStageCategory} className="button-primary w-[30%]">
                    Agrergar categoría
                </button>
            </div>:undefined
        }

        {
            stageCategories.map(
                (stageCategory, index) => <div key={index} className="border-t border-gray-400 m-5">
                    <div className="text-xl  justify-between flex">
                        <div>
                            ❌
                            {categories[index].name}

                        </div>
                        <div>
                            Subtotal: {stageCategory.stageCategory.balance}

                        </div>
                    </div>
                   
                    <StageProducts projectRef={projectRef} categoryRef={stageCategory.category.ref}></StageProducts>
                </div>
            )
        }

    </div>
}

export default StageCategories