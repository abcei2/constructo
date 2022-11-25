import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Stages from "../../components/project/stages"
import { StagesContextProvider } from "../../context/StagesContext"

const Dashboard = () => {

    const router = useRouter()
    const [projectRef, setProjectRef] = useState<string | any>()

    useEffect(() => {
        console.log(router.query.projectRef)
        if (router.query.projectRef)
            setProjectRef(router.query.projectRef)
        else
            router.replace("/")
    }, [router])
    return (
        <StagesContextProvider projectRef = { projectRef }>
            <Stages />
        </StagesContextProvider>
    )

}
export default Dashboard