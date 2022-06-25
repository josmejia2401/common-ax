"use strict";
class ScopeInjector {
    static readonly SINGLETON = 0;
    static readonly REQUEST = 1;
    static readonly SESSION = 2;
}

export interface InstaceItem {
    key: string;
    instance: any;
    scope: ScopeInjector;
    clazz?: any;
}
/*export interface Instance {
    [key: string]: InstaceItem;
}*/
class Injector {

    private instances: InstaceItem[];
    constructor() {
        this.instances = [];
    }

    register<U>(key: string, instance: any, scope: ScopeInjector, clazz?: U): Injector | never {
        const result = this.instances.filter((p: InstaceItem) => p.key === key)[0];
        if (result) {
            throw new Error("instance has already been created");
        }
        this.instances.push({ key, instance, scope, clazz });
        return this;
    }

    get<U>(key: string): U | never {
        let index = this.instances.findIndex((p) => p.key === key);
        if (index >= 0) {
            const allInstances = this.getAll();
            const result = this.instances[index];
            if (result.scope === ScopeInjector.REQUEST) {
                return new result.clazz(allInstances) as U;
            } else if (result.scope === ScopeInjector.SESSION) {
                if (!result.instance) {
                    result.instance = new result.clazz(allInstances) as U;
                }
                this.instances[index] = result;
                return result.instance;
            }
        }
        throw new Error("instance does not exist");
    }

    getAll() {
        const i = {} as any;
        this.instances.forEach(item => {
            i[item.key] = item.instance || this.get(item.key);
        });
        return i;
    }
}

export { Injector }