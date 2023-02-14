"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Task_1 = __importDefault(require("../controllers/Task"));
const router = express_1.default.Router();
router.post('/create', Task_1.default.createTask);
router.get('/get/:taskId', Task_1.default.readTask);
router.get('/get/', Task_1.default.readAllTask);
router.patch('/update/:taskId', Task_1.default.updateTask);
router.delete('/delete/:taskId', Task_1.default.deleteTask);
module.exports = router;
