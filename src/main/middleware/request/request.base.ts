export interface RequestBase<T> {
    build(inout: any): T;
}