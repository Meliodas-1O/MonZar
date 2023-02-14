"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Task_1 = __importDefault(require("./routes/Task"));
const router = (0, express_1.default)();
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('connected to MONGODB');
    serverOn();
})
    .catch((error) => { Logging_1.default.error(error); });
const serverOn = () => {
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((0, cors_1.default)());
    router.use((req, res, next) => {
        Logging_1.default.info(`Method : [${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Method : [${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}] - Status : [${res.statusCode}]`);
        });
        next();
    });
    router.use('/task', Task_1.default);
    router.get('/', (req, res, next) => res.status(200).json({ message: 'Ok let\'s go' }));
    router.use((req, res, next) => {
        const error = new Error('not Found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}.`));
};
