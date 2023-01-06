export const formNumberInput = {
    valueAsNumber: true,
    min: 0,
    validate: {
        notNan: (v: any) => v != undefined && v >= 0
    }
}

export const productsFieldNames = ['category']

export const productsExcelSchema = {    	
    'Categoría': {
        // JSON object property name.
        prop: 'category',
        type: String,
    },
    'Fecha Modificacion': {
        // JSON object property name.
        prop: 'updateDate',
        type: Date,
    },
    'Clasificación': {
        // JSON object property name.
        prop: 'classification',
        type: String,
    },
    'Producto/Medidas': {
        prop: 'name',
        type: String,
    },
    'Marca': {
        prop: 'brand',
        type: String,
    },
    'Proveedor': {
        prop: 'provider',        
        type: String,
    },
    'Costo con iva': {
        prop: 'price',
        type: Number,
    }
}