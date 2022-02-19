"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDb = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const operations_db_1 = require("./operations.db");
const general_validations_1 = require("../../validations/general.validations");
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html
class DynamoDb {
    constructor(config = null) {
        this.connection = null;
        this.operationDDL = null;
        this.config = config;
    }
    static getInstance(config = {}) {
        if (DynamoDb.instance) {
            return DynamoDb.instance;
        }
        DynamoDb.instance = new DynamoDb(config);
        return DynamoDb.instance;
    }
    connect() {
        if (this.connection) {
            return this.connection;
        }
        if (this.config && this.config.aws && this.config.aws.dynamodb && general_validations_1.GeneralValidation.isEmpty(this.config.aws.dynamodb.region) === false) {
            this.connection = new client_dynamodb_1.DynamoDBClient({ region: this.config.aws.dynamodb.region });
        }
        else {
            this.connection = new client_dynamodb_1.DynamoDBClient({ 'region': 'us-east-2' });
        }
        return this.connection;
    }
    checkConnection() {
        if (!this.connection) {
            this.connect();
        }
    }
    getConnection() {
        this.checkConnection();
        return this.connection;
    }
    destroy() {
        if (this.connection) {
            this.connection.destroy();
            this.connection = null;
        }
    }
    getOperation() {
        this.checkConnection();
        if (!this.operationDDL) {
            this.operationDDL = new operations_db_1.OperationDDL(this.connection);
        }
        return this.operationDDL;
    }
}
exports.DynamoDb = DynamoDb;
//# sourceMappingURL=dynamo.db.js.map