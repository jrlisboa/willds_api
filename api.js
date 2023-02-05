async function createApi(resources, modules = []) {
    try {
        resources.server.route({
            method: 'GET',
            path: '/',
            handler: () => 'Welcome to willds API'
        });

        modules.forEach(async ({ initRoutes = () => { } }) => {
            await initRoutes(resources);
        });
    } catch (error) {
        console.log('[api] Error creating api', error);
    }
}

export default createApi;