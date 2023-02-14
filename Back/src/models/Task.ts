import mongoose, {Document, Schema} from "mongoose";

export interface ITask {
    name : string,
    description : string,
    date : Date
    done : boolean
}

export interface ITaskModel extends ITask {}

const TaskSchema : Schema = new Schema(
    {
        name : { type : String, required: true},
        description : { type : String, required: true},
        date :{type : Date,require:true},
        done : { type : Boolean, required: true},
    },
    {
        versionKey : false
    }
); 

export default mongoose.model<ITaskModel>('Author',TaskSchema);
