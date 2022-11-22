import { ChangeEvent, useEffect, useRef, useState } from "react"
import { getAllProducts } from "../../../db/project"
import { Product, StageProduct } from "../../../types/dbTypes"

const StageProducts = (props:{
    projectRef:string,
    categoryRef:string
}) => {
    const {projectRef,categoryRef}= props

    const productsSelectorRef = useRef(null)

    const [products, setProducts] = useState<Array<Product>>([])

    const [stageProducts, setStageProducts] = useState<
        Array<{ stageProduct: StageProduct, product: Product }>
    >([])




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

    const getNotAddedProducts = () => {
        return products.filter(
            (product) => {
                if (stageProducts.length > 0) {
                    const currentStageProductsRefs = stageProducts.map(
                        (stageProduct) => stageProduct.product.ref
                    )
                    return !currentStageProductsRefs.includes(product.ref)
                }
                return true
            }
        )
    }

    const addStageProduct= () => {
        if (stageProducts.length < products.length && productsSelectorRef.current) {
            const currentSelector: HTMLSelectElement  = productsSelectorRef.current
            if (currentSelector.selectedIndex > 0 ){
                setStageProducts(
                    [
                        ...stageProducts, {
                            stageProduct: { quantity: 0, ref: "" },
                            product: products[currentSelector.selectedIndex - 1]
                        }
                    ]
                )
                currentSelector.selectedIndex = 0
            }
        }
    }

    return products.length>0? <div >
        {
            stageProducts.length < products.length ? <div className="flex my-5 gap-5">
                <select className="w-[100%] " ref={productsSelectorRef}>
                    <option value={-1} key={-1}>Seleccione un producto para agregar.</option>
                    {
                        products.map(
                            (product, index) => {
                                let hiddenOpt = false
                                if (stageProducts.length > 0) {
                                    const currentStageProductRefs = stageProducts.map(
                                        (stageProduct) => stageProduct.product.ref
                                    )
                                    hiddenOpt = currentStageProductRefs.includes(product.ref)
                                }
                                return <option key={index} value={index} hidden={hiddenOpt}>
                                    {product.name}
                                </option>
                            } 
                        )
                    }                
                
                </select>

                <button onClick={addStageProduct} className="button-secondary w-[30%]">
                    Agrergar producto
                </button>

            </div>:undefined
        }
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
                                <th><input value={stageProduct.product.name} disabled className="text-center  disabled border border-gray-500 rounded" /></th>
                                <th><input  className="text-center border border-gray-500 rounded" /></th>
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