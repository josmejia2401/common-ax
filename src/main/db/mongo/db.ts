import { MongoClient, ObjectID } from 'mongodb';
//const { MongoClient, ServerApiVersion } = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;
//import { ObjectId } from 'bson';
import { BaseDB, Config } from "../db";
export class MongoDb2 implements BaseDB {
    private static instance: any;
    protected config: Config;
    private connection: MongoClient = null as any;
    private constructor(config: Config = {}) {
        this.config = config;
    }
    static getInstance(config: Config = {}) {
        if (MongoDb2.instance) {
            return MongoDb2.instance;
        }
        MongoDb2.instance = new MongoDb2(config);
        return MongoDb2.instance;
    }
    async connect(): Promise<MongoClient> {
        if (this.connection) {
            return this.connection;
        }
        if (this.config && this.config.mongo && this.config.mongo.uri) {
            this.connection = new MongoClient(this.config.mongo.uri);
            await this.connection.connect();
        } else {
            return Promise.reject(new Error("URI NOT FOUND"));
        }
        return this.connection;
    }
    async getConnection(): Promise<MongoClient> {
        return this.connect();
    }
    destroy() {
        if (this.connection) {
            this.connection.close();
            this.connection = null as any;
        }
    }
    getDB(name: string) {
        return this.connection.db(name);
    }
    static getObjectId(id?: string) {
        return id ? new ObjectID(id) : new ObjectID();
    }
}
