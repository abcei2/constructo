import { createContext, useState, useEffect } from "react"; 
import useWagesForm from "../hooks/project/useWagesForm";

import { deleteWage, getAllWages, saveProject } from "../db/project"
import { EmployeeWage } from "../types/dbTypes"
import { WagesFormTypes } from "../types/extraTypes"
import uuid from "react-uuid";


const WagesFormContext = createContext<any>(null);

const WagesFormContextProvider = (props: {
    children: React.ReactNode,
    projectOwner:string,
    projectRef:string,
    defaultValues?: WagesFormTypes

}) => {
    const { children, defaultValues, projectOwner, projectRef} = props

    const [retrievingData, setRetrievingData] = useState<boolean>(false)
    const [dataRetrieve, setDataRetrieve] = useState<boolean>(false)

    const wagesFormUtils = useWagesForm(defaultValues)
    const { fields, append, formState, reset, getValues, setValue } = wagesFormUtils
    const { isDirty, dirtyFields } = formState  

    useEffect(() => {

        if (!retrievingData && !dataRetrieve && projectRef) {
            setRetrievingData(true)
            getAllWages(projectRef).then(
                (dbWages: any) => {
                    console.log("??")
                    wagesFormUtils.reset({ "employeesWage": dbWages }, {
                        keepDirty: false,
                        keepDirtyValues: false
                    });
                    setDataRetrieve(true)
                    setRetrievingData(false)
                }

            )

        }

    }, [dataRetrieve, wagesFormUtils, retrievingData, projectRef])

    const onFieldRemove = (wageField: EmployeeWage) => {
        if (projectRef && wageField.ref)
            deleteWage(projectRef, wageField.ref)
    }

    const onFormSubmit = (data: WagesFormTypes | any) => {
        console.log("submiting", projectRef, dataRetrieve)

        if (!dataRetrieve  || !projectRef)
            return

        if (dirtyFields.employeesWage) {
            const wagesToUpdate = data.employeesWage.map(
                (wageData: EmployeeWage, wageIndex: number) => {

                    const updatedFields = {
                        ref: wageData.ref
                    }

                    if (!wageData.ref) {
                        const newWageData = {
                            ...wageData,
                            ref: uuid()
                        }
                        wagesFormUtils.update(wageIndex, newWageData)
                        return newWageData
                    }

                    Object.keys(wageData).filter(
                        (wageKey) => {
                            if (dirtyFields.employeesWage) {

                                if (dirtyFields.employeesWage[wageIndex]) {
                                    Object.keys(dirtyFields.employeesWage[wageIndex])
                                    const dirtyEmployees: any = dirtyFields.employeesWage[wageIndex]
                                    if (Object.keys(dirtyEmployees).includes(wageKey)) {
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

            saveProject(projectRef, projectOwner, undefined, undefined, undefined, undefined, wagesToUpdate)
        }
        wagesFormUtils.reset(wagesFormUtils.getValues(), {
            keepDirty: false,
            keepDirtyValues: false
        });
    }

    

    return (
        <WagesFormContext.Provider value={
            {
                isDirty, dirtyFields,
                wagesFormUtils,
                onFieldRemove, onFormSubmit,
                retrievingData, setRetrievingData, 
                dataRetrieve, setDataRetrieve
            }}>
            {children}
        </WagesFormContext.Provider>
    );
};

export { WagesFormContext, WagesFormContextProvider };