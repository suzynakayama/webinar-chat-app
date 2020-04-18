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
import { createServer } from 'http';
import io from 'socket.io';
import sockets from './lib/sockets';

const run = async () => {

    const app = express();
    const http = createServer(app);

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
    app.all('*', (req, res, next) => {
    const origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
    app.use(cors());
    app.use(bodyParser.json()); // for parsing application/json

    // defining a new pipe
    app.use(middlewarelogger);
    app.use('/auth', authRouter);
    app.use('/users', middlewareAuth, usersRouter);
    app.use('/me', middlewareAuth, meRouter);
    app.use('/conversations', middlewareAuth, conversationsRouter);
    app.use('/messages', middlewareAuth, messagesRouter);

  // Initialize socket.io
    const socket = io.listen(http);
    sockets(socket);

  // Running the web server on port 9999
  // app.listen(9999);

    const port = process.env.PORT || 9999;

    http.listen(port, () => {
        console.log(`API running on http://localhost:${port}`);
    });
};

run();
