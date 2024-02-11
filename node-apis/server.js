import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/* middleware */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // show http request in console
app.disable('x-powered-by'); // less hackers know about our stack

/* HTTP Request */
app.get('/', (req, res)=>{
    res.status(201).json("Home Page");
});


/* API Route */
app.use('/api', router);

/* Start Server only when the valid connections */
connect().then(()=>{
    try {
        const port = 3000;
        app.listen(port, ()=>{
            console.log(`Server run on localost://${port}`);
        });
    } catch (error) {
        console.log(`Cannot connect to the server`);
    }
})
.catch(error=>{
    console.log(`Invalide DB connection`);
});
