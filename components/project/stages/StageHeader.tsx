import { useContext } from "react"
import { StageContext } from "../../../context/StageContext"
import { StagesContext } from "../../../context/StagesContext"
import { Stage } from "../../../types/dbTypes"

const StageHeader = ()=>{
    const { stageItem, stageIndex, onSaveAll } = useContext(StageContext)
    const { onDeleteStage, setStagesInfo } = useContext(StagesContext)
    return <>
        <button className="button-secondary" onClick={onSaveAll}>Save</button>

        <div className="w-full flex gap-5 justify-between">
            <textarea className="w-full border rounded" value={stageItem.description} onChange={(ev)=>{
                setStagesInfo( (oldStagesInfo:Array<Stage>) => {
                    return oldStagesInfo.map(                        
                        (oldStageInfo,index)=>{
                            if(index == stageIndex)
                                return {

                                    ...oldStageInfo,
                                    description: ev.target.value
                                }
                            return oldStageInfo
                        }               
                    )
                })
            }}/>            
        </div>

        <button onClick={() => onDeleteStage(stageIndex)}>❌ {stageIndex}</button>
        <div className="grid grid-cols-2 text-center">
            <label>Unidad:</label>
            <label>Precio Unitario:</label>


            <div>día</div>
            <div>${stageItem.balance}</div>           

        </div>
        <div className="flex  gap-4 justify-center">
            <svg className="w-6 h-6 self-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path></svg>

        </div>        

    </>
}

export default StageHeader