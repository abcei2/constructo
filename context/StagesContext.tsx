import { createContext, Dispatch, SetStateAction, useState } from "react";
import { deleteStage, deleteStageCategories, deleteStageProducts, getAllStageProducts, getAllStages } from "../db/project";
import { Stage } from "../types/dbTypes";

type StagesContexType = {
    stagesInfo:Array<Stage>, 
    setStagesInfo: Dispatch<SetStateAction<Stage>>
}
const StagesContext = createContext<StagesContexType | any>( null);

const StagesContextProvider = (props: {
    children: React.ReactNode,
    projectRef: string
 }) => {

    const { children, projectRef } = props
    const [stagesInfo, setStagesInfo] = useState<Array<Stage>>([])
    
    const onDeleteStage = async (stageIndex:number) => {
        
        const stageRef = stagesInfo[stageIndex].ref
        console.log(stageIndex, stageRef)
        if (stageRef && stageRef != ""){
            const categoriesRef = await getAllStages(projectRef)
            categoriesRef.forEach(
                async (categoryRef) => {
                    const productsRef = await getAllStageProducts(projectRef, stageRef, categoryRef.ref)
                    deleteStageProducts(projectRef, stageRef, categoryRef.ref, productsRef.map((productRef) => productRef.ref))
                }
            )

            deleteStageCategories(projectRef, stageRef, categoriesRef.map(
                (categoryRef) => categoryRef.ref
            ))

            deleteStage(projectRef, stageRef)
        }
       
        
        setStagesInfo(
            (oldStagesInfo)=>{
                console.log(oldStagesInfo.filter(
                    (oldStageInfo, index) => index != stageIndex
                ))
                return oldStagesInfo.filter(
                    (oldStageInfo, index) => index != stageIndex
                )
            }
        )

    }

    return (
        <StagesContext.Provider value={{ stagesInfo, setStagesInfo, projectRef, onDeleteStage }}>
            {children}
        </StagesContext.Provider>
    );
};

export { StagesContext, StagesContextProvider };