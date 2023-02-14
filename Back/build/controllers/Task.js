"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Task_1 = __importDefault(require("../models/Task"));
const tempId_1 = require("./tempId");
const mqtt_1 = __importDefault(require("mqtt"));
const host = 'broker.emqx.io';
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
let listIds = [new tempId_1.TempID(6, "utuy", 4)];
const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt_1.default.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
});
const MN = 'MongoName';
const MI = 'MongoID';
const GN = 'GraphName';
const GI = 'GraphID';
client.on('connect', () => {
    console.log('Connected');
    client.subscribe([GN], { qos: 1 }, () => {
        console.log(`Subscribe to topic '${GN}'`);
    });
    client.subscribe([GI], { qos: 1 }, () => {
        console.log(`Subscribe to topic '${GI}'`);
    });
});
client.on('message', (topic, payload) => {
    var message = payload.toString();
    if (topic === GN) {
        const task = new Task_1.default({
            _id: new mongoose_1.default.Types.ObjectId,
            name: message
        });
        return task.save();
    }
    if (topic === GI) {
        console.log('Received Message:', topic, message);
    }
});
const createTask = (req, res, next) => {
    const { name } = req.body;
    const { description } = req.body;
    const { date } = req.body;
    const { done } = req.body;
    const id = new mongoose_1.default.Types.ObjectId;
    client.publish(MN, name.toString(), { qos: 1 }, (error) => {
        if (error) {
            console.error(error);
            return 0;
        }
        console.log('Name published');
    });
    const task = new Task_1.default({
        _id: id,
        name,
        description,
        date,
        done
    });
    return task
        .save()
        .then((task) => res.status(201).json({ task }))
        .catch((task) => res.status(501).json({ task }));
};
const readTask = (req, res, next) => {
    const taskId = req.params.taskId;
    return Task_1.default.findById(taskId)
        .then((task) => (task ? res.status(200).json({ task }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllTask = (req, res, next) => {
    return Task_1.default.find()
        .then((tasks) => res.status(200).json({ tasks }))
        .catch((error) => res.status(500).json({ error }));
};
const updateTask = (req, res, next) => {
    const taskId = req.params.taskId;
    return Task_1.default.findById(taskId)
        .then((task) => {
        if (task) {
            task.set(req.body);
            return task
                .save()
                .then((task) => res.status(201).json({ task }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteTask = (req, res, next) => {
    const taskId = req.params.taskId;
    client.publish(MI, taskId.toString(), { qos: 1 }, (error) => {
        if (error) {
            console.error(error);
            return 0;
        }
        console.log('ID published');
    });
    return Task_1.default.findByIdAndDelete(taskId)
        .then((task) => (task ? res.status(201).json({ message: 'deleted' }) : res.status(400).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
    ;
};
exports.default = { deleteTask, createTask, readAllTask, readTask, updateTask };
