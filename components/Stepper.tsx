

const Stepper = (props: { stepIndex: number, stepNames: Array<string> }) => {
    const { stepIndex, stepNames } = props

    return (
        <div className="mx-4 p-4">
            <div className="flex items-center">
                {
                    stepNames &&
                    stepNames.map((stepName: string, index: number) => {
                        return (
                            <div key ={index} className={index < (stepNames.length - 1 )? "flex items-center w-full" : "flex items-center"}>
                                <div  className="flex items-center relative">
                                    <div  className={stepIndex < index ? "step-future step-icon" : stepIndex == index ? "step-current step-icon" : "step-passed step-icon"}>
                                        {index + 1}
                                    </div>
                                    <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">{stepName}</div>
                                </div>
                                {
                                    index < stepNames.length - 1 && <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
                                }
                            </div>
                        )

                    })
                }

            </div>
        </div>
    )

}
export default Stepper