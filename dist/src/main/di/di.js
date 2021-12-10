"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = exports.ScopeInjector = void 0;
var ScopeInjector;
(function (ScopeInjector) {
    ScopeInjector[ScopeInjector["SINGLETON"] = 0] = "SINGLETON";
    ScopeInjector[ScopeInjector["REQUEST"] = 1] = "REQUEST";
    ScopeInjector[ScopeInjector["SESSION"] = 2] = "SESSION";
})(ScopeInjector = exports.ScopeInjector || (exports.ScopeInjector = {}));
class Injector {
    constructor() {
        this.instances = [];
    }
    provideClass(key, clazz, scope, ...params) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            throw new Error("instance has already been created");
        }
        this.instances.push({ key, clazz, scope, params, instance: null });
    }
    resolve(key) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            if (result.scope === ScopeInjector.SINGLETON) {
                if (result.instance) {
                    return result.instance;
                }
                result.instance = new result.clazz(result.params);
                return result.instance;
            }
            else if (result.scope === ScopeInjector.REQUEST) {
                return new result.clazz(result.params);
            }
            else if (result.scope === ScopeInjector.SESSION) {
                return new result.clazz(result.params);
            }
        }
        throw new Error("instance does not exist");
    }
}
exports.Injector = Injector;
// createInjector().provideClass("TOKEN_INSERT_SERVICE", Object, ScopeInjector.SINGLETON);
// console.log("t1", createInjector().resolve("TOKEN_INSERT_SERVICE"));
//# sourceMappingURL=di.js.map