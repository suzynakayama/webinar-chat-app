import express from 'express';
import cors from 'cors';
import { middlewarelogger } from './middleware/logger';
import { usersRouter } from './routes/users';
import { sequelize } from './database';
import bodyParser from 'body-parser';
import { conversationsRouter } from './routes/conversations';
import { messagesRouter } from './routes/messages';

const run = async () => {

    // create the instance of an API
    const app = express();

    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('sucessfully connected to db');
    } catch (err) {
        console.log(err);
        console.log('could not connect to db');
    }

    // each middleware takes 3 parameters:
    // 1. Request
    // 2. Response
    // 3. Next - send you to the next middleware on the pipeline
    app.use(cors());
    app.use(bodyParser.json()); // for parsing application/json

    // defining a new pipe
    app.use(middlewarelogger);
    app.use('/users', usersRouter);
    app.use('/conversations', conversationsRouter);
    app.use('/messages', messagesRouter);

    // run the server on port 9999
    app.listen(9999);

    console.log('API running on port http://localhost:9999');
};

run();
