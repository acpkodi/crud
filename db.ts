import { MongoClient, Db, ServerApiVersion }  from "mongodb";

let cacheClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function cnDB(){

  if(cacheClient && cachedDb){
    return { client: cacheClient, db: cachedDb }
  }

  const uri = `mongodb+srv://acpstefanini:qhMvxA7AUt7jMUNa@cluster0.kza3sdu.mongodb.net`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  
    try {
      await client.connect();
      
      cacheClient = client;
      cachedDb = client.db();

    } finally {    
      await client.close();
    }  
  await client.connect();
  return{ client, db: client.db() }
}