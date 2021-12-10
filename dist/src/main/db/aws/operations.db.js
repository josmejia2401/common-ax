"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationDDL = void 0;
const { PutItemCommand, QueryCommand, ScanCommand, DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
/**
 * Operaciones compatibles con la V3 de AWS.
 */
class OperationDDL {
    constructor(connection) {
        this.connection = connection;
    }
    insert(tableName, payload) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                    Item: payload,
                };
                this.connection.send(new PutItemCommand(params), (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
    update(tableName, payload) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                    ReturnValues: "UPDATED_NEW",
                    ...payload
                };
                this.connection.send(new UpdateItemCommand(params), (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
    delete(tableName, payload) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                    ...payload
                };
                this.connection.send(new DeleteItemCommand(params), (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
    getById(tableName, payload) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                    ...payload
                };
                this.connection.send(new QueryCommand(params), (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const result = [];
                        for (let i = 0; i < data.Items.length; i++) {
                            const out = {};
                            const item = data.Items[i];
                            const keys = Object.keys(item);
                            for (let j = 0; j < keys.length; j++) {
                                const key = keys[j];
                                const valueAsType = item[key] || item[`${key}`];
                                if (valueAsType) {
                                    const keyValue = Object.keys(valueAsType);
                                    const value = valueAsType[keyValue] || valueAsType[`${keyValue}`];
                                    out[key] = value;
                                }
                            }
                            if (out) {
                                result.push(out);
                            }
                        }
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
    getByFilter(tableName, payload) {
        return new Promise((resolve, reject) => {
            try {
                payload.TableName = tableName;
                this.connection.send(new ScanCommand(payload), (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const result = [];
                        for (let i = 0; i < data.Items.length; i++) {
                            const out = {};
                            const item = data.Items[i];
                            const keys = Object.keys(item);
                            for (let j = 0; j < keys.length; j++) {
                                const key = keys[j];
                                const valueAsType = item[key] || item[`${key}`];
                                if (valueAsType) {
                                    const keyValue = Object.keys(valueAsType);
                                    const value = valueAsType[keyValue] || valueAsType[`${keyValue}`];
                                    out[key] = value;
                                }
                            }
                            if (out) {
                                result.push(out);
                            }
                        }
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
    getAll(tableName) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                };
                this.connection.send(new ScanCommand(params), (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const result = [];
                        for (let i = 0; i < data.Items.length; i++) {
                            const out = {};
                            const item = data.Items[i];
                            const keys = Object.keys(item);
                            for (let j = 0; j < keys.length; j++) {
                                const key = keys[j];
                                const valueAsType = item[key] || item[`${key}`];
                                if (valueAsType) {
                                    const keyValue = Object.keys(valueAsType);
                                    const value = valueAsType[keyValue] || valueAsType[`${keyValue}`];
                                    out[key] = value;
                                }
                            }
                            if (out) {
                                result.push(out);
                            }
                        }
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
}
exports.OperationDDL = OperationDDL;
//# sourceMappingURL=operations.db.js.map