export enum ScopeInjector {
    SINGLETON = 0,
    REQUEST = 1,
    SESSION = 2,
}

export class Injector {
    private readonly instances: any[] = [];

    provideClass(key: string, clazz: any, scope: ScopeInjector, ...params: any[]) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            throw new Error("instance has already been created");
        }
        this.instances.push({ key, clazz, scope, params, instance: null });
    }

    resolve(key: string) {
        const result = this.instances.filter((p) => p.key === key)[0];
        if (result) {
            if (result.scope === ScopeInjector.SINGLETON) {
                if (result.instance) {
                    return result.instance;
                }
                result.instance = new result.clazz(result.params);
                return result.instance;
            } else if (result.scope === ScopeInjector.REQUEST) {
                return new result.clazz(result.params);
            } else if (result.scope === ScopeInjector.SESSION) {
                return new result.clazz(result.params);
            }
        }
        throw new Error("instance does not exist");
    }
}

// createInjector().provideClass("TOKEN_INSERT_SERVICE", Object, ScopeInjector.SINGLETON);
// console.log("t1", createInjector().resolve("TOKEN_INSERT_SERVICE"));