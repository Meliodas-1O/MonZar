import  dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = 'mongodb+srv://cisco:TEMPLE@cluster0.n0dii2k.mongodb.net/?retryWrites=true&w=majority';

const SERVER_PORT = process.env.SERVEUR_PORT ? Number(process.env.SERVEUR_PORT) : 1400;

export const config = {
    mongo  :{
        url : MONGO_URL
    },
    server : {
        port : SERVER_PORT
    }
}