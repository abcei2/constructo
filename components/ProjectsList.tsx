import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllProjects } from "../db/project";
import { Project } from "../types/dbTypes";

const ProjectsList = () => {


    const { user } = useAuth();
    const router = useRouter();
    const [projects, setProjects] = useState<Array<any>>([]);
    
    useEffect(() => {
        getAllProjects().then(
            (projects) =>{
                setProjects(projects)
            }
        )
    },[])

    return user ? (
        <div className="">
            <div className="flex fixed w-full justify-end ">
                <div>

                    <button className="button-secondary  m-10 " 
                        onClick={() => router.replace({pathname: '/create'})}>Crear proyecto</button>
                </div>
            </div>
            <div className="overflow-auto  ">

                {
                    projects.length>0 ? projects.map(
                        (project: Project | any, index: number) => {
                            return <div key={index} onClick={() => router.replace({
                                pathname: '/management',
                                query: { projectRef: project.ref }
                            })} className="hover:from-blue-300 hover:to-teal-300 bg-gradient-to-r p-10 lg:flex lg:justify-center">
                                <div className=" w-full lg:max-w-[80%] lg:flex ">
                                    <div className="hover:from-teal-500 hover:to-blue-500 bg-gradient-to-r from-blue-500 to-teal-500 h-24 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >

                                    </div>
                                    <div className="text-center w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                        <div className="m-4 ">

                                            <div className="font-bold text-xl mb-2">NOMBRE DEL PROYECTO:</div>
                                            <div className=" text-xl mb-2">{project.name}</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    ) : <div className="  h-screen items-center flex  ">
                            <div className="text-center w-full md:text-4xl text-3xl">
                                Aún no has creado un proyecto
                            </div>
                    </div>
                }
            </div>
          
        </div>
    ) : <></>
}

export default ProjectsList