import createApi from "./api";
import createServer from "./resources/server";
import createDatabaseClient from "./resources/database";

import createTokenModule from "./modules/token";
import createWidgetModule from "./modules/widget";

try {
    const { database } = await createDatabaseClient();
    const server = await createServer();

    const tokenModule = createTokenModule();
    const widgetModule = createWidgetModule();

    const resources = {
        server,
        database,
    }

    const modules = [
        tokenModule,
        widgetModule,
    ];

    await createApi(resources, modules);
} catch (error) {
    console.log('[index] Uncaught error!', error);
}