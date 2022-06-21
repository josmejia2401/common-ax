"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = exports.ScopeInjector = void 0;
class ScopeInjector {
}
exports.ScopeInjector = ScopeInjector;
ScopeInjector.SINGLETON = 0;
ScopeInjector.REQUEST = 1;
ScopeInjector.SESSION = 2;
class Injector {
    constructor() {
        this.instances = [];
    }
    registerAuto(key, clazz, scope, ...params) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            throw new Error("instance has already been created");
        }
        this.instances.push({ key, clazz, scope, params });
    }
    register(key, instance, scope) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            throw new Error("instance has already been created");
        }
        this.instances.push({ key, instance, scope });
    }
    get(key) {
        let index = this.instances.findIndex((p) => p.key === key);
        if (index >= 0) {
            const result = this.instances[index];
            if (result.scope === ScopeInjector.REQUEST) {
                return new result.clazz(result.params);
            }
            else if (result.scope === ScopeInjector.SESSION) {
                if (!result.instance) {
                    result.instance = new result.clazz(result.params);
                }
                this.instances[index] = result;
                return result.instance;
            }
        }
        index = Injector.instancesStatic.findIndex((p) => p.key === key);
        if (index >= 0) {
            const result = Injector.instancesStatic[index];
            if (result.scope === ScopeInjector.SINGLETON) {
                if (!result.instance) {
                    result.instance = new result.clazz(result.params);
                }
                Injector.instancesStatic[index] = result;
                return result.instance;
            }
        }
        throw new Error("instance does not exist");
    }
    getAll() {
        const i = {};
        Injector.instancesStatic.forEach(item => {
            i["key"] = item.key;
            i["value"] = item.instance || this.get(item.key);
        });
        this.instances.forEach(item => {
            i["key"] = item.key;
            i["value"] = item.instance || this.get(item.key);
        });
        return i;
    }
}
exports.Injector = Injector;
Injector.instancesStatic = [];
// createInjector().provideClass("TOKEN_INSERT_SERVICE", Object, ScopeInjector.SINGLETON);
// console.log("t1", createInjector().resolve("TOKEN_INSERT_SERVICE"));
//# sourceMappingURL=di.js.map