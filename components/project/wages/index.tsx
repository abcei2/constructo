import { useContext } from "react"
import { WagesFormContext } from "../../../context/WagesContext"
import WagesForm from "./WagesFormDev"
const WagesIndex = () => {
    const { isDirty, wagesFormUtils } = useContext(WagesFormContext) 

    return (<div className="flex flex-col  m-10">
        <WagesForm context={WagesFormContext} ></WagesForm>
        <button
            className={"self-end " + (isDirty ? "button-secondary" : "text-[var(--text-color)] px-4 py-2 rounded bg-[var(--secondary-color)] disabled")}
            type="submit"
            disabled={!isDirty}
            form={wagesFormUtils.formId}
        >Save {wagesFormUtils.formId} </button>
    </div>
    )
}

export default WagesIndex