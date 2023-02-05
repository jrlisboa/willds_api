import Joi from "joi";
import TokenCategoryEnum from "../enum/token_category.enum";

const validations = {
    token: {
        payload: Joi.object({
            name: Joi.string().required(),
            category: Joi.string().valid(...Object.keys(TokenCategoryEnum)).required(),
            propertie: Joi.string().required(),
            value: Joi.required(),
        }),
    }
};

export default validations;