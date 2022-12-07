import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { getAllCategories, getProductsData, getProject } from "../../db/project"
import { Category, Project } from "../../types/dbTypes"


const ProjectInfo = () => {

    const { user } = useAuth()
    const router = useRouter()
    const [projectRef, setProjectRef] = useState<string | any>()
    const [projectData, setProjectData] = useState<Project>()

    const [categories, setCategories] = useState<Array<Category>>()
    const [currentCategory, setCurrentCategory] = useState<string>()

    const [retrievingData, setRetrievingData] = useState<boolean>(false)
    const [dataRetrieve, setDataRetrieve] = useState<boolean>(false)

    useEffect(() => {
        if (router.query.projectRef)
            setProjectRef(router.query.projectRef)
        else
            router.replace("/")
    }, [router])

    useEffect(() => {
        if (user && !retrievingData && !dataRetrieve && projectRef) {
            setRetrievingData(true)
            getProject(projectRef).then(
                (dbProjectData: any) => {
                    setProjectData(dbProjectData)
                }
            )
            getAllCategories(projectRef).then(
                (dbCategories: any) => {
                    setCategories(dbCategories)  
                    setDataRetrieve(true)
                    setRetrievingData(false)
                }
            )
        }

    }, [dataRetrieve, retrievingData, user, projectRef])



    const addCategory = () => {
        if (currentCategory && categories) {
   
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addCategory()
        }
    }

    const onCategoryNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCategory(ev.target.value);

    }

    return <div className="flex justify-center gap-12 h-[screen] ">
        {
            projectData && dataRetrieve?<div>
                <div className="my-10 flex justify-center flex-col text-2xl text-center w-full">
                    Nombre del proyecto
                    <input value={projectData.name} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setProjectData(
                            (oldProjectData)=>({...oldProjectData, name:ev.target.value})
                        )}
                        disabled={true}
                        className="disabled text-center border-teal-600 rounded border-2 my-5 max-w-xs self-center" />
                </div>
                <div className="my-10 flex justify-center flex-col text-2xl text-center w-full">
                    Agregue categorías
                    <div className="flex  self-center overflow-hidden py-5 px-5 gap-2">
                        <input value={currentCategory} onKeyDown={handleKeyDown} onChange={onCategoryNameChange} className="border-teal-600 rounded border-2" />
                        <button onClick={addCategory} className="button-secondary">Add</button>
                    </div>
                    {
                        categories && categories.map(
                            (category: Category, index: number) => {
                                return <span 
                                    key={index}
                                    className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                                    {category.name}
                             
                                </span>
                            }
                        )
                    }
                </div>
            </div>:<></>
        }
    </div>
}

export default ProjectInfo