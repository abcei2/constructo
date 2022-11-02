import ProductsForm from "./ProductsForm"

const ProjectIndex = () =>{
    return (
        <div className="flex justify-center">
            <div className="max-w-[90%]">
                <ProductsForm/>
            </div>

            <div >
                <WagesForm />
            </div>
        </div>
    )
}


export default ProjectIndex