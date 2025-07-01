import express from 'express';
import  UserRouter  from './routes/user';
import mongoose from 'mongoose';
import  { MONGO_URL }  from './config';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', UserRouter);

async function main() {
    await mongoose.connect( MONGO_URL);
    console.log("db connected");
}

main();

app.listen(3000);