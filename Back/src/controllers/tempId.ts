export class TempID {
    id : number;
    MongoId : string;
    GraphQLId : number

    constructor(id: number,mongoId : string, graphID : number) {
      this.id = id;
      this.MongoId = mongoId;
      this.GraphQLId = graphID;
    }
   
    getIds(): [number,string, number]{
        return [this.id, this.MongoId,this.GraphQLId];
    }
  }