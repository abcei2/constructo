import { ChangeEvent, useState } from "react";
import { Stage } from "../../../types/dbTypes";
import Acordion from "../../Acordion";
import StageCategories from "./StageCategories";
import StageHeader from "./StageHeader";

const Stages = (props: {
    projectRef: string
}) => {

    const { projectRef } = props
    const [newStageDescription, setNewStageDescription] = useState<string>("")
    const [stagesInfo, setStagesInfo] = useState<Array<Stage>>([])

    const addStage = () => {
        setStagesInfo((oldStagesInfo) => {
            return [
                ...oldStagesInfo,
                { description: newStageDescription, balance:0 }
            ]
        })
    }

    return projectRef ? (<div className=" max-h-screen">
    
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
                        (stageItem, index) => <Acordion key={index} headerTemplate={<StageHeader stageInfo={stageItem}/>}>
                            <StageCategories projectRef={projectRef} setStagesInfo={setStagesInfo } stageIndex={index}/>
                        </Acordion>
                    )
                }
                <br/>
            </div>

        </div>
  
    </div>
    ) : <></>
}

export default Stages