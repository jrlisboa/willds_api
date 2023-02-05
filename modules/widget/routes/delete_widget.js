import { ObjectId } from "mongodb"
import errorMessages from "../validations/error_messages"

async function deleteWidget(resources = {}) {
    try {
        const { server } = resources

        server.route({
            method: 'DELETE',
            path: '/widget/{widgetId}',
            options: {
                handler: async (request, h) => {
                    try { return handleSuccess(resources, request, h) }
                    catch (error) { handleError(error, h) }
                }
            }
        })
    } catch (error) {
        console.log('[delete_widget] Error deleting widget', error)
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources
    const { params } = request

    const widgetCollection = await database.collection('widget')
    const deletedWidget = await widgetCollection.deleteOne({ _id: ObjectId(params.widgetId) })
    console.log('[delete_widget] Deleting widget with following id:', params.widgetId)

    if ((deletedWidget || {}).modifiedCount === 0) {
        return h.response({
            message: errorMessages.widgetNotFound
        }).code(404)
    }

    return { message: 'SUCCESS', widgetId: params.widgetId }
}

function handleError(error, h) {
    console.log('[delete_widget] Error deleting widget', error)

    return h.response({
        message: errorMessages.failDeletingWidget
    }).code(500)
}

export default deleteWidget