import validations from "../validations/validations";
import errorMessages from "../validations/error_messages";
import verifyProperties from "../validations/verify_propertie";

async function registerToken(resources = {}) {
    try {
        const { server } = resources;

        server.route({
            method: 'POST',
            path: '/token',
            options: { validate: validations.token },
            handler: async (request, h) => {
                try { return handleSuccess(resources, request, h) }
                catch (error) { handleError(error, h) }
            }
        });
    } catch (error) {
        console.log('[register_token] Error creating new token', error);
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources;
    const { payload } = request;

    const isValid = verifyProperties(payload);
    if (!isValid) {
        return h.response({
            message: errorMessages.invalidCategoryPropertie
        }).code(400);
    }

    try {
        const tokenCollection = await database.collection('token');

        payload.tokenString = `${payload.category}_${payload.propertie}:${payload.name}`
        const registerdToken = await tokenCollection.insertOne(payload);
        console.log('[register_token] Creating new token with following data:', payload);
        return h.response({
            message: 'SUCCESS',
            tokenId: registerdToken.insertedId,
        }).code(201);
    } catch (e) {
        console.log('[register_token] Error creating new token', e);
        return e;
    }

}

function handleError(error, h) {
    console.log('[register_token] Error creating new token', error);

    return h.response({
        message: errorMessages.failCreatingToken
    }).code(500);
}

export default registerToken;