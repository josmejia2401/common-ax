'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
class BaseModel {
    toObject() {
        const out = {};
        const currentAsJson = JSON.parse(JSON.stringify(this));
        const keys = Object.keys(currentAsJson);
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
                    };
                    break;
                case "number":
                    out[key] = {
                        "N": `${value}`
                    };
                    break;
                case "boolean":
                    out[key] = {
                        "BOOL": `${value}`
                    };
                    break;
                default:
                    out[key] = {
                        "S": `${value}`
                    };
            }
        }
        return out;
    }
    toQuery() {
        const obj = this.toObject();
        let keyConditionExpression = "";
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};
        if (obj) {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = obj[key] || obj[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                if (i === 0) {
                    keyConditionExpression = `#${key} = :${key}`;
                }
                else {
                    keyConditionExpression += ` and #${key} = :${key}`;
                }
                expressionAttributeValues[`:${key}`] = value;
                expressionAttributeNames[`#${key}`] = key;
            }
        }
        const params = {
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
        };
        return params;
    }
    toScan(conditional = 'and') {
        const obj = this.toObject();
        let filterExpresion = "";
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};
        if (obj) {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = obj[key] || obj[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                if (i === 0) {
                    filterExpresion = `#${key} = :${key}`;
                }
                else {
                    filterExpresion += ` ${conditional} #${key} = :${key}`;
                }
                expressionAttributeValues[`:${key}`] = value;
                expressionAttributeNames[`#${key}`] = key;
            }
        }
        const params = {
            FilterExpression: filterExpresion,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
        };
        return params;
    }
    toUpdate() {
        const obj = this.toObject();
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};
        let updateExpression = "";
        if (obj) {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = obj[key] || obj[`${key}`];
                if (value === undefined || value === null || value === "") {
                    continue;
                }
                if (updateExpression.length > 0) {
                    updateExpression += ` ,#${key}=:${key}`;
                }
                else {
                    if (key === 'id') {
                        continue;
                    }
                    updateExpression += `#${key}=:${key}`;
                }
                expressionAttributeValues[`:${key}`] = value;
                expressionAttributeNames[`#${key}`] = key;
            }
        }
        const params = {
            Key: { "id": obj.id },
            UpdateExpression: `set ${updateExpression}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
        };
        return params;
    }
}
exports.BaseModel = BaseModel;
;
//# sourceMappingURL=base.dynamo.model.js.map