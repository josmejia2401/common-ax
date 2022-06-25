"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
class ScopeInjector {
}
ScopeInjector.SINGLETON = 0;
ScopeInjector.REQUEST = 1;
ScopeInjector.SESSION = 2;
/*export interface Instance {
    [key: string]: InstaceItem;
}*/
class Injector {
    constructor() {
        this.instances = [];
    }
    register(key, instance, scope, clazz) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            throw new Error("instance has already been created");
        }
        this.instances.push({ key, instance, scope, clazz });
        return this;
    }
    get(key) {
        let index = this.instances.findIndex((p) => p.key === key);
        if (index >= 0) {
            const allInstances = this.getAll();
            const result = this.instances[index];
            if (result.scope === ScopeInjector.REQUEST) {
                return new result.clazz(allInstances);
            }
            else if (result.scope === ScopeInjector.SESSION) {
                if (!result.instance) {
                    result.instance = new result.clazz(allInstances);
                }
                this.instances[index] = result;
                return result.instance;
            }
        }
        throw new Error("instance does not exist");
    }
    getAll() {
        const i = {};
        this.instances.forEach(item => {
            i[item.key] = item.instance || this.get(item.key);
        });
        return i;
    }
}
exports.Injector = Injector;
//# sourceMappingURL=di.js.map