import { useContext } from "react"
import { StageContext } from "../../../context/StageContext"
import { Stage } from "../../../types/dbTypes"
import Acordion from "../../Acordion"
import StageCategories from "./StageCategories"
import StageHeader from "./StageHeader"

const StageMain = () =>{

    return <Acordion headerTemplate={<StageHeader/>}>
        <StageCategories />
    </Acordion>
}

export default StageMain