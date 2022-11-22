import { useEffect } from "react"

const StageProduct = (props:{
    projectRef:string,
    categoryRef:string
}) => {

    useEffect(
        ()=>{
            
        }
    )
    return <div className="lg:flex lg:justify-center  overflow-auto ">
        <table className="" >
            <thead>
                <tr >
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>unidad</th>
                    <th>Precio unitario</th>
                    <th>Precio total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th><input value="Clavo de 2" disabled className="text-center  disabled border border-gray-500 rounded" /></th>
                    <th><input value="10" disabled className="text-center border border-gray-500 rounded" /></th>
                    <th><input value="und" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                    <th><input value="$100" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                    <th><input value="$1.000" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                </tr>

                <tr>
                    <th><input value="Arena de revoque" disabled className="text-center  disabled border border-gray-500 rounded" /></th>
                    <th><input value="10" disabled className="text-center border border-gray-500 rounded" /></th>
                    <th><input value="kg" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                    <th><input value="$10.000" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                    <th><input value="$100.000" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                </tr>

                <tr>
                    <th><input value="Cemento" disabled className="text-center  disabled border border-gray-500 rounded" /></th>
                    <th><input value="10" disabled className="text-center border border-gray-500 rounded" /></th>
                    <th><input value="kg" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                    <th><input value="$15.000" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                    <th><input value="$150.000" disabled className="text-center disabled border border-gray-500 rounded" /></th>
                </tr>
            </tbody>
        </table>

    </div>
}
export default StageProduct