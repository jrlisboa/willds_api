import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
const prodDatabase = "mongodb+srv://uiDbAdmin:uiDbAdmin.1@cluster0.koimtmb.mongodb.net/?retryWrites=true&w=majority"

async function createDatabaseClient({ testDatabase = false } = {}) {
    let mongoServer
    let uri = prodDatabase

    if (testDatabase) {
        mongoServer = await MongoMemoryServer.create()
        uri = mongoServer.getUri()
    }
    const client = new MongoClient(uri)

    try {
        return {
            database: client.db('willdsDb'),
            close: async () => {
                await client.close()
                if (testDatabase) await mongoServer.stop()
            },
        }
    } catch (error) { 
        console.log('[database] Error creating database', error)
    } finally {
        console.log('[database] Connected to mongodb with success: ', uri)
    }
}

export default createDatabaseClient;

