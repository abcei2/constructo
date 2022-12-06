
export const formNumberInput = {
    valueAsNumber: true,
    min: 0,
    validate: {
        notNan: (v: any) => v != undefined && v >= 0
    }
}
