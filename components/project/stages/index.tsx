import Acordion from "../../Acordion";
import StageCategories from "./StageCategories";

const Stages = (props:{
    projectRef:string
}) =>{

    const { projectRef } = props

    return projectRef ?(
        <div className=" flex flex-col lg:px-20 p-5 gap-4 h-screen place-content-center overflow-scroll ">

            <div className="h-32 w-full flex my-5 gap-5">
                <textarea className="w-[100%] border rounded border-gray-400 px-3 " />
                <button className="button-secondary">
                    Agrergar categoría
                </button>
            </div>


            <div className="h-screen ">
                <Acordion headerText="LOCALIZACIÓN, TRAZADO Y REPLANTEO. Se utilizará personal experto con equipo de precisión. Se hará con la frecuencia que lo indique la interventoría. Incluye demarcación con pintura, línea de trazado, corte de piso, libretas y planos.">
                    <StageCategories projectRef={projectRef}/>
                </Acordion>

            </div>

        </div>    
    ):<></>
}

export default Stages