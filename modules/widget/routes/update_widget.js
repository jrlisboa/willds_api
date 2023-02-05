import validations from "../validations/validations";
import errorMessages from "../validations/error_messages";
import verifyProperties from "../validations/verify_properties";

async function updateWidget(resources = {}) {
    try {
        const { server } = resources;

        server.route({
            method: 'PUT',
            path: '/widget/{widgetId}',
            options: { validate: validations.widget },
            handler: async (request, h) => {
                try { return handleSuccess(resources, request, h) }
                catch (error) { handleError(error, h) }
            }
        });
    } catch (error) {
        console.log('[update_widget] Error updating widget', error);
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources;
    const { payload, params } = request;

    const widgetCollection = await database.collection('widget');
    const updatedWidget = await widgetCollection.updateOne({ _id: Object(params.widgetId) }, { $set: payload })
    console.log('[update_widget] Updating widget with following data:', payload);

    if ((updatedWidget || {}).modifiedCount === 0) {
        return h.response({
            message: errorMessages.widgetNotFound
        }).code(404)
    }

    return h.response({
        message: 'SUCCESS',
        widgetId: params.widgetId,
    }).code(200);
}

function handleError(error, h) {
    console.log('[update_widget] Error updating widget', error);

    return h.response({
        message: errorMessages.failUpdatingWidget
    }).code(500);
}

export default updateWidget;