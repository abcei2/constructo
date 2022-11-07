import { useRouter } from "next/router"

const ProjectDrawerMenu = (props: {
    menuItemNames: Array<string>
}) => {
    const { menuItemNames } = props
    const router = useRouter()
    const onItemClick = (currentItemIndex:number) => {
        switch (currentItemIndex) {
            case 0:
                router.replace("/management/wages")
                break;
            case 1:
                router.replace("/management/products")
                break;
            default:
                router.replace("/management")
                break;
        }
    }
  

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