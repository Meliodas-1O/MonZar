import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from './config/config';
import Logging from './library/Logging';
import taskRoutes from './routes/Task';

const router = express();

mongoose.connect(config.mongo.url, {retryWrites : true, w: 'majority'  })
    .then(()=>{Logging.info('connected to MONGODB')
    serverOn();
    })
    .catch((error) => {Logging.error(error)})

    const serverOn = () => {

    router.use(express.urlencoded({extended : true}))
    router.use(express.json());
    router.use(cors());

    router.use((req, res, next) =>{
        Logging.info(`Method : [${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Method : [${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}] - Status : [${res.statusCode}]`);
    });

    next();
    });

    router.use('/task',taskRoutes);

    router.get('/', (req, res, next) => res.status(200).json({message : 'Ok let\'s go'}))

    router.use((req, res, next) => {
        const error = new Error('not Found');
        Logging.error(error);

        return res.status(404).json({message : error.message});
    });

    http.createServer(router).listen(config.server.port, () => Logging.info (`Server is running on port ${config.server.port}.`))
};
