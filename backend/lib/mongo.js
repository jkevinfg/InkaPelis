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
    getAll(collection,query){
        return this.connect().then(db => { //la promesa nos devuelve una instancia  a la base de datos, esa instancia tiene los metodos de mongo
            return db.collection(collection).find(query).toArray();
        })
    }

    get(collection,id){
        return this.connect().then(db => { //la promesa nos devuelve una instancia  a la base de datos
            return db.collection(collection).findOne({_id : ObjectId(id)})
        })
    }
    create(collection , data){
        return this.connect().then(db => { //la promesa nos devuelve una instancia  a la base de datos, esa instancia tiene los metodos de mongo
            return db.collection(collection).insertOne(data)
        }).then(result => result.insertedId)
    }
    update(collection , id , data){
        return this.connect().then(db => { //la promesa nos devuelve una instancia  a la base de datos , esa instancia tiene los metodos de mongo
            return db.collection(collection).updateOne({_id : ObjectId(id)} , {$set : data }, {upsert : true})
        }).then(result => result.upsertedId || id)
    }
    delete(collection , id){
        return this.connect().then(db => { //la promesa nos devuelve una instancia  a la base de datos, esa instancia tiene los metodos de mongo
            return db.collection(collection).deleteOne({_id : ObjectId(id)})
        }).then( () => id)
    }
}

module.exports = MongoLib;

