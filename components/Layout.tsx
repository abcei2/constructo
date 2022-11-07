
import { useRouter } from "next/router";
import ProjectDrawer from "./project/ProjectDrawer";


const Layout=(props:{
    children: React.ReactNode 
}) => {
    const { children }  = props
    const router = useRouter();
    if (router.pathname.includes("management"))
        return (
            <div>
                <ProjectDrawer />
                <main>{children}</main> 
            </div>
        )
    else {
        return (
            <>
                <main>{children}</main> 
            </>
        )
    }
}
export default Layout