import { Stage } from "../../../types/dbTypes"

const StageHeader = (props:{
    stageInfo: Stage
})=>{
    const { stageInfo } = props
    return <>
        <button className="button-secondary">Save</button>
        <div className="w-full flex gap-5 justify-between">
            <textarea className="w-full border rounded" defaultValue={stageInfo.description} />
            
        </div>
        <div className="grid grid-cols-2 text-center">
            <label>Unidad:</label>
            <label>Precio Unitario:</label>

            <div>día</div>
            <div>${stageInfo.balance}</div>

        </div>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path></svg>
    </>
}

export default StageHeader