import * as bean from '../../bean';
import * as sql from '../sql';
import * as types from '../types';
import * as Mapping from '../Mapping';
import Context from '../Context';
import * as funcs from './funcs';
import IQuerySet from './IQuerySet';
interface IOptions {
    entityName?: string;
    entityPath?: string;
}
declare class DBSet<T extends Object> implements IQuerySet<T> {
    private entityType;
    private options;
    context: Context;
    mapping: Mapping.EntityMapping;
    private columns;
    constructor(entityType: types.IEntityType<T>, options?: IOptions);
    bind(context: Context): Promise<void>;
    bindField(key: string): void;
    bindForeignRel(key: string): void;
    getEntityType(): types.IEntityType<T>;
    getEntity(alias?: string): T;
    isUpdated(obj: any, key: string): boolean;
    setValue(obj: any, key: string, value: any): void;
    getValue(obj: any, key: string): any;
    executeStatement(stat: sql.Statement): Promise<bean.ResultSet>;
    insert(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    insertOrUpdate(entity: T): Promise<T>;
    delete(entity: T): Promise<void>;
    get(id: any): Promise<T>;
    where(param?: funcs.IWhereFunc<T> | sql.Expression, ...args: any[]): IQuerySet<T>;
    groupBy(func?: funcs.IArrFieldFunc<T> | sql.Expression[]): IQuerySet<T>;
    orderBy(func?: funcs.IArrFieldFunc<T> | sql.Expression[]): IQuerySet<T>;
    limit(size: number, index?: number): IQuerySet<T>;
    list(): Promise<Array<T>>;
    unique(): Promise<T>;
    mapData(input: bean.ResultSet): Promise<Array<T>>;
}
export default DBSet;
