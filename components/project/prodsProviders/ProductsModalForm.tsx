import { useForm } from "react-hook-form";
import { Product } from "../../../types/dbTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductType } from "../../../types/extraTypes";

type ProductsModalFormType = {
    productModalData: ProductType;
    setShowModal:any;
    update:any;
    productIndex:number;
}
const ProductsModalForm = (props: ProductsModalFormType) => {

    const { productModalData, setShowModal, update, productIndex } = props;
    const {
        register,
        handleSubmit
    } = useForm<ProductType>({
        mode: "onBlur",
        defaultValues: productModalData
    });

    const onSubmit = (data: ProductType) => {
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
                        <label className="label-des">Categoria</label>
                        <input className="normal-input"
                            {...register("categoryIndex", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                    <label className="label-des">Nombre</label>
                        <input className="normal-input" 
                            {...register("name", {
                                required: true,
                            })}
                        />
                    </div>

                    <div>
                    <label className="label-des">Marca</label>
                        <input className="normal-input"
                            {...register("brand", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                    <label className="label-des">Proveedor</label>
                        <input className="normal-input"
                            {...register("provider", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                    <label className="label-des">Precio</label>
                        <input className="normal-input" type="numeric"
                            {...register("price", {
                                required: true
                            })}
                        />
                    </div>


                    <div>
                    <label className="label-des">Tipo</label>
                        <input className="normal-input"
                            {...register("type", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                    <label className="label-des">Descuento</label>
                        <input className="normal-input" type="numeric"
                            {...register("discount", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                    <label className="label-des">Rendimiento</label>
                        <input className="normal-input" type="numeric"
                            {...register("performance", {
                                required: true
                            })}
                        />
                    </div>
                </div>
      
                <div className="flex justify-center">
                <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    
                    type="submit"
                >
                    Save Changes
                </button>
                </div>
            </form>

        </div>
    )

}
export default ProductsModalForm