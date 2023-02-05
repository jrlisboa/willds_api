import errorMessages from "../validations/error_messages"

async function getWidgetList(resources = {}) {
    const { server } = resources

    server.route({
        method: 'GET',
        path: '/widget',
        options: {
            handler: async (request, h) => {
                try { return handleSuccess(resources, request) }
                catch (error) { return handleError(error, h) }
            }
        }
    })
}

async function handleSuccess(resources, request) {
    const { database } = resources
    const { query } = request

    const filter = {}
    if (query.name) filter.name = query.name

    const widgetCollection = await database.collection('widget')
    const widgets = await widgetCollection.find({}).toArray()

    return widgets
}

function handleError(error, h) {
    console.log('[get_widgets] Error finding widgets', error)

    return h.response({
        message: errorMessages.failFindingUser
    }).code(500)
}

export default getWidgetList