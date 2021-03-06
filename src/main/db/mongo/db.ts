import { MongoClient, ObjectID, ServerApiVersion } from 'mongodb';
//const { MongoClient, ServerApiVersion } = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;
//import { ObjectId } from 'bson';
import { BaseDB, Config } from "../db";
import { OperationsMongoDB } from './operations';
export class MongoDb2 implements BaseDB {
    private static instance: any;
    protected config: Config;
    private connection: MongoClient = null as any;
    private operations: OperationsMongoDB = null as any;
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
        return new Promise((resolve, reject) => {
            try {
                if (this.connection) {
                    return resolve(this.connection);
                }
                if (this.config && this.config.mongo && this.config.mongo.uri) {
                    this.connection = new MongoClient(this.config.mongo.uri, { serverApi: ServerApiVersion.v1 });
                    this.connection.connect();
                    resolve(this.connection);
                } else {
                    return reject(new Error("URI NOT FOUND"));
                }
                return this.connection;
            } catch (error) {
                reject(error);
            }
        });
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
    getOperation(): OperationsMongoDB {
        if (!this.operations) {
            this.operations = new OperationsMongoDB(this.connection);
        }
        return this.operations;
    }
}
