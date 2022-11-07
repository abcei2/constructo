import useProductsForm from "../../components/hooks/project/useProductsForm"
import ProductsForm from "../../components/project/ProductsForm"

const Products = () => {
    const productsFormUtils = useProductsForm()
    return (
        <ProductsForm productsFormUtils={productsFormUtils}></ProductsForm>
    )
}
export default Products