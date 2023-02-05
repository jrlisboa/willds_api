import TokenPropertieEnum from "../enum/token_category.enum"

export default ({ category, propertie, value }) => {
    const isPropertieNameValid = Object.keys(TokenPropertieEnum[category]).includes(propertie)
    const isPropertieTypeValid = typeof TokenPropertieEnum[category][propertie]() === typeof value

    return isPropertieNameValid && isPropertieTypeValid
}