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
            <div className="  my-10 items-center flex  ">
                <div className="text-center w-full md:text-4xl text-3xl ">
                   
                </div>
            </div>
            <div className="flex flex-col h-full ">
                    {
                        projects.length > 0 ? projects.map(
                            (project: Project | any, index: number) => {
                                return <div key={index} onClick={() => router.push({
                                    pathname: '/management',
                                    query: { projectRef: project.ref }
                                })} className="hover:scale-105 duration-200 ease-in-out transition  m-5  lg:flex lg:justify-center rounded ">
                                    <div className=" w-full lg:max-w-[70%] lg:flex lg:align-center  border-2 border-gray-400 rounded  ">
                                        <div className="text-center w-full lg:h-full bg-white  flex flex-col justify-between leading-normal">
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