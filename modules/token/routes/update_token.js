import validations from "../validations/validations";
import errorMessages from "../validations/error_messages";
import verifyProperties from "../validations/verify_propertie";
import { ObjectId } from "mongodb";

async function updateToken(resources = {}) {
    try {
        const { server } = resources;

        server.route({
            method: 'PUT',
            path: '/token/{tokenId}',
            options: { validate: validations.token },
            handler: async (request, h) => {
                try { return handleSuccess(resources, request, h) }
                catch (error) { handleError(error, h) }
            }
        });
    } catch (error) {
        console.log('[update_token] Error updating token', error);
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources;
    const { payload, params } = request;

    const isValid = verifyProperties(payload);
    if (!isValid) {
        return h.response({
            message: errorMessages.invalidCategoryPropertie
        }).code(400);
    }

    try {
        const tokenCollection = await database.collection('token');
        const updatedToken = await tokenCollection.updateOne({ _id: ObjectId(params.tokenId) }, { $set: payload })
        console.log('[update_token] Updating token with following data:', params.tokenId);

        if ((updatedToken || {}).modifiedCount === 0) {
            return h.response({
                message: errorMessages.tokenNotFound
            }).code(404)
        }
        return h.response({
            message: 'SUCCESS',
            tokenId: params.tokenId,
        }).code(200);
    } catch (error) {
        console.log(error);
        return error;
    }
}

function handleError(error, h) {
    console.log('[update_token] Error updating token', error);

    return h.response({
        message: errorMessages.failUpdatingToken
    }).code(500);
}

export default updateToken;