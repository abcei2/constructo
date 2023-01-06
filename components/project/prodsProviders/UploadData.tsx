
import readXlsxFile, { Row } from 'read-excel-file'
import { productsExcelSchema } from '../../../constants'
import { saveProject } from '../../../db/project'
// File

const distinctsValuesFromArray=(arrayValues:Array<string|number>)=>{
    const dinstinctsValues:Array<string| number>=[]
    arrayValues.forEach(
        (value) => !dinstinctsValues.includes(value)?dinstinctsValues.push(value):""
    )
    return dinstinctsValues
}

const UploadData = () => { 

    
    const onFileChange = async (ev:any) => {

        readXlsxFile(ev.target.files[0], { sheet: 3,

            ignoreEmptyRows: true,
             schema: productsExcelSchema }).then(
            ({ rows, errors }) =>{
                console.log(distinctsValuesFromArray(rows.map(
                    (row:any) => row.category || "N/A"
                )))
                console.log(distinctsValuesFromArray(rows.map(
                    (row: any) => row.classification || "N/A"
                )))
                saveProject()
                
            }
        )
     

       
    }

    return <input type="file" onChange={onFileChange} />

   
}

export default UploadData