import { useState } from "react"
import Drawer from "../Drawer"
import ProjectDrawerMenu from "./ProjectDrawerMenu"
const ProjectDrawer = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const menuItemNames = ["Administración de cargos y cuadrillas.", "Productos y proveedores"]

    return (
        <div className="">
            <button onClick={() => setIsOpen(true)} className="m-1 button-secondary">open</button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <ProjectDrawerMenu menuItemNames={menuItemNames} />
            </Drawer>
        </div>
    )
}


export default ProjectDrawer