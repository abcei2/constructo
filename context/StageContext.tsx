import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Stage } from "../types/dbTypes";

type StageContexType = {
    stageIndex: string,
    stageItem: Stage
}
const StageContext = createContext<StageContexType | any>(null);

const StageContextProvider = (props: {
    children: React.ReactNode,
    stageIndex: string,
    stageItem: Stage
}) => {

    const { children, stageIndex, stageItem } = props

    return (
        <StageContext.Provider value={{ stageIndex, stageItem }}>
            {children}
        </StageContext.Provider>
    );
};

export { StageContext, StageContextProvider };