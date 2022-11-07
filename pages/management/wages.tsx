import useWagesForm from "../../components/hooks/project/useWagesForm"
import WagesForm from "../../components/project/WagesForm"

const Wages = () => {
    const wagesFormUtils = useWagesForm()
    return (
        <WagesForm wagesFormUtils={wagesFormUtils}></WagesForm>
    )
}

export default Wages