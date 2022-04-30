import { MongoClient } from 'mongodb';
import { OperationDB } from '../db';
export class OperationsMongoDB implements OperationDB {
    protected connection: MongoClient;
    constructor(connection: MongoClient) {
        this.connection = connection;
    }
    async insert<T>(dbName: string, collectionName: string, data: any) {
        const db = this.connection.db(dbName);
        const collection = db.collection<T>(collectionName);
        return collection.insertOne(data);
    }
    async update<T>(dbName: string, collectionName: string, query: any, data: any, options: any) {
        const db = this.connection.db(dbName);
        const collection = db.collection<T>(collectionName);
        return collection.updateOne(query, { $set: data }, options);
    }
    async delete<T>(dbName: string, collectionName: string, query: any) {
        const db = this.connection.db(dbName);
        const collection = db.collection<T>(collectionName);
        return collection.deleteOne(query);
    }
    async findById<T>(dbName: string, collectionName: string, query: any) {
        const db = this.connection.db(dbName);
        const collection = db.collection<T>(collectionName);
        return collection.findOne(query);
    }
    async find<T>(dbName: string, collectionName: string, query: any) {
        const db = this.connection.db(dbName);
        const collection = db.collection<T>(collectionName);
        return collection.find(query);
    }
    async findAll<T>(dbName: string, collectionName: string, query: any) {
        const db = this.connection.db(dbName);
        const collection = db.collection<T>(collectionName);
        return collection.find(query)
    }
    async aggregate(dbName: string, collectionName: string, query: any): Promise<any> {
        const db = this.connection.db(dbName);
        const collection = db.collection(collectionName);
        return collection.aggregate(query);
    }
}
