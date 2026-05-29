import express from 'express';

const router =express.Router();

router.get('/', (_,res)=>{
    res.send('HomePage');
});

router.get('/about',(_,res)=>{
    res.send('About Page');
});

router.get('/hello{/:name}',(req,res)=>{
    const {name='stranger'}=req.params;
    const {lang}=req.query;

    if(lang==='id'){
        return res.send(`Gai, ${name}`);
    }
    res.send(`Hello, ${name}`);
});

router.all('/',(_,res)=>{
    res.status(405).send('Halaman tidak dapat di akses dengan method tersebut');
});

router.all('/about',(_,res)=>{
    res.status(405).send('Halaman tidak dapat di akses dengan method tersebur');
});

router.use((_,res)=>{
    res.send('Halaman tidak di temukan');  
});
export default router;