import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ProjectDrawerMenu = (props: {
    menuItemNames: Array<string>
}) => {
    const { menuItemNames } = props
    const [projectRef, setProjectRef] = useState<string|any>()
    const router = useRouter()
    const onItemClick = (currentItemIndex:number) => {
        switch (currentItemIndex) {
            case 0:
                router.push({
                    pathname: '/management/wages',
                    query: { projectRef }
                })
                break;
            case 1:
                router.push({
                    pathname: '/management/products',
                    query: { projectRef }
                })
                break;
            default:
                router.push({
                    pathname: '/management',
                    query: { projectRef }
                })
                break;
        }
    }
  
    useEffect(()=>{
        if (!router.query.projectRef && !projectRef)
            router.push("/")
        else
            setProjectRef(router.query.projectRef)
    }, [router, projectRef])
    
    return (
        <div className="w-full text-gray-900 bg-white  ">
            {
                !menuItemNames ? undefined : menuItemNames.map(
                    (menuItemName: string, index: number) => <button key={index} onClick={() => onItemClick(index)} type="button" className="project-drawer-menu-item ">
                        {menuItemName}
                    </button>
                )
            }
        </div>
    )
}
export default ProjectDrawerMenu