'use strict';
export class BaseModel {

    toObject() {
        const out: any = {};
        const currentAsJson = JSON.parse(JSON.stringify(this));
        const keys = Object.keys(currentAsJson);
        if (currentAsJson && keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = currentAsJson[key] || currentAsJson[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                const typeOf = typeof key;
                switch (typeOf) {
                    case "string":
                        out[key] = {
                            "S": `${value}`
                        }
                        break;
                    case "number":
                        out[key] = {
                            "N": `${value}`
                        }
                        break;
                    case "boolean":
                        out[key] = {
                            "BOOL": `${value}`
                        }
                        break;
                    default:
                        out[key] = {
                            "S": `${value}`
                        }
                }
            }
        }
        return out;
    }

    toQuery() {
        const object = this.toObject();
        const params = {} as any;
        const keys = Object.keys(object);
        if (object && keys.length > 0) {
            let keyConditionExpression = "";
            const expressionAttributeValues: any = {};
            const expressionAttributeNames: any = {};
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = object[key] || object[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                if (i === 0) {
                    keyConditionExpression = `#${key} = :${key}`
                } else {
                    keyConditionExpression += ` and #${key} = :${key}`
                }
                expressionAttributeValues[`:${key}`] = value;
                expressionAttributeNames[`#${key}`] = key;
            }
            params["KeyConditionExpression"] = keyConditionExpression;
            params["ExpressionAttributeValues"] = expressionAttributeValues;
            params["ExpressionAttributeNames"] = expressionAttributeNames;
        }
        return params;
    }

    toScan(conditional: string = 'and') {
        const object = this.toObject();
        const params = {} as any;
        const keys = Object.keys(object);
        if (object && keys.length > 0) {
            let filterExpresion = "";
            const expressionAttributeValues: any = {};
            const expressionAttributeNames: any = {};
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = object[key] || object[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                if (i === 0) {
                    filterExpresion = `#${key} = :${key}`
                } else {
                    filterExpresion += ` ${conditional} #${key} = :${key}`
                }
                expressionAttributeValues[`:${key}`] = value;
                expressionAttributeNames[`#${key}`] = key;
            }
            params["FilterExpression"] = filterExpresion;
            params["ExpressionAttributeValues"] = expressionAttributeValues;
            params["ExpressionAttributeNames"] = expressionAttributeNames;
        }
        return params;
    }

    toUpdate() {
        const object = this.toObject();
        const params = {} as any;
        const keys = Object.keys(object);
        if (object && keys.length > 0) {
            const expressionAttributeValues: any = {};
            const expressionAttributeNames: any = {};
            let updateExpression = "";
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = object[key] || object[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                if (updateExpression.length > 0) {
                    updateExpression += ` ,#${key}=:${key}`
                } else {
                    if (key === 'id') {
                        continue;
                    }
                    updateExpression += `#${key}=:${key}`
                }
                expressionAttributeValues[`:${key}`] = value;
                expressionAttributeNames[`#${key}`] = key;

            }
            params["Key"] = { "id": object.id };
            params["UpdateExpression"] = `set ${updateExpression}`;
            params["ExpressionAttributeValues"] = expressionAttributeValues;
            params["ExpressionAttributeNames"] = expressionAttributeNames;
        }
        return params;
    }

    toDelete() {
        const object = this.toObject();
        const params = {} as any;
        const keys = Object.keys(object);
        if (object && keys.length > 0) {
            //params["ConditionExpression"] = "rating <= :val";
            //params["ExpressionAttributeValues"] = { ":val": 5.0 };
            params["Key"] = object;
        }
        return params;
    }
};

export interface MetadataDynamoResponse {
    $metadata: {
        httpStatusCode: number;
        requestId: string;
        extendedRequestId: any | undefined;
        cfId: any | undefined;
        attempts: number;
        totalRetryDelay: string;
    },
    Attributes: any | undefined;
    ConsumedCapacity: any | undefined;
    ItemCollectionMetrics: any | undefined;
}