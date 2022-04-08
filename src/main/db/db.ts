export interface Config {
    dynamodb?: {
        region: string;
    };
    mongo?: {
        uri: string;
    };
}

export interface BaseDB {
    connect(): any;
    getConnection(): any;
    destroy(): any;
}

export interface OperationDB {
    insert(...nums: any[]): Promise<any>;
    update(...nums: any[]): Promise<any>;
    delete(...nums: any[]): Promise<any>;
    findById(...nums: any[]): Promise<any>;
    find(...nums: any[]): Promise<any>;
    findAll(...nums: any[]): Promise<any>;
}