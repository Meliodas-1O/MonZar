"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempID = void 0;
class TempID {
    constructor(id, mongoId, graphID) {
        this.id = id;
        this.MongoId = mongoId;
        this.GraphQLId = graphID;
    }
    getIds() {
        return [this.id, this.MongoId, this.GraphQLId];
    }
}
exports.TempID = TempID;
