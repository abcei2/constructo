import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Product } from "../../types/dbTypes";
import Modal from "../Modal";
import ProductsModalForm from "./ProductsModalForm";


const ProductsForm = () => {

    const [productModalData, setProductModalData] = useState<Product | undefined>()
    const [productIndex, setProductIndex] = useState<number>(-1)
    const [showModal, setShowModal] = useState<boolean>(false)
    const {
        register,
        control
    } = useForm<{
        concept: string,
        updateDate: Date;
        owner: string;
        products: Array<Product>
    }>({
        mode: "onBlur"
    });

    const { fields, append, remove, update } = useFieldArray({
        name: "products",
        control
    });

    return (
        <div className="w-full ">
            {
                productModalData && <Modal title="testmodal" showModal={showModal} setShowModal={setShowModal} >
                    <ProductsModalForm productModalData={productModalData} setShowModal={setShowModal} productIndex={productIndex} update={update} />
                </Modal>
            }

            <div className="flex justify-center m-8 text-2xl font-bold md:text-4xl ">
                <h1>LISTA DE PRODUCTOS</h1>
            </div>

            <div className="flex justify-center">
            
            <div className="md:flex lg:flex">
                <div>
                    <label className=" font-medium text-xs md:text-lg">Concepto:</label>
                    <input className="normal-input m-4 w-44" {...register("concept", { required: true })} />
                </div>
                <div>
                    <label className="font-medium text-xs md:text-lg">Fecha Actualizacion:</label>
                    <input type="date" className="normal-input m-4 w-44" {...register("concept", { required: true })} />
                </div>
                <div>
                    <label className="font-medium text-xs md:text-lg ">Elaborado Por:</label>
                    <input className="normal-input m-4 w-44 " {...register("concept", { required: true })} />
                </div>
            </div>
            </div>

            <div
                className="overflow-auto gap-3 h-64 max-h-64 py-5 border border-2 border-red-300"
            >
                <table className="">
                    <thead>

                        {
                            fields.length > 0 &&
                            <tr className="">
                                <th></th>
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
                            fields.map((field: Product | any, index) => {
                                if (field) {

                                    return (

                                        <tr key={field.id}>
                                            <th>
                                                <button type="button" onClick={() => {
                                                    setProductModalData(field);
                                                    setProductIndex(index)
                                                    setShowModal(true);
                                                }}>
                                                    🗎
                                                </button>
                                            </th>
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
                                                <input className="normal-input"
                                                    {...register(`products.${index}.name` as const, {
                                                        required: true
                                                    })}
                                                />
                                            </th>

                                            <th>
                                                <input className="normal-input"
                                                    {...register(`products.${index}.brand` as const, {
                                                        required: true,
                                                    })}
                                                />
                                            </th>

                                            <th>
                                                <input className="normal-input"
                                                    {...register(`products.${index}.provider` as const, {
                                                        required: true
                                                    })}
                                                />
                                            </th>

                                            <th>
                                                <input className="normal-input" type="numeric"
                                                    {...register(`products.${index}.price` as const, {
                                                        required: true
                                                    })}
                                                />
                                            </th>

                                            <th>
                                                <input className="normal-input"
                                                    {...register(`products.${index}.type` as const, {
                                                        required: true
                                                    })}
                                                />
                                            </th>


                                            <th>
                                                <input className="normal-input" type="numeric"
                                                    {...register(`products.${index}.discount` as const, {
                                                        required: true
                                                    })}
                                                />
                                            </th>

                                            <th>
                                                <input className="normal-input" type="numeric"
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
                            performance: 0,
                        }
                        append(initialValue);
                    }
                    }
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default ProductsForm;