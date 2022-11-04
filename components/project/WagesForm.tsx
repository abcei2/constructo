import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { EmployeeWage } from "../../types/dbTypes";
import Modal from "../Modal";
import WagesModalForm from "./WageModalForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWagesForm from "../hooks/project/useWagesForm";
import { WagesFormTypes } from "../../types/extraTypes";

const WagesForm = (props:{
    onFormSubmit?:any,
    onFormError?:any
}) => {
    const { onFormSubmit, onFormError }= props
    const [wageModalData, setWageModalData] = useState<EmployeeWage | undefined>()
    const [wageIndex, setWageIndex] = useState<number>(-1)
    const [showModal, setShowModal] = useState<boolean>(false)
    const { register, fields, append, remove, update, handleSubmit, formId } = useWagesForm()
    return (
        <div>
            {
                wageModalData && <Modal title="SALARIOS" showModal={showModal} setShowModal={setShowModal} >
                    <WagesModalForm wageModalData={wageModalData} setShowModal={setShowModal} wageIndex={wageIndex} update={update}/>
                </Modal>
            }
          <div className="flex justify-center m-8 text-2xl font-bold md:text-4xl">
            <h1>SALARIOS</h1>
          </div>

            <form id={formId} onSubmit={handleSubmit(onFormSubmit, onFormError)}>


                <div
                    className=" overflow-auto gap-3 h-64 max-h-64 py-5 border border-2 border-red-300"
                >
                    <table className="">
                        <thead>

                            {
                                fields.length > 0 &&
                                <tr className="">
                                    <th></th>
                                    <th></th>
                                    <th>Cargo</th>
                                    <th>
                                        Salario <br />
                                        Aumento estimado 10%
                                    </th>
                                    <th>Auxilio <br />transporte</th>
                                    <th>Seguridad social <br /> 31.46%</th>
                                    <th>Prestaciones sociales <br />  21.83%</th>
                                    <th>Dotacion <br /> aprox 5%</th>
                                    <th>Total</th>
                                </tr>
                            }
                        </thead>
                        <tbody >
                            {
                                fields.map((field: EmployeeWage | any, index) => {
                                    if (field) {

                                        return (

                                            <tr key={field.id}>
                                                <th>
                                                    <button type="button" onClick={() => {
                                                        setWageModalData(field);
                                                        setWageIndex(index)
                                                        setShowModal(true);
                                                    }}>
                                                        🗎
                                                    </button>
                                                </th>
                                                <th>
                                                    <button type="button"  onClick={() => {
                                                        remove(index)
                                                    }
                                                    }
                                                    >
                                                        ❌
                                                    </button>
                                                </th>
                                                <th  >
                                                    <input className="normal-input"
                                                        {...register(`employeesWage.${index}.roleName` as const, {
                                                            required: true
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.estimatedIncrease` as const, {
                                                            required: true,
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.transportAllowance` as const, {
                                                            required: true
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.socialWelfare` as const, {
                                                            required: true
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.welfareBenefits` as const, {
                                                            required: true
                                                        })}
                                                    />
                                                </th>


                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.workProvisions` as const, {
                                                            required: true
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.totalWage` as const, {
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
                            const initialValue: EmployeeWage = {
                                roleName: "",
                                estimatedIncrease: 0,
                                transportAllowance: 0,
                                socialWelfare: 0,
                                welfareBenefits: 0,
                                workProvisions: 0,
                                totalWage: 0
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
export default WagesForm