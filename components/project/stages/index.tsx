import { ChangeEvent, useState } from "react";
import { Stage } from "../../../types/dbTypes";
import Acordion from "../../Acordion";
import StageCategories from "./StageCategories";

const Stages = (props:{
    projectRef:string
}) =>{

    const { projectRef } = props
    const [newStageDescription, setNewStageDescription] = useState<string>("")
    const [ stageList, setStageList ] = useState<Array<Stage>>([])

    const addStage = () =>{
        setStageList((oldStageList) => {
            return [
                ...oldStageList,
                {description:newStageDescription}
            ]
        })
    }
    
    return projectRef ?(
        <div className=" flex flex-col lg:px-20 p-5 gap-4 h-screen place-content-center overflow-scroll ">

            <div className="h-32 w-full flex my-5 gap-5">
                <textarea className="w-[100%] border rounded border-gray-400 px-3 " onChange={
                    (e: ChangeEvent<HTMLTextAreaElement>) => {
                        setNewStageDescription(e.currentTarget.value)
                    }
                }/>
                <button onClick={addStage}
                className="button-secondary">
                    Agrergar categoría
                </button>
            </div>


            <div className="h-screen ">
                {
                    stageList.map(
                        (stageItem, index) => <Acordion key={index} headerText={stageItem.description}>
                                <StageCategories projectRef={projectRef} />
                            </Acordion>
                    )
                }

            </div>

        </div>    
    ):<></>
}

export default Stages