import { useFieldArray, useForm } from "react-hook-form";
import { Product } from "../../types/dbTypes";

const ProductsForm = () =>{

    const {
        register,
        control
    } = useForm<{products:Array<Product>}>({
        mode: "onBlur"
    });

    const { fields, append, remove } = useFieldArray({
        name: "products",
        control
    });

    return (
        <>
            <div
            className="overflow-auto gap-3 h-64 max-h-64 py-5 border border-2 border-red-300"
            >
            <table className="">
                <thead>

                {
                fields.length>0 &&
                    <tr className="">
                        <th></th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Proveedor</th>
                        <th>Precio</th>
                        <th>Tipo</th>
                        <th>Descuento</th>
                    </tr>
                }
                </thead>
                <tbody >
                {
                    fields.map((field:Product |any, index) => {
                    if (field) {

                        return (

                        <tr key={field.id}>
                            <th>
                            <button onClick={() => {
                                remove(index)
                            }
                            }
                            >
                                ❌
                            </button>
                            </th>
                            <th  >
                                <input  className="normal-input"
                                    {...register(`products.${index}.name` as const, {
                                        required: true
                                    })} 
                                />
                            </th>

                            <th>
                                <input  className="normal-input" 
                                    {...register(`products.${index}.brand` as const, {
                                    required: true,
                                    })} 
                                />
                            </th>

                            <th>
                                <input  className="normal-input" 
                                    {...register(`products.${index}.provider` as const, {
                                        required: true                             
                                    })} 
                                />
                            </th>

                            <th>
                                <input  className="normal-input" type="numeric"
                                    {...register(`products.${index}.price` as const, {
                                        required: true
                                    })}
                                />
                            </th>

                            <th>
                                <input  className="normal-input"
                                    {...register(`products.${index}.type` as const, {
                                        required: true
                                    })}
                                />
                            </th>


                            <th>
                                <input  className="normal-input" type="numeric"
                                    {...register(`products.${index}.discount` as const, {
                                        required: true
                                    })}
                                />
                            </th>

                            <th>
                                <input  className="normal-input" type="numeric"
                                    {...register(`products.${index}.performance` as const, {
                                        required: true
                                    })}
                                />
                            </th>

                        </tr>
                        );
                    }
                    })
                }
                </tbody>

            </table>

            </div>
            <div className="text-right">
                <button
                    className="normal-button  my-5"
                    type="button"
                    onClick={() => {
                        const initialValue: Product = {
                            category: "",
                            name: "",
                            brand: "",
                            provider: "",
                            price: 0,
                            type: "",
                            discount: 0,
                            performance:0,
                        }                    
                        append(initialValue);
                    }
                    }
                >
                    Agregar
                </button>
            </div>
        </>
    )
}

export default ProductsForm;