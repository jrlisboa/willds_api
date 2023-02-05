import deleteWidget from "./routes/delete_widget";
import deleteLayout from "./routes/delete_widget_layout";
import getWidgetList from "./routes/get_widget_list";
import registerWidget from "./routes/register_widget";
import registerLayout from "./routes/register_widget_layout";
import updateWidget from "./routes/update_widget";
import updateLayout from "./routes/update_widget_layout";

function createWidgetModule() {
    async function initRoutes(resources = {}) {
        await registerWidget(resources)
        await updateWidget(resources)
        await deleteWidget(resources)
        await getWidgetList(resources)

        await registerLayout(resources)
        await updateLayout(resources)
        await deleteLayout(resources)
    }

    return { initRoutes };
}

export default createWidgetModule;