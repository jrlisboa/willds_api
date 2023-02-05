import deleteToken from "./routes/delete_token";
import getTokenList from "./routes/get_token_list";
import registerToken from "./routes/register_token";
import updateToken from "./routes/update_token";

function createTokenModule() {
    async function initRoutes(resources = {}) {
        await registerToken(resources)
        await updateToken(resources)
        await deleteToken(resources)
        await getTokenList(resources)
    }

    return { initRoutes };
}

export default createTokenModule;