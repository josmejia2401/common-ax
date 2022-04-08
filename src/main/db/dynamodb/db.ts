import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BaseDB, Config } from "../db";
import { OperationsDynamoDB } from "./operations";
import { GeneralValidation } from "../../validations/general.validations";
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html
export class DynamoDb implements BaseDB {
    private static instance: any;
    protected config: Config;
    private connection: DynamoDBClient = null as any;
    private operations: OperationsDynamoDB = null as any;
    private constructor(config: Config = {}) {
        this.config = config;
    }
    static getInstance(config: Config = {}) {
        if (DynamoDb.instance) {
            return DynamoDb.instance;
        }
        DynamoDb.instance = new DynamoDb(config);
        return DynamoDb.instance;
    }
    connect(): DynamoDBClient {
        if (this.connection) {
            return this.connection;
        }
        if (this.config && this.config.dynamodb && this.config.dynamodb && GeneralValidation.isEmpty(this.config.dynamodb.region) === false) {
            this.connection = new DynamoDBClient({ region: this.config.dynamodb.region });
        } else {
            this.connection = new DynamoDBClient({ 'region': 'us-east-2' });
        }
        return this.connection;
    }
    getConnection(): DynamoDBClient {
        this.connect();
        return this.connection;
    }
    destroy() {
        if (this.connection) {
            this.connection.destroy();
            this.connection = null as any;
        }
    }
    getOperation(): OperationsDynamoDB {
        this.connect();
        if (!this.operations) {
            this.operations = new OperationsDynamoDB(this.connection);
        }
        return this.operations;
    }
}