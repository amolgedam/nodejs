import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true);

    const DBPath = 'mongodb+srv://amolgedam1994:22H3e67bG7MVUmMI@mernbookingapp.stvtb3m.mongodb.net/?retryWrites=true&w=majority';
    const db = await mongoose.connect(DBPath);
    console.log('Database connected');
    return db;
}

export default connect;
