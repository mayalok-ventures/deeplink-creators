import { MongoClient, Db, Collection, Document } from 'mongodb'
import dns from 'dns'

// Ensure Node resolves MongoDB Atlas TXT/SRV records reliably on Windows
try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4'])
} catch {
    // ignore
}

const uri =
    process.env.MONGODB_URI ||
    'mongodb+srv://secretboy1959_db_user:Mflica2026deeplink@crm-deeplink.bnjkhcn.mongodb.net/?retryWrites=true&w=majority&appName=crm-deeplink'

const dbName = process.env.MONGODB_DB || 'deeplink-data'

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined
}

function createMongoClient(): Promise<MongoClient> {
    const mongoClient = new MongoClient(uri, {
        serverSelectionTimeoutMS: 6000,
        connectTimeoutMS: 8000,
        maxPoolSize: 10,
    })
    return mongoClient.connect().catch((err) => {
        // Reset cached promise on failure so next attempt retries fresh
        if (process.env.NODE_ENV === 'development') {
            global._mongoClientPromise = undefined
        }
        clientPromise = null
        throw err
    })
}

export async function getMongoClient(): Promise<MongoClient> {
    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            global._mongoClientPromise = createMongoClient()
        }
        return global._mongoClientPromise
    } else {
        if (!clientPromise) {
            clientPromise = createMongoClient()
        }
        return clientPromise
    }
}

export async function getDb(): Promise<Db> {
    const clientInstance = await getMongoClient()
    return clientInstance.db(dbName)
}

export async function getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
    const db = await getDb()
    return db.collection<T>(collectionName)
}

export default getMongoClient
