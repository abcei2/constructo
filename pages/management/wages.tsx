import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import WagesIndex from "../../components/project/wages"
import { useAuth } from "../../context/AuthContext"
import { WagesFormContextProvider } from "../../context/WagesContext"
const Wages = () => {

    const { user } = useAuth()
    const router = useRouter()
    const [projectRef, setProjectRef] = useState<string | any>() 

    useEffect(()=>{
        if (router.query.projectRef)
            setProjectRef(router.query.projectRef)
        else
            router.replace("/")
    },[router])

    return (user && projectRef) && <WagesFormContextProvider projectRef={projectRef} projectOwner={user.email}>
        <WagesIndex/>
    </WagesFormContextProvider>
}

export default Wages