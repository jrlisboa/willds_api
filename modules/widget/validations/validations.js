import Joi from "joi";
import TokenCategoryEnum from "../../token/enum/token_category.enum";

const validations = {
    layout: {
        payload: Joi.object({
            name: Joi.string().required(),
            category: Joi.string().valid(...Object.keys(TokenCategoryEnum)).required(),
            properties: Joi.object().required(),
        }),
    },
    widget: {
        payload: Joi.object({
            name: Joi.string().required(),
        }),
    }
};

export default validations;