
import { useContext } from 'react'
import uuid from 'react-uuid'
import readXlsxFile, { Row } from 'read-excel-file'
import { productsExcelSchema } from '../../../constants'
import { Category } from '../../../types/dbTypes'
// File

const distinctsValuesFromArray = (arrayValues: Array<string | number>) => {
    const dinstinctsValues: Array<string | number> = []
    arrayValues.forEach(
        (value) => !dinstinctsValues.includes(value) ? dinstinctsValues.push(value) : ""
    )
    return dinstinctsValues
}

const UploadData = (props: { context: any }) => {

    const { productsFormUtils, setCategories, categories } = useContext<any>(props.context)

    const onFileChange = async (ev: any) => {

        readXlsxFile(ev.target.files[0], {
            sheet: 3,

            ignoreEmptyRows: true,
            schema: productsExcelSchema
        }).then(
            ({ rows, errors }) => {

                const newCategories = [...categories, ...distinctsValuesFromArray(rows.map(
                    (row: any) => row.category || "N/A"
                )).map(
                    (category: any) => ({ ref: uuid(), name: category })
                )]

                setCategories(newCategories)
                const newProducts = rows.map(
                    (row: any) => ({
                        ref: uuid(),
                        categoryIndex: (newCategories.findIndex(category => category.name == (row.category || "N/A"))) || {
                            ref: "-1",
                            name: "typingworks"
                        },
                        name: row.name || "N/A",
                        brand: row.brands || "N/A",
                        provider: row.provider || "N/A",
                        price: row.price || 0,
                        type: "na",
                        discount: 0,
                        performance: 0
                    })
                )
                productsFormUtils.append(newProducts)

            }
        )



    }

    return <input type="file" onChange={onFileChange} />


}

export default UploadData