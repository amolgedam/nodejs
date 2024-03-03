import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import { dbConnect } from './config/dbConnect.js';
import routes from './routes/routes.js';

const app = express();

dotenv.config();

app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use(express.json());

app.use(routes);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server run on PORT ${PORT}`);
    dbConnect();
});
