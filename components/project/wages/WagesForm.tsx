import { useState } from "react";
import { EmployeeWage } from "../../../types/dbTypes";
import Modal from "../../Modal";
import WagesModalForm from "./WageModalForm";
import 'react-toastify/dist/ReactToastify.css';
import { WagesFormPropsType } from "../../../types/extraTypes";
import { formNumberInput } from "../../../constants";

const WagesForm = (props: WagesFormPropsType) => {

    const { onFormSubmit, onFormError, wagesFormUtils, onFieldRemove }= props
    const [wageModalData, setWageModalData] = useState<EmployeeWage | undefined>()
    const [wageIndex, setWageIndex] = useState<number>(-1)
    const [showModal, setShowModal] = useState<boolean>(false)

    const { fields, append, remove, update, handleSubmit, register, getValues, formId, resetField } = wagesFormUtils
    
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
                    className=" overflow-auto gap-3 h-64 max-h-64 py-5 border border-2 border-[var(--primary-color)] rounded"
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
                                                        setWageModalData(getValues("employeesWage")[index]);
                                                        setWageIndex(index)
                                                        setShowModal(true);
                                                    }}>
                                                        🗎
                                                    </button>
                                                </th>
                                                <th>
                                                    <button type="button"  onClick={() => {
                                                        
                                                        remove(index)
                                                        resetField("employeesWage", {
                                                            keepDirty: false,
                                                            defaultValue: getValues("employeesWage")
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
                                                    <input className="normal-input"
                                                        {...register(`employeesWage.${index}.roleName` as const, {
                                                            required: true,
                                                            maxLength:256
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.estimatedIncrease` as const, {
                                                            required: true,
                                                            ...formNumberInput
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.transportAllowance` as const, {
                                                            required: true,
                                                            ...formNumberInput
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.socialWelfare` as const, {
                                                            required: true,
                                                            ...formNumberInput
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.welfareBenefits` as const, {
                                                            required: true,
                                                            ...formNumberInput
                                                        })}
                                                    />
                                                </th>


                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.workProvisions` as const, {
                                                            required: true,
                                                            ...formNumberInput
                                                        })}
                                                    />
                                                </th>

                                                <th>
                                                    <input className="normal-input" type="numeric"
                                                        {...register(`employeesWage.${index}.totalWage` as const, {
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
                <div className="flex justify-end  py-5">
                  
                    <button
                        className="button-secondary align-end  my-5"
                        type="button"
                        onClick={() => {
                            const initialValue: EmployeeWage = {
                                ref: "",
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