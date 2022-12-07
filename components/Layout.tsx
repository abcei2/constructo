
import { useRouter } from "next/router";
import ConstructoHeader from "./ConstructoHeader";
import ProjectHeader from "./project/ProjectHeader";


const Layout=(props:{
    children: React.ReactNode 
}) => {
    const { children }  = props
    const router = useRouter();
    
    if (router.pathname.includes("management"))
        return (
            <div>
                <ProjectHeader/>
                <main>{children}</main> 
            </div>
        )
    else {
        return (
            <>
                <ConstructoHeader />
                <main>{children}</main> 
            </>
        )
    }
}
export default Layout