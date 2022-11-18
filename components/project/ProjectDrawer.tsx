import { useRouter } from "next/router"
import { useState } from "react"
import Drawer from "../Drawer"
import ProjectDrawerMenu from "./ProjectDrawerMenu"
const ProjectDrawer = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter()
    const menuItemNames = ["Administración de cargos y cuadrillas.", "Productos y proveedores"]

    return (
        <div className="absolute flex">

            <button onClick={() => router.replace("/")} className="m-1 button-secondary">volver</button>
            <button onClick={() => setIsOpen(true)} className="m-1 button-secondary">open</button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <ProjectDrawerMenu menuItemNames={menuItemNames} />
            </Drawer>
        </div>
    )
}


export default ProjectDrawer