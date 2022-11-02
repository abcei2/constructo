import { useFieldArray, useForm } from "react-hook-form";
import { EmployeeWage } from "../../types/dbTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type WagesModalFormType = {
    wageModalData: EmployeeWage;
    setShowModal:any;
    update:any;
    wageIndex:number;
}
const WagesModalForm = (props: WagesModalFormType) => {

    const { wageModalData, setShowModal, update, wageIndex } = props;
    const {
        register,
        handleSubmit
    } = useForm<EmployeeWage>({
        mode: "onBlur",
        defaultValues: wageModalData
    });

    const onSubmit = (data: EmployeeWage) => {
        update(wageIndex,data)
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
                            {...register("roleName", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("estimatedIncrease", {
                                required: true,
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("transportAllowance", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("socialWelfare", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("welfareBenefits", {
                                required: true
                            })}
                        />
                    </div>


                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("workProvisions", {
                                required: true
                            })}
                        />
                    </div>

                    <div>
                        <input className="normal-input" type="numeric"
                            {...register("totalWage", {
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
export default WagesModalForm