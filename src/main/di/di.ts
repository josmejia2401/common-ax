export class ScopeInjector {
    static SINGLETON = 0;
    static REQUEST = 1;
    static SESSION = 2;
}
export interface Clazz {
    key: string;
    scope: ScopeInjector;
    instance?: any;
    clazz?: any;
    params?: any;
}
export class Injector {
    private readonly instances: Clazz[] = [];
    private static readonly instancesStatic: Clazz[] = [];
    registerAuto(key: string, clazz: any, scope: ScopeInjector, ...params: any[]) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            throw new Error("instance has already been created");
        }
        this.instances.push({ key, clazz, scope, params });
    }
    register(key: string, instance: any, scope: ScopeInjector) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            throw new Error("instance has already been created");
        }
        this.instances.push({ key, instance, scope });
    }
    get(key: string) {
        let index = this.instances.findIndex((p) => p.key === key);
        if (index >= 0) {
            const result = this.instances[index];
            if (result.scope === ScopeInjector.REQUEST) {
                return new result.clazz(result.params);
            } else if (result.scope === ScopeInjector.SESSION) {
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
        const i = {} as any;
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
// createInjector().provideClass("TOKEN_INSERT_SERVICE", Object, ScopeInjector.SINGLETON);
// console.log("t1", createInjector().resolve("TOKEN_INSERT_SERVICE"));