

// import createAdmin  from './model/admin.js'



import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.mongoURL;

let db;

const connectDB = async () => {
     const client = new MongoClient(uri);
     // A new instance of MongoClient is created using this URI. This client will be used to connect to the MongoDB Atlas cluster.
     try {
          await client.connect();
          db = client.db('test'); // Once connected, the function retrieves a specific database by name from the connected client.
          // use init() when we want to create an admin
          //    init() 
          console.log('Connected to MongoDB Atlas');
          //just to get the list of the DB and collections
          // await listDatabase(db)

     } catch (err) {
          console.error('Error connecting to MongoDB Atlas', err);
     }
};

connectDB().catch(console.error); // catch if any error occure

async function listDatabase(db) {
     // to get all the collections of the database
     const dbList = await db.listCollections().toArray();
     // to print all the collections name
     dbList.forEach(db => console.log(` - ${db.name}`));
     const apiCollection = await db.collection('api').find().toArray()
     console.log(apiCollection)
}

async function init() {
     try {
          await createAdmin()
     }
     catch (err) {
          console.log('Problem in Adming section', err.message)
     }
}
export default db;



