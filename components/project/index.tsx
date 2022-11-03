import ProductsForm from "./ProductsForm"
import WagesForm from "./WagesForm"

const ProjectIndex = () =>{
    return (
        <div className="flex flex-col justify-center">
          
            <div >
                <ProductsForm />
            </div>

            <div >
                <WagesForm />
            </div>
        </div>
    )
}


export default ProjectIndex