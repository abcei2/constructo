import { createContext, Dispatch, SetStateAction, useState } from "react";
import { deleteStage, deleteStageCategories, deleteStageCategory, deleteStageProducts, getAllStageCategories, getAllStageProducts } from "../db/project";
import { Stage } from "../types/dbTypes";


const StageContext = createContext<any>(null);

const StageContextProvider = (props: {
    children: React.ReactNode,
    stageIndex: number,
    stageItem: Stage,
    projectRef: string,
}) => {

    const { children, stageIndex, stageItem, projectRef } = props
    const stageRef = stageItem.ref

    const [isDirty, setIsDirty] = useState<boolean>(false)
    const [saveStage, setSaveStage] = useState<boolean>(false)
    const [saveStageCategories, setSaveStageCategories] = useState<boolean>(false)
    const [saveStageProducts, setSaveStageProducts] = useState<boolean>(false)    


    const onDeleteStage = async () => {
        const categoriesRef = await getAllStageCategories(projectRef, stageRef)
        categoriesRef.forEach(
            async (categoryRef)=>{
                const productsRef = await getAllStageProducts(projectRef, stageRef, categoryRef.ref)
                deleteStageProducts(projectRef, stageRef, categoryRef.ref, productsRef.map((productRef)=>productRef.ref))
            }
        )

        deleteStageCategories(projectRef, stageItem.ref, categoriesRef.map(
            (categoryRef) => categoryRef.ref
        ))

        deleteStage(projectRef, stageItem.ref)
    }

    const onSaveAll= () =>{
        setSaveStage(true)
        setSaveStageCategories(true)
        setSaveStageProducts(true)        
    }

    return (
        <StageContext.Provider value={{ 
            stageIndex, stageItem, stageRef,
            isDirty, setIsDirty, 
            saveStage, setSaveStage, 
            saveStageCategories, setSaveStageCategories, 
            saveStageProducts, setSaveStageProducts, 
            onSaveAll, onDeleteStage,
            projectRef
        }}>
            {children}
        </StageContext.Provider>
    );
};

export { StageContext, StageContextProvider };