import { shape, string, arrayOf } from "prop-types"

export const categoryType = shape({
    name: string.isRequired,
    id: string.isRequired,
})

export const categoriesType = arrayOf(categoryType)