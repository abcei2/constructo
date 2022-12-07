import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ProjectHeader = () => {

    const menuItemNames = ["Información general", "Productos y proveedores", "Administración de cargos y cuadrillas.", "APU"]
    const [projectRef, setProjectRef] = useState<string|any>()
    const router = useRouter()
    const onItemClick = (currentItemIndex:number) => {
        switch (currentItemIndex) {
            case 0:
                router.push({
                    pathname: '/management',
                    query: { projectRef }
                })
                break;
            case 1:
                router.push({
                    pathname: '/management/products',
                    query: { projectRef }
                })
                break;
            case 2:
                router.push({
                    pathname: '/management/wages',
                    query: { projectRef }
                })
                break;
            case 3:
                router.push({
                    pathname: '/management/apu',
                    query: { projectRef }
                })
                break;
            default:
                router.push({
                    pathname: '/management',
                    query: { projectRef }
                })
                break;
        }
    }
  
    useEffect(()=>{
        if (!router.query.projectRef && !projectRef)
            router.push("/")
        else
            setProjectRef(router.query.projectRef)
    }, [router, projectRef])
    
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-400 rounded p-6 m-2">
            <div className="flex items-center flex-no-shrink text-white mr-6 gap-4">
                <div className="leading-none">
                    <svg id="Layer_1" data-name="Layer 1" className="md:w-[60px] w-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>crane-glyph</title><path d="M103.33,41.35,83.15,54.61a3,3,0,0,0-1,3.91L95.08,83.1a3,3,0,0,0,5.62-.84l7.23-37.84A3,3,0,0,0,103.33,41.35Z" fill="none" /><path d="M142.59,91.63,127.65,65.7a3,3,0,0,0-5.54.85L112.93,108a3,3,0,0,0,4.56,3.18l24.12-15.53A3,3,0,0,0,142.59,91.63Z" fill="none" /><path d="M151.65,119.31l-22.31,14.51a3,3,0,0,0-1,3.95L141.9,163a3,3,0,0,0,5.59-.78l8.73-39.73A3,3,0,0,0,151.65,119.31Z" fill="none" /><rect x="374.82" y="219.38" width="73.87" height="63.31" rx="3.01" ry="3.01" fill="none" /><path d="M85,92.56A3,3,0,0,0,79.35,94V195.27a3,3,0,0,0,3,3H86.9a3,3,0,0,0,3-3V102.53a3,3,0,0,0-.35-1.41Z" fill="none" /><path d="M191.75,163.74,174.8,139a3,3,0,0,0-5.42,1.09l-8.54,41.05a3,3,0,0,0,4.57,3.14L190.9,168A3,3,0,0,0,191.75,163.74Z" fill="none" /><rect x="237.64" y="430.33" width="232.15" height="31.66" rx="3.01" ry="3.01" fill="none" /><path d="M197.6,192.62l-28.11,19.26a3,3,0,0,0-1,3.85l12.1,23.61a3,3,0,0,0,5.49-.32l16-42.87A3,3,0,0,0,197.6,192.62Z" fill="none" /><path d="M292.7,301.42l-20.39-27.81a3,3,0,0,0-5.15.51l-25.07,54a3,3,0,0,0,4.23,3.87l45.47-26.23A3,3,0,0,0,292.7,301.42Z" fill="none" /><path d="M242.41,254.8l-34.85,24.88a3,3,0,0,0-.87,3.93l14,24.77a3,3,0,0,0,5.39-.32l20.81-49.65A3,3,0,0,0,242.41,254.8Z" fill="none" /><path d="M241.33,232,223.78,207.9a3,3,0,0,0-5.23.68l-16.74,43a3,3,0,0,0,4.44,3.61l35.21-22.92Z" fill="none" /><path d="M472.06,388.12H427.58v-7.45a3,3,0,0,1,3-3h57.3a3,3,0,0,0,3-3V180.18a3,3,0,0,0-3-3H335.62a3,3,0,0,0-3,3v98h0l11.94,32.12a3,3,0,0,1-2.82,4.06H325a3,3,0,0,1-2.44-1.25L104.31,9.06a3,3,0,0,0-4-.82L56.57,34.62a3,3,0,0,0-1.06,4.07l12.89,22.6a3,3,0,0,1,.4,1.49V195.27a3,3,0,0,1-3,3h-9.1a3,3,0,0,0-3,3.43l9.62,67.85a3,3,0,0,0,3,2.59h2.5v20.44a3,3,0,0,1-1.63,2.67c-9,4.61-18.42,13.74-18.42,29.44,0,9.77,3.33,17.23,8.43,22.6a3,3,0,0,1-.21,4.35L8.39,393.48a3,3,0,0,0,2,5.29h7a3,3,0,0,0,2-.73l48.5-41.79a3,3,0,0,1,2.91-.57,39.31,39.31,0,0,0,12.78,2.21,29.51,29.51,0,0,0,12.43-2.82,3,3,0,0,1,3.16.38l52.62,42.65a3,3,0,0,0,1.89.67l6.12-.06a3.38,3.38,0,0,0,2.1-6l-53.65-43.48a3,3,0,0,1-.61-4A32.47,32.47,0,0,0,113,326.45a10.55,10.55,0,1,0-21.1,0,15.85,15.85,0,0,1-.41,3.77,3,3,0,0,1-4.81,1.6l0,0a5.28,5.28,0,0,0-6.76.11l-2.31,2a3,3,0,0,1-3.81.11c-2.31-1.81-3.89-4.71-3.89-9.32,0-9.54,9.47-11.85,11.25-12.19a10.57,10.57,0,0,0,8.8-10.42V275.15a3,3,0,0,1,3-3h6.24a3,3,0,0,0,2.95-2.42l13.56-67.85a3,3,0,0,0-2.95-3.6h-9.25a3,3,0,0,1-3-3V134a3,3,0,0,1,5.68-1.39L226.75,364.74a3,3,0,0,1,.34,1.39v8.53a3,3,0,0,0,3,3h36.19a3,3,0,0,1,3,3v7.45H242.92c-31.33,0-47.49,14.84-47.49,36.93v44.52c0,23.08,15.5,34.62,47.49,34.62H475.07c23.31,0,36.93-15.5,36.93-44.85V428.06A39.94,39.94,0,0,0,472.06,388.12ZM374.82,222.39a3,3,0,0,1,3-3h67.85a3,3,0,0,1,3,3v57.3a3,3,0,0,1-3,3H377.83a3,3,0,0,1-3-3ZM89.91,195.27a3,3,0,0,1-3,3H82.36a3,3,0,0,1-3-3V94A3,3,0,0,1,85,92.56l4.54,8.56a3,3,0,0,1,.35,1.41Zm18-150.84L100.7,82.27a3,3,0,0,1-5.62.84L82.14,58.53a3,3,0,0,1,1-3.91l20.17-13.26A3,3,0,0,1,107.93,44.43Zm5,63.59,9.18-41.46a3,3,0,0,1,5.54-.85l14.94,25.93a3,3,0,0,1-1,4L117.49,111.2A3,3,0,0,1,112.93,108Zm43.3,14.46-8.73,39.73a3,3,0,0,1-5.59.78l-13.57-25.22a3,3,0,0,1,1-3.95l22.31-14.51A3,3,0,0,1,156.22,122.48Zm4.61,58.67,8.54-41.05A3,3,0,0,1,174.8,139l17,24.73a3,3,0,0,1-.86,4.23L165.4,184.3A3,3,0,0,1,160.84,181.15Zm19.78,58.19-12.1-23.61a3,3,0,0,1,1-3.85l28.11-19.26a3,3,0,0,1,4.52,3.53l-16,42.87A3,3,0,0,1,180.62,239.34Zm21.18,12.18,16.74-43a3,3,0,0,1,5.23-.68L241.33,232l.13.18-35.21,22.92A3,3,0,0,1,201.8,251.52Zm24.32,56.54a3,3,0,0,1-5.39.32l-14-24.77a3,3,0,0,1,.87-3.93l34.85-24.88a3,3,0,0,1,4.52,3.61Zm20.19,24a3,3,0,0,1-4.23-3.87l25.07-54a3,3,0,0,1,5.15-.51l20.39,27.81a3,3,0,0,1-.92,4.38ZM469.79,459a3,3,0,0,1-3,3H240.65a3,3,0,0,1-3-3V433.34a3,3,0,0,1,3-3H466.78a3,3,0,0,1,3,3Z" fill="#434040" /><path d="M165.83,409.32H3a3,3,0,0,0-3,3v15.09a3,3,0,0,0,3,3H18.1a3,3,0,0,1,3,3v25.64a3,3,0,0,1-3,3H3a3,3,0,0,0-3,3v15.09a3,3,0,0,0,3,3H165.83a3,3,0,0,0,3-3V465.09a3,3,0,0,0-3-3H150.74a3,3,0,0,1-3-3V433.43a3,3,0,0,1,3-3h15.09a3,3,0,0,0,3-3V412.33A3,3,0,0,0,165.83,409.32Z" fill="#434040" /></svg>
                    <a className="text-[8px]" href='https://dryicons.com/free-icons/construction-icons'> Icon by Dryicons </a>
                </div>
                
                <span className="font-semibold text-[30px] tracking-tight ">Constructo</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block  flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow  ">
                    {
                        !menuItemNames ? undefined : menuItemNames.map(
                            (menuItemName: string, index: number) => <a key={index} onClick={() => onItemClick(index)}  
                                className="block mt-4 lg:inline-block lg:mt-0  text-teal-lighter hover:text-white mr-6">
                                {menuItemName}
                            </a>
                        )
                    }             
                </div>
                <div>
                    <a onClick={()=> router.push("/")}
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Volver</a>
                </div>
            </div>
        </nav>
    )
}
export default ProjectHeader