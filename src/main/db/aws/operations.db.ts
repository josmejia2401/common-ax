const { PutItemCommand, QueryCommand, ScanCommand, DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

/**
 * Operaciones compatibles con la V3 de AWS.
 */
export class OperationDDL {

    protected connection: any;
    constructor(connection: any) {
        this.connection = connection;
    }

    insert(tableName: string, payload: any) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                    Item: payload,
                };
                this.connection.send(new PutItemCommand(params), (err: Error, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    update(tableName: string, payload: any) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                    ReturnValues: "UPDATED_NEW",
                    ...payload
                };
                this.connection.send(new UpdateItemCommand(params), (err: Error, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    delete(tableName: string, payload: any) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                    ...payload
                };
                this.connection.send(new DeleteItemCommand(params), (err: Error, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    getById(tableName: string, payload: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                    ...payload
                };
                this.connection.send(new QueryCommand(params), (err: Error, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        const result = [];
                        for (let i = 0; i < data.Items.length; i++) {
                            const out: any = {};
                            const item = data.Items[i];
                            const keys = Object.keys(item);
                            for (let j = 0; j < keys.length; j++) {
                                const key = keys[j];
                                const valueAsType = item[key] || item[`${key}`];
                                if (valueAsType) {
                                    const keyValue: any = Object.keys(valueAsType);
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
            } catch (error) {
                reject(error);
            }
        });
    };

    getByFilter(tableName: string, payload: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                payload.TableName = tableName;
                this.connection.send(new ScanCommand(payload), (err: Error, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        const result = [];
                        for (let i = 0; i < data.Items.length; i++) {
                            const out: any = {};
                            const item = data.Items[i];
                            const keys = Object.keys(item);
                            for (let j = 0; j < keys.length; j++) {
                                const key = keys[j];
                                const valueAsType = item[key] || item[`${key}`];
                                if (valueAsType) {
                                    const keyValue: any = Object.keys(valueAsType);
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
            } catch (error) {
                reject(error);
            }
        });
    };

    getAll(tableName: string) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: tableName,
                };
                this.connection.send(new ScanCommand(params), (err: Error, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        const result = [];
                        for (let i = 0; i < data.Items.length; i++) {
                            const out: any = {};
                            const item = data.Items[i];
                            const keys = Object.keys(item);
                            for (let j = 0; j < keys.length; j++) {
                                const key = keys[j];
                                const valueAsType = item[key] || item[`${key}`];
                                if (valueAsType) {
                                    const keyValue: any = Object.keys(valueAsType);
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
            } catch (error) {
                reject(error);
            }
        });
    };
}
