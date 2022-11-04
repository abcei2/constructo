import { useState } from "react"
import Stepper from "../Stepper"

const ProjectInitiation = () => {
    const [whichStepIndex, setWhichStepIndex] = useState<number>(0)
    const stepNames = ["Nombrar proyecto", "Agregar categorías", "Crear cargos"]

    const nextStep = () =>{
        if(whichStepIndex<stepNames.length-1)
            setWhichStepIndex(whichStepIndex+1)
    }

    const prevStep = () => {
        if (whichStepIndex > 0)
            setWhichStepIndex(whichStepIndex - 1)
    }

    const whichStepContainer = () => {
        switch (whichStepIndex){
            case 0:
                return <div>
                    <div className="flex justify-center flex-col font-bold text-2xl text-center w-full">
                        Indique el nombre de su proyecto

                        <input className="border-teal-600 rounded border-2 my-5 max-w-xs self-center" />
                    </div>
                    
                </div>
            case 1:
                return
            case 2:
                return
            default:
                return               
            
        }
    }

    return (
        <div className="p-5">
            <Stepper whichStepIndex={whichStepIndex} setWhichStepIndex={setWhichStepIndex} stepNames={stepNames} />
            <div className="mt-8 p-4">
                <div>
                    {whichStepContainer()}
                </div>


                <div className="flex p-2 mt-4">
                    <button onClick={prevStep} className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition">Previous</button>
                    <div className="flex-auto flex flex-row-reverse">
                        <button onClick={nextStep} className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-600  
        bg-teal-600 
        text-teal-100 
        border duration-200 ease-in-out 
        border-teal-600 transition">Next</button>
                        <button onClick={nextStep} className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-200  
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition">Skip</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ProjectInitiation