import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BaseDB } from "../db";
import { OperationDDL } from "./operations.db";
import { GeneralValidation } from "../../validations/general.validations";

// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html
export class DynamoDb implements BaseDB {
    private static instance: any;
    protected config: any;
    private connection: DynamoDBClient = null as any;
    private operationDDL: OperationDDL = null as any;

    private constructor(config: any = null) {
        this.config = config;
    }

    static getInstance(config = {}) {
        if (DynamoDb.instance) {
            return DynamoDb.instance;
        }
        DynamoDb.instance = new DynamoDb(config);
        return DynamoDb.instance;
    }

    connect(): DynamoDBClient {
        if (this.config && this.config.aws && this.config.aws.dynamodb && GeneralValidation.isEmpty(this.config.aws.dynamodb.region) === false) {
            this.connection = new DynamoDBClient({ region: this.config.aws.dynamodb.region });
        } else {
            this.connection = new DynamoDBClient({ 'region': 'us-east-2' });
        }
        return this.connection;
    }

    private checkConnection() {
        if (!this.connection) {
            this.connect();
        }
    }

    getConnection(): DynamoDBClient {
        this.checkConnection();
        return this.connection;
    }

    destroy() {
        if (this.connection) {
            this.connection.destroy();
            this.connection = null as any;
        }
    }

    getOperation(): OperationDDL {
        this.checkConnection();
        if (!this.operationDDL) {
            this.operationDDL = new OperationDDL(this.connection);
        }
        return this.operationDDL;
    }
}