//import express
const express = require('express');
const userRouter = require('./routers/userRouter');
const nftRouter = require('./routers/nftRouter');
const utilRouter = require('./routers/utils');

//initialize express app
const app = express();
const port = 5000;
const cors = require('cors');


// middlewares
app.use(
    cors({
        origin: ["http://localhost:3000"],
    })
);

app.use(express.json());

//middleware
app.use('/user', userRouter);
app.use('/nft', nftRouter);
app.use('/util', utilRouter);

app.use(express.static('./static/uploads'));

app.get('/', (req, res) => {
    res.send('response from express');
});

app.listen(port, () => { console.log('server started'); });