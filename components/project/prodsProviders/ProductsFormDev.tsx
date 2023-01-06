import { useContext, useState } from "react";
import Modal from "../../Modal";
import ProductsModalForm from "./ProductsModalForm";
import { CategoryFormType, ProductsFormPropsType, ProductType } from "../../../types/extraTypes";
import { formNumberInput } from "../../../constants";
import UploadData from "./UploadData";
import { ProductsFormContext } from "../../../context/ProductsContext";



const ProductsForm = () => {

    const { 
        onFieldRemove, onFormChange, onFormSubmit, onFormError, 
        productsFormUtils, categories, 
        setProductModalData, productModalData,
        showModal, setShowModal,
        setModalProductIndex, modalProductIndex,
     } = useContext(ProductsFormContext)
  

    const { fields, append, remove, update, handleSubmit, getValues, register, formId, resetField } = productsFormUtils

 
    return (
        <div className="w-full " >
            {
                productModalData && <Modal title="PRODUCTOS" showModal={showModal} setShowModal={setShowModal} >
                    <ProductsModalForm productModalData={productModalData} setShowModal={setShowModal} productIndex={modalProductIndex} update={update} />
                </Modal>
            }
            <form 
                className="w-full " id={formId} onSubmit={handleSubmit(onFormSubmit, onFormError)} onChange={onFormChange}>
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
                            <input type="date" className="normal-input m-4 w-44" {...register("updateDate", { required: true })} />
                        </div>
                        <div>
                            <label className="font-medium text-xs md:text-lg ">Elaborado Por:</label>
                            <input className="normal-input m-4 w-44 " {...register("manager", { required: true })} />
                        </div>
                    </div>
                </div>

                <div
                    className="overflow-auto gap-3 h-64 max-h-64 py-5 border border-2 border-[var(--primary-color)] rounded"
                >
                    <UploadData/>
                    <table className="">
                        <thead>

                            {
                                fields.length > 0 &&
                                <tr className="">
                                    <th></th>
                                    <th></th>
                                    <th>Categoría</th>
                                    <th>Nombre</th>
                                    <th>Marca</th>
                                    <th>Proveedor</th>
                                    <th>Precio</th>
                                    <th>Tipo</th>
                                    <th>Descuento</th>
                                    <th>Rendimiento</th>
                                </tr>
                            }
                        </thead>
                        <tbody >
                            {
                                fields.map((field: ProductType | any, index:number) => {
                                    if (field) {

                                        return (

                                            <tr key={field.id}>
                                                <th>
                                                    <button type="button" onClick={() => {
                                                        console.log(field)                                                 
                                                        setProductModalData(getValues("products")[index]);
                                                        setModalProductIndex(index)
                                                        setShowModal(true);
                                                    }}>
                                                        🗎
                                                    </button>
                                                </th>
                                                <th>
                                                    <button onClick={() => {
                                                        remove(index)
                                                        resetField("products",{
                                                            keepDirty:false,
                                                            defaultValue:getValues("products")
                                                        })
                                                        if (onFieldRemove)
                                                            onFieldRemove(field)
                                                    }
                                                    }
                                                    >
                                                        ❌
                                                    </button>
                                                </th>
                                                <th  >
                                                   
                                                    <select className="normal-input"
                                                        {...register(`products.${index}.categoryIndex` as const, {
                                                            required: true
                                                        },
                                                        )}
                                                    >
                                                        {
                                                            (!categories || categories.length == 0)?undefined:
                                                            categories.map((category:CategoryFormType, index:number) => 
                                                                <option value={index} key={index} >{category.name}</option>)
                                                        }
                                                    </select>
                                                </th>
                                                <th  >
                                               
                                                    <input className="normal-input"
                                                        {...register(`products.${index}.name` as const, {
                                                            required: true,
                                                            maxLength: 256
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input"
                                                        {...register(`products.${index}.brand` as const, {
                                                            required: true,
                                                            maxLength:256
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input"
                                                        {...register(`products.${index}.provider` as const, {
                                                            required: true,
                                                            maxLength: 256
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`products.${index}.price` as const, {
                                                            required: true,
                                                            ...formNumberInput
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input"
                                                        {...register(`products.${index}.type` as const, {
                                                            required: true,
                                                            maxLength: 256
                                                        })}
                                                    />
                                                </th>


                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`products.${index}.discount` as const, {
                                                            required: true,
                                                            ...formNumberInput
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`products.${index}.performance` as const, {
                                                            required: true,
                                                            ...formNumberInput
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
                        className="button-secondary align-end  my-5"
                        type="button"
                        onClick={() => {
                            const initialValue: ProductType = {
                                categoryIndex: -1,
                                name: "",
                                brand: "",
                                provider: "",
                                price: undefined,
                                type: "",
                                discount: undefined,
                                performance: undefined,
                            }
                            append(initialValue);
                        }
                        }
                    >
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductsForm;