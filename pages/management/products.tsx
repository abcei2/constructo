import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ProductsIndex from "../../components/project/prodsProviders"
import { useAuth } from "../../context/AuthContext"
import { ProductsFormContextProvider } from "../../context/ProductsContext"

const Products = () => {
    const { user } = useAuth()
    const router = useRouter()
    const [projectRef, setProjectRef] = useState<string | any>()   

    useEffect(() => {
        if (router.query.projectRef)
            setProjectRef(router.query.projectRef)
        else
            router.replace("/")
    }, [router])    

    return (user && projectRef) && (<ProductsFormContextProvider projectRef={projectRef} projectOwner={user.email}>
        <ProductsIndex />
    </ProductsFormContextProvider>)
}
export default Products