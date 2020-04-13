import express from 'express';
import cors from 'cors';
import { middlewarelogger } from './middleware/logger';
import { usersRouter } from './routes/users';
import { sequelize } from './database';
import bodyParser from 'body-parser';
import { conversationsRouter } from './routes/conversations';
import { messagesRouter } from './routes/messages';
import { middlewareAuth } from './middleware/auth';
import { authRouter } from './routes/auth';
import { meRouter } from './routes/me';
// import { createServer } from 'http';

// import {Server} from 'http';
// import io from 'socket.io';
// import sockets from './lib/sockets';

const run = async () => {

    // create the instance of an API
    const app = express();
    // const http = createServer(app);
    // const server = new Server(app);
    // const Io = io(server);

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
    app.use('/auth', authRouter);
    app.use('/users', middlewareAuth, usersRouter);
    app.use('/me', middlewareAuth, meRouter);
    app.use('/conversations', middlewareAuth, conversationsRouter);
    app.use('/messages', middlewareAuth, messagesRouter);

    // const sockets = io();
    // console.log(sockets);

    // Io.on('connection', socket => {
    //     console.log('server')
    //     socket.emit('news', {});
    //     socket.on('my other event', data => { console.log(data) });
    // });

    const port = process.env.PORT || 9999;

    // run the server on port 9999
    app.listen(port, () => console.log(`API running on port http://localhost:${port}`));
};

run();
