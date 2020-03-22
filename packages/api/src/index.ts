import express from 'express';
import { middlewarelogger } from './middleware/logger';
import { usersRouter } from './routes/users';
import { sequelize } from './database';
import bodyParser from 'body-parser';

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

    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    // defining a new pipe
    app.use(middlewarelogger);
    app.use('/users', usersRouter);

    // run the server on port 9999
    app.listen(9999);

    console.log(`API running on port http://localhost:9999`);
};

run();