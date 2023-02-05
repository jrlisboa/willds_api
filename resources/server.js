import Hapi from '@hapi/hapi'

async function createServer() {
    const port = process.env.PORT || '3000'
    const server = Hapi.server({
        port,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            },
            validate: {
                failAction: async (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        console.error('ValidationError:', err.message);
                        throw Boom.badRequest(`Invalid request payload input`);
                    } else {
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    })

    await server.start()
    console.log(`[server] Server running on: ${server.info.uri}`)

    return server
}

export default createServer