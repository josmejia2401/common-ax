export interface BaseDB {
    connect(): any;
    getConnection(): any;
    destroy(): any;
}