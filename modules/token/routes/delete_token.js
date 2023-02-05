
import { ObjectId } from "mongodb";
import errorMessages from "../validations/error_messages";

async function deleteToken(resources = {}) {
    try {
        const { server } = resources;

        server.route({
            method: 'DELETE',
            path: '/token/{tokenId}',
            handler: async (request, h) => {
                try { return handleSuccess(resources, request, h) }
                catch (error) { handleError(error, h) }
            }
        });
    } catch (error) {
        console.log('[delete_token] Error deleting token', error);
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources;
    const { params } = request;

    const tokenCollection = await database.collection('token');
    const deletedToken = await tokenCollection.deleteOne({ _id: ObjectId(params.tokenId) })
    console.log('[delete_token] Deleting token with following id:', params.tokenId);

    if ((deletedToken || {}).modifiedCount === 0) {
        return h.response({
            message: errorMessages.tokenNotFound
        }).code(404)
    }

    return h.response({
        message: 'SUCCESS',
        tokenId: params.tokenId,
    }).code(200);
}

function handleError(error, h) {
    console.log('[delete_token] Error deleting token', error);

    return h.response({
        message: errorMessages.failDeletingToken
    }).code(500);
}

export default deleteToken;