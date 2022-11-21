import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import uuid from "react-uuid"
import useWagesForm from "../../components/hooks/project/useWagesForm"
import WagesForm from "../../components/project/wages/WagesForm"
import { useAuth } from "../../context/AuthContext"
import { deleteWage, getAllWages, saveProject } from "../../db/project"
import { EmployeeWage } from "../../types/dbTypes"
import { WagesFormTypes } from "../../types/extraTypes"

const Wages = () => {
    const wagesFormUtils = useWagesForm()

    const { user } = useAuth()
    const router = useRouter()
    const [projectRef, setProjectRef] = useState<string | any>()


    const [retrievingData, setRetrievingData] = useState<boolean>(false)
    const [dataRetrieve, setDataRetrieve] = useState<boolean>(false)

    const { dirtyFields } = wagesFormUtils.formState

    const onFieldRemove = (wageField: EmployeeWage) => {
        if(projectRef)
            deleteWage(projectRef,wageField.ref)
    }

    const onWagesFormSubmit = (data: WagesFormTypes |any) => {
        if (!dataRetrieve || !user || !projectRef)
            return

        if (dirtyFields.employeesWage) {
            const wagesToUpdate = data.employeesWage.map(
                (wageData: EmployeeWage, wageIndex: number) => {

                    const updatedFields = {
                        ref: wageData.ref
                    }

                    if (!wageData.ref) {
                        console.log("NO REF", wageData.ref,"a")
                        const newWageData = {
                            ...wageData,
                            ref: uuid()
                        }
                        wagesFormUtils.update(wageIndex, newWageData)
                        return newWageData
                    }

                    Object.keys(wageData).filter(
                        (wageKey) => {
                            if (dirtyFields.employeesWage){

                                if (dirtyFields.employeesWage[wageIndex]) {
                                    Object.keys(dirtyFields.employeesWage[wageIndex])
                                    const dirtyEmployees: any = dirtyFields.employeesWage[wageIndex]
                                    if (Object.keys(dirtyEmployees).includes(wageKey)){
                                        return dirtyEmployees[wageKey]
                                    }
                                }
                            }
                        }
                    ).forEach(
                        (wageDirtyKey) => {
                            Object.assign(updatedFields, { [wageDirtyKey]: data.employeesWage[wageIndex][wageDirtyKey] })

                        }
                    )                    
                    if (Object.keys(updatedFields).length > 1)
                        return updatedFields

                }

            ).filter(
                (updatedFields: any) => updatedFields
            )

            saveProject(projectRef, user.email, undefined, undefined, undefined, wagesToUpdate)
        }
        wagesFormUtils.reset(wagesFormUtils.getValues(), {
            keepDirty: false,
            keepDirtyValues: false
        });
    }

    useEffect(() => {
        
        if (user && !retrievingData && !dataRetrieve && projectRef) {
            setRetrievingData(true)
            getAllWages(projectRef).then(
                (dbWages) =>{
                    console.log(dbWages)
                    dbWages.forEach(
                        (dbWage: EmployeeWage|any) => {
                            console.log(dbWage)
                            wagesFormUtils.append({
                                ...dbWage
                            })
                        }
                    )

                    setDataRetrieve(true)
                    setRetrievingData(false)
                }

            )
            
        }

    }, [dataRetrieve, wagesFormUtils, retrievingData, user, projectRef])

    useEffect(()=>{
        if (router.query.projectRef)
            setProjectRef(router.query.projectRef)
        else
            router.replace("/")
    },[router])

    return (<div className="flex flex-col">
        <WagesForm onFieldRemove={onFieldRemove} onFormSubmit={onWagesFormSubmit} wagesFormUtils={wagesFormUtils}></WagesForm>
        <button
            className="button-primary max-w-lg self-end"
            type="submit"
            form={wagesFormUtils.formId}
        >Save </button>
    </div>
    )
}

export default Wages