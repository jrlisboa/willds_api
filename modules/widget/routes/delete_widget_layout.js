import { ObjectId } from "mongodb"
import errorMessages from "../validations/error_messages"

async function deleteLayout(resources = {}) {
    try {
        const { server } = resources

        server.route({
            method: 'DELETE',
            path: '/widget/{widgetId}/layout/{layoutId}',
            options: {
                handler: async (request, h) => {
                    try { return handleSuccess(resources, request, h) }
                    catch (error) { handleError(error, h) }
                }
            }
        })
    } catch (error) {
        console.log('[delete_layout] Error deleting layout', error)
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources
    const { params } = request

    const widgetCollection = await database.collection('widget')

    const filter = { _id: ObjectId(params.widgetId), "layouts.layoutId": ObjectId(params.layoutId) }
    const data = { $pull: { "layouts": { layoutId: ObjectId(params.layoutId) } } }

    const deletedLayout = await widgetCollection.updateOne(filter, data)
    console.log('[delete_layout] Deleting layout with following id:', params.layoutId)

    if ((deletedLayout || {}).modifiedCount === 0) {
        return h.response({
            message: errorMessages.layoutNotFound
        }).code(404)
    }

    return { message: 'SUCCESS', layoutId: params.layoutId }
}

function handleError(error, h) {
    console.log('[delete_layout] Error deleting layout', error)

    return h.response({
        message: errorMessages.failDeletingLayout
    }).code(500)
}

export default deleteLayout