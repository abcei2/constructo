import { createContext, Dispatch, SetStateAction, useState } from "react";
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
    
    return (
        <StagesContext.Provider value={{ stagesInfo, setStagesInfo, projectRef}}>
            {children}
        </StagesContext.Provider>
    );
};

export { StagesContext, StagesContextProvider };