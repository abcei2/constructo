import { useForm } from "react-hook-form";
import { Product } from "../../types/dbTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ProductsModalFormType = {
    productModalData: Product;
    setShowModal:any;
    update:any;
    productIndex:number;
}
const ProductsModalForm = (props: ProductsModalFormType) => {

    const { productModalData, setShowModal, update, productIndex } = props;
    const {
        register,
        handleSubmit
    } = useForm<Product>({
        mode: "onBlur",
        defaultValues: productModalData
    });

    const onSubmit = (data: Product) => {
        update(productIndex,data)
        setShowModal(false)
    }
    const onError = () => toast.error("Faltan datos por llenar!");
    
    return (
        <div>
            <ToastContainer/>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="overflow-auto gap-3 h-64 max-h-64 py-5 border border-2 border-red-300"
            >

                <div>
                    <div  >
                        <input className="normal-input"
                            {...register("category", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" 
                            {...register("name", {
                                required: true,
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input"
                            {...register("brand", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input"
                            {...register("provider", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("price", {
                                required: true
                            })}
                        />
                    </div>


                    <div>
                        <input className="normal-input"
                            {...register("type", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("discount", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("performance", {
                                required: true
                            })}
                        />
                    </div>
                </div>
      

                <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    
                    type="submit"
                >
                    Save Changes
                </button>

            </form>

        </div>
    )

}
export default ProductsModalForm