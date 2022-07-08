'use strict';

import { GeneralValidation } from "../../validations/general.validation";

export class DynamoDBModel {
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
                    case "object":
                        out[key] = {
                            "B": `${value}`
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
                if (keyConditionExpression.length === 0) {
                    keyConditionExpression = `#${key} = :${key}`
                } else {
                    keyConditionExpression += ` and #${key} = :${key}`
                }
                expressionAttributeValues[`:${key}`] = value;
                expressionAttributeNames[`#${key}`] = key;
            }
            if (!GeneralValidation.isEmpty(keyConditionExpression)) {
                params["KeyConditionExpression"] = keyConditionExpression;
            }
            if (!GeneralValidation.isEmpty(expressionAttributeValues)) {
                params["ExpressionAttributeValues"] = expressionAttributeValues;
            }
            if (!GeneralValidation.isEmpty(expressionAttributeNames)) {
                params["ExpressionAttributeNames"] = expressionAttributeNames;
            }
        }
        return params;
    }
    toQueryKey(keyAllowed = ["id"]) {
        const object = this.toObject();
        const params = {} as any;
        const keys = Object.keys(object);
        if (object && keys.length > 0) {
            let keyConditionExpression = "";
            const expressionAttributeValues: any = {};
            const expressionAttributeNames: any = {};
            let filterExpression = "";
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = object[key] || object[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                if (keyAllowed.includes(key)) {
                    if (keyConditionExpression.length === 0) {
                        keyConditionExpression = `#${key} = :${key}`
                    } else {
                        keyConditionExpression += ` and #${key} = :${key}`
                    }
                } else {
                    if (filterExpression.length === 0) {
                        filterExpression = `#${key} = :${key}`;
                    } else {
                        filterExpression += ` and #${key} = :${key}`
                    }
                }
                expressionAttributeValues[`:${key}`] = value;
                expressionAttributeNames[`#${key}`] = key;
            }
            if (!GeneralValidation.isEmpty(keyConditionExpression)) {
                params["KeyConditionExpression"] = keyConditionExpression;
            }
            if (!GeneralValidation.isEmpty(filterExpression)) {
                params["FilterExpression"] = filterExpression;
            }
            if (!GeneralValidation.isEmpty(expressionAttributeValues)) {
                params["ExpressionAttributeValues"] = expressionAttributeValues;
            }
            if (!GeneralValidation.isEmpty(expressionAttributeNames)) {
                params["ExpressionAttributeNames"] = expressionAttributeNames;
            }
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
            if (!GeneralValidation.isEmpty(filterExpresion)) {
                params["FilterExpression"] = filterExpresion;
            }
            if (!GeneralValidation.isEmpty(expressionAttributeValues)) {
                params["ExpressionAttributeValues"] = expressionAttributeValues;
            }
            if (!GeneralValidation.isEmpty(expressionAttributeNames)) {
                params["ExpressionAttributeNames"] = expressionAttributeNames;
            }
        }
        return params;
    }
    toUpdate(separator = ",", keyAllowed = ["id"]) {
        const object = this.toObject();
        const params = {} as any;
        const keys = Object.keys(object);
        if (object && keys.length > 0) {
            const keyValues: any = {};
            const expressionAttributeValues: any = {};
            const expressionAttributeNames: any = {};
            let updateExpression = "";
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = object[key] || object[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                if (keyAllowed.includes(key)) {
                    keyValues[key] = value;
                } else {
                    if (updateExpression.length > 0) {
                        updateExpression += ` ${separator}#${key}=:${key}`
                    } else {
                        if (key === 'id') {
                            continue;
                        }
                        updateExpression += `#${key}=:${key}`
                    }
                    expressionAttributeValues[`:${key}`] = value;
                    expressionAttributeNames[`#${key}`] = key;
                }
            }
            if (!GeneralValidation.isEmpty(keyValues)) {
                params["Key"] = keyValues;
            }
            if (!GeneralValidation.isEmpty(updateExpression)) {
                params["UpdateExpression"] = `set ${updateExpression}`;
            }
            if (!GeneralValidation.isEmpty(expressionAttributeValues)) {
                params["ExpressionAttributeValues"] = expressionAttributeValues;
            }
            if (!GeneralValidation.isEmpty(expressionAttributeNames)) {
                params["ExpressionAttributeNames"] = expressionAttributeNames;
            }
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
}
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
