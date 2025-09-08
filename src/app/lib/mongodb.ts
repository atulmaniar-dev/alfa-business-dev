import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options: object = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Ensure global type includes `_mongoClientPromise`
  // Use `var` to avoid redeclaration error in global scope
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then((connectedClient) => {
        console.log('[MongoDB] Connected successfully (dev)');
        return connectedClient;
      })
      .catch((err) => {
        console.error('[MongoDB] Connection failed (dev):', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then((connectedClient) => {
      console.log('[MongoDB] Connected successfully (prod)');
      return connectedClient;
    })
    .catch((err) => {
      console.error('[MongoDB] Connection failed (prod):', err);
      throw err;
    });
}

export default clientPromise;
