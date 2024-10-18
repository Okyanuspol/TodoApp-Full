import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.ATLAS_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API   version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
      }
  const db = client.db("todoDB");
  return db;
}