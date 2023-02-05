import errorMessages from "../validations/error_messages"

async function getTokenList(resources = {}) {
    const { server } = resources

    server.route({
        method: 'GET',
        path: '/token',
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
    if (query.category) filter.category = query.category
    if (query.propertie) filter.propertie = query.propertie
    if (query.name) filter.name = query.name

    const tokenCollection = await database.collection('token')
    const tokens = await tokenCollection.find(filter).toArray()
    const result = {}

    if (tokens.length > 0) {
        tokens.forEach(token => {
            result[token.tokenString] = token.value
        })
    }

    return result
}

function handleError(error, h) {
    console.log('[get_tokens] Error finding tokens', error)

    return h.response({
        message: errorMessages.failFindingUser
    }).code(500)
}

export default getTokenList