import { ChangeEvent, useEffect, useRef, useState } from "react"
import { getAllCategories } from "../../../db/project"
import { Category, Stage, StageCategory } from "../../../types/dbTypes"
import StageProducts from "./StageProducts"

const StageCategories = (props: {
    projectRef: string,
    stageIndex: any,
    setStagesInfo: any,

}) => {
    const { projectRef, setStagesInfo, stageIndex } = props

    const categoriesSelectorRef = useRef(null)

    const [categories, setCategories] = useState<Array<Category>>([])

    const [stageCategories, setStageCategories] = useState<Array<{ stageCategory: StageCategory, category: Category }>>([])

    const addStageCategory = () => {
        if (stageCategories.length < categories.length && categoriesSelectorRef.current) {
            const currentSelector: HTMLSelectElement = categoriesSelectorRef.current
            if (currentSelector.selectedIndex > 0) {
                setStageCategories(
                    [
                        ...stageCategories, {
                            stageCategory: { balance: 0, ref: "" },
                            category: categories[currentSelector.selectedIndex - 1]
                        }
                    ]
                )
                currentSelector.selectedIndex = 0
            }
        }
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

    useEffect(
        () => {
            console.log(stageCategories)
            if (stageCategories.length > 0) {
                const newStageBalance = stageCategories.reduce((acc,category)=>acc+category.stageCategory.balance,0)
                setStagesInfo(
                    (oldStagesInfo: Array<Stage>) => {
                        return oldStagesInfo.map(
                            (oldStageInfo, oldStageInfoIndex) => {
                                if (oldStageInfoIndex == stageIndex)
                                    oldStageInfo.balance = newStageBalance
                                return oldStageInfo
                            }
                        )
                    }
                )
            }

        }, [stageCategories, stageIndex, setStagesInfo]
    )

    return !categories || categories.length == 0 ? <></> : <div>
        {
            stageCategories.length < categories.length ? <div className="flex m-5 gap-5 ">
                <select ref={categoriesSelectorRef} className="w-[100%] ">
                    <option value={-1} key={-1}>Seleccione una categoría para agregar.</option>
                    {
                        categories.map(
                            (category, index) => {
                                let hiddenOpt = false
                                if (stageCategories.length > 0) {
                                    const currentStageCategoriesRefs = stageCategories.map(
                                        (stageCategory) => stageCategory.category.ref
                                    )
                                    hiddenOpt = currentStageCategoriesRefs.includes(category.ref)
                                }
                                return <option key={index} value={index} hidden={hiddenOpt}>
                                    {category.name}
                                </option>
                            }
                        )

                    }

                </select>
                <button onClick={addStageCategory} className="button-primary w-[30%]">
                    Agrergar categoría
                </button>
            </div> : undefined
        }

        {
            stageCategories.map(
                (stageCategory, index) => <div key={index} className="border-t border-gray-400 m-5">
                    <div className="text-xl  justify-between flex">
                        <div>
                            ❌
                            {stageCategory.category.name}

                        </div>
                        <div>
                            Subtotal: {stageCategory.stageCategory.balance}

                        </div>
                    </div>

                    <StageProducts projectRef={projectRef} categoryRef={stageCategory.category.ref} stageCategoryIndex={index} stageIndex={stageIndex} setStagesInfo={setStagesInfo} setStageCategories={setStageCategories}></StageProducts>
                </div>
            )
        }

    </div>
}

export default StageCategories