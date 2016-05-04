/// <reference path="./../../typings/main/ambient/node/index.d.ts" />

import Queryable from "./Queryable";
import Handler, {ConnectionConfig, ResultSet} from "./Handler";
import * as Query from "./Sql/Query";

class Context {
    mappingPath: string;
    handler: Handler;

    constructor(config?: ConnectionConfig, mappingPath?: string) {
        this.mappingPath = mappingPath;
        this.setConfig(config);
        this.bind();
    }

    setConfig(config: ConnectionConfig): void {
        this.handler = Handler.getHandler(config);
    }

    bind(): void {
        let keys: (string | number | symbol)[] = Reflect.ownKeys(this);
        keys.forEach(key => {
            let e: Queryable = Reflect.get(this, key);
            if (e instanceof Queryable) {
                e.bind(this);
            }
        });
    }

    execute(query: string | Query.ISqlNode): Promise<ResultSet> {
        return this.handler.run(query);
    }

    flush(): void { }

}

export default Context;