import { ChangeEvent, useEffect, useState } from "react"
import { getAllProducts } from "../../../db/project"
import { Product, StageProduct } from "../../../types/dbTypes"

const StageProducts = (props:{
    projectRef:string,
    categoryRef:string
}) => {
    const {projectRef,categoryRef}= props
    const [products, setProducts] = useState<Array<Product>>([])
    const [stageProducts, setStageProducts] = useState<Array<StageProduct>>([])
    useEffect(
        ()=>{
            if (projectRef && categoryRef)
                getAllProducts(projectRef, categoryRef).then(
                    (productsData:any)=>{
                        setProducts(productsData)
                    }
                )
        }, [projectRef, categoryRef]
    )
    return products.length>0? <div >
        <div className="flex my-5 gap-5">
            <select className="w-[100%] " onChange={
                (e: ChangeEvent<HTMLSelectElement>) => {
                    console.log(e.currentTarget.tabIndex)
                }
            }>
                {
                    products.map(
                        (product, index) => <option key={index} value={product.ref}>
                            {product.name}
                        </option>
                    )
                }                
               
            </select>

            <button className="button-secondary w-[30%]">
                Agrergar producto
            </button>

        </div>
        <div className="lg:flex lg:justify-center  overflow-auto ">

            <table className="" >
                <thead>
                    <tr >
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>unidad</th>
                        <th>Precio unitario</th>
                        <th>Precio total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stageProducts.map(
                            (stageProduct, index) => <tr key={index}>
                                <th><input value="1" disabled className="text-center  disabled border border-gray-500 rounded" /></th>
                                <th><input value="10" disabled className="text-center border border-gray-500 rounded" /></th>
                                <th><input value="und" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                                <th><input value="$100" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                                <th><input value="$1.000" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                            </tr>
                        )
                    }


                </tbody>
            </table>
        </div>

    </div>:<></>
}
export default StageProducts