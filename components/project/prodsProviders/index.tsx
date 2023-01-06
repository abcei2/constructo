import { useContext } from "react"
import { ProductsFormContext } from "../../../context/ProductsContext"
import ProductsForm from "../../../components/project/prodsProviders/ProductsFormDev"

const ProductsIndex = () => {
    const { isDirty, productsFormUtils, categories } = useContext(ProductsFormContext)
    return (<>
        {
            !categories ? undefined : <div className="flex flex-col m-10">

                <ProductsForm />
                <button
                    className={"self-end " + (isDirty ? "button-secondary" : "text-[var(--text-color)] px-4 py-2 rounded bg-[var(--secondary-color)] disabled")}
                    type="submit"
                    disabled={!isDirty}
                    form={productsFormUtils.formId}
                >Save </button>
            </div>
        }
    </>)
}
export default ProductsIndex