/**
 * Copyright (c) 2019, Algebra Global Inc. Oyku Ors
 * 
 * This is the entry point of serverless Angel application
 * written by me.
 * 
 */

/* Express related stuff */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = require('./utils/constants').appPort;
const userRouter = require('./routes/userRoutes');

/* MongoDB */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/oyku', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('Connected to DB succesfully.');
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded());
app.use(express.json());

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Application is running on port ${port}!`);
});
