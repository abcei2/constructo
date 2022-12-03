import { createContext, useState } from "react";
import { deleteStage, deleteStageCategories, deleteStageProducts, getAllStageCategories, getAllStageProducts } from "../db/project";
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
            onSaveAll, 
            projectRef
        }}>
            {children}
        </StageContext.Provider>
    );
};

export { StageContext, StageContextProvider };