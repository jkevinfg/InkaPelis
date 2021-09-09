const {MongoClient, ObjectId }  = require('mongodb');
const { config }  = require('../config');

const user = encodeURIComponent(config.dbUser);
const password = encodeURIComponent(config.dbPassword);
const db_name = config.db.name;

const MONGO_URI = `mongodb+srv://${user}:${password}@${config.dbHost}:${config.dbPort}/${db_name}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser : true});
        this.dbName = db_name;
    }
    // solo una instancia de la conexion , verificar si ya hay una abierta
    connect(){
        if(!MongoLib.connection) {
            MongoLib.connection = new Promise ((resolve, reject ) => {
                this.client.connect(err => {
                    if(err){
                        reject(err);
                    }
                    console.log('connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                })
            })
        }else {
            return MongoLib.connection;
        }
    }
}

module.exports = MongoLib;

