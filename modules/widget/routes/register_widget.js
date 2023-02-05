import validations from "../validations/validations";
import errorMessages from "../validations/error_messages";
import verifyProperties from "../validations/verify_properties";

async function registerWidget(resources = {}) {
    try {
        const { server } = resources;

        server.route({
            method: 'POST',
            path: '/widget',
            options: { validate: validations.widget },
            handler: async (request, h) => {
                try { return handleSuccess(resources, request, h) }
                catch (error) { handleError(error, h) }
            }
        });
    } catch (error) {
        console.log('[register_widget] Error creating new widget', error);
    }
}

async function handleSuccess(resources, request, h) {
    const { database } = resources;
    const { payload } = request;

    const widgetCollection = await database.collection('widget');
    const registerdWidget = await widgetCollection.insertOne(payload);
    console.log('[register_widget] Creating new widget with following data:', payload);

    return h.response({
        message: 'SUCCESS',
        widgetId: registerdWidget.insertedId,
    }).code(201);
}

function handleError(error, h) {
    console.log('[register_widget] Error creating new widget', error);

    return h.response({
        message: errorMessages.failCreatingWidget
    }).code(500);
}

export default registerWidget;