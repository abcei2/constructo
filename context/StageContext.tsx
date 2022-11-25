import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Stage } from "../types/dbTypes";


const StageContext = createContext<any>(null);

const StageContextProvider = (props: {
    children: React.ReactNode,
    stageIndex: number,
    stageItem: Stage
}) => {

    const { children, stageIndex, stageItem } = props
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
            stageIndex, stageItem, 
            isDirty, setIsDirty, 
            saveStage, setSaveStage, 
            saveStageCategories, setSaveStageCategories, 
            saveStageProducts, setSaveStageProducts, onSaveAll  
        }}>
            {children}
        </StageContext.Provider>
    );
};

export { StageContext, StageContextProvider };