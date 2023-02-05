import validations from "../validations/validations"
import errorMessages from "../validations/error_messages"
import { ObjectId } from "mongodb"
import verifyProperties from "../validations/verify_properties"

async function registerLayout(resources = {}) {
    try {
        const { server } = resources

        server.route({
            method: 'POST',
            path: '/widget/{widgetId}/layout',
            options: {
                validate: validations.layout,
                handler: async (request, h) => {
                    try { return handleSuccess(resources, request, h) }
                    catch (error) { handleError(error, h) }
                }
            }
        })
    } catch (error) {
        console.log('[register_layout] Error creating new layout', error)
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources
    const { payload, params } = request
    payload['layoutId'] = ObjectId()

    const isValid = verifyProperties(payload);
    if (!isValid) {
        return h.response({
            message: errorMessages.invalidCategoryPropertie
        }).code(400);
    }

    const filter = { _id: ObjectId(params.widgetId) }
    const data = { $push: { layouts: payload } }

    const widgetCollection = await database.collection('widget')
    await widgetCollection.updateOne(filter, data)
    console.log('[register_layout] Creating new layout with following data:', payload)

    return h.response({
        message: 'SUCCESS',
        layoutId: params.widgetId,
    }).code(201);
}

function handleError(error, h) {
    console.log('[register_layout] Error creating new layout', error)

    return h.response({
        message: errorMessages.failCreatingLayoutPropertie
    }).code(500)
}

export default registerLayout