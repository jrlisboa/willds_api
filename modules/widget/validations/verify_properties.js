import TokenCategoryEnum from "../../token/enum/token_category.enum"

export default ({ category, properties }) => {
    const isCategoryValid = Object.keys(TokenCategoryEnum).includes(category)
    const isPropertiesValid = Object.keys(properties).every((propertieKey) => {
        return Object.keys(TokenCategoryEnum[category]).includes(propertieKey)
    }).length === properties.length


    return isCategoryValid && isPropertiesValid
}