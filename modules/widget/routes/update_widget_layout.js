import validations from "../validations/validations"
import errorMessages from "../validations/error_messages"
import { ObjectId } from "mongodb"

async function updateLayout(resources = {}) {
    try {
        const { server } = resources

        server.route({
            method: 'PUT',
            path: '/widget/{widgetId}/layout/{layoutId}',
            options: {
                validate: validations.layout,
                handler: async (request, h) => {
                    try { return handleSuccess(resources, request, h) }
                    catch (error) { handleError(error, h) }
                }
            }
        })
    } catch (error) {
        console.log('[update_layout] Error updating layout', error)
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources
    const { payload, params } = request
    payload['layoutId'] = ObjectId(params.layoutId)

    const widgetCollection = await database.collection('widget')

    const filter = { _id: ObjectId(params.widgetId), "layouts.layoutId": ObjectId(params.layoutId) }
    const data = { $set: { "layouts.$": payload } }

    const updatedLayout = await widgetCollection.updateOne(filter, data)
    console.log('[update_layout] Updating layout with following data:', payload)

    if ((updatedLayout || {}).modifiedCount === 0) {
        return h.response({
            message: errorMessages.layoutNotFound
        }).code(404)
    }

    return { message: 'SUCCESS', layoutId: params.layoutId }
}

function handleError(error, h) {
    console.log('[update_layout] Error updating layout', error)

    return h.response({
        message: errorMessages.failUpdatingLayout
    }).code(500)
}

export default updateLayout