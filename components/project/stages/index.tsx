import { ChangeEvent, useState } from "react";
import { Stage } from "../../../types/dbTypes";
import Acordion from "../../Acordion";
import StageCategories from "./StageCategories";

const Stages = (props: {
    projectRef: string
}) => {

    const { projectRef } = props
    const [newStageDescription, setNewStageDescription] = useState<string>("")
    const [stageList, setStageList] = useState<Array<Stage>>([])

    const addStage = () => {
        setStageList((oldStageList) => {
            return [
                ...oldStageList,
                { description: newStageDescription }
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
                    stageList.map(
                        (stageItem, index) => <Acordion key={index} headerText={stageItem.description}>
                            <StageCategories projectRef={projectRef} />
                        </Acordion>
                    )
                }

            </div>

        </div>
  
    </div>
    ) : <></>
}

export default Stages