import { ChangeEvent, useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import { StageContextProvider } from "../../../context/StageContext";
import { StagesContext } from "../../../context/StagesContext";
import { getAllStages } from "../../../db/project";
import { Stage } from "../../../types/dbTypes";
import StageMain from "./StageMain";

const Stages = () => {

    const [newStageDescription, setNewStageDescription] = useState<string>("")
    const { stagesInfo, setStagesInfo, projectRef } = useContext(StagesContext)

    const addStage = () => {
        setStagesInfo((oldStagesInfo:Array<Stage>) => {
            return [
                ...oldStagesInfo,
                { ref: uuid(), description: newStageDescription, balance: 0 }
            ]
        })
    }
    
    useEffect(
        () => {
            if (projectRef) {
                getAllStages(projectRef).then(
                    (stagesData: any) => setStagesInfo(stagesData)
                )
                //getAllStageCategories()
            }
        }, [projectRef, setStagesInfo]
    )

    return projectRef ? (
        <div className=" max-h-screen">

            <div className=" w-full flex p-5 gap-5">
                <textarea className="w-[100%] border rounded border-gray-400 px-3 " onChange={
                    (e: ChangeEvent<HTMLTextAreaElement>) => {
                        setNewStageDescription(e.currentTarget.value)
                    }
                } />
                <button onClick={addStage}
                    className="button-secondary">
                    Agrergar etapa
                </button>
            </div>

            <div className="flex flex-col lg:px-20 p-5 gap-4 max-h-full  overflow-auto ">

                <div className="h-screen flex flex-col   gap-4   ">
                    {
                        stagesInfo.map(
                            (stageItem: Stage, index: number) => <StageContextProvider stageItem={stageItem} stageIndex={index} key={index} >
                                <StageMain  />
                            </StageContextProvider> 
                        )
                    }
                    <br />
                </div>

            </div>

        </div>

    ) : <></>
}

export default Stages