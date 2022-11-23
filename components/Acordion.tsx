import React from "react";

const Acordion = (props: {
    headerTemplate?:React.ReactNode;
    headerText?: string;
    children: React.ReactNode;
}) => {
    const { headerText, headerTemplate, children} = props
    
    return <div className="bg-white  border rounded border-gray-400  ">
            <details className="rounded-lg">
                <summary className=" font-semibold flex justify-between p-3 gap-4">                   
                    {headerTemplate ?headerTemplate:headerText}                    
                </summary>
                <div className="border-t border-gray-300">
                    {children}
                </div>
            </details>
        </div>
}
export default Acordion