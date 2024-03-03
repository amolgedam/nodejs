import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('These are test route');
})

export default router;