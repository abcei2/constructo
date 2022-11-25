import { useContext, useEffect } from "react"
import { StageContext } from "../../../context/StageContext"
import { StagesContext } from "../../../context/StagesContext"
import { saveStageDB } from "../../../db/project"
import Acordion from "../../Acordion"
import StageCategories from "./StageCategories"
import StageHeader from "./StageHeader"

const StageMain = () =>{

    const { projectRef } = useContext(StagesContext)
    const { saveStage, setSaveStage, stageItem } = useContext(StageContext)
    useEffect(
        () => {
            if (saveStage) {
                saveStageDB(projectRef, "", stageItem)
                setSaveStage(false)
            }
        }, [saveStage, setSaveStage, projectRef, stageItem]
    )
    return <Acordion headerTemplate={<StageHeader/>}>
        <StageCategories />
    </Acordion>
}

export default StageMain