
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Supplier
 * 
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>
/**
 * Model RawMaterial
 * 
 */
export type RawMaterial = $Result.DefaultSelection<Prisma.$RawMaterialPayload>
/**
 * Model FinishedGood
 * 
 */
export type FinishedGood = $Result.DefaultSelection<Prisma.$FinishedGoodPayload>
/**
 * Model RecipeItem
 * 
 */
export type RecipeItem = $Result.DefaultSelection<Prisma.$RecipeItemPayload>
/**
 * Model Adjustment
 * 
 */
export type Adjustment = $Result.DefaultSelection<Prisma.$AdjustmentPayload>
/**
 * Model PurchaseOrder
 * 
 */
export type PurchaseOrder = $Result.DefaultSelection<Prisma.$PurchaseOrderPayload>
/**
 * Model PurchaseOrderItem
 * 
 */
export type PurchaseOrderItem = $Result.DefaultSelection<Prisma.$PurchaseOrderItemPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Sale
 * 
 */
export type Sale = $Result.DefaultSelection<Prisma.$SalePayload>
/**
 * Model SaleItem
 * 
 */
export type SaleItem = $Result.DefaultSelection<Prisma.$SaleItemPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs>;

  /**
   * `prisma.rawMaterial`: Exposes CRUD operations for the **RawMaterial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RawMaterials
    * const rawMaterials = await prisma.rawMaterial.findMany()
    * ```
    */
  get rawMaterial(): Prisma.RawMaterialDelegate<ExtArgs>;

  /**
   * `prisma.finishedGood`: Exposes CRUD operations for the **FinishedGood** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FinishedGoods
    * const finishedGoods = await prisma.finishedGood.findMany()
    * ```
    */
  get finishedGood(): Prisma.FinishedGoodDelegate<ExtArgs>;

  /**
   * `prisma.recipeItem`: Exposes CRUD operations for the **RecipeItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecipeItems
    * const recipeItems = await prisma.recipeItem.findMany()
    * ```
    */
  get recipeItem(): Prisma.RecipeItemDelegate<ExtArgs>;

  /**
   * `prisma.adjustment`: Exposes CRUD operations for the **Adjustment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Adjustments
    * const adjustments = await prisma.adjustment.findMany()
    * ```
    */
  get adjustment(): Prisma.AdjustmentDelegate<ExtArgs>;

  /**
   * `prisma.purchaseOrder`: Exposes CRUD operations for the **PurchaseOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PurchaseOrders
    * const purchaseOrders = await prisma.purchaseOrder.findMany()
    * ```
    */
  get purchaseOrder(): Prisma.PurchaseOrderDelegate<ExtArgs>;

  /**
   * `prisma.purchaseOrderItem`: Exposes CRUD operations for the **PurchaseOrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PurchaseOrderItems
    * const purchaseOrderItems = await prisma.purchaseOrderItem.findMany()
    * ```
    */
  get purchaseOrderItem(): Prisma.PurchaseOrderItemDelegate<ExtArgs>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.SaleDelegate<ExtArgs>;

  /**
   * `prisma.saleItem`: Exposes CRUD operations for the **SaleItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SaleItems
    * const saleItems = await prisma.saleItem.findMany()
    * ```
    */
  get saleItem(): Prisma.SaleItemDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Category: 'Category',
    Supplier: 'Supplier',
    RawMaterial: 'RawMaterial',
    FinishedGood: 'FinishedGood',
    RecipeItem: 'RecipeItem',
    Adjustment: 'Adjustment',
    PurchaseOrder: 'PurchaseOrder',
    PurchaseOrderItem: 'PurchaseOrderItem',
    Customer: 'Customer',
    Sale: 'Sale',
    SaleItem: 'SaleItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "category" | "supplier" | "rawMaterial" | "finishedGood" | "recipeItem" | "adjustment" | "purchaseOrder" | "purchaseOrderItem" | "customer" | "sale" | "saleItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplierCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
          }
        }
      }
      RawMaterial: {
        payload: Prisma.$RawMaterialPayload<ExtArgs>
        fields: Prisma.RawMaterialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RawMaterialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RawMaterialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload>
          }
          findFirst: {
            args: Prisma.RawMaterialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RawMaterialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload>
          }
          findMany: {
            args: Prisma.RawMaterialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload>[]
          }
          create: {
            args: Prisma.RawMaterialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload>
          }
          createMany: {
            args: Prisma.RawMaterialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RawMaterialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload>[]
          }
          delete: {
            args: Prisma.RawMaterialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload>
          }
          update: {
            args: Prisma.RawMaterialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload>
          }
          deleteMany: {
            args: Prisma.RawMaterialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RawMaterialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RawMaterialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawMaterialPayload>
          }
          aggregate: {
            args: Prisma.RawMaterialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRawMaterial>
          }
          groupBy: {
            args: Prisma.RawMaterialGroupByArgs<ExtArgs>
            result: $Utils.Optional<RawMaterialGroupByOutputType>[]
          }
          count: {
            args: Prisma.RawMaterialCountArgs<ExtArgs>
            result: $Utils.Optional<RawMaterialCountAggregateOutputType> | number
          }
        }
      }
      FinishedGood: {
        payload: Prisma.$FinishedGoodPayload<ExtArgs>
        fields: Prisma.FinishedGoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FinishedGoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FinishedGoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload>
          }
          findFirst: {
            args: Prisma.FinishedGoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FinishedGoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload>
          }
          findMany: {
            args: Prisma.FinishedGoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload>[]
          }
          create: {
            args: Prisma.FinishedGoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload>
          }
          createMany: {
            args: Prisma.FinishedGoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FinishedGoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload>[]
          }
          delete: {
            args: Prisma.FinishedGoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload>
          }
          update: {
            args: Prisma.FinishedGoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload>
          }
          deleteMany: {
            args: Prisma.FinishedGoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FinishedGoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FinishedGoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinishedGoodPayload>
          }
          aggregate: {
            args: Prisma.FinishedGoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinishedGood>
          }
          groupBy: {
            args: Prisma.FinishedGoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinishedGoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.FinishedGoodCountArgs<ExtArgs>
            result: $Utils.Optional<FinishedGoodCountAggregateOutputType> | number
          }
        }
      }
      RecipeItem: {
        payload: Prisma.$RecipeItemPayload<ExtArgs>
        fields: Prisma.RecipeItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload>
          }
          findFirst: {
            args: Prisma.RecipeItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload>
          }
          findMany: {
            args: Prisma.RecipeItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload>[]
          }
          create: {
            args: Prisma.RecipeItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload>
          }
          createMany: {
            args: Prisma.RecipeItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload>[]
          }
          delete: {
            args: Prisma.RecipeItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload>
          }
          update: {
            args: Prisma.RecipeItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload>
          }
          deleteMany: {
            args: Prisma.RecipeItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecipeItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeItemPayload>
          }
          aggregate: {
            args: Prisma.RecipeItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipeItem>
          }
          groupBy: {
            args: Prisma.RecipeItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeItemCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeItemCountAggregateOutputType> | number
          }
        }
      }
      Adjustment: {
        payload: Prisma.$AdjustmentPayload<ExtArgs>
        fields: Prisma.AdjustmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdjustmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdjustmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          findFirst: {
            args: Prisma.AdjustmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdjustmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          findMany: {
            args: Prisma.AdjustmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>[]
          }
          create: {
            args: Prisma.AdjustmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          createMany: {
            args: Prisma.AdjustmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdjustmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>[]
          }
          delete: {
            args: Prisma.AdjustmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          update: {
            args: Prisma.AdjustmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          deleteMany: {
            args: Prisma.AdjustmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdjustmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdjustmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          aggregate: {
            args: Prisma.AdjustmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdjustment>
          }
          groupBy: {
            args: Prisma.AdjustmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdjustmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdjustmentCountArgs<ExtArgs>
            result: $Utils.Optional<AdjustmentCountAggregateOutputType> | number
          }
        }
      }
      PurchaseOrder: {
        payload: Prisma.$PurchaseOrderPayload<ExtArgs>
        fields: Prisma.PurchaseOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          findFirst: {
            args: Prisma.PurchaseOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          findMany: {
            args: Prisma.PurchaseOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[]
          }
          create: {
            args: Prisma.PurchaseOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          createMany: {
            args: Prisma.PurchaseOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurchaseOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>[]
          }
          delete: {
            args: Prisma.PurchaseOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          update: {
            args: Prisma.PurchaseOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          deleteMany: {
            args: Prisma.PurchaseOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PurchaseOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderPayload>
          }
          aggregate: {
            args: Prisma.PurchaseOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchaseOrder>
          }
          groupBy: {
            args: Prisma.PurchaseOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseOrderCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseOrderCountAggregateOutputType> | number
          }
        }
      }
      PurchaseOrderItem: {
        payload: Prisma.$PurchaseOrderItemPayload<ExtArgs>
        fields: Prisma.PurchaseOrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseOrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseOrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>
          }
          findFirst: {
            args: Prisma.PurchaseOrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseOrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>
          }
          findMany: {
            args: Prisma.PurchaseOrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>[]
          }
          create: {
            args: Prisma.PurchaseOrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>
          }
          createMany: {
            args: Prisma.PurchaseOrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurchaseOrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>[]
          }
          delete: {
            args: Prisma.PurchaseOrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>
          }
          update: {
            args: Prisma.PurchaseOrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>
          }
          deleteMany: {
            args: Prisma.PurchaseOrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseOrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PurchaseOrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseOrderItemPayload>
          }
          aggregate: {
            args: Prisma.PurchaseOrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchaseOrderItem>
          }
          groupBy: {
            args: Prisma.PurchaseOrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseOrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseOrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseOrderItemCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Sale: {
        payload: Prisma.$SalePayload<ExtArgs>
        fields: Prisma.SaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findFirst: {
            args: Prisma.SaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findMany: {
            args: Prisma.SaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          create: {
            args: Prisma.SaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          createMany: {
            args: Prisma.SaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          delete: {
            args: Prisma.SaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          update: {
            args: Prisma.SaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          deleteMany: {
            args: Prisma.SaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.SaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      SaleItem: {
        payload: Prisma.$SaleItemPayload<ExtArgs>
        fields: Prisma.SaleItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          findFirst: {
            args: Prisma.SaleItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          findMany: {
            args: Prisma.SaleItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>[]
          }
          create: {
            args: Prisma.SaleItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          createMany: {
            args: Prisma.SaleItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>[]
          }
          delete: {
            args: Prisma.SaleItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          update: {
            args: Prisma.SaleItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          deleteMany: {
            args: Prisma.SaleItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SaleItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleItemPayload>
          }
          aggregate: {
            args: Prisma.SaleItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaleItem>
          }
          groupBy: {
            args: Prisma.SaleItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleItemCountArgs<ExtArgs>
            result: $Utils.Optional<SaleItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    rawMaterials: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rawMaterials?: boolean | CategoryCountOutputTypeCountRawMaterialsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountRawMaterialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RawMaterialWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    rawMaterials: number
    purchaseOrders: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rawMaterials?: boolean | SupplierCountOutputTypeCountRawMaterialsArgs
    purchaseOrders?: boolean | SupplierCountOutputTypeCountPurchaseOrdersArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountRawMaterialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RawMaterialWhereInput
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountPurchaseOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseOrderWhereInput
  }


  /**
   * Count Type RawMaterialCountOutputType
   */

  export type RawMaterialCountOutputType = {
    recipeItems: number
    adjustments: number
    purchaseOrderItems: number
  }

  export type RawMaterialCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipeItems?: boolean | RawMaterialCountOutputTypeCountRecipeItemsArgs
    adjustments?: boolean | RawMaterialCountOutputTypeCountAdjustmentsArgs
    purchaseOrderItems?: boolean | RawMaterialCountOutputTypeCountPurchaseOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * RawMaterialCountOutputType without action
   */
  export type RawMaterialCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterialCountOutputType
     */
    select?: RawMaterialCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RawMaterialCountOutputType without action
   */
  export type RawMaterialCountOutputTypeCountRecipeItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeItemWhereInput
  }

  /**
   * RawMaterialCountOutputType without action
   */
  export type RawMaterialCountOutputTypeCountAdjustmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdjustmentWhereInput
  }

  /**
   * RawMaterialCountOutputType without action
   */
  export type RawMaterialCountOutputTypeCountPurchaseOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseOrderItemWhereInput
  }


  /**
   * Count Type FinishedGoodCountOutputType
   */

  export type FinishedGoodCountOutputType = {
    recipeItems: number
    usedAsSubAssembly: number
    saleItems: number
  }

  export type FinishedGoodCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipeItems?: boolean | FinishedGoodCountOutputTypeCountRecipeItemsArgs
    usedAsSubAssembly?: boolean | FinishedGoodCountOutputTypeCountUsedAsSubAssemblyArgs
    saleItems?: boolean | FinishedGoodCountOutputTypeCountSaleItemsArgs
  }

  // Custom InputTypes
  /**
   * FinishedGoodCountOutputType without action
   */
  export type FinishedGoodCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGoodCountOutputType
     */
    select?: FinishedGoodCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FinishedGoodCountOutputType without action
   */
  export type FinishedGoodCountOutputTypeCountRecipeItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeItemWhereInput
  }

  /**
   * FinishedGoodCountOutputType without action
   */
  export type FinishedGoodCountOutputTypeCountUsedAsSubAssemblyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeItemWhereInput
  }

  /**
   * FinishedGoodCountOutputType without action
   */
  export type FinishedGoodCountOutputTypeCountSaleItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
  }


  /**
   * Count Type PurchaseOrderCountOutputType
   */

  export type PurchaseOrderCountOutputType = {
    items: number
  }

  export type PurchaseOrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | PurchaseOrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * PurchaseOrderCountOutputType without action
   */
  export type PurchaseOrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderCountOutputType
     */
    select?: PurchaseOrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PurchaseOrderCountOutputType without action
   */
  export type PurchaseOrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseOrderItemWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    sales: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | CustomerCountOutputTypeCountSalesArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }


  /**
   * Count Type SaleCountOutputType
   */

  export type SaleCountOutputType = {
    items: number
  }

  export type SaleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | SaleCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleCountOutputType
     */
    select?: SaleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SaleCountOutputType without action
   */
  export type SaleCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rawMaterials?: boolean | Category$rawMaterialsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rawMaterials?: boolean | Category$rawMaterialsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      rawMaterials: Prisma.$RawMaterialPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rawMaterials<T extends Category$rawMaterialsArgs<ExtArgs> = {}>(args?: Subset<T, Category$rawMaterialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.rawMaterials
   */
  export type Category$rawMaterialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    where?: RawMaterialWhereInput
    orderBy?: RawMaterialOrderByWithRelationInput | RawMaterialOrderByWithRelationInput[]
    cursor?: RawMaterialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RawMaterialScalarFieldEnum | RawMaterialScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierMinAggregateOutputType = {
    id: string | null
    name: string | null
    contact: string | null
    website: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: string | null
    name: string | null
    contact: string | null
    website: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    name: number
    contact: number
    website: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplierMinAggregateInputType = {
    id?: true
    name?: true
    contact?: true
    website?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    name?: true
    contact?: true
    website?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    name?: true
    contact?: true
    website?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: string
    name: string
    contact: string | null
    website: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contact?: boolean
    website?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rawMaterials?: boolean | Supplier$rawMaterialsArgs<ExtArgs>
    purchaseOrders?: boolean | Supplier$purchaseOrdersArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contact?: boolean
    website?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectScalar = {
    id?: boolean
    name?: boolean
    contact?: boolean
    website?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rawMaterials?: boolean | Supplier$rawMaterialsArgs<ExtArgs>
    purchaseOrders?: boolean | Supplier$purchaseOrdersArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupplierIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      rawMaterials: Prisma.$RawMaterialPayload<ExtArgs>[]
      purchaseOrders: Prisma.$PurchaseOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      contact: string | null
      website: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suppliers and returns the data saved in the database.
     * @param {SupplierCreateManyAndReturnArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suppliers and only return the `id`
     * const supplierWithIdOnly = await prisma.supplier.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplierCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rawMaterials<T extends Supplier$rawMaterialsArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$rawMaterialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findMany"> | Null>
    purchaseOrders<T extends Supplier$purchaseOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$purchaseOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Supplier model
   */ 
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'String'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly contact: FieldRef<"Supplier", 'String'>
    readonly website: FieldRef<"Supplier", 'String'>
    readonly notes: FieldRef<"Supplier", 'String'>
    readonly createdAt: FieldRef<"Supplier", 'DateTime'>
    readonly updatedAt: FieldRef<"Supplier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
  }

  /**
   * Supplier createManyAndReturn
   */
  export type SupplierCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
  }

  /**
   * Supplier.rawMaterials
   */
  export type Supplier$rawMaterialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    where?: RawMaterialWhereInput
    orderBy?: RawMaterialOrderByWithRelationInput | RawMaterialOrderByWithRelationInput[]
    cursor?: RawMaterialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RawMaterialScalarFieldEnum | RawMaterialScalarFieldEnum[]
  }

  /**
   * Supplier.purchaseOrders
   */
  export type Supplier$purchaseOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    where?: PurchaseOrderWhereInput
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    cursor?: PurchaseOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseOrderScalarFieldEnum | PurchaseOrderScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
  }


  /**
   * Model RawMaterial
   */

  export type AggregateRawMaterial = {
    _count: RawMaterialCountAggregateOutputType | null
    _avg: RawMaterialAvgAggregateOutputType | null
    _sum: RawMaterialSumAggregateOutputType | null
    _min: RawMaterialMinAggregateOutputType | null
    _max: RawMaterialMaxAggregateOutputType | null
  }

  export type RawMaterialAvgAggregateOutputType = {
    totalQuantity: number | null
    costPerUnit: number | null
    reorderThreshold: number | null
    committedQuantity: number | null
    onOrderQuantity: number | null
  }

  export type RawMaterialSumAggregateOutputType = {
    totalQuantity: number | null
    costPerUnit: number | null
    reorderThreshold: number | null
    committedQuantity: number | null
    onOrderQuantity: number | null
  }

  export type RawMaterialMinAggregateOutputType = {
    id: string | null
    name: string | null
    categoryId: string | null
    supplierId: string | null
    totalQuantity: number | null
    unit: string | null
    costPerUnit: number | null
    reorderThreshold: number | null
    committedQuantity: number | null
    onOrderQuantity: number | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RawMaterialMaxAggregateOutputType = {
    id: string | null
    name: string | null
    categoryId: string | null
    supplierId: string | null
    totalQuantity: number | null
    unit: string | null
    costPerUnit: number | null
    reorderThreshold: number | null
    committedQuantity: number | null
    onOrderQuantity: number | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RawMaterialCountAggregateOutputType = {
    id: number
    name: number
    categoryId: number
    supplierId: number
    totalQuantity: number
    unit: number
    costPerUnit: number
    reorderThreshold: number
    committedQuantity: number
    onOrderQuantity: number
    imagePath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RawMaterialAvgAggregateInputType = {
    totalQuantity?: true
    costPerUnit?: true
    reorderThreshold?: true
    committedQuantity?: true
    onOrderQuantity?: true
  }

  export type RawMaterialSumAggregateInputType = {
    totalQuantity?: true
    costPerUnit?: true
    reorderThreshold?: true
    committedQuantity?: true
    onOrderQuantity?: true
  }

  export type RawMaterialMinAggregateInputType = {
    id?: true
    name?: true
    categoryId?: true
    supplierId?: true
    totalQuantity?: true
    unit?: true
    costPerUnit?: true
    reorderThreshold?: true
    committedQuantity?: true
    onOrderQuantity?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RawMaterialMaxAggregateInputType = {
    id?: true
    name?: true
    categoryId?: true
    supplierId?: true
    totalQuantity?: true
    unit?: true
    costPerUnit?: true
    reorderThreshold?: true
    committedQuantity?: true
    onOrderQuantity?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RawMaterialCountAggregateInputType = {
    id?: true
    name?: true
    categoryId?: true
    supplierId?: true
    totalQuantity?: true
    unit?: true
    costPerUnit?: true
    reorderThreshold?: true
    committedQuantity?: true
    onOrderQuantity?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RawMaterialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RawMaterial to aggregate.
     */
    where?: RawMaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawMaterials to fetch.
     */
    orderBy?: RawMaterialOrderByWithRelationInput | RawMaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RawMaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawMaterials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawMaterials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RawMaterials
    **/
    _count?: true | RawMaterialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RawMaterialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RawMaterialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RawMaterialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RawMaterialMaxAggregateInputType
  }

  export type GetRawMaterialAggregateType<T extends RawMaterialAggregateArgs> = {
        [P in keyof T & keyof AggregateRawMaterial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRawMaterial[P]>
      : GetScalarType<T[P], AggregateRawMaterial[P]>
  }




  export type RawMaterialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RawMaterialWhereInput
    orderBy?: RawMaterialOrderByWithAggregationInput | RawMaterialOrderByWithAggregationInput[]
    by: RawMaterialScalarFieldEnum[] | RawMaterialScalarFieldEnum
    having?: RawMaterialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RawMaterialCountAggregateInputType | true
    _avg?: RawMaterialAvgAggregateInputType
    _sum?: RawMaterialSumAggregateInputType
    _min?: RawMaterialMinAggregateInputType
    _max?: RawMaterialMaxAggregateInputType
  }

  export type RawMaterialGroupByOutputType = {
    id: string
    name: string
    categoryId: string
    supplierId: string | null
    totalQuantity: number | null
    unit: string | null
    costPerUnit: number | null
    reorderThreshold: number | null
    committedQuantity: number | null
    onOrderQuantity: number | null
    imagePath: string | null
    createdAt: Date
    updatedAt: Date
    _count: RawMaterialCountAggregateOutputType | null
    _avg: RawMaterialAvgAggregateOutputType | null
    _sum: RawMaterialSumAggregateOutputType | null
    _min: RawMaterialMinAggregateOutputType | null
    _max: RawMaterialMaxAggregateOutputType | null
  }

  type GetRawMaterialGroupByPayload<T extends RawMaterialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RawMaterialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RawMaterialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RawMaterialGroupByOutputType[P]>
            : GetScalarType<T[P], RawMaterialGroupByOutputType[P]>
        }
      >
    >


  export type RawMaterialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    categoryId?: boolean
    supplierId?: boolean
    totalQuantity?: boolean
    unit?: boolean
    costPerUnit?: boolean
    reorderThreshold?: boolean
    committedQuantity?: boolean
    onOrderQuantity?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    supplier?: boolean | RawMaterial$supplierArgs<ExtArgs>
    recipeItems?: boolean | RawMaterial$recipeItemsArgs<ExtArgs>
    adjustments?: boolean | RawMaterial$adjustmentsArgs<ExtArgs>
    purchaseOrderItems?: boolean | RawMaterial$purchaseOrderItemsArgs<ExtArgs>
    _count?: boolean | RawMaterialCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rawMaterial"]>

  export type RawMaterialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    categoryId?: boolean
    supplierId?: boolean
    totalQuantity?: boolean
    unit?: boolean
    costPerUnit?: boolean
    reorderThreshold?: boolean
    committedQuantity?: boolean
    onOrderQuantity?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    supplier?: boolean | RawMaterial$supplierArgs<ExtArgs>
  }, ExtArgs["result"]["rawMaterial"]>

  export type RawMaterialSelectScalar = {
    id?: boolean
    name?: boolean
    categoryId?: boolean
    supplierId?: boolean
    totalQuantity?: boolean
    unit?: boolean
    costPerUnit?: boolean
    reorderThreshold?: boolean
    committedQuantity?: boolean
    onOrderQuantity?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RawMaterialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    supplier?: boolean | RawMaterial$supplierArgs<ExtArgs>
    recipeItems?: boolean | RawMaterial$recipeItemsArgs<ExtArgs>
    adjustments?: boolean | RawMaterial$adjustmentsArgs<ExtArgs>
    purchaseOrderItems?: boolean | RawMaterial$purchaseOrderItemsArgs<ExtArgs>
    _count?: boolean | RawMaterialCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RawMaterialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    supplier?: boolean | RawMaterial$supplierArgs<ExtArgs>
  }

  export type $RawMaterialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RawMaterial"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      supplier: Prisma.$SupplierPayload<ExtArgs> | null
      recipeItems: Prisma.$RecipeItemPayload<ExtArgs>[]
      adjustments: Prisma.$AdjustmentPayload<ExtArgs>[]
      purchaseOrderItems: Prisma.$PurchaseOrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      categoryId: string
      supplierId: string | null
      totalQuantity: number | null
      unit: string | null
      costPerUnit: number | null
      reorderThreshold: number | null
      committedQuantity: number | null
      onOrderQuantity: number | null
      imagePath: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rawMaterial"]>
    composites: {}
  }

  type RawMaterialGetPayload<S extends boolean | null | undefined | RawMaterialDefaultArgs> = $Result.GetResult<Prisma.$RawMaterialPayload, S>

  type RawMaterialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RawMaterialFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RawMaterialCountAggregateInputType | true
    }

  export interface RawMaterialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RawMaterial'], meta: { name: 'RawMaterial' } }
    /**
     * Find zero or one RawMaterial that matches the filter.
     * @param {RawMaterialFindUniqueArgs} args - Arguments to find a RawMaterial
     * @example
     * // Get one RawMaterial
     * const rawMaterial = await prisma.rawMaterial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RawMaterialFindUniqueArgs>(args: SelectSubset<T, RawMaterialFindUniqueArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RawMaterial that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RawMaterialFindUniqueOrThrowArgs} args - Arguments to find a RawMaterial
     * @example
     * // Get one RawMaterial
     * const rawMaterial = await prisma.rawMaterial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RawMaterialFindUniqueOrThrowArgs>(args: SelectSubset<T, RawMaterialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RawMaterial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawMaterialFindFirstArgs} args - Arguments to find a RawMaterial
     * @example
     * // Get one RawMaterial
     * const rawMaterial = await prisma.rawMaterial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RawMaterialFindFirstArgs>(args?: SelectSubset<T, RawMaterialFindFirstArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RawMaterial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawMaterialFindFirstOrThrowArgs} args - Arguments to find a RawMaterial
     * @example
     * // Get one RawMaterial
     * const rawMaterial = await prisma.rawMaterial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RawMaterialFindFirstOrThrowArgs>(args?: SelectSubset<T, RawMaterialFindFirstOrThrowArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RawMaterials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawMaterialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RawMaterials
     * const rawMaterials = await prisma.rawMaterial.findMany()
     * 
     * // Get first 10 RawMaterials
     * const rawMaterials = await prisma.rawMaterial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rawMaterialWithIdOnly = await prisma.rawMaterial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RawMaterialFindManyArgs>(args?: SelectSubset<T, RawMaterialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RawMaterial.
     * @param {RawMaterialCreateArgs} args - Arguments to create a RawMaterial.
     * @example
     * // Create one RawMaterial
     * const RawMaterial = await prisma.rawMaterial.create({
     *   data: {
     *     // ... data to create a RawMaterial
     *   }
     * })
     * 
     */
    create<T extends RawMaterialCreateArgs>(args: SelectSubset<T, RawMaterialCreateArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RawMaterials.
     * @param {RawMaterialCreateManyArgs} args - Arguments to create many RawMaterials.
     * @example
     * // Create many RawMaterials
     * const rawMaterial = await prisma.rawMaterial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RawMaterialCreateManyArgs>(args?: SelectSubset<T, RawMaterialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RawMaterials and returns the data saved in the database.
     * @param {RawMaterialCreateManyAndReturnArgs} args - Arguments to create many RawMaterials.
     * @example
     * // Create many RawMaterials
     * const rawMaterial = await prisma.rawMaterial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RawMaterials and only return the `id`
     * const rawMaterialWithIdOnly = await prisma.rawMaterial.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RawMaterialCreateManyAndReturnArgs>(args?: SelectSubset<T, RawMaterialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RawMaterial.
     * @param {RawMaterialDeleteArgs} args - Arguments to delete one RawMaterial.
     * @example
     * // Delete one RawMaterial
     * const RawMaterial = await prisma.rawMaterial.delete({
     *   where: {
     *     // ... filter to delete one RawMaterial
     *   }
     * })
     * 
     */
    delete<T extends RawMaterialDeleteArgs>(args: SelectSubset<T, RawMaterialDeleteArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RawMaterial.
     * @param {RawMaterialUpdateArgs} args - Arguments to update one RawMaterial.
     * @example
     * // Update one RawMaterial
     * const rawMaterial = await prisma.rawMaterial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RawMaterialUpdateArgs>(args: SelectSubset<T, RawMaterialUpdateArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RawMaterials.
     * @param {RawMaterialDeleteManyArgs} args - Arguments to filter RawMaterials to delete.
     * @example
     * // Delete a few RawMaterials
     * const { count } = await prisma.rawMaterial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RawMaterialDeleteManyArgs>(args?: SelectSubset<T, RawMaterialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RawMaterials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawMaterialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RawMaterials
     * const rawMaterial = await prisma.rawMaterial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RawMaterialUpdateManyArgs>(args: SelectSubset<T, RawMaterialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RawMaterial.
     * @param {RawMaterialUpsertArgs} args - Arguments to update or create a RawMaterial.
     * @example
     * // Update or create a RawMaterial
     * const rawMaterial = await prisma.rawMaterial.upsert({
     *   create: {
     *     // ... data to create a RawMaterial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RawMaterial we want to update
     *   }
     * })
     */
    upsert<T extends RawMaterialUpsertArgs>(args: SelectSubset<T, RawMaterialUpsertArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RawMaterials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawMaterialCountArgs} args - Arguments to filter RawMaterials to count.
     * @example
     * // Count the number of RawMaterials
     * const count = await prisma.rawMaterial.count({
     *   where: {
     *     // ... the filter for the RawMaterials we want to count
     *   }
     * })
    **/
    count<T extends RawMaterialCountArgs>(
      args?: Subset<T, RawMaterialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RawMaterialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RawMaterial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawMaterialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RawMaterialAggregateArgs>(args: Subset<T, RawMaterialAggregateArgs>): Prisma.PrismaPromise<GetRawMaterialAggregateType<T>>

    /**
     * Group by RawMaterial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawMaterialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RawMaterialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RawMaterialGroupByArgs['orderBy'] }
        : { orderBy?: RawMaterialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RawMaterialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRawMaterialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RawMaterial model
   */
  readonly fields: RawMaterialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RawMaterial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RawMaterialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    supplier<T extends RawMaterial$supplierArgs<ExtArgs> = {}>(args?: Subset<T, RawMaterial$supplierArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    recipeItems<T extends RawMaterial$recipeItemsArgs<ExtArgs> = {}>(args?: Subset<T, RawMaterial$recipeItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "findMany"> | Null>
    adjustments<T extends RawMaterial$adjustmentsArgs<ExtArgs> = {}>(args?: Subset<T, RawMaterial$adjustmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findMany"> | Null>
    purchaseOrderItems<T extends RawMaterial$purchaseOrderItemsArgs<ExtArgs> = {}>(args?: Subset<T, RawMaterial$purchaseOrderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RawMaterial model
   */ 
  interface RawMaterialFieldRefs {
    readonly id: FieldRef<"RawMaterial", 'String'>
    readonly name: FieldRef<"RawMaterial", 'String'>
    readonly categoryId: FieldRef<"RawMaterial", 'String'>
    readonly supplierId: FieldRef<"RawMaterial", 'String'>
    readonly totalQuantity: FieldRef<"RawMaterial", 'Float'>
    readonly unit: FieldRef<"RawMaterial", 'String'>
    readonly costPerUnit: FieldRef<"RawMaterial", 'Float'>
    readonly reorderThreshold: FieldRef<"RawMaterial", 'Float'>
    readonly committedQuantity: FieldRef<"RawMaterial", 'Float'>
    readonly onOrderQuantity: FieldRef<"RawMaterial", 'Float'>
    readonly imagePath: FieldRef<"RawMaterial", 'String'>
    readonly createdAt: FieldRef<"RawMaterial", 'DateTime'>
    readonly updatedAt: FieldRef<"RawMaterial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RawMaterial findUnique
   */
  export type RawMaterialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * Filter, which RawMaterial to fetch.
     */
    where: RawMaterialWhereUniqueInput
  }

  /**
   * RawMaterial findUniqueOrThrow
   */
  export type RawMaterialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * Filter, which RawMaterial to fetch.
     */
    where: RawMaterialWhereUniqueInput
  }

  /**
   * RawMaterial findFirst
   */
  export type RawMaterialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * Filter, which RawMaterial to fetch.
     */
    where?: RawMaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawMaterials to fetch.
     */
    orderBy?: RawMaterialOrderByWithRelationInput | RawMaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RawMaterials.
     */
    cursor?: RawMaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawMaterials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawMaterials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RawMaterials.
     */
    distinct?: RawMaterialScalarFieldEnum | RawMaterialScalarFieldEnum[]
  }

  /**
   * RawMaterial findFirstOrThrow
   */
  export type RawMaterialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * Filter, which RawMaterial to fetch.
     */
    where?: RawMaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawMaterials to fetch.
     */
    orderBy?: RawMaterialOrderByWithRelationInput | RawMaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RawMaterials.
     */
    cursor?: RawMaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawMaterials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawMaterials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RawMaterials.
     */
    distinct?: RawMaterialScalarFieldEnum | RawMaterialScalarFieldEnum[]
  }

  /**
   * RawMaterial findMany
   */
  export type RawMaterialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * Filter, which RawMaterials to fetch.
     */
    where?: RawMaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawMaterials to fetch.
     */
    orderBy?: RawMaterialOrderByWithRelationInput | RawMaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RawMaterials.
     */
    cursor?: RawMaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawMaterials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawMaterials.
     */
    skip?: number
    distinct?: RawMaterialScalarFieldEnum | RawMaterialScalarFieldEnum[]
  }

  /**
   * RawMaterial create
   */
  export type RawMaterialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * The data needed to create a RawMaterial.
     */
    data: XOR<RawMaterialCreateInput, RawMaterialUncheckedCreateInput>
  }

  /**
   * RawMaterial createMany
   */
  export type RawMaterialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RawMaterials.
     */
    data: RawMaterialCreateManyInput | RawMaterialCreateManyInput[]
  }

  /**
   * RawMaterial createManyAndReturn
   */
  export type RawMaterialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RawMaterials.
     */
    data: RawMaterialCreateManyInput | RawMaterialCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RawMaterial update
   */
  export type RawMaterialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * The data needed to update a RawMaterial.
     */
    data: XOR<RawMaterialUpdateInput, RawMaterialUncheckedUpdateInput>
    /**
     * Choose, which RawMaterial to update.
     */
    where: RawMaterialWhereUniqueInput
  }

  /**
   * RawMaterial updateMany
   */
  export type RawMaterialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RawMaterials.
     */
    data: XOR<RawMaterialUpdateManyMutationInput, RawMaterialUncheckedUpdateManyInput>
    /**
     * Filter which RawMaterials to update
     */
    where?: RawMaterialWhereInput
  }

  /**
   * RawMaterial upsert
   */
  export type RawMaterialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * The filter to search for the RawMaterial to update in case it exists.
     */
    where: RawMaterialWhereUniqueInput
    /**
     * In case the RawMaterial found by the `where` argument doesn't exist, create a new RawMaterial with this data.
     */
    create: XOR<RawMaterialCreateInput, RawMaterialUncheckedCreateInput>
    /**
     * In case the RawMaterial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RawMaterialUpdateInput, RawMaterialUncheckedUpdateInput>
  }

  /**
   * RawMaterial delete
   */
  export type RawMaterialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    /**
     * Filter which RawMaterial to delete.
     */
    where: RawMaterialWhereUniqueInput
  }

  /**
   * RawMaterial deleteMany
   */
  export type RawMaterialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RawMaterials to delete
     */
    where?: RawMaterialWhereInput
  }

  /**
   * RawMaterial.supplier
   */
  export type RawMaterial$supplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    where?: SupplierWhereInput
  }

  /**
   * RawMaterial.recipeItems
   */
  export type RawMaterial$recipeItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    where?: RecipeItemWhereInput
    orderBy?: RecipeItemOrderByWithRelationInput | RecipeItemOrderByWithRelationInput[]
    cursor?: RecipeItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeItemScalarFieldEnum | RecipeItemScalarFieldEnum[]
  }

  /**
   * RawMaterial.adjustments
   */
  export type RawMaterial$adjustmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    where?: AdjustmentWhereInput
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    cursor?: AdjustmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdjustmentScalarFieldEnum | AdjustmentScalarFieldEnum[]
  }

  /**
   * RawMaterial.purchaseOrderItems
   */
  export type RawMaterial$purchaseOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    where?: PurchaseOrderItemWhereInput
    orderBy?: PurchaseOrderItemOrderByWithRelationInput | PurchaseOrderItemOrderByWithRelationInput[]
    cursor?: PurchaseOrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseOrderItemScalarFieldEnum | PurchaseOrderItemScalarFieldEnum[]
  }

  /**
   * RawMaterial without action
   */
  export type RawMaterialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
  }


  /**
   * Model FinishedGood
   */

  export type AggregateFinishedGood = {
    _count: FinishedGoodCountAggregateOutputType | null
    _avg: FinishedGoodAvgAggregateOutputType | null
    _sum: FinishedGoodSumAggregateOutputType | null
    _min: FinishedGoodMinAggregateOutputType | null
    _max: FinishedGoodMaxAggregateOutputType | null
  }

  export type FinishedGoodAvgAggregateOutputType = {
    quantityOnHand: number | null
    retailPrice: number | null
    calculatedCogs: number | null
    vesselSizeOz: number | null
    fragranceLoadPercent: number | null
    laborCostPerUnit: number | null
    overheadFlat: number | null
    overheadPercent: number | null
  }

  export type FinishedGoodSumAggregateOutputType = {
    quantityOnHand: number | null
    retailPrice: number | null
    calculatedCogs: number | null
    vesselSizeOz: number | null
    fragranceLoadPercent: number | null
    laborCostPerUnit: number | null
    overheadFlat: number | null
    overheadPercent: number | null
  }

  export type FinishedGoodMinAggregateOutputType = {
    id: string | null
    name: string | null
    sku: string | null
    batchCode: string | null
    quantityOnHand: number | null
    retailPrice: number | null
    calculatedCogs: number | null
    vesselSizeOz: number | null
    fragranceLoadPercent: number | null
    laborCostPerUnit: number | null
    overheadFlat: number | null
    overheadPercent: number | null
    isSubAssembly: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FinishedGoodMaxAggregateOutputType = {
    id: string | null
    name: string | null
    sku: string | null
    batchCode: string | null
    quantityOnHand: number | null
    retailPrice: number | null
    calculatedCogs: number | null
    vesselSizeOz: number | null
    fragranceLoadPercent: number | null
    laborCostPerUnit: number | null
    overheadFlat: number | null
    overheadPercent: number | null
    isSubAssembly: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FinishedGoodCountAggregateOutputType = {
    id: number
    name: number
    sku: number
    batchCode: number
    quantityOnHand: number
    retailPrice: number
    calculatedCogs: number
    vesselSizeOz: number
    fragranceLoadPercent: number
    laborCostPerUnit: number
    overheadFlat: number
    overheadPercent: number
    isSubAssembly: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FinishedGoodAvgAggregateInputType = {
    quantityOnHand?: true
    retailPrice?: true
    calculatedCogs?: true
    vesselSizeOz?: true
    fragranceLoadPercent?: true
    laborCostPerUnit?: true
    overheadFlat?: true
    overheadPercent?: true
  }

  export type FinishedGoodSumAggregateInputType = {
    quantityOnHand?: true
    retailPrice?: true
    calculatedCogs?: true
    vesselSizeOz?: true
    fragranceLoadPercent?: true
    laborCostPerUnit?: true
    overheadFlat?: true
    overheadPercent?: true
  }

  export type FinishedGoodMinAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    batchCode?: true
    quantityOnHand?: true
    retailPrice?: true
    calculatedCogs?: true
    vesselSizeOz?: true
    fragranceLoadPercent?: true
    laborCostPerUnit?: true
    overheadFlat?: true
    overheadPercent?: true
    isSubAssembly?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FinishedGoodMaxAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    batchCode?: true
    quantityOnHand?: true
    retailPrice?: true
    calculatedCogs?: true
    vesselSizeOz?: true
    fragranceLoadPercent?: true
    laborCostPerUnit?: true
    overheadFlat?: true
    overheadPercent?: true
    isSubAssembly?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FinishedGoodCountAggregateInputType = {
    id?: true
    name?: true
    sku?: true
    batchCode?: true
    quantityOnHand?: true
    retailPrice?: true
    calculatedCogs?: true
    vesselSizeOz?: true
    fragranceLoadPercent?: true
    laborCostPerUnit?: true
    overheadFlat?: true
    overheadPercent?: true
    isSubAssembly?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FinishedGoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinishedGood to aggregate.
     */
    where?: FinishedGoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinishedGoods to fetch.
     */
    orderBy?: FinishedGoodOrderByWithRelationInput | FinishedGoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FinishedGoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinishedGoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinishedGoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FinishedGoods
    **/
    _count?: true | FinishedGoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinishedGoodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinishedGoodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinishedGoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinishedGoodMaxAggregateInputType
  }

  export type GetFinishedGoodAggregateType<T extends FinishedGoodAggregateArgs> = {
        [P in keyof T & keyof AggregateFinishedGood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinishedGood[P]>
      : GetScalarType<T[P], AggregateFinishedGood[P]>
  }




  export type FinishedGoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinishedGoodWhereInput
    orderBy?: FinishedGoodOrderByWithAggregationInput | FinishedGoodOrderByWithAggregationInput[]
    by: FinishedGoodScalarFieldEnum[] | FinishedGoodScalarFieldEnum
    having?: FinishedGoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinishedGoodCountAggregateInputType | true
    _avg?: FinishedGoodAvgAggregateInputType
    _sum?: FinishedGoodSumAggregateInputType
    _min?: FinishedGoodMinAggregateInputType
    _max?: FinishedGoodMaxAggregateInputType
  }

  export type FinishedGoodGroupByOutputType = {
    id: string
    name: string
    sku: string | null
    batchCode: string
    quantityOnHand: number
    retailPrice: number
    calculatedCogs: number
    vesselSizeOz: number | null
    fragranceLoadPercent: number | null
    laborCostPerUnit: number | null
    overheadFlat: number | null
    overheadPercent: number | null
    isSubAssembly: boolean
    createdAt: Date
    updatedAt: Date
    _count: FinishedGoodCountAggregateOutputType | null
    _avg: FinishedGoodAvgAggregateOutputType | null
    _sum: FinishedGoodSumAggregateOutputType | null
    _min: FinishedGoodMinAggregateOutputType | null
    _max: FinishedGoodMaxAggregateOutputType | null
  }

  type GetFinishedGoodGroupByPayload<T extends FinishedGoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinishedGoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinishedGoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinishedGoodGroupByOutputType[P]>
            : GetScalarType<T[P], FinishedGoodGroupByOutputType[P]>
        }
      >
    >


  export type FinishedGoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sku?: boolean
    batchCode?: boolean
    quantityOnHand?: boolean
    retailPrice?: boolean
    calculatedCogs?: boolean
    vesselSizeOz?: boolean
    fragranceLoadPercent?: boolean
    laborCostPerUnit?: boolean
    overheadFlat?: boolean
    overheadPercent?: boolean
    isSubAssembly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeItems?: boolean | FinishedGood$recipeItemsArgs<ExtArgs>
    usedAsSubAssembly?: boolean | FinishedGood$usedAsSubAssemblyArgs<ExtArgs>
    saleItems?: boolean | FinishedGood$saleItemsArgs<ExtArgs>
    _count?: boolean | FinishedGoodCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["finishedGood"]>

  export type FinishedGoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sku?: boolean
    batchCode?: boolean
    quantityOnHand?: boolean
    retailPrice?: boolean
    calculatedCogs?: boolean
    vesselSizeOz?: boolean
    fragranceLoadPercent?: boolean
    laborCostPerUnit?: boolean
    overheadFlat?: boolean
    overheadPercent?: boolean
    isSubAssembly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["finishedGood"]>

  export type FinishedGoodSelectScalar = {
    id?: boolean
    name?: boolean
    sku?: boolean
    batchCode?: boolean
    quantityOnHand?: boolean
    retailPrice?: boolean
    calculatedCogs?: boolean
    vesselSizeOz?: boolean
    fragranceLoadPercent?: boolean
    laborCostPerUnit?: boolean
    overheadFlat?: boolean
    overheadPercent?: boolean
    isSubAssembly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FinishedGoodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipeItems?: boolean | FinishedGood$recipeItemsArgs<ExtArgs>
    usedAsSubAssembly?: boolean | FinishedGood$usedAsSubAssemblyArgs<ExtArgs>
    saleItems?: boolean | FinishedGood$saleItemsArgs<ExtArgs>
    _count?: boolean | FinishedGoodCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FinishedGoodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FinishedGoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FinishedGood"
    objects: {
      recipeItems: Prisma.$RecipeItemPayload<ExtArgs>[]
      usedAsSubAssembly: Prisma.$RecipeItemPayload<ExtArgs>[]
      saleItems: Prisma.$SaleItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      sku: string | null
      batchCode: string
      quantityOnHand: number
      retailPrice: number
      calculatedCogs: number
      vesselSizeOz: number | null
      fragranceLoadPercent: number | null
      laborCostPerUnit: number | null
      overheadFlat: number | null
      overheadPercent: number | null
      isSubAssembly: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["finishedGood"]>
    composites: {}
  }

  type FinishedGoodGetPayload<S extends boolean | null | undefined | FinishedGoodDefaultArgs> = $Result.GetResult<Prisma.$FinishedGoodPayload, S>

  type FinishedGoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FinishedGoodFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FinishedGoodCountAggregateInputType | true
    }

  export interface FinishedGoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FinishedGood'], meta: { name: 'FinishedGood' } }
    /**
     * Find zero or one FinishedGood that matches the filter.
     * @param {FinishedGoodFindUniqueArgs} args - Arguments to find a FinishedGood
     * @example
     * // Get one FinishedGood
     * const finishedGood = await prisma.finishedGood.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinishedGoodFindUniqueArgs>(args: SelectSubset<T, FinishedGoodFindUniqueArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FinishedGood that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FinishedGoodFindUniqueOrThrowArgs} args - Arguments to find a FinishedGood
     * @example
     * // Get one FinishedGood
     * const finishedGood = await prisma.finishedGood.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinishedGoodFindUniqueOrThrowArgs>(args: SelectSubset<T, FinishedGoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FinishedGood that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinishedGoodFindFirstArgs} args - Arguments to find a FinishedGood
     * @example
     * // Get one FinishedGood
     * const finishedGood = await prisma.finishedGood.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinishedGoodFindFirstArgs>(args?: SelectSubset<T, FinishedGoodFindFirstArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FinishedGood that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinishedGoodFindFirstOrThrowArgs} args - Arguments to find a FinishedGood
     * @example
     * // Get one FinishedGood
     * const finishedGood = await prisma.finishedGood.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinishedGoodFindFirstOrThrowArgs>(args?: SelectSubset<T, FinishedGoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FinishedGoods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinishedGoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FinishedGoods
     * const finishedGoods = await prisma.finishedGood.findMany()
     * 
     * // Get first 10 FinishedGoods
     * const finishedGoods = await prisma.finishedGood.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const finishedGoodWithIdOnly = await prisma.finishedGood.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FinishedGoodFindManyArgs>(args?: SelectSubset<T, FinishedGoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FinishedGood.
     * @param {FinishedGoodCreateArgs} args - Arguments to create a FinishedGood.
     * @example
     * // Create one FinishedGood
     * const FinishedGood = await prisma.finishedGood.create({
     *   data: {
     *     // ... data to create a FinishedGood
     *   }
     * })
     * 
     */
    create<T extends FinishedGoodCreateArgs>(args: SelectSubset<T, FinishedGoodCreateArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FinishedGoods.
     * @param {FinishedGoodCreateManyArgs} args - Arguments to create many FinishedGoods.
     * @example
     * // Create many FinishedGoods
     * const finishedGood = await prisma.finishedGood.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FinishedGoodCreateManyArgs>(args?: SelectSubset<T, FinishedGoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FinishedGoods and returns the data saved in the database.
     * @param {FinishedGoodCreateManyAndReturnArgs} args - Arguments to create many FinishedGoods.
     * @example
     * // Create many FinishedGoods
     * const finishedGood = await prisma.finishedGood.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FinishedGoods and only return the `id`
     * const finishedGoodWithIdOnly = await prisma.finishedGood.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FinishedGoodCreateManyAndReturnArgs>(args?: SelectSubset<T, FinishedGoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FinishedGood.
     * @param {FinishedGoodDeleteArgs} args - Arguments to delete one FinishedGood.
     * @example
     * // Delete one FinishedGood
     * const FinishedGood = await prisma.finishedGood.delete({
     *   where: {
     *     // ... filter to delete one FinishedGood
     *   }
     * })
     * 
     */
    delete<T extends FinishedGoodDeleteArgs>(args: SelectSubset<T, FinishedGoodDeleteArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FinishedGood.
     * @param {FinishedGoodUpdateArgs} args - Arguments to update one FinishedGood.
     * @example
     * // Update one FinishedGood
     * const finishedGood = await prisma.finishedGood.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FinishedGoodUpdateArgs>(args: SelectSubset<T, FinishedGoodUpdateArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FinishedGoods.
     * @param {FinishedGoodDeleteManyArgs} args - Arguments to filter FinishedGoods to delete.
     * @example
     * // Delete a few FinishedGoods
     * const { count } = await prisma.finishedGood.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FinishedGoodDeleteManyArgs>(args?: SelectSubset<T, FinishedGoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinishedGoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinishedGoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FinishedGoods
     * const finishedGood = await prisma.finishedGood.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FinishedGoodUpdateManyArgs>(args: SelectSubset<T, FinishedGoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FinishedGood.
     * @param {FinishedGoodUpsertArgs} args - Arguments to update or create a FinishedGood.
     * @example
     * // Update or create a FinishedGood
     * const finishedGood = await prisma.finishedGood.upsert({
     *   create: {
     *     // ... data to create a FinishedGood
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FinishedGood we want to update
     *   }
     * })
     */
    upsert<T extends FinishedGoodUpsertArgs>(args: SelectSubset<T, FinishedGoodUpsertArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FinishedGoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinishedGoodCountArgs} args - Arguments to filter FinishedGoods to count.
     * @example
     * // Count the number of FinishedGoods
     * const count = await prisma.finishedGood.count({
     *   where: {
     *     // ... the filter for the FinishedGoods we want to count
     *   }
     * })
    **/
    count<T extends FinishedGoodCountArgs>(
      args?: Subset<T, FinishedGoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinishedGoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FinishedGood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinishedGoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinishedGoodAggregateArgs>(args: Subset<T, FinishedGoodAggregateArgs>): Prisma.PrismaPromise<GetFinishedGoodAggregateType<T>>

    /**
     * Group by FinishedGood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinishedGoodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FinishedGoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FinishedGoodGroupByArgs['orderBy'] }
        : { orderBy?: FinishedGoodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FinishedGoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinishedGoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FinishedGood model
   */
  readonly fields: FinishedGoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FinishedGood.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FinishedGoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipeItems<T extends FinishedGood$recipeItemsArgs<ExtArgs> = {}>(args?: Subset<T, FinishedGood$recipeItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "findMany"> | Null>
    usedAsSubAssembly<T extends FinishedGood$usedAsSubAssemblyArgs<ExtArgs> = {}>(args?: Subset<T, FinishedGood$usedAsSubAssemblyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "findMany"> | Null>
    saleItems<T extends FinishedGood$saleItemsArgs<ExtArgs> = {}>(args?: Subset<T, FinishedGood$saleItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FinishedGood model
   */ 
  interface FinishedGoodFieldRefs {
    readonly id: FieldRef<"FinishedGood", 'String'>
    readonly name: FieldRef<"FinishedGood", 'String'>
    readonly sku: FieldRef<"FinishedGood", 'String'>
    readonly batchCode: FieldRef<"FinishedGood", 'String'>
    readonly quantityOnHand: FieldRef<"FinishedGood", 'Int'>
    readonly retailPrice: FieldRef<"FinishedGood", 'Float'>
    readonly calculatedCogs: FieldRef<"FinishedGood", 'Float'>
    readonly vesselSizeOz: FieldRef<"FinishedGood", 'Float'>
    readonly fragranceLoadPercent: FieldRef<"FinishedGood", 'Float'>
    readonly laborCostPerUnit: FieldRef<"FinishedGood", 'Float'>
    readonly overheadFlat: FieldRef<"FinishedGood", 'Float'>
    readonly overheadPercent: FieldRef<"FinishedGood", 'Float'>
    readonly isSubAssembly: FieldRef<"FinishedGood", 'Boolean'>
    readonly createdAt: FieldRef<"FinishedGood", 'DateTime'>
    readonly updatedAt: FieldRef<"FinishedGood", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FinishedGood findUnique
   */
  export type FinishedGoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * Filter, which FinishedGood to fetch.
     */
    where: FinishedGoodWhereUniqueInput
  }

  /**
   * FinishedGood findUniqueOrThrow
   */
  export type FinishedGoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * Filter, which FinishedGood to fetch.
     */
    where: FinishedGoodWhereUniqueInput
  }

  /**
   * FinishedGood findFirst
   */
  export type FinishedGoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * Filter, which FinishedGood to fetch.
     */
    where?: FinishedGoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinishedGoods to fetch.
     */
    orderBy?: FinishedGoodOrderByWithRelationInput | FinishedGoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinishedGoods.
     */
    cursor?: FinishedGoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinishedGoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinishedGoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinishedGoods.
     */
    distinct?: FinishedGoodScalarFieldEnum | FinishedGoodScalarFieldEnum[]
  }

  /**
   * FinishedGood findFirstOrThrow
   */
  export type FinishedGoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * Filter, which FinishedGood to fetch.
     */
    where?: FinishedGoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinishedGoods to fetch.
     */
    orderBy?: FinishedGoodOrderByWithRelationInput | FinishedGoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinishedGoods.
     */
    cursor?: FinishedGoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinishedGoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinishedGoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinishedGoods.
     */
    distinct?: FinishedGoodScalarFieldEnum | FinishedGoodScalarFieldEnum[]
  }

  /**
   * FinishedGood findMany
   */
  export type FinishedGoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * Filter, which FinishedGoods to fetch.
     */
    where?: FinishedGoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinishedGoods to fetch.
     */
    orderBy?: FinishedGoodOrderByWithRelationInput | FinishedGoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FinishedGoods.
     */
    cursor?: FinishedGoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinishedGoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinishedGoods.
     */
    skip?: number
    distinct?: FinishedGoodScalarFieldEnum | FinishedGoodScalarFieldEnum[]
  }

  /**
   * FinishedGood create
   */
  export type FinishedGoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * The data needed to create a FinishedGood.
     */
    data: XOR<FinishedGoodCreateInput, FinishedGoodUncheckedCreateInput>
  }

  /**
   * FinishedGood createMany
   */
  export type FinishedGoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FinishedGoods.
     */
    data: FinishedGoodCreateManyInput | FinishedGoodCreateManyInput[]
  }

  /**
   * FinishedGood createManyAndReturn
   */
  export type FinishedGoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FinishedGoods.
     */
    data: FinishedGoodCreateManyInput | FinishedGoodCreateManyInput[]
  }

  /**
   * FinishedGood update
   */
  export type FinishedGoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * The data needed to update a FinishedGood.
     */
    data: XOR<FinishedGoodUpdateInput, FinishedGoodUncheckedUpdateInput>
    /**
     * Choose, which FinishedGood to update.
     */
    where: FinishedGoodWhereUniqueInput
  }

  /**
   * FinishedGood updateMany
   */
  export type FinishedGoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FinishedGoods.
     */
    data: XOR<FinishedGoodUpdateManyMutationInput, FinishedGoodUncheckedUpdateManyInput>
    /**
     * Filter which FinishedGoods to update
     */
    where?: FinishedGoodWhereInput
  }

  /**
   * FinishedGood upsert
   */
  export type FinishedGoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * The filter to search for the FinishedGood to update in case it exists.
     */
    where: FinishedGoodWhereUniqueInput
    /**
     * In case the FinishedGood found by the `where` argument doesn't exist, create a new FinishedGood with this data.
     */
    create: XOR<FinishedGoodCreateInput, FinishedGoodUncheckedCreateInput>
    /**
     * In case the FinishedGood was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FinishedGoodUpdateInput, FinishedGoodUncheckedUpdateInput>
  }

  /**
   * FinishedGood delete
   */
  export type FinishedGoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    /**
     * Filter which FinishedGood to delete.
     */
    where: FinishedGoodWhereUniqueInput
  }

  /**
   * FinishedGood deleteMany
   */
  export type FinishedGoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinishedGoods to delete
     */
    where?: FinishedGoodWhereInput
  }

  /**
   * FinishedGood.recipeItems
   */
  export type FinishedGood$recipeItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    where?: RecipeItemWhereInput
    orderBy?: RecipeItemOrderByWithRelationInput | RecipeItemOrderByWithRelationInput[]
    cursor?: RecipeItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeItemScalarFieldEnum | RecipeItemScalarFieldEnum[]
  }

  /**
   * FinishedGood.usedAsSubAssembly
   */
  export type FinishedGood$usedAsSubAssemblyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    where?: RecipeItemWhereInput
    orderBy?: RecipeItemOrderByWithRelationInput | RecipeItemOrderByWithRelationInput[]
    cursor?: RecipeItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeItemScalarFieldEnum | RecipeItemScalarFieldEnum[]
  }

  /**
   * FinishedGood.saleItems
   */
  export type FinishedGood$saleItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    cursor?: SaleItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * FinishedGood without action
   */
  export type FinishedGoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
  }


  /**
   * Model RecipeItem
   */

  export type AggregateRecipeItem = {
    _count: RecipeItemCountAggregateOutputType | null
    _avg: RecipeItemAvgAggregateOutputType | null
    _sum: RecipeItemSumAggregateOutputType | null
    _min: RecipeItemMinAggregateOutputType | null
    _max: RecipeItemMaxAggregateOutputType | null
  }

  export type RecipeItemAvgAggregateOutputType = {
    requiredQuantity: number | null
  }

  export type RecipeItemSumAggregateOutputType = {
    requiredQuantity: number | null
  }

  export type RecipeItemMinAggregateOutputType = {
    id: string | null
    finishedGoodId: string | null
    rawMaterialId: string | null
    subAssemblyId: string | null
    requiredQuantity: number | null
    unit: string | null
  }

  export type RecipeItemMaxAggregateOutputType = {
    id: string | null
    finishedGoodId: string | null
    rawMaterialId: string | null
    subAssemblyId: string | null
    requiredQuantity: number | null
    unit: string | null
  }

  export type RecipeItemCountAggregateOutputType = {
    id: number
    finishedGoodId: number
    rawMaterialId: number
    subAssemblyId: number
    requiredQuantity: number
    unit: number
    _all: number
  }


  export type RecipeItemAvgAggregateInputType = {
    requiredQuantity?: true
  }

  export type RecipeItemSumAggregateInputType = {
    requiredQuantity?: true
  }

  export type RecipeItemMinAggregateInputType = {
    id?: true
    finishedGoodId?: true
    rawMaterialId?: true
    subAssemblyId?: true
    requiredQuantity?: true
    unit?: true
  }

  export type RecipeItemMaxAggregateInputType = {
    id?: true
    finishedGoodId?: true
    rawMaterialId?: true
    subAssemblyId?: true
    requiredQuantity?: true
    unit?: true
  }

  export type RecipeItemCountAggregateInputType = {
    id?: true
    finishedGoodId?: true
    rawMaterialId?: true
    subAssemblyId?: true
    requiredQuantity?: true
    unit?: true
    _all?: true
  }

  export type RecipeItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeItem to aggregate.
     */
    where?: RecipeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeItems to fetch.
     */
    orderBy?: RecipeItemOrderByWithRelationInput | RecipeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecipeItems
    **/
    _count?: true | RecipeItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeItemMaxAggregateInputType
  }

  export type GetRecipeItemAggregateType<T extends RecipeItemAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipeItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeItem[P]>
      : GetScalarType<T[P], AggregateRecipeItem[P]>
  }




  export type RecipeItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeItemWhereInput
    orderBy?: RecipeItemOrderByWithAggregationInput | RecipeItemOrderByWithAggregationInput[]
    by: RecipeItemScalarFieldEnum[] | RecipeItemScalarFieldEnum
    having?: RecipeItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeItemCountAggregateInputType | true
    _avg?: RecipeItemAvgAggregateInputType
    _sum?: RecipeItemSumAggregateInputType
    _min?: RecipeItemMinAggregateInputType
    _max?: RecipeItemMaxAggregateInputType
  }

  export type RecipeItemGroupByOutputType = {
    id: string
    finishedGoodId: string
    rawMaterialId: string | null
    subAssemblyId: string | null
    requiredQuantity: number
    unit: string
    _count: RecipeItemCountAggregateOutputType | null
    _avg: RecipeItemAvgAggregateOutputType | null
    _sum: RecipeItemSumAggregateOutputType | null
    _min: RecipeItemMinAggregateOutputType | null
    _max: RecipeItemMaxAggregateOutputType | null
  }

  type GetRecipeItemGroupByPayload<T extends RecipeItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeItemGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeItemGroupByOutputType[P]>
        }
      >
    >


  export type RecipeItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    finishedGoodId?: boolean
    rawMaterialId?: boolean
    subAssemblyId?: boolean
    requiredQuantity?: boolean
    unit?: boolean
    finishedGood?: boolean | FinishedGoodDefaultArgs<ExtArgs>
    rawMaterial?: boolean | RecipeItem$rawMaterialArgs<ExtArgs>
    subAssembly?: boolean | RecipeItem$subAssemblyArgs<ExtArgs>
  }, ExtArgs["result"]["recipeItem"]>

  export type RecipeItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    finishedGoodId?: boolean
    rawMaterialId?: boolean
    subAssemblyId?: boolean
    requiredQuantity?: boolean
    unit?: boolean
    finishedGood?: boolean | FinishedGoodDefaultArgs<ExtArgs>
    rawMaterial?: boolean | RecipeItem$rawMaterialArgs<ExtArgs>
    subAssembly?: boolean | RecipeItem$subAssemblyArgs<ExtArgs>
  }, ExtArgs["result"]["recipeItem"]>

  export type RecipeItemSelectScalar = {
    id?: boolean
    finishedGoodId?: boolean
    rawMaterialId?: boolean
    subAssemblyId?: boolean
    requiredQuantity?: boolean
    unit?: boolean
  }

  export type RecipeItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    finishedGood?: boolean | FinishedGoodDefaultArgs<ExtArgs>
    rawMaterial?: boolean | RecipeItem$rawMaterialArgs<ExtArgs>
    subAssembly?: boolean | RecipeItem$subAssemblyArgs<ExtArgs>
  }
  export type RecipeItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    finishedGood?: boolean | FinishedGoodDefaultArgs<ExtArgs>
    rawMaterial?: boolean | RecipeItem$rawMaterialArgs<ExtArgs>
    subAssembly?: boolean | RecipeItem$subAssemblyArgs<ExtArgs>
  }

  export type $RecipeItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecipeItem"
    objects: {
      finishedGood: Prisma.$FinishedGoodPayload<ExtArgs>
      rawMaterial: Prisma.$RawMaterialPayload<ExtArgs> | null
      subAssembly: Prisma.$FinishedGoodPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      finishedGoodId: string
      rawMaterialId: string | null
      subAssemblyId: string | null
      requiredQuantity: number
      unit: string
    }, ExtArgs["result"]["recipeItem"]>
    composites: {}
  }

  type RecipeItemGetPayload<S extends boolean | null | undefined | RecipeItemDefaultArgs> = $Result.GetResult<Prisma.$RecipeItemPayload, S>

  type RecipeItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RecipeItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RecipeItemCountAggregateInputType | true
    }

  export interface RecipeItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecipeItem'], meta: { name: 'RecipeItem' } }
    /**
     * Find zero or one RecipeItem that matches the filter.
     * @param {RecipeItemFindUniqueArgs} args - Arguments to find a RecipeItem
     * @example
     * // Get one RecipeItem
     * const recipeItem = await prisma.recipeItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeItemFindUniqueArgs>(args: SelectSubset<T, RecipeItemFindUniqueArgs<ExtArgs>>): Prisma__RecipeItemClient<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RecipeItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RecipeItemFindUniqueOrThrowArgs} args - Arguments to find a RecipeItem
     * @example
     * // Get one RecipeItem
     * const recipeItem = await prisma.recipeItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeItemFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeItemClient<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RecipeItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeItemFindFirstArgs} args - Arguments to find a RecipeItem
     * @example
     * // Get one RecipeItem
     * const recipeItem = await prisma.recipeItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeItemFindFirstArgs>(args?: SelectSubset<T, RecipeItemFindFirstArgs<ExtArgs>>): Prisma__RecipeItemClient<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RecipeItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeItemFindFirstOrThrowArgs} args - Arguments to find a RecipeItem
     * @example
     * // Get one RecipeItem
     * const recipeItem = await prisma.recipeItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeItemFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeItemClient<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RecipeItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeItems
     * const recipeItems = await prisma.recipeItem.findMany()
     * 
     * // Get first 10 RecipeItems
     * const recipeItems = await prisma.recipeItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeItemWithIdOnly = await prisma.recipeItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeItemFindManyArgs>(args?: SelectSubset<T, RecipeItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RecipeItem.
     * @param {RecipeItemCreateArgs} args - Arguments to create a RecipeItem.
     * @example
     * // Create one RecipeItem
     * const RecipeItem = await prisma.recipeItem.create({
     *   data: {
     *     // ... data to create a RecipeItem
     *   }
     * })
     * 
     */
    create<T extends RecipeItemCreateArgs>(args: SelectSubset<T, RecipeItemCreateArgs<ExtArgs>>): Prisma__RecipeItemClient<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RecipeItems.
     * @param {RecipeItemCreateManyArgs} args - Arguments to create many RecipeItems.
     * @example
     * // Create many RecipeItems
     * const recipeItem = await prisma.recipeItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeItemCreateManyArgs>(args?: SelectSubset<T, RecipeItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecipeItems and returns the data saved in the database.
     * @param {RecipeItemCreateManyAndReturnArgs} args - Arguments to create many RecipeItems.
     * @example
     * // Create many RecipeItems
     * const recipeItem = await prisma.recipeItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecipeItems and only return the `id`
     * const recipeItemWithIdOnly = await prisma.recipeItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeItemCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RecipeItem.
     * @param {RecipeItemDeleteArgs} args - Arguments to delete one RecipeItem.
     * @example
     * // Delete one RecipeItem
     * const RecipeItem = await prisma.recipeItem.delete({
     *   where: {
     *     // ... filter to delete one RecipeItem
     *   }
     * })
     * 
     */
    delete<T extends RecipeItemDeleteArgs>(args: SelectSubset<T, RecipeItemDeleteArgs<ExtArgs>>): Prisma__RecipeItemClient<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RecipeItem.
     * @param {RecipeItemUpdateArgs} args - Arguments to update one RecipeItem.
     * @example
     * // Update one RecipeItem
     * const recipeItem = await prisma.recipeItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeItemUpdateArgs>(args: SelectSubset<T, RecipeItemUpdateArgs<ExtArgs>>): Prisma__RecipeItemClient<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RecipeItems.
     * @param {RecipeItemDeleteManyArgs} args - Arguments to filter RecipeItems to delete.
     * @example
     * // Delete a few RecipeItems
     * const { count } = await prisma.recipeItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeItemDeleteManyArgs>(args?: SelectSubset<T, RecipeItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeItems
     * const recipeItem = await prisma.recipeItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeItemUpdateManyArgs>(args: SelectSubset<T, RecipeItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RecipeItem.
     * @param {RecipeItemUpsertArgs} args - Arguments to update or create a RecipeItem.
     * @example
     * // Update or create a RecipeItem
     * const recipeItem = await prisma.recipeItem.upsert({
     *   create: {
     *     // ... data to create a RecipeItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeItem we want to update
     *   }
     * })
     */
    upsert<T extends RecipeItemUpsertArgs>(args: SelectSubset<T, RecipeItemUpsertArgs<ExtArgs>>): Prisma__RecipeItemClient<$Result.GetResult<Prisma.$RecipeItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RecipeItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeItemCountArgs} args - Arguments to filter RecipeItems to count.
     * @example
     * // Count the number of RecipeItems
     * const count = await prisma.recipeItem.count({
     *   where: {
     *     // ... the filter for the RecipeItems we want to count
     *   }
     * })
    **/
    count<T extends RecipeItemCountArgs>(
      args?: Subset<T, RecipeItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecipeItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeItemAggregateArgs>(args: Subset<T, RecipeItemAggregateArgs>): Prisma.PrismaPromise<GetRecipeItemAggregateType<T>>

    /**
     * Group by RecipeItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeItemGroupByArgs['orderBy'] }
        : { orderBy?: RecipeItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecipeItem model
   */
  readonly fields: RecipeItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    finishedGood<T extends FinishedGoodDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FinishedGoodDefaultArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    rawMaterial<T extends RecipeItem$rawMaterialArgs<ExtArgs> = {}>(args?: Subset<T, RecipeItem$rawMaterialArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    subAssembly<T extends RecipeItem$subAssemblyArgs<ExtArgs> = {}>(args?: Subset<T, RecipeItem$subAssemblyArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecipeItem model
   */ 
  interface RecipeItemFieldRefs {
    readonly id: FieldRef<"RecipeItem", 'String'>
    readonly finishedGoodId: FieldRef<"RecipeItem", 'String'>
    readonly rawMaterialId: FieldRef<"RecipeItem", 'String'>
    readonly subAssemblyId: FieldRef<"RecipeItem", 'String'>
    readonly requiredQuantity: FieldRef<"RecipeItem", 'Float'>
    readonly unit: FieldRef<"RecipeItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RecipeItem findUnique
   */
  export type RecipeItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * Filter, which RecipeItem to fetch.
     */
    where: RecipeItemWhereUniqueInput
  }

  /**
   * RecipeItem findUniqueOrThrow
   */
  export type RecipeItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * Filter, which RecipeItem to fetch.
     */
    where: RecipeItemWhereUniqueInput
  }

  /**
   * RecipeItem findFirst
   */
  export type RecipeItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * Filter, which RecipeItem to fetch.
     */
    where?: RecipeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeItems to fetch.
     */
    orderBy?: RecipeItemOrderByWithRelationInput | RecipeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeItems.
     */
    cursor?: RecipeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeItems.
     */
    distinct?: RecipeItemScalarFieldEnum | RecipeItemScalarFieldEnum[]
  }

  /**
   * RecipeItem findFirstOrThrow
   */
  export type RecipeItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * Filter, which RecipeItem to fetch.
     */
    where?: RecipeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeItems to fetch.
     */
    orderBy?: RecipeItemOrderByWithRelationInput | RecipeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeItems.
     */
    cursor?: RecipeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeItems.
     */
    distinct?: RecipeItemScalarFieldEnum | RecipeItemScalarFieldEnum[]
  }

  /**
   * RecipeItem findMany
   */
  export type RecipeItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * Filter, which RecipeItems to fetch.
     */
    where?: RecipeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeItems to fetch.
     */
    orderBy?: RecipeItemOrderByWithRelationInput | RecipeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecipeItems.
     */
    cursor?: RecipeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeItems.
     */
    skip?: number
    distinct?: RecipeItemScalarFieldEnum | RecipeItemScalarFieldEnum[]
  }

  /**
   * RecipeItem create
   */
  export type RecipeItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * The data needed to create a RecipeItem.
     */
    data: XOR<RecipeItemCreateInput, RecipeItemUncheckedCreateInput>
  }

  /**
   * RecipeItem createMany
   */
  export type RecipeItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecipeItems.
     */
    data: RecipeItemCreateManyInput | RecipeItemCreateManyInput[]
  }

  /**
   * RecipeItem createManyAndReturn
   */
  export type RecipeItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RecipeItems.
     */
    data: RecipeItemCreateManyInput | RecipeItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeItem update
   */
  export type RecipeItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * The data needed to update a RecipeItem.
     */
    data: XOR<RecipeItemUpdateInput, RecipeItemUncheckedUpdateInput>
    /**
     * Choose, which RecipeItem to update.
     */
    where: RecipeItemWhereUniqueInput
  }

  /**
   * RecipeItem updateMany
   */
  export type RecipeItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecipeItems.
     */
    data: XOR<RecipeItemUpdateManyMutationInput, RecipeItemUncheckedUpdateManyInput>
    /**
     * Filter which RecipeItems to update
     */
    where?: RecipeItemWhereInput
  }

  /**
   * RecipeItem upsert
   */
  export type RecipeItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * The filter to search for the RecipeItem to update in case it exists.
     */
    where: RecipeItemWhereUniqueInput
    /**
     * In case the RecipeItem found by the `where` argument doesn't exist, create a new RecipeItem with this data.
     */
    create: XOR<RecipeItemCreateInput, RecipeItemUncheckedCreateInput>
    /**
     * In case the RecipeItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeItemUpdateInput, RecipeItemUncheckedUpdateInput>
  }

  /**
   * RecipeItem delete
   */
  export type RecipeItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
    /**
     * Filter which RecipeItem to delete.
     */
    where: RecipeItemWhereUniqueInput
  }

  /**
   * RecipeItem deleteMany
   */
  export type RecipeItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeItems to delete
     */
    where?: RecipeItemWhereInput
  }

  /**
   * RecipeItem.rawMaterial
   */
  export type RecipeItem$rawMaterialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawMaterial
     */
    select?: RawMaterialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawMaterialInclude<ExtArgs> | null
    where?: RawMaterialWhereInput
  }

  /**
   * RecipeItem.subAssembly
   */
  export type RecipeItem$subAssemblyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinishedGood
     */
    select?: FinishedGoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinishedGoodInclude<ExtArgs> | null
    where?: FinishedGoodWhereInput
  }

  /**
   * RecipeItem without action
   */
  export type RecipeItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeItem
     */
    select?: RecipeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeItemInclude<ExtArgs> | null
  }


  /**
   * Model Adjustment
   */

  export type AggregateAdjustment = {
    _count: AdjustmentCountAggregateOutputType | null
    _avg: AdjustmentAvgAggregateOutputType | null
    _sum: AdjustmentSumAggregateOutputType | null
    _min: AdjustmentMinAggregateOutputType | null
    _max: AdjustmentMaxAggregateOutputType | null
  }

  export type AdjustmentAvgAggregateOutputType = {
    quantity: number | null
  }

  export type AdjustmentSumAggregateOutputType = {
    quantity: number | null
  }

  export type AdjustmentMinAggregateOutputType = {
    id: string | null
    materialId: string | null
    quantity: number | null
    reason: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type AdjustmentMaxAggregateOutputType = {
    id: string | null
    materialId: string | null
    quantity: number | null
    reason: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type AdjustmentCountAggregateOutputType = {
    id: number
    materialId: number
    quantity: number
    reason: number
    notes: number
    createdAt: number
    _all: number
  }


  export type AdjustmentAvgAggregateInputType = {
    quantity?: true
  }

  export type AdjustmentSumAggregateInputType = {
    quantity?: true
  }

  export type AdjustmentMinAggregateInputType = {
    id?: true
    materialId?: true
    quantity?: true
    reason?: true
    notes?: true
    createdAt?: true
  }

  export type AdjustmentMaxAggregateInputType = {
    id?: true
    materialId?: true
    quantity?: true
    reason?: true
    notes?: true
    createdAt?: true
  }

  export type AdjustmentCountAggregateInputType = {
    id?: true
    materialId?: true
    quantity?: true
    reason?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type AdjustmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Adjustment to aggregate.
     */
    where?: AdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adjustments to fetch.
     */
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Adjustments
    **/
    _count?: true | AdjustmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdjustmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdjustmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdjustmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdjustmentMaxAggregateInputType
  }

  export type GetAdjustmentAggregateType<T extends AdjustmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAdjustment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdjustment[P]>
      : GetScalarType<T[P], AggregateAdjustment[P]>
  }




  export type AdjustmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdjustmentWhereInput
    orderBy?: AdjustmentOrderByWithAggregationInput | AdjustmentOrderByWithAggregationInput[]
    by: AdjustmentScalarFieldEnum[] | AdjustmentScalarFieldEnum
    having?: AdjustmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdjustmentCountAggregateInputType | true
    _avg?: AdjustmentAvgAggregateInputType
    _sum?: AdjustmentSumAggregateInputType
    _min?: AdjustmentMinAggregateInputType
    _max?: AdjustmentMaxAggregateInputType
  }

  export type AdjustmentGroupByOutputType = {
    id: string
    materialId: string
    quantity: number
    reason: string
    notes: string | null
    createdAt: Date
    _count: AdjustmentCountAggregateOutputType | null
    _avg: AdjustmentAvgAggregateOutputType | null
    _sum: AdjustmentSumAggregateOutputType | null
    _min: AdjustmentMinAggregateOutputType | null
    _max: AdjustmentMaxAggregateOutputType | null
  }

  type GetAdjustmentGroupByPayload<T extends AdjustmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdjustmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdjustmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdjustmentGroupByOutputType[P]>
            : GetScalarType<T[P], AdjustmentGroupByOutputType[P]>
        }
      >
    >


  export type AdjustmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    materialId?: boolean
    quantity?: boolean
    reason?: boolean
    notes?: boolean
    createdAt?: boolean
    material?: boolean | RawMaterialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adjustment"]>

  export type AdjustmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    materialId?: boolean
    quantity?: boolean
    reason?: boolean
    notes?: boolean
    createdAt?: boolean
    material?: boolean | RawMaterialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adjustment"]>

  export type AdjustmentSelectScalar = {
    id?: boolean
    materialId?: boolean
    quantity?: boolean
    reason?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type AdjustmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | RawMaterialDefaultArgs<ExtArgs>
  }
  export type AdjustmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    material?: boolean | RawMaterialDefaultArgs<ExtArgs>
  }

  export type $AdjustmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Adjustment"
    objects: {
      material: Prisma.$RawMaterialPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      materialId: string
      quantity: number
      reason: string
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["adjustment"]>
    composites: {}
  }

  type AdjustmentGetPayload<S extends boolean | null | undefined | AdjustmentDefaultArgs> = $Result.GetResult<Prisma.$AdjustmentPayload, S>

  type AdjustmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdjustmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdjustmentCountAggregateInputType | true
    }

  export interface AdjustmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Adjustment'], meta: { name: 'Adjustment' } }
    /**
     * Find zero or one Adjustment that matches the filter.
     * @param {AdjustmentFindUniqueArgs} args - Arguments to find a Adjustment
     * @example
     * // Get one Adjustment
     * const adjustment = await prisma.adjustment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdjustmentFindUniqueArgs>(args: SelectSubset<T, AdjustmentFindUniqueArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Adjustment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdjustmentFindUniqueOrThrowArgs} args - Arguments to find a Adjustment
     * @example
     * // Get one Adjustment
     * const adjustment = await prisma.adjustment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdjustmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AdjustmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Adjustment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentFindFirstArgs} args - Arguments to find a Adjustment
     * @example
     * // Get one Adjustment
     * const adjustment = await prisma.adjustment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdjustmentFindFirstArgs>(args?: SelectSubset<T, AdjustmentFindFirstArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Adjustment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentFindFirstOrThrowArgs} args - Arguments to find a Adjustment
     * @example
     * // Get one Adjustment
     * const adjustment = await prisma.adjustment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdjustmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AdjustmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Adjustments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Adjustments
     * const adjustments = await prisma.adjustment.findMany()
     * 
     * // Get first 10 Adjustments
     * const adjustments = await prisma.adjustment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adjustmentWithIdOnly = await prisma.adjustment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdjustmentFindManyArgs>(args?: SelectSubset<T, AdjustmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Adjustment.
     * @param {AdjustmentCreateArgs} args - Arguments to create a Adjustment.
     * @example
     * // Create one Adjustment
     * const Adjustment = await prisma.adjustment.create({
     *   data: {
     *     // ... data to create a Adjustment
     *   }
     * })
     * 
     */
    create<T extends AdjustmentCreateArgs>(args: SelectSubset<T, AdjustmentCreateArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Adjustments.
     * @param {AdjustmentCreateManyArgs} args - Arguments to create many Adjustments.
     * @example
     * // Create many Adjustments
     * const adjustment = await prisma.adjustment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdjustmentCreateManyArgs>(args?: SelectSubset<T, AdjustmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Adjustments and returns the data saved in the database.
     * @param {AdjustmentCreateManyAndReturnArgs} args - Arguments to create many Adjustments.
     * @example
     * // Create many Adjustments
     * const adjustment = await prisma.adjustment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Adjustments and only return the `id`
     * const adjustmentWithIdOnly = await prisma.adjustment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdjustmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AdjustmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Adjustment.
     * @param {AdjustmentDeleteArgs} args - Arguments to delete one Adjustment.
     * @example
     * // Delete one Adjustment
     * const Adjustment = await prisma.adjustment.delete({
     *   where: {
     *     // ... filter to delete one Adjustment
     *   }
     * })
     * 
     */
    delete<T extends AdjustmentDeleteArgs>(args: SelectSubset<T, AdjustmentDeleteArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Adjustment.
     * @param {AdjustmentUpdateArgs} args - Arguments to update one Adjustment.
     * @example
     * // Update one Adjustment
     * const adjustment = await prisma.adjustment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdjustmentUpdateArgs>(args: SelectSubset<T, AdjustmentUpdateArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Adjustments.
     * @param {AdjustmentDeleteManyArgs} args - Arguments to filter Adjustments to delete.
     * @example
     * // Delete a few Adjustments
     * const { count } = await prisma.adjustment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdjustmentDeleteManyArgs>(args?: SelectSubset<T, AdjustmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Adjustments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Adjustments
     * const adjustment = await prisma.adjustment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdjustmentUpdateManyArgs>(args: SelectSubset<T, AdjustmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Adjustment.
     * @param {AdjustmentUpsertArgs} args - Arguments to update or create a Adjustment.
     * @example
     * // Update or create a Adjustment
     * const adjustment = await prisma.adjustment.upsert({
     *   create: {
     *     // ... data to create a Adjustment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Adjustment we want to update
     *   }
     * })
     */
    upsert<T extends AdjustmentUpsertArgs>(args: SelectSubset<T, AdjustmentUpsertArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Adjustments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentCountArgs} args - Arguments to filter Adjustments to count.
     * @example
     * // Count the number of Adjustments
     * const count = await prisma.adjustment.count({
     *   where: {
     *     // ... the filter for the Adjustments we want to count
     *   }
     * })
    **/
    count<T extends AdjustmentCountArgs>(
      args?: Subset<T, AdjustmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdjustmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Adjustment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdjustmentAggregateArgs>(args: Subset<T, AdjustmentAggregateArgs>): Prisma.PrismaPromise<GetAdjustmentAggregateType<T>>

    /**
     * Group by Adjustment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdjustmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdjustmentGroupByArgs['orderBy'] }
        : { orderBy?: AdjustmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdjustmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdjustmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Adjustment model
   */
  readonly fields: AdjustmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Adjustment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdjustmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    material<T extends RawMaterialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RawMaterialDefaultArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Adjustment model
   */ 
  interface AdjustmentFieldRefs {
    readonly id: FieldRef<"Adjustment", 'String'>
    readonly materialId: FieldRef<"Adjustment", 'String'>
    readonly quantity: FieldRef<"Adjustment", 'Float'>
    readonly reason: FieldRef<"Adjustment", 'String'>
    readonly notes: FieldRef<"Adjustment", 'String'>
    readonly createdAt: FieldRef<"Adjustment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Adjustment findUnique
   */
  export type AdjustmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which Adjustment to fetch.
     */
    where: AdjustmentWhereUniqueInput
  }

  /**
   * Adjustment findUniqueOrThrow
   */
  export type AdjustmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which Adjustment to fetch.
     */
    where: AdjustmentWhereUniqueInput
  }

  /**
   * Adjustment findFirst
   */
  export type AdjustmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which Adjustment to fetch.
     */
    where?: AdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adjustments to fetch.
     */
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Adjustments.
     */
    cursor?: AdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Adjustments.
     */
    distinct?: AdjustmentScalarFieldEnum | AdjustmentScalarFieldEnum[]
  }

  /**
   * Adjustment findFirstOrThrow
   */
  export type AdjustmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which Adjustment to fetch.
     */
    where?: AdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adjustments to fetch.
     */
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Adjustments.
     */
    cursor?: AdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Adjustments.
     */
    distinct?: AdjustmentScalarFieldEnum | AdjustmentScalarFieldEnum[]
  }

  /**
   * Adjustment findMany
   */
  export type AdjustmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * Filter, which Adjustments to fetch.
     */
    where?: AdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adjustments to fetch.
     */
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Adjustments.
     */
    cursor?: AdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adjustments.
     */
    skip?: number
    distinct?: AdjustmentScalarFieldEnum | AdjustmentScalarFieldEnum[]
  }

  /**
   * Adjustment create
   */
  export type AdjustmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Adjustment.
     */
    data: XOR<AdjustmentCreateInput, AdjustmentUncheckedCreateInput>
  }

  /**
   * Adjustment createMany
   */
  export type AdjustmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Adjustments.
     */
    data: AdjustmentCreateManyInput | AdjustmentCreateManyInput[]
  }

  /**
   * Adjustment createManyAndReturn
   */
  export type AdjustmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Adjustments.
     */
    data: AdjustmentCreateManyInput | AdjustmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Adjustment update
   */
  export type AdjustmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Adjustment.
     */
    data: XOR<AdjustmentUpdateInput, AdjustmentUncheckedUpdateInput>
    /**
     * Choose, which Adjustment to update.
     */
    where: AdjustmentWhereUniqueInput
  }

  /**
   * Adjustment updateMany
   */
  export type AdjustmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Adjustments.
     */
    data: XOR<AdjustmentUpdateManyMutationInput, AdjustmentUncheckedUpdateManyInput>
    /**
     * Filter which Adjustments to update
     */
    where?: AdjustmentWhereInput
  }

  /**
   * Adjustment upsert
   */
  export type AdjustmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Adjustment to update in case it exists.
     */
    where: AdjustmentWhereUniqueInput
    /**
     * In case the Adjustment found by the `where` argument doesn't exist, create a new Adjustment with this data.
     */
    create: XOR<AdjustmentCreateInput, AdjustmentUncheckedCreateInput>
    /**
     * In case the Adjustment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdjustmentUpdateInput, AdjustmentUncheckedUpdateInput>
  }

  /**
   * Adjustment delete
   */
  export type AdjustmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
    /**
     * Filter which Adjustment to delete.
     */
    where: AdjustmentWhereUniqueInput
  }

  /**
   * Adjustment deleteMany
   */
  export type AdjustmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Adjustments to delete
     */
    where?: AdjustmentWhereInput
  }

  /**
   * Adjustment without action
   */
  export type AdjustmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdjustmentInclude<ExtArgs> | null
  }


  /**
   * Model PurchaseOrder
   */

  export type AggregatePurchaseOrder = {
    _count: PurchaseOrderCountAggregateOutputType | null
    _min: PurchaseOrderMinAggregateOutputType | null
    _max: PurchaseOrderMaxAggregateOutputType | null
  }

  export type PurchaseOrderMinAggregateOutputType = {
    id: string | null
    supplierId: string | null
    orderDate: Date | null
    expectedDate: Date | null
    receivedDate: Date | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseOrderMaxAggregateOutputType = {
    id: string | null
    supplierId: string | null
    orderDate: Date | null
    expectedDate: Date | null
    receivedDate: Date | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseOrderCountAggregateOutputType = {
    id: number
    supplierId: number
    orderDate: number
    expectedDate: number
    receivedDate: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PurchaseOrderMinAggregateInputType = {
    id?: true
    supplierId?: true
    orderDate?: true
    expectedDate?: true
    receivedDate?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseOrderMaxAggregateInputType = {
    id?: true
    supplierId?: true
    orderDate?: true
    expectedDate?: true
    receivedDate?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseOrderCountAggregateInputType = {
    id?: true
    supplierId?: true
    orderDate?: true
    expectedDate?: true
    receivedDate?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PurchaseOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseOrder to aggregate.
     */
    where?: PurchaseOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrders to fetch.
     */
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PurchaseOrders
    **/
    _count?: true | PurchaseOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseOrderMaxAggregateInputType
  }

  export type GetPurchaseOrderAggregateType<T extends PurchaseOrderAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchaseOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchaseOrder[P]>
      : GetScalarType<T[P], AggregatePurchaseOrder[P]>
  }




  export type PurchaseOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseOrderWhereInput
    orderBy?: PurchaseOrderOrderByWithAggregationInput | PurchaseOrderOrderByWithAggregationInput[]
    by: PurchaseOrderScalarFieldEnum[] | PurchaseOrderScalarFieldEnum
    having?: PurchaseOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseOrderCountAggregateInputType | true
    _min?: PurchaseOrderMinAggregateInputType
    _max?: PurchaseOrderMaxAggregateInputType
  }

  export type PurchaseOrderGroupByOutputType = {
    id: string
    supplierId: string
    orderDate: Date
    expectedDate: Date | null
    receivedDate: Date | null
    status: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: PurchaseOrderCountAggregateOutputType | null
    _min: PurchaseOrderMinAggregateOutputType | null
    _max: PurchaseOrderMaxAggregateOutputType | null
  }

  type GetPurchaseOrderGroupByPayload<T extends PurchaseOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseOrderGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseOrderGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supplierId?: boolean
    orderDate?: boolean
    expectedDate?: boolean
    receivedDate?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    items?: boolean | PurchaseOrder$itemsArgs<ExtArgs>
    _count?: boolean | PurchaseOrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseOrder"]>

  export type PurchaseOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supplierId?: boolean
    orderDate?: boolean
    expectedDate?: boolean
    receivedDate?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseOrder"]>

  export type PurchaseOrderSelectScalar = {
    id?: boolean
    supplierId?: boolean
    orderDate?: boolean
    expectedDate?: boolean
    receivedDate?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PurchaseOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    items?: boolean | PurchaseOrder$itemsArgs<ExtArgs>
    _count?: boolean | PurchaseOrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PurchaseOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }

  export type $PurchaseOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PurchaseOrder"
    objects: {
      supplier: Prisma.$SupplierPayload<ExtArgs>
      items: Prisma.$PurchaseOrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      supplierId: string
      orderDate: Date
      expectedDate: Date | null
      receivedDate: Date | null
      status: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["purchaseOrder"]>
    composites: {}
  }

  type PurchaseOrderGetPayload<S extends boolean | null | undefined | PurchaseOrderDefaultArgs> = $Result.GetResult<Prisma.$PurchaseOrderPayload, S>

  type PurchaseOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PurchaseOrderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PurchaseOrderCountAggregateInputType | true
    }

  export interface PurchaseOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PurchaseOrder'], meta: { name: 'PurchaseOrder' } }
    /**
     * Find zero or one PurchaseOrder that matches the filter.
     * @param {PurchaseOrderFindUniqueArgs} args - Arguments to find a PurchaseOrder
     * @example
     * // Get one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseOrderFindUniqueArgs>(args: SelectSubset<T, PurchaseOrderFindUniqueArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PurchaseOrder that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PurchaseOrderFindUniqueOrThrowArgs} args - Arguments to find a PurchaseOrder
     * @example
     * // Get one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PurchaseOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderFindFirstArgs} args - Arguments to find a PurchaseOrder
     * @example
     * // Get one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseOrderFindFirstArgs>(args?: SelectSubset<T, PurchaseOrderFindFirstArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PurchaseOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderFindFirstOrThrowArgs} args - Arguments to find a PurchaseOrder
     * @example
     * // Get one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PurchaseOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PurchaseOrders
     * const purchaseOrders = await prisma.purchaseOrder.findMany()
     * 
     * // Get first 10 PurchaseOrders
     * const purchaseOrders = await prisma.purchaseOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseOrderWithIdOnly = await prisma.purchaseOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseOrderFindManyArgs>(args?: SelectSubset<T, PurchaseOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PurchaseOrder.
     * @param {PurchaseOrderCreateArgs} args - Arguments to create a PurchaseOrder.
     * @example
     * // Create one PurchaseOrder
     * const PurchaseOrder = await prisma.purchaseOrder.create({
     *   data: {
     *     // ... data to create a PurchaseOrder
     *   }
     * })
     * 
     */
    create<T extends PurchaseOrderCreateArgs>(args: SelectSubset<T, PurchaseOrderCreateArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PurchaseOrders.
     * @param {PurchaseOrderCreateManyArgs} args - Arguments to create many PurchaseOrders.
     * @example
     * // Create many PurchaseOrders
     * const purchaseOrder = await prisma.purchaseOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseOrderCreateManyArgs>(args?: SelectSubset<T, PurchaseOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PurchaseOrders and returns the data saved in the database.
     * @param {PurchaseOrderCreateManyAndReturnArgs} args - Arguments to create many PurchaseOrders.
     * @example
     * // Create many PurchaseOrders
     * const purchaseOrder = await prisma.purchaseOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PurchaseOrders and only return the `id`
     * const purchaseOrderWithIdOnly = await prisma.purchaseOrder.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurchaseOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, PurchaseOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PurchaseOrder.
     * @param {PurchaseOrderDeleteArgs} args - Arguments to delete one PurchaseOrder.
     * @example
     * // Delete one PurchaseOrder
     * const PurchaseOrder = await prisma.purchaseOrder.delete({
     *   where: {
     *     // ... filter to delete one PurchaseOrder
     *   }
     * })
     * 
     */
    delete<T extends PurchaseOrderDeleteArgs>(args: SelectSubset<T, PurchaseOrderDeleteArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PurchaseOrder.
     * @param {PurchaseOrderUpdateArgs} args - Arguments to update one PurchaseOrder.
     * @example
     * // Update one PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseOrderUpdateArgs>(args: SelectSubset<T, PurchaseOrderUpdateArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PurchaseOrders.
     * @param {PurchaseOrderDeleteManyArgs} args - Arguments to filter PurchaseOrders to delete.
     * @example
     * // Delete a few PurchaseOrders
     * const { count } = await prisma.purchaseOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseOrderDeleteManyArgs>(args?: SelectSubset<T, PurchaseOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PurchaseOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PurchaseOrders
     * const purchaseOrder = await prisma.purchaseOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseOrderUpdateManyArgs>(args: SelectSubset<T, PurchaseOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PurchaseOrder.
     * @param {PurchaseOrderUpsertArgs} args - Arguments to update or create a PurchaseOrder.
     * @example
     * // Update or create a PurchaseOrder
     * const purchaseOrder = await prisma.purchaseOrder.upsert({
     *   create: {
     *     // ... data to create a PurchaseOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PurchaseOrder we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseOrderUpsertArgs>(args: SelectSubset<T, PurchaseOrderUpsertArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PurchaseOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderCountArgs} args - Arguments to filter PurchaseOrders to count.
     * @example
     * // Count the number of PurchaseOrders
     * const count = await prisma.purchaseOrder.count({
     *   where: {
     *     // ... the filter for the PurchaseOrders we want to count
     *   }
     * })
    **/
    count<T extends PurchaseOrderCountArgs>(
      args?: Subset<T, PurchaseOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PurchaseOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseOrderAggregateArgs>(args: Subset<T, PurchaseOrderAggregateArgs>): Prisma.PrismaPromise<GetPurchaseOrderAggregateType<T>>

    /**
     * Group by PurchaseOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseOrderGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PurchaseOrder model
   */
  readonly fields: PurchaseOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PurchaseOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplier<T extends SupplierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupplierDefaultArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends PurchaseOrder$itemsArgs<ExtArgs> = {}>(args?: Subset<T, PurchaseOrder$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PurchaseOrder model
   */ 
  interface PurchaseOrderFieldRefs {
    readonly id: FieldRef<"PurchaseOrder", 'String'>
    readonly supplierId: FieldRef<"PurchaseOrder", 'String'>
    readonly orderDate: FieldRef<"PurchaseOrder", 'DateTime'>
    readonly expectedDate: FieldRef<"PurchaseOrder", 'DateTime'>
    readonly receivedDate: FieldRef<"PurchaseOrder", 'DateTime'>
    readonly status: FieldRef<"PurchaseOrder", 'String'>
    readonly notes: FieldRef<"PurchaseOrder", 'String'>
    readonly createdAt: FieldRef<"PurchaseOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"PurchaseOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PurchaseOrder findUnique
   */
  export type PurchaseOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrder to fetch.
     */
    where: PurchaseOrderWhereUniqueInput
  }

  /**
   * PurchaseOrder findUniqueOrThrow
   */
  export type PurchaseOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrder to fetch.
     */
    where: PurchaseOrderWhereUniqueInput
  }

  /**
   * PurchaseOrder findFirst
   */
  export type PurchaseOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrder to fetch.
     */
    where?: PurchaseOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrders to fetch.
     */
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseOrders.
     */
    cursor?: PurchaseOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseOrders.
     */
    distinct?: PurchaseOrderScalarFieldEnum | PurchaseOrderScalarFieldEnum[]
  }

  /**
   * PurchaseOrder findFirstOrThrow
   */
  export type PurchaseOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrder to fetch.
     */
    where?: PurchaseOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrders to fetch.
     */
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseOrders.
     */
    cursor?: PurchaseOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseOrders.
     */
    distinct?: PurchaseOrderScalarFieldEnum | PurchaseOrderScalarFieldEnum[]
  }

  /**
   * PurchaseOrder findMany
   */
  export type PurchaseOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrders to fetch.
     */
    where?: PurchaseOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrders to fetch.
     */
    orderBy?: PurchaseOrderOrderByWithRelationInput | PurchaseOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PurchaseOrders.
     */
    cursor?: PurchaseOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrders.
     */
    skip?: number
    distinct?: PurchaseOrderScalarFieldEnum | PurchaseOrderScalarFieldEnum[]
  }

  /**
   * PurchaseOrder create
   */
  export type PurchaseOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a PurchaseOrder.
     */
    data: XOR<PurchaseOrderCreateInput, PurchaseOrderUncheckedCreateInput>
  }

  /**
   * PurchaseOrder createMany
   */
  export type PurchaseOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PurchaseOrders.
     */
    data: PurchaseOrderCreateManyInput | PurchaseOrderCreateManyInput[]
  }

  /**
   * PurchaseOrder createManyAndReturn
   */
  export type PurchaseOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PurchaseOrders.
     */
    data: PurchaseOrderCreateManyInput | PurchaseOrderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PurchaseOrder update
   */
  export type PurchaseOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a PurchaseOrder.
     */
    data: XOR<PurchaseOrderUpdateInput, PurchaseOrderUncheckedUpdateInput>
    /**
     * Choose, which PurchaseOrder to update.
     */
    where: PurchaseOrderWhereUniqueInput
  }

  /**
   * PurchaseOrder updateMany
   */
  export type PurchaseOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PurchaseOrders.
     */
    data: XOR<PurchaseOrderUpdateManyMutationInput, PurchaseOrderUncheckedUpdateManyInput>
    /**
     * Filter which PurchaseOrders to update
     */
    where?: PurchaseOrderWhereInput
  }

  /**
   * PurchaseOrder upsert
   */
  export type PurchaseOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the PurchaseOrder to update in case it exists.
     */
    where: PurchaseOrderWhereUniqueInput
    /**
     * In case the PurchaseOrder found by the `where` argument doesn't exist, create a new PurchaseOrder with this data.
     */
    create: XOR<PurchaseOrderCreateInput, PurchaseOrderUncheckedCreateInput>
    /**
     * In case the PurchaseOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseOrderUpdateInput, PurchaseOrderUncheckedUpdateInput>
  }

  /**
   * PurchaseOrder delete
   */
  export type PurchaseOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
    /**
     * Filter which PurchaseOrder to delete.
     */
    where: PurchaseOrderWhereUniqueInput
  }

  /**
   * PurchaseOrder deleteMany
   */
  export type PurchaseOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseOrders to delete
     */
    where?: PurchaseOrderWhereInput
  }

  /**
   * PurchaseOrder.items
   */
  export type PurchaseOrder$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    where?: PurchaseOrderItemWhereInput
    orderBy?: PurchaseOrderItemOrderByWithRelationInput | PurchaseOrderItemOrderByWithRelationInput[]
    cursor?: PurchaseOrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseOrderItemScalarFieldEnum | PurchaseOrderItemScalarFieldEnum[]
  }

  /**
   * PurchaseOrder without action
   */
  export type PurchaseOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrder
     */
    select?: PurchaseOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderInclude<ExtArgs> | null
  }


  /**
   * Model PurchaseOrderItem
   */

  export type AggregatePurchaseOrderItem = {
    _count: PurchaseOrderItemCountAggregateOutputType | null
    _avg: PurchaseOrderItemAvgAggregateOutputType | null
    _sum: PurchaseOrderItemSumAggregateOutputType | null
    _min: PurchaseOrderItemMinAggregateOutputType | null
    _max: PurchaseOrderItemMaxAggregateOutputType | null
  }

  export type PurchaseOrderItemAvgAggregateOutputType = {
    quantity: number | null
    unitCost: number | null
    receivedQty: number | null
  }

  export type PurchaseOrderItemSumAggregateOutputType = {
    quantity: number | null
    unitCost: number | null
    receivedQty: number | null
  }

  export type PurchaseOrderItemMinAggregateOutputType = {
    id: string | null
    purchaseOrderId: string | null
    materialId: string | null
    quantity: number | null
    unitCost: number | null
    receivedQty: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseOrderItemMaxAggregateOutputType = {
    id: string | null
    purchaseOrderId: string | null
    materialId: string | null
    quantity: number | null
    unitCost: number | null
    receivedQty: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseOrderItemCountAggregateOutputType = {
    id: number
    purchaseOrderId: number
    materialId: number
    quantity: number
    unitCost: number
    receivedQty: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PurchaseOrderItemAvgAggregateInputType = {
    quantity?: true
    unitCost?: true
    receivedQty?: true
  }

  export type PurchaseOrderItemSumAggregateInputType = {
    quantity?: true
    unitCost?: true
    receivedQty?: true
  }

  export type PurchaseOrderItemMinAggregateInputType = {
    id?: true
    purchaseOrderId?: true
    materialId?: true
    quantity?: true
    unitCost?: true
    receivedQty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseOrderItemMaxAggregateInputType = {
    id?: true
    purchaseOrderId?: true
    materialId?: true
    quantity?: true
    unitCost?: true
    receivedQty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseOrderItemCountAggregateInputType = {
    id?: true
    purchaseOrderId?: true
    materialId?: true
    quantity?: true
    unitCost?: true
    receivedQty?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PurchaseOrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseOrderItem to aggregate.
     */
    where?: PurchaseOrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrderItems to fetch.
     */
    orderBy?: PurchaseOrderItemOrderByWithRelationInput | PurchaseOrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseOrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PurchaseOrderItems
    **/
    _count?: true | PurchaseOrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseOrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseOrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseOrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseOrderItemMaxAggregateInputType
  }

  export type GetPurchaseOrderItemAggregateType<T extends PurchaseOrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchaseOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchaseOrderItem[P]>
      : GetScalarType<T[P], AggregatePurchaseOrderItem[P]>
  }




  export type PurchaseOrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseOrderItemWhereInput
    orderBy?: PurchaseOrderItemOrderByWithAggregationInput | PurchaseOrderItemOrderByWithAggregationInput[]
    by: PurchaseOrderItemScalarFieldEnum[] | PurchaseOrderItemScalarFieldEnum
    having?: PurchaseOrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseOrderItemCountAggregateInputType | true
    _avg?: PurchaseOrderItemAvgAggregateInputType
    _sum?: PurchaseOrderItemSumAggregateInputType
    _min?: PurchaseOrderItemMinAggregateInputType
    _max?: PurchaseOrderItemMaxAggregateInputType
  }

  export type PurchaseOrderItemGroupByOutputType = {
    id: string
    purchaseOrderId: string
    materialId: string
    quantity: number
    unitCost: number
    receivedQty: number
    createdAt: Date
    updatedAt: Date
    _count: PurchaseOrderItemCountAggregateOutputType | null
    _avg: PurchaseOrderItemAvgAggregateOutputType | null
    _sum: PurchaseOrderItemSumAggregateOutputType | null
    _min: PurchaseOrderItemMinAggregateOutputType | null
    _max: PurchaseOrderItemMaxAggregateOutputType | null
  }

  type GetPurchaseOrderItemGroupByPayload<T extends PurchaseOrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseOrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseOrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseOrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseOrderItemGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseOrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchaseOrderId?: boolean
    materialId?: boolean
    quantity?: boolean
    unitCost?: boolean
    receivedQty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    material?: boolean | RawMaterialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseOrderItem"]>

  export type PurchaseOrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchaseOrderId?: boolean
    materialId?: boolean
    quantity?: boolean
    unitCost?: boolean
    receivedQty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    material?: boolean | RawMaterialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseOrderItem"]>

  export type PurchaseOrderItemSelectScalar = {
    id?: boolean
    purchaseOrderId?: boolean
    materialId?: boolean
    quantity?: boolean
    unitCost?: boolean
    receivedQty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PurchaseOrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    material?: boolean | RawMaterialDefaultArgs<ExtArgs>
  }
  export type PurchaseOrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchaseOrder?: boolean | PurchaseOrderDefaultArgs<ExtArgs>
    material?: boolean | RawMaterialDefaultArgs<ExtArgs>
  }

  export type $PurchaseOrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PurchaseOrderItem"
    objects: {
      purchaseOrder: Prisma.$PurchaseOrderPayload<ExtArgs>
      material: Prisma.$RawMaterialPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      purchaseOrderId: string
      materialId: string
      quantity: number
      unitCost: number
      receivedQty: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["purchaseOrderItem"]>
    composites: {}
  }

  type PurchaseOrderItemGetPayload<S extends boolean | null | undefined | PurchaseOrderItemDefaultArgs> = $Result.GetResult<Prisma.$PurchaseOrderItemPayload, S>

  type PurchaseOrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PurchaseOrderItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PurchaseOrderItemCountAggregateInputType | true
    }

  export interface PurchaseOrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PurchaseOrderItem'], meta: { name: 'PurchaseOrderItem' } }
    /**
     * Find zero or one PurchaseOrderItem that matches the filter.
     * @param {PurchaseOrderItemFindUniqueArgs} args - Arguments to find a PurchaseOrderItem
     * @example
     * // Get one PurchaseOrderItem
     * const purchaseOrderItem = await prisma.purchaseOrderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseOrderItemFindUniqueArgs>(args: SelectSubset<T, PurchaseOrderItemFindUniqueArgs<ExtArgs>>): Prisma__PurchaseOrderItemClient<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PurchaseOrderItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PurchaseOrderItemFindUniqueOrThrowArgs} args - Arguments to find a PurchaseOrderItem
     * @example
     * // Get one PurchaseOrderItem
     * const purchaseOrderItem = await prisma.purchaseOrderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseOrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseOrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseOrderItemClient<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PurchaseOrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderItemFindFirstArgs} args - Arguments to find a PurchaseOrderItem
     * @example
     * // Get one PurchaseOrderItem
     * const purchaseOrderItem = await prisma.purchaseOrderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseOrderItemFindFirstArgs>(args?: SelectSubset<T, PurchaseOrderItemFindFirstArgs<ExtArgs>>): Prisma__PurchaseOrderItemClient<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PurchaseOrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderItemFindFirstOrThrowArgs} args - Arguments to find a PurchaseOrderItem
     * @example
     * // Get one PurchaseOrderItem
     * const purchaseOrderItem = await prisma.purchaseOrderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseOrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseOrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseOrderItemClient<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PurchaseOrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PurchaseOrderItems
     * const purchaseOrderItems = await prisma.purchaseOrderItem.findMany()
     * 
     * // Get first 10 PurchaseOrderItems
     * const purchaseOrderItems = await prisma.purchaseOrderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseOrderItemWithIdOnly = await prisma.purchaseOrderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseOrderItemFindManyArgs>(args?: SelectSubset<T, PurchaseOrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PurchaseOrderItem.
     * @param {PurchaseOrderItemCreateArgs} args - Arguments to create a PurchaseOrderItem.
     * @example
     * // Create one PurchaseOrderItem
     * const PurchaseOrderItem = await prisma.purchaseOrderItem.create({
     *   data: {
     *     // ... data to create a PurchaseOrderItem
     *   }
     * })
     * 
     */
    create<T extends PurchaseOrderItemCreateArgs>(args: SelectSubset<T, PurchaseOrderItemCreateArgs<ExtArgs>>): Prisma__PurchaseOrderItemClient<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PurchaseOrderItems.
     * @param {PurchaseOrderItemCreateManyArgs} args - Arguments to create many PurchaseOrderItems.
     * @example
     * // Create many PurchaseOrderItems
     * const purchaseOrderItem = await prisma.purchaseOrderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseOrderItemCreateManyArgs>(args?: SelectSubset<T, PurchaseOrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PurchaseOrderItems and returns the data saved in the database.
     * @param {PurchaseOrderItemCreateManyAndReturnArgs} args - Arguments to create many PurchaseOrderItems.
     * @example
     * // Create many PurchaseOrderItems
     * const purchaseOrderItem = await prisma.purchaseOrderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PurchaseOrderItems and only return the `id`
     * const purchaseOrderItemWithIdOnly = await prisma.purchaseOrderItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurchaseOrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, PurchaseOrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PurchaseOrderItem.
     * @param {PurchaseOrderItemDeleteArgs} args - Arguments to delete one PurchaseOrderItem.
     * @example
     * // Delete one PurchaseOrderItem
     * const PurchaseOrderItem = await prisma.purchaseOrderItem.delete({
     *   where: {
     *     // ... filter to delete one PurchaseOrderItem
     *   }
     * })
     * 
     */
    delete<T extends PurchaseOrderItemDeleteArgs>(args: SelectSubset<T, PurchaseOrderItemDeleteArgs<ExtArgs>>): Prisma__PurchaseOrderItemClient<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PurchaseOrderItem.
     * @param {PurchaseOrderItemUpdateArgs} args - Arguments to update one PurchaseOrderItem.
     * @example
     * // Update one PurchaseOrderItem
     * const purchaseOrderItem = await prisma.purchaseOrderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseOrderItemUpdateArgs>(args: SelectSubset<T, PurchaseOrderItemUpdateArgs<ExtArgs>>): Prisma__PurchaseOrderItemClient<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PurchaseOrderItems.
     * @param {PurchaseOrderItemDeleteManyArgs} args - Arguments to filter PurchaseOrderItems to delete.
     * @example
     * // Delete a few PurchaseOrderItems
     * const { count } = await prisma.purchaseOrderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseOrderItemDeleteManyArgs>(args?: SelectSubset<T, PurchaseOrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PurchaseOrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PurchaseOrderItems
     * const purchaseOrderItem = await prisma.purchaseOrderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseOrderItemUpdateManyArgs>(args: SelectSubset<T, PurchaseOrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PurchaseOrderItem.
     * @param {PurchaseOrderItemUpsertArgs} args - Arguments to update or create a PurchaseOrderItem.
     * @example
     * // Update or create a PurchaseOrderItem
     * const purchaseOrderItem = await prisma.purchaseOrderItem.upsert({
     *   create: {
     *     // ... data to create a PurchaseOrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PurchaseOrderItem we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseOrderItemUpsertArgs>(args: SelectSubset<T, PurchaseOrderItemUpsertArgs<ExtArgs>>): Prisma__PurchaseOrderItemClient<$Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PurchaseOrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderItemCountArgs} args - Arguments to filter PurchaseOrderItems to count.
     * @example
     * // Count the number of PurchaseOrderItems
     * const count = await prisma.purchaseOrderItem.count({
     *   where: {
     *     // ... the filter for the PurchaseOrderItems we want to count
     *   }
     * })
    **/
    count<T extends PurchaseOrderItemCountArgs>(
      args?: Subset<T, PurchaseOrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseOrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PurchaseOrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseOrderItemAggregateArgs>(args: Subset<T, PurchaseOrderItemAggregateArgs>): Prisma.PrismaPromise<GetPurchaseOrderItemAggregateType<T>>

    /**
     * Group by PurchaseOrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseOrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseOrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseOrderItemGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseOrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseOrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PurchaseOrderItem model
   */
  readonly fields: PurchaseOrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PurchaseOrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseOrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purchaseOrder<T extends PurchaseOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PurchaseOrderDefaultArgs<ExtArgs>>): Prisma__PurchaseOrderClient<$Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    material<T extends RawMaterialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RawMaterialDefaultArgs<ExtArgs>>): Prisma__RawMaterialClient<$Result.GetResult<Prisma.$RawMaterialPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PurchaseOrderItem model
   */ 
  interface PurchaseOrderItemFieldRefs {
    readonly id: FieldRef<"PurchaseOrderItem", 'String'>
    readonly purchaseOrderId: FieldRef<"PurchaseOrderItem", 'String'>
    readonly materialId: FieldRef<"PurchaseOrderItem", 'String'>
    readonly quantity: FieldRef<"PurchaseOrderItem", 'Float'>
    readonly unitCost: FieldRef<"PurchaseOrderItem", 'Float'>
    readonly receivedQty: FieldRef<"PurchaseOrderItem", 'Float'>
    readonly createdAt: FieldRef<"PurchaseOrderItem", 'DateTime'>
    readonly updatedAt: FieldRef<"PurchaseOrderItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PurchaseOrderItem findUnique
   */
  export type PurchaseOrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrderItem to fetch.
     */
    where: PurchaseOrderItemWhereUniqueInput
  }

  /**
   * PurchaseOrderItem findUniqueOrThrow
   */
  export type PurchaseOrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrderItem to fetch.
     */
    where: PurchaseOrderItemWhereUniqueInput
  }

  /**
   * PurchaseOrderItem findFirst
   */
  export type PurchaseOrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrderItem to fetch.
     */
    where?: PurchaseOrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrderItems to fetch.
     */
    orderBy?: PurchaseOrderItemOrderByWithRelationInput | PurchaseOrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseOrderItems.
     */
    cursor?: PurchaseOrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseOrderItems.
     */
    distinct?: PurchaseOrderItemScalarFieldEnum | PurchaseOrderItemScalarFieldEnum[]
  }

  /**
   * PurchaseOrderItem findFirstOrThrow
   */
  export type PurchaseOrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrderItem to fetch.
     */
    where?: PurchaseOrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrderItems to fetch.
     */
    orderBy?: PurchaseOrderItemOrderByWithRelationInput | PurchaseOrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseOrderItems.
     */
    cursor?: PurchaseOrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseOrderItems.
     */
    distinct?: PurchaseOrderItemScalarFieldEnum | PurchaseOrderItemScalarFieldEnum[]
  }

  /**
   * PurchaseOrderItem findMany
   */
  export type PurchaseOrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseOrderItems to fetch.
     */
    where?: PurchaseOrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseOrderItems to fetch.
     */
    orderBy?: PurchaseOrderItemOrderByWithRelationInput | PurchaseOrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PurchaseOrderItems.
     */
    cursor?: PurchaseOrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseOrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseOrderItems.
     */
    skip?: number
    distinct?: PurchaseOrderItemScalarFieldEnum | PurchaseOrderItemScalarFieldEnum[]
  }

  /**
   * PurchaseOrderItem create
   */
  export type PurchaseOrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PurchaseOrderItem.
     */
    data: XOR<PurchaseOrderItemCreateInput, PurchaseOrderItemUncheckedCreateInput>
  }

  /**
   * PurchaseOrderItem createMany
   */
  export type PurchaseOrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PurchaseOrderItems.
     */
    data: PurchaseOrderItemCreateManyInput | PurchaseOrderItemCreateManyInput[]
  }

  /**
   * PurchaseOrderItem createManyAndReturn
   */
  export type PurchaseOrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PurchaseOrderItems.
     */
    data: PurchaseOrderItemCreateManyInput | PurchaseOrderItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PurchaseOrderItem update
   */
  export type PurchaseOrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PurchaseOrderItem.
     */
    data: XOR<PurchaseOrderItemUpdateInput, PurchaseOrderItemUncheckedUpdateInput>
    /**
     * Choose, which PurchaseOrderItem to update.
     */
    where: PurchaseOrderItemWhereUniqueInput
  }

  /**
   * PurchaseOrderItem updateMany
   */
  export type PurchaseOrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PurchaseOrderItems.
     */
    data: XOR<PurchaseOrderItemUpdateManyMutationInput, PurchaseOrderItemUncheckedUpdateManyInput>
    /**
     * Filter which PurchaseOrderItems to update
     */
    where?: PurchaseOrderItemWhereInput
  }

  /**
   * PurchaseOrderItem upsert
   */
  export type PurchaseOrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PurchaseOrderItem to update in case it exists.
     */
    where: PurchaseOrderItemWhereUniqueInput
    /**
     * In case the PurchaseOrderItem found by the `where` argument doesn't exist, create a new PurchaseOrderItem with this data.
     */
    create: XOR<PurchaseOrderItemCreateInput, PurchaseOrderItemUncheckedCreateInput>
    /**
     * In case the PurchaseOrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseOrderItemUpdateInput, PurchaseOrderItemUncheckedUpdateInput>
  }

  /**
   * PurchaseOrderItem delete
   */
  export type PurchaseOrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
    /**
     * Filter which PurchaseOrderItem to delete.
     */
    where: PurchaseOrderItemWhereUniqueInput
  }

  /**
   * PurchaseOrderItem deleteMany
   */
  export type PurchaseOrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseOrderItems to delete
     */
    where?: PurchaseOrderItemWhereInput
  }

  /**
   * PurchaseOrderItem without action
   */
  export type PurchaseOrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseOrderItem
     */
    select?: PurchaseOrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseOrderItemInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    address: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    address?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    email: string | null
    phone: string | null
    address: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sales?: boolean | Customer$salesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | Customer$salesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      sales: Prisma.$SalePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      phone: string | null
      address: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sales<T extends Customer$salesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */ 
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly notes: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer.sales
   */
  export type Customer$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleAvgAggregateOutputType = {
    totalAmount: number | null
    discount: number | null
    tax: number | null
  }

  export type SaleSumAggregateOutputType = {
    totalAmount: number | null
    discount: number | null
    tax: number | null
  }

  export type SaleMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    saleDate: Date | null
    totalAmount: number | null
    discount: number | null
    tax: number | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    saleDate: Date | null
    totalAmount: number | null
    discount: number | null
    tax: number | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SaleCountAggregateOutputType = {
    id: number
    customerId: number
    saleDate: number
    totalAmount: number
    discount: number
    tax: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SaleAvgAggregateInputType = {
    totalAmount?: true
    discount?: true
    tax?: true
  }

  export type SaleSumAggregateInputType = {
    totalAmount?: true
    discount?: true
    tax?: true
  }

  export type SaleMinAggregateInputType = {
    id?: true
    customerId?: true
    saleDate?: true
    totalAmount?: true
    discount?: true
    tax?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleMaxAggregateInputType = {
    id?: true
    customerId?: true
    saleDate?: true
    totalAmount?: true
    discount?: true
    tax?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SaleCountAggregateInputType = {
    id?: true
    customerId?: true
    saleDate?: true
    totalAmount?: true
    discount?: true
    tax?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sale to aggregate.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type SaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithAggregationInput | SaleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: SaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _avg?: SaleAvgAggregateInputType
    _sum?: SaleSumAggregateInputType
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    id: string
    customerId: string | null
    saleDate: Date
    totalAmount: number
    discount: number
    tax: number
    status: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type SaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    saleDate?: boolean
    totalAmount?: boolean
    discount?: boolean
    tax?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | Sale$customerArgs<ExtArgs>
    items?: boolean | Sale$itemsArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    saleDate?: boolean
    totalAmount?: boolean
    discount?: boolean
    tax?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | Sale$customerArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectScalar = {
    id?: boolean
    customerId?: boolean
    saleDate?: boolean
    totalAmount?: boolean
    discount?: boolean
    tax?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Sale$customerArgs<ExtArgs>
    items?: boolean | Sale$itemsArgs<ExtArgs>
    _count?: boolean | SaleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SaleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Sale$customerArgs<ExtArgs>
  }

  export type $SalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sale"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      items: Prisma.$SaleItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      saleDate: Date
      totalAmount: number
      discount: number
      tax: number
      status: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = $Result.GetResult<Prisma.$SalePayload, S>

  type SaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface SaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sale'], meta: { name: 'Sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {SaleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFindUniqueArgs>(args: SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SaleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFindFirstArgs>(args?: SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleFindManyArgs>(args?: SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Sale.
     * @param {SaleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends SaleCreateArgs>(args: SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sales.
     * @param {SaleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleCreateManyArgs>(args?: SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales and returns the data saved in the database.
     * @param {SaleCreateManyAndReturnArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Sale.
     * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends SaleDeleteArgs>(args: SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Sale.
     * @param {SaleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleUpdateArgs>(args: SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sales.
     * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDeleteManyArgs>(args?: SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleUpdateManyArgs>(args: SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sale.
     * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends SaleUpsertArgs>(args: SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SaleCountArgs>(
      args?: Subset<T, SaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleGroupByArgs['orderBy'] }
        : { orderBy?: SaleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sale model
   */
  readonly fields: SaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends Sale$customerArgs<ExtArgs> = {}>(args?: Subset<T, Sale$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    items<T extends Sale$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Sale$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sale model
   */ 
  interface SaleFieldRefs {
    readonly id: FieldRef<"Sale", 'String'>
    readonly customerId: FieldRef<"Sale", 'String'>
    readonly saleDate: FieldRef<"Sale", 'DateTime'>
    readonly totalAmount: FieldRef<"Sale", 'Float'>
    readonly discount: FieldRef<"Sale", 'Float'>
    readonly tax: FieldRef<"Sale", 'Float'>
    readonly status: FieldRef<"Sale", 'String'>
    readonly notes: FieldRef<"Sale", 'String'>
    readonly createdAt: FieldRef<"Sale", 'DateTime'>
    readonly updatedAt: FieldRef<"Sale", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sale findUnique
   */
  export type SaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findUniqueOrThrow
   */
  export type SaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findFirst
   */
  export type SaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findFirstOrThrow
   */
  export type SaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findMany
   */
  export type SaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sales to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale create
   */
  export type SaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to create a Sale.
     */
    data: XOR<SaleCreateInput, SaleUncheckedCreateInput>
  }

  /**
   * Sale createMany
   */
  export type SaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
  }

  /**
   * Sale createManyAndReturn
   */
  export type SaleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale update
   */
  export type SaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to update a Sale.
     */
    data: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
    /**
     * Choose, which Sale to update.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale updateMany
   */
  export type SaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
  }

  /**
   * Sale upsert
   */
  export type SaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The filter to search for the Sale to update in case it exists.
     */
    where: SaleWhereUniqueInput
    /**
     * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
     */
    create: XOR<SaleCreateInput, SaleUncheckedCreateInput>
    /**
     * In case the Sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
  }

  /**
   * Sale delete
   */
  export type SaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter which Sale to delete.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale deleteMany
   */
  export type SaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales to delete
     */
    where?: SaleWhereInput
  }

  /**
   * Sale.customer
   */
  export type Sale$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * Sale.items
   */
  export type Sale$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    cursor?: SaleItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * Sale without action
   */
  export type SaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
  }


  /**
   * Model SaleItem
   */

  export type AggregateSaleItem = {
    _count: SaleItemCountAggregateOutputType | null
    _avg: SaleItemAvgAggregateOutputType | null
    _sum: SaleItemSumAggregateOutputType | null
    _min: SaleItemMinAggregateOutputType | null
    _max: SaleItemMaxAggregateOutputType | null
  }

  export type SaleItemAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
  }

  export type SaleItemSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
  }

  export type SaleItemMinAggregateOutputType = {
    id: string | null
    saleId: string | null
    finishedGoodId: string | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
    createdAt: Date | null
  }

  export type SaleItemMaxAggregateOutputType = {
    id: string | null
    saleId: string | null
    finishedGoodId: string | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
    createdAt: Date | null
  }

  export type SaleItemCountAggregateOutputType = {
    id: number
    saleId: number
    finishedGoodId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt: number
    _all: number
  }


  export type SaleItemAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type SaleItemSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type SaleItemMinAggregateInputType = {
    id?: true
    saleId?: true
    finishedGoodId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
  }

  export type SaleItemMaxAggregateInputType = {
    id?: true
    saleId?: true
    finishedGoodId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
  }

  export type SaleItemCountAggregateInputType = {
    id?: true
    saleId?: true
    finishedGoodId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
    _all?: true
  }

  export type SaleItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleItem to aggregate.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SaleItems
    **/
    _count?: true | SaleItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleItemMaxAggregateInputType
  }

  export type GetSaleItemAggregateType<T extends SaleItemAggregateArgs> = {
        [P in keyof T & keyof AggregateSaleItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaleItem[P]>
      : GetScalarType<T[P], AggregateSaleItem[P]>
  }




  export type SaleItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleItemWhereInput
    orderBy?: SaleItemOrderByWithAggregationInput | SaleItemOrderByWithAggregationInput[]
    by: SaleItemScalarFieldEnum[] | SaleItemScalarFieldEnum
    having?: SaleItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleItemCountAggregateInputType | true
    _avg?: SaleItemAvgAggregateInputType
    _sum?: SaleItemSumAggregateInputType
    _min?: SaleItemMinAggregateInputType
    _max?: SaleItemMaxAggregateInputType
  }

  export type SaleItemGroupByOutputType = {
    id: string
    saleId: string
    finishedGoodId: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt: Date
    _count: SaleItemCountAggregateOutputType | null
    _avg: SaleItemAvgAggregateOutputType | null
    _sum: SaleItemSumAggregateOutputType | null
    _min: SaleItemMinAggregateOutputType | null
    _max: SaleItemMaxAggregateOutputType | null
  }

  type GetSaleItemGroupByPayload<T extends SaleItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleItemGroupByOutputType[P]>
            : GetScalarType<T[P], SaleItemGroupByOutputType[P]>
        }
      >
    >


  export type SaleItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    finishedGoodId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    finishedGood?: boolean | FinishedGoodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saleItem"]>

  export type SaleItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    saleId?: boolean
    finishedGoodId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    finishedGood?: boolean | FinishedGoodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saleItem"]>

  export type SaleItemSelectScalar = {
    id?: boolean
    saleId?: boolean
    finishedGoodId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
  }

  export type SaleItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    finishedGood?: boolean | FinishedGoodDefaultArgs<ExtArgs>
  }
  export type SaleItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sale?: boolean | SaleDefaultArgs<ExtArgs>
    finishedGood?: boolean | FinishedGoodDefaultArgs<ExtArgs>
  }

  export type $SaleItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SaleItem"
    objects: {
      sale: Prisma.$SalePayload<ExtArgs>
      finishedGood: Prisma.$FinishedGoodPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      saleId: string
      finishedGoodId: string
      quantity: number
      unitPrice: number
      totalPrice: number
      createdAt: Date
    }, ExtArgs["result"]["saleItem"]>
    composites: {}
  }

  type SaleItemGetPayload<S extends boolean | null | undefined | SaleItemDefaultArgs> = $Result.GetResult<Prisma.$SaleItemPayload, S>

  type SaleItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SaleItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SaleItemCountAggregateInputType | true
    }

  export interface SaleItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SaleItem'], meta: { name: 'SaleItem' } }
    /**
     * Find zero or one SaleItem that matches the filter.
     * @param {SaleItemFindUniqueArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleItemFindUniqueArgs>(args: SelectSubset<T, SaleItemFindUniqueArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SaleItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SaleItemFindUniqueOrThrowArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleItemFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SaleItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindFirstArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleItemFindFirstArgs>(args?: SelectSubset<T, SaleItemFindFirstArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SaleItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindFirstOrThrowArgs} args - Arguments to find a SaleItem
     * @example
     * // Get one SaleItem
     * const saleItem = await prisma.saleItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleItemFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SaleItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SaleItems
     * const saleItems = await prisma.saleItem.findMany()
     * 
     * // Get first 10 SaleItems
     * const saleItems = await prisma.saleItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleItemWithIdOnly = await prisma.saleItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleItemFindManyArgs>(args?: SelectSubset<T, SaleItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SaleItem.
     * @param {SaleItemCreateArgs} args - Arguments to create a SaleItem.
     * @example
     * // Create one SaleItem
     * const SaleItem = await prisma.saleItem.create({
     *   data: {
     *     // ... data to create a SaleItem
     *   }
     * })
     * 
     */
    create<T extends SaleItemCreateArgs>(args: SelectSubset<T, SaleItemCreateArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SaleItems.
     * @param {SaleItemCreateManyArgs} args - Arguments to create many SaleItems.
     * @example
     * // Create many SaleItems
     * const saleItem = await prisma.saleItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleItemCreateManyArgs>(args?: SelectSubset<T, SaleItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SaleItems and returns the data saved in the database.
     * @param {SaleItemCreateManyAndReturnArgs} args - Arguments to create many SaleItems.
     * @example
     * // Create many SaleItems
     * const saleItem = await prisma.saleItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SaleItems and only return the `id`
     * const saleItemWithIdOnly = await prisma.saleItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleItemCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SaleItem.
     * @param {SaleItemDeleteArgs} args - Arguments to delete one SaleItem.
     * @example
     * // Delete one SaleItem
     * const SaleItem = await prisma.saleItem.delete({
     *   where: {
     *     // ... filter to delete one SaleItem
     *   }
     * })
     * 
     */
    delete<T extends SaleItemDeleteArgs>(args: SelectSubset<T, SaleItemDeleteArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SaleItem.
     * @param {SaleItemUpdateArgs} args - Arguments to update one SaleItem.
     * @example
     * // Update one SaleItem
     * const saleItem = await prisma.saleItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleItemUpdateArgs>(args: SelectSubset<T, SaleItemUpdateArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SaleItems.
     * @param {SaleItemDeleteManyArgs} args - Arguments to filter SaleItems to delete.
     * @example
     * // Delete a few SaleItems
     * const { count } = await prisma.saleItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleItemDeleteManyArgs>(args?: SelectSubset<T, SaleItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SaleItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SaleItems
     * const saleItem = await prisma.saleItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleItemUpdateManyArgs>(args: SelectSubset<T, SaleItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SaleItem.
     * @param {SaleItemUpsertArgs} args - Arguments to update or create a SaleItem.
     * @example
     * // Update or create a SaleItem
     * const saleItem = await prisma.saleItem.upsert({
     *   create: {
     *     // ... data to create a SaleItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SaleItem we want to update
     *   }
     * })
     */
    upsert<T extends SaleItemUpsertArgs>(args: SelectSubset<T, SaleItemUpsertArgs<ExtArgs>>): Prisma__SaleItemClient<$Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SaleItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemCountArgs} args - Arguments to filter SaleItems to count.
     * @example
     * // Count the number of SaleItems
     * const count = await prisma.saleItem.count({
     *   where: {
     *     // ... the filter for the SaleItems we want to count
     *   }
     * })
    **/
    count<T extends SaleItemCountArgs>(
      args?: Subset<T, SaleItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SaleItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleItemAggregateArgs>(args: Subset<T, SaleItemAggregateArgs>): Prisma.PrismaPromise<GetSaleItemAggregateType<T>>

    /**
     * Group by SaleItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleItemGroupByArgs['orderBy'] }
        : { orderBy?: SaleItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SaleItem model
   */
  readonly fields: SaleItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SaleItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sale<T extends SaleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SaleDefaultArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    finishedGood<T extends FinishedGoodDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FinishedGoodDefaultArgs<ExtArgs>>): Prisma__FinishedGoodClient<$Result.GetResult<Prisma.$FinishedGoodPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SaleItem model
   */ 
  interface SaleItemFieldRefs {
    readonly id: FieldRef<"SaleItem", 'String'>
    readonly saleId: FieldRef<"SaleItem", 'String'>
    readonly finishedGoodId: FieldRef<"SaleItem", 'String'>
    readonly quantity: FieldRef<"SaleItem", 'Int'>
    readonly unitPrice: FieldRef<"SaleItem", 'Float'>
    readonly totalPrice: FieldRef<"SaleItem", 'Float'>
    readonly createdAt: FieldRef<"SaleItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SaleItem findUnique
   */
  export type SaleItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem findUniqueOrThrow
   */
  export type SaleItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem findFirst
   */
  export type SaleItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleItems.
     */
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem findFirstOrThrow
   */
  export type SaleItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItem to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleItems.
     */
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem findMany
   */
  export type SaleItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter, which SaleItems to fetch.
     */
    where?: SaleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleItems to fetch.
     */
    orderBy?: SaleItemOrderByWithRelationInput | SaleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SaleItems.
     */
    cursor?: SaleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleItems.
     */
    skip?: number
    distinct?: SaleItemScalarFieldEnum | SaleItemScalarFieldEnum[]
  }

  /**
   * SaleItem create
   */
  export type SaleItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The data needed to create a SaleItem.
     */
    data: XOR<SaleItemCreateInput, SaleItemUncheckedCreateInput>
  }

  /**
   * SaleItem createMany
   */
  export type SaleItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SaleItems.
     */
    data: SaleItemCreateManyInput | SaleItemCreateManyInput[]
  }

  /**
   * SaleItem createManyAndReturn
   */
  export type SaleItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SaleItems.
     */
    data: SaleItemCreateManyInput | SaleItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SaleItem update
   */
  export type SaleItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The data needed to update a SaleItem.
     */
    data: XOR<SaleItemUpdateInput, SaleItemUncheckedUpdateInput>
    /**
     * Choose, which SaleItem to update.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem updateMany
   */
  export type SaleItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SaleItems.
     */
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyInput>
    /**
     * Filter which SaleItems to update
     */
    where?: SaleItemWhereInput
  }

  /**
   * SaleItem upsert
   */
  export type SaleItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * The filter to search for the SaleItem to update in case it exists.
     */
    where: SaleItemWhereUniqueInput
    /**
     * In case the SaleItem found by the `where` argument doesn't exist, create a new SaleItem with this data.
     */
    create: XOR<SaleItemCreateInput, SaleItemUncheckedCreateInput>
    /**
     * In case the SaleItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleItemUpdateInput, SaleItemUncheckedUpdateInput>
  }

  /**
   * SaleItem delete
   */
  export type SaleItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
    /**
     * Filter which SaleItem to delete.
     */
    where: SaleItemWhereUniqueInput
  }

  /**
   * SaleItem deleteMany
   */
  export type SaleItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleItems to delete
     */
    where?: SaleItemWhereInput
  }

  /**
   * SaleItem without action
   */
  export type SaleItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: SaleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    name: 'name',
    contact: 'contact',
    website: 'website',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const RawMaterialScalarFieldEnum: {
    id: 'id',
    name: 'name',
    categoryId: 'categoryId',
    supplierId: 'supplierId',
    totalQuantity: 'totalQuantity',
    unit: 'unit',
    costPerUnit: 'costPerUnit',
    reorderThreshold: 'reorderThreshold',
    committedQuantity: 'committedQuantity',
    onOrderQuantity: 'onOrderQuantity',
    imagePath: 'imagePath',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RawMaterialScalarFieldEnum = (typeof RawMaterialScalarFieldEnum)[keyof typeof RawMaterialScalarFieldEnum]


  export const FinishedGoodScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sku: 'sku',
    batchCode: 'batchCode',
    quantityOnHand: 'quantityOnHand',
    retailPrice: 'retailPrice',
    calculatedCogs: 'calculatedCogs',
    vesselSizeOz: 'vesselSizeOz',
    fragranceLoadPercent: 'fragranceLoadPercent',
    laborCostPerUnit: 'laborCostPerUnit',
    overheadFlat: 'overheadFlat',
    overheadPercent: 'overheadPercent',
    isSubAssembly: 'isSubAssembly',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FinishedGoodScalarFieldEnum = (typeof FinishedGoodScalarFieldEnum)[keyof typeof FinishedGoodScalarFieldEnum]


  export const RecipeItemScalarFieldEnum: {
    id: 'id',
    finishedGoodId: 'finishedGoodId',
    rawMaterialId: 'rawMaterialId',
    subAssemblyId: 'subAssemblyId',
    requiredQuantity: 'requiredQuantity',
    unit: 'unit'
  };

  export type RecipeItemScalarFieldEnum = (typeof RecipeItemScalarFieldEnum)[keyof typeof RecipeItemScalarFieldEnum]


  export const AdjustmentScalarFieldEnum: {
    id: 'id',
    materialId: 'materialId',
    quantity: 'quantity',
    reason: 'reason',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type AdjustmentScalarFieldEnum = (typeof AdjustmentScalarFieldEnum)[keyof typeof AdjustmentScalarFieldEnum]


  export const PurchaseOrderScalarFieldEnum: {
    id: 'id',
    supplierId: 'supplierId',
    orderDate: 'orderDate',
    expectedDate: 'expectedDate',
    receivedDate: 'receivedDate',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PurchaseOrderScalarFieldEnum = (typeof PurchaseOrderScalarFieldEnum)[keyof typeof PurchaseOrderScalarFieldEnum]


  export const PurchaseOrderItemScalarFieldEnum: {
    id: 'id',
    purchaseOrderId: 'purchaseOrderId',
    materialId: 'materialId',
    quantity: 'quantity',
    unitCost: 'unitCost',
    receivedQty: 'receivedQty',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PurchaseOrderItemScalarFieldEnum = (typeof PurchaseOrderItemScalarFieldEnum)[keyof typeof PurchaseOrderItemScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    address: 'address',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const SaleScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    saleDate: 'saleDate',
    totalAmount: 'totalAmount',
    discount: 'discount',
    tax: 'tax',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const SaleItemScalarFieldEnum: {
    id: 'id',
    saleId: 'saleId',
    finishedGoodId: 'finishedGoodId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    totalPrice: 'totalPrice',
    createdAt: 'createdAt'
  };

  export type SaleItemScalarFieldEnum = (typeof SaleItemScalarFieldEnum)[keyof typeof SaleItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    rawMaterials?: RawMaterialListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    rawMaterials?: RawMaterialOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    rawMaterials?: RawMaterialListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: StringFilter<"Supplier"> | string
    name?: StringFilter<"Supplier"> | string
    contact?: StringNullableFilter<"Supplier"> | string | null
    website?: StringNullableFilter<"Supplier"> | string | null
    notes?: StringNullableFilter<"Supplier"> | string | null
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    rawMaterials?: RawMaterialListRelationFilter
    purchaseOrders?: PurchaseOrderListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rawMaterials?: RawMaterialOrderByRelationAggregateInput
    purchaseOrders?: PurchaseOrderOrderByRelationAggregateInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    name?: StringFilter<"Supplier"> | string
    contact?: StringNullableFilter<"Supplier"> | string | null
    website?: StringNullableFilter<"Supplier"> | string | null
    notes?: StringNullableFilter<"Supplier"> | string | null
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    rawMaterials?: RawMaterialListRelationFilter
    purchaseOrders?: PurchaseOrderListRelationFilter
  }, "id">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Supplier"> | string
    name?: StringWithAggregatesFilter<"Supplier"> | string
    contact?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    website?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
  }

  export type RawMaterialWhereInput = {
    AND?: RawMaterialWhereInput | RawMaterialWhereInput[]
    OR?: RawMaterialWhereInput[]
    NOT?: RawMaterialWhereInput | RawMaterialWhereInput[]
    id?: StringFilter<"RawMaterial"> | string
    name?: StringFilter<"RawMaterial"> | string
    categoryId?: StringFilter<"RawMaterial"> | string
    supplierId?: StringNullableFilter<"RawMaterial"> | string | null
    totalQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    unit?: StringNullableFilter<"RawMaterial"> | string | null
    costPerUnit?: FloatNullableFilter<"RawMaterial"> | number | null
    reorderThreshold?: FloatNullableFilter<"RawMaterial"> | number | null
    committedQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    onOrderQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    imagePath?: StringNullableFilter<"RawMaterial"> | string | null
    createdAt?: DateTimeFilter<"RawMaterial"> | Date | string
    updatedAt?: DateTimeFilter<"RawMaterial"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    supplier?: XOR<SupplierNullableRelationFilter, SupplierWhereInput> | null
    recipeItems?: RecipeItemListRelationFilter
    adjustments?: AdjustmentListRelationFilter
    purchaseOrderItems?: PurchaseOrderItemListRelationFilter
  }

  export type RawMaterialOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    supplierId?: SortOrderInput | SortOrder
    totalQuantity?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    costPerUnit?: SortOrderInput | SortOrder
    reorderThreshold?: SortOrderInput | SortOrder
    committedQuantity?: SortOrderInput | SortOrder
    onOrderQuantity?: SortOrderInput | SortOrder
    imagePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    supplier?: SupplierOrderByWithRelationInput
    recipeItems?: RecipeItemOrderByRelationAggregateInput
    adjustments?: AdjustmentOrderByRelationAggregateInput
    purchaseOrderItems?: PurchaseOrderItemOrderByRelationAggregateInput
  }

  export type RawMaterialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RawMaterialWhereInput | RawMaterialWhereInput[]
    OR?: RawMaterialWhereInput[]
    NOT?: RawMaterialWhereInput | RawMaterialWhereInput[]
    name?: StringFilter<"RawMaterial"> | string
    categoryId?: StringFilter<"RawMaterial"> | string
    supplierId?: StringNullableFilter<"RawMaterial"> | string | null
    totalQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    unit?: StringNullableFilter<"RawMaterial"> | string | null
    costPerUnit?: FloatNullableFilter<"RawMaterial"> | number | null
    reorderThreshold?: FloatNullableFilter<"RawMaterial"> | number | null
    committedQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    onOrderQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    imagePath?: StringNullableFilter<"RawMaterial"> | string | null
    createdAt?: DateTimeFilter<"RawMaterial"> | Date | string
    updatedAt?: DateTimeFilter<"RawMaterial"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    supplier?: XOR<SupplierNullableRelationFilter, SupplierWhereInput> | null
    recipeItems?: RecipeItemListRelationFilter
    adjustments?: AdjustmentListRelationFilter
    purchaseOrderItems?: PurchaseOrderItemListRelationFilter
  }, "id">

  export type RawMaterialOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    supplierId?: SortOrderInput | SortOrder
    totalQuantity?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    costPerUnit?: SortOrderInput | SortOrder
    reorderThreshold?: SortOrderInput | SortOrder
    committedQuantity?: SortOrderInput | SortOrder
    onOrderQuantity?: SortOrderInput | SortOrder
    imagePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RawMaterialCountOrderByAggregateInput
    _avg?: RawMaterialAvgOrderByAggregateInput
    _max?: RawMaterialMaxOrderByAggregateInput
    _min?: RawMaterialMinOrderByAggregateInput
    _sum?: RawMaterialSumOrderByAggregateInput
  }

  export type RawMaterialScalarWhereWithAggregatesInput = {
    AND?: RawMaterialScalarWhereWithAggregatesInput | RawMaterialScalarWhereWithAggregatesInput[]
    OR?: RawMaterialScalarWhereWithAggregatesInput[]
    NOT?: RawMaterialScalarWhereWithAggregatesInput | RawMaterialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RawMaterial"> | string
    name?: StringWithAggregatesFilter<"RawMaterial"> | string
    categoryId?: StringWithAggregatesFilter<"RawMaterial"> | string
    supplierId?: StringNullableWithAggregatesFilter<"RawMaterial"> | string | null
    totalQuantity?: FloatNullableWithAggregatesFilter<"RawMaterial"> | number | null
    unit?: StringNullableWithAggregatesFilter<"RawMaterial"> | string | null
    costPerUnit?: FloatNullableWithAggregatesFilter<"RawMaterial"> | number | null
    reorderThreshold?: FloatNullableWithAggregatesFilter<"RawMaterial"> | number | null
    committedQuantity?: FloatNullableWithAggregatesFilter<"RawMaterial"> | number | null
    onOrderQuantity?: FloatNullableWithAggregatesFilter<"RawMaterial"> | number | null
    imagePath?: StringNullableWithAggregatesFilter<"RawMaterial"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RawMaterial"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RawMaterial"> | Date | string
  }

  export type FinishedGoodWhereInput = {
    AND?: FinishedGoodWhereInput | FinishedGoodWhereInput[]
    OR?: FinishedGoodWhereInput[]
    NOT?: FinishedGoodWhereInput | FinishedGoodWhereInput[]
    id?: StringFilter<"FinishedGood"> | string
    name?: StringFilter<"FinishedGood"> | string
    sku?: StringNullableFilter<"FinishedGood"> | string | null
    batchCode?: StringFilter<"FinishedGood"> | string
    quantityOnHand?: IntFilter<"FinishedGood"> | number
    retailPrice?: FloatFilter<"FinishedGood"> | number
    calculatedCogs?: FloatFilter<"FinishedGood"> | number
    vesselSizeOz?: FloatNullableFilter<"FinishedGood"> | number | null
    fragranceLoadPercent?: FloatNullableFilter<"FinishedGood"> | number | null
    laborCostPerUnit?: FloatNullableFilter<"FinishedGood"> | number | null
    overheadFlat?: FloatNullableFilter<"FinishedGood"> | number | null
    overheadPercent?: FloatNullableFilter<"FinishedGood"> | number | null
    isSubAssembly?: BoolFilter<"FinishedGood"> | boolean
    createdAt?: DateTimeFilter<"FinishedGood"> | Date | string
    updatedAt?: DateTimeFilter<"FinishedGood"> | Date | string
    recipeItems?: RecipeItemListRelationFilter
    usedAsSubAssembly?: RecipeItemListRelationFilter
    saleItems?: SaleItemListRelationFilter
  }

  export type FinishedGoodOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrderInput | SortOrder
    batchCode?: SortOrder
    quantityOnHand?: SortOrder
    retailPrice?: SortOrder
    calculatedCogs?: SortOrder
    vesselSizeOz?: SortOrderInput | SortOrder
    fragranceLoadPercent?: SortOrderInput | SortOrder
    laborCostPerUnit?: SortOrderInput | SortOrder
    overheadFlat?: SortOrderInput | SortOrder
    overheadPercent?: SortOrderInput | SortOrder
    isSubAssembly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeItems?: RecipeItemOrderByRelationAggregateInput
    usedAsSubAssembly?: RecipeItemOrderByRelationAggregateInput
    saleItems?: SaleItemOrderByRelationAggregateInput
  }

  export type FinishedGoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: FinishedGoodWhereInput | FinishedGoodWhereInput[]
    OR?: FinishedGoodWhereInput[]
    NOT?: FinishedGoodWhereInput | FinishedGoodWhereInput[]
    name?: StringFilter<"FinishedGood"> | string
    batchCode?: StringFilter<"FinishedGood"> | string
    quantityOnHand?: IntFilter<"FinishedGood"> | number
    retailPrice?: FloatFilter<"FinishedGood"> | number
    calculatedCogs?: FloatFilter<"FinishedGood"> | number
    vesselSizeOz?: FloatNullableFilter<"FinishedGood"> | number | null
    fragranceLoadPercent?: FloatNullableFilter<"FinishedGood"> | number | null
    laborCostPerUnit?: FloatNullableFilter<"FinishedGood"> | number | null
    overheadFlat?: FloatNullableFilter<"FinishedGood"> | number | null
    overheadPercent?: FloatNullableFilter<"FinishedGood"> | number | null
    isSubAssembly?: BoolFilter<"FinishedGood"> | boolean
    createdAt?: DateTimeFilter<"FinishedGood"> | Date | string
    updatedAt?: DateTimeFilter<"FinishedGood"> | Date | string
    recipeItems?: RecipeItemListRelationFilter
    usedAsSubAssembly?: RecipeItemListRelationFilter
    saleItems?: SaleItemListRelationFilter
  }, "id" | "sku">

  export type FinishedGoodOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrderInput | SortOrder
    batchCode?: SortOrder
    quantityOnHand?: SortOrder
    retailPrice?: SortOrder
    calculatedCogs?: SortOrder
    vesselSizeOz?: SortOrderInput | SortOrder
    fragranceLoadPercent?: SortOrderInput | SortOrder
    laborCostPerUnit?: SortOrderInput | SortOrder
    overheadFlat?: SortOrderInput | SortOrder
    overheadPercent?: SortOrderInput | SortOrder
    isSubAssembly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FinishedGoodCountOrderByAggregateInput
    _avg?: FinishedGoodAvgOrderByAggregateInput
    _max?: FinishedGoodMaxOrderByAggregateInput
    _min?: FinishedGoodMinOrderByAggregateInput
    _sum?: FinishedGoodSumOrderByAggregateInput
  }

  export type FinishedGoodScalarWhereWithAggregatesInput = {
    AND?: FinishedGoodScalarWhereWithAggregatesInput | FinishedGoodScalarWhereWithAggregatesInput[]
    OR?: FinishedGoodScalarWhereWithAggregatesInput[]
    NOT?: FinishedGoodScalarWhereWithAggregatesInput | FinishedGoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FinishedGood"> | string
    name?: StringWithAggregatesFilter<"FinishedGood"> | string
    sku?: StringNullableWithAggregatesFilter<"FinishedGood"> | string | null
    batchCode?: StringWithAggregatesFilter<"FinishedGood"> | string
    quantityOnHand?: IntWithAggregatesFilter<"FinishedGood"> | number
    retailPrice?: FloatWithAggregatesFilter<"FinishedGood"> | number
    calculatedCogs?: FloatWithAggregatesFilter<"FinishedGood"> | number
    vesselSizeOz?: FloatNullableWithAggregatesFilter<"FinishedGood"> | number | null
    fragranceLoadPercent?: FloatNullableWithAggregatesFilter<"FinishedGood"> | number | null
    laborCostPerUnit?: FloatNullableWithAggregatesFilter<"FinishedGood"> | number | null
    overheadFlat?: FloatNullableWithAggregatesFilter<"FinishedGood"> | number | null
    overheadPercent?: FloatNullableWithAggregatesFilter<"FinishedGood"> | number | null
    isSubAssembly?: BoolWithAggregatesFilter<"FinishedGood"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FinishedGood"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FinishedGood"> | Date | string
  }

  export type RecipeItemWhereInput = {
    AND?: RecipeItemWhereInput | RecipeItemWhereInput[]
    OR?: RecipeItemWhereInput[]
    NOT?: RecipeItemWhereInput | RecipeItemWhereInput[]
    id?: StringFilter<"RecipeItem"> | string
    finishedGoodId?: StringFilter<"RecipeItem"> | string
    rawMaterialId?: StringNullableFilter<"RecipeItem"> | string | null
    subAssemblyId?: StringNullableFilter<"RecipeItem"> | string | null
    requiredQuantity?: FloatFilter<"RecipeItem"> | number
    unit?: StringFilter<"RecipeItem"> | string
    finishedGood?: XOR<FinishedGoodRelationFilter, FinishedGoodWhereInput>
    rawMaterial?: XOR<RawMaterialNullableRelationFilter, RawMaterialWhereInput> | null
    subAssembly?: XOR<FinishedGoodNullableRelationFilter, FinishedGoodWhereInput> | null
  }

  export type RecipeItemOrderByWithRelationInput = {
    id?: SortOrder
    finishedGoodId?: SortOrder
    rawMaterialId?: SortOrderInput | SortOrder
    subAssemblyId?: SortOrderInput | SortOrder
    requiredQuantity?: SortOrder
    unit?: SortOrder
    finishedGood?: FinishedGoodOrderByWithRelationInput
    rawMaterial?: RawMaterialOrderByWithRelationInput
    subAssembly?: FinishedGoodOrderByWithRelationInput
  }

  export type RecipeItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    finishedGoodId_rawMaterialId?: RecipeItemFinishedGoodIdRawMaterialIdCompoundUniqueInput
    AND?: RecipeItemWhereInput | RecipeItemWhereInput[]
    OR?: RecipeItemWhereInput[]
    NOT?: RecipeItemWhereInput | RecipeItemWhereInput[]
    finishedGoodId?: StringFilter<"RecipeItem"> | string
    rawMaterialId?: StringNullableFilter<"RecipeItem"> | string | null
    subAssemblyId?: StringNullableFilter<"RecipeItem"> | string | null
    requiredQuantity?: FloatFilter<"RecipeItem"> | number
    unit?: StringFilter<"RecipeItem"> | string
    finishedGood?: XOR<FinishedGoodRelationFilter, FinishedGoodWhereInput>
    rawMaterial?: XOR<RawMaterialNullableRelationFilter, RawMaterialWhereInput> | null
    subAssembly?: XOR<FinishedGoodNullableRelationFilter, FinishedGoodWhereInput> | null
  }, "id" | "finishedGoodId_rawMaterialId">

  export type RecipeItemOrderByWithAggregationInput = {
    id?: SortOrder
    finishedGoodId?: SortOrder
    rawMaterialId?: SortOrderInput | SortOrder
    subAssemblyId?: SortOrderInput | SortOrder
    requiredQuantity?: SortOrder
    unit?: SortOrder
    _count?: RecipeItemCountOrderByAggregateInput
    _avg?: RecipeItemAvgOrderByAggregateInput
    _max?: RecipeItemMaxOrderByAggregateInput
    _min?: RecipeItemMinOrderByAggregateInput
    _sum?: RecipeItemSumOrderByAggregateInput
  }

  export type RecipeItemScalarWhereWithAggregatesInput = {
    AND?: RecipeItemScalarWhereWithAggregatesInput | RecipeItemScalarWhereWithAggregatesInput[]
    OR?: RecipeItemScalarWhereWithAggregatesInput[]
    NOT?: RecipeItemScalarWhereWithAggregatesInput | RecipeItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecipeItem"> | string
    finishedGoodId?: StringWithAggregatesFilter<"RecipeItem"> | string
    rawMaterialId?: StringNullableWithAggregatesFilter<"RecipeItem"> | string | null
    subAssemblyId?: StringNullableWithAggregatesFilter<"RecipeItem"> | string | null
    requiredQuantity?: FloatWithAggregatesFilter<"RecipeItem"> | number
    unit?: StringWithAggregatesFilter<"RecipeItem"> | string
  }

  export type AdjustmentWhereInput = {
    AND?: AdjustmentWhereInput | AdjustmentWhereInput[]
    OR?: AdjustmentWhereInput[]
    NOT?: AdjustmentWhereInput | AdjustmentWhereInput[]
    id?: StringFilter<"Adjustment"> | string
    materialId?: StringFilter<"Adjustment"> | string
    quantity?: FloatFilter<"Adjustment"> | number
    reason?: StringFilter<"Adjustment"> | string
    notes?: StringNullableFilter<"Adjustment"> | string | null
    createdAt?: DateTimeFilter<"Adjustment"> | Date | string
    material?: XOR<RawMaterialRelationFilter, RawMaterialWhereInput>
  }

  export type AdjustmentOrderByWithRelationInput = {
    id?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    material?: RawMaterialOrderByWithRelationInput
  }

  export type AdjustmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdjustmentWhereInput | AdjustmentWhereInput[]
    OR?: AdjustmentWhereInput[]
    NOT?: AdjustmentWhereInput | AdjustmentWhereInput[]
    materialId?: StringFilter<"Adjustment"> | string
    quantity?: FloatFilter<"Adjustment"> | number
    reason?: StringFilter<"Adjustment"> | string
    notes?: StringNullableFilter<"Adjustment"> | string | null
    createdAt?: DateTimeFilter<"Adjustment"> | Date | string
    material?: XOR<RawMaterialRelationFilter, RawMaterialWhereInput>
  }, "id">

  export type AdjustmentOrderByWithAggregationInput = {
    id?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AdjustmentCountOrderByAggregateInput
    _avg?: AdjustmentAvgOrderByAggregateInput
    _max?: AdjustmentMaxOrderByAggregateInput
    _min?: AdjustmentMinOrderByAggregateInput
    _sum?: AdjustmentSumOrderByAggregateInput
  }

  export type AdjustmentScalarWhereWithAggregatesInput = {
    AND?: AdjustmentScalarWhereWithAggregatesInput | AdjustmentScalarWhereWithAggregatesInput[]
    OR?: AdjustmentScalarWhereWithAggregatesInput[]
    NOT?: AdjustmentScalarWhereWithAggregatesInput | AdjustmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Adjustment"> | string
    materialId?: StringWithAggregatesFilter<"Adjustment"> | string
    quantity?: FloatWithAggregatesFilter<"Adjustment"> | number
    reason?: StringWithAggregatesFilter<"Adjustment"> | string
    notes?: StringNullableWithAggregatesFilter<"Adjustment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Adjustment"> | Date | string
  }

  export type PurchaseOrderWhereInput = {
    AND?: PurchaseOrderWhereInput | PurchaseOrderWhereInput[]
    OR?: PurchaseOrderWhereInput[]
    NOT?: PurchaseOrderWhereInput | PurchaseOrderWhereInput[]
    id?: StringFilter<"PurchaseOrder"> | string
    supplierId?: StringFilter<"PurchaseOrder"> | string
    orderDate?: DateTimeFilter<"PurchaseOrder"> | Date | string
    expectedDate?: DateTimeNullableFilter<"PurchaseOrder"> | Date | string | null
    receivedDate?: DateTimeNullableFilter<"PurchaseOrder"> | Date | string | null
    status?: StringFilter<"PurchaseOrder"> | string
    notes?: StringNullableFilter<"PurchaseOrder"> | string | null
    createdAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    supplier?: XOR<SupplierRelationFilter, SupplierWhereInput>
    items?: PurchaseOrderItemListRelationFilter
  }

  export type PurchaseOrderOrderByWithRelationInput = {
    id?: SortOrder
    supplierId?: SortOrder
    orderDate?: SortOrder
    expectedDate?: SortOrderInput | SortOrder
    receivedDate?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supplier?: SupplierOrderByWithRelationInput
    items?: PurchaseOrderItemOrderByRelationAggregateInput
  }

  export type PurchaseOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PurchaseOrderWhereInput | PurchaseOrderWhereInput[]
    OR?: PurchaseOrderWhereInput[]
    NOT?: PurchaseOrderWhereInput | PurchaseOrderWhereInput[]
    supplierId?: StringFilter<"PurchaseOrder"> | string
    orderDate?: DateTimeFilter<"PurchaseOrder"> | Date | string
    expectedDate?: DateTimeNullableFilter<"PurchaseOrder"> | Date | string | null
    receivedDate?: DateTimeNullableFilter<"PurchaseOrder"> | Date | string | null
    status?: StringFilter<"PurchaseOrder"> | string
    notes?: StringNullableFilter<"PurchaseOrder"> | string | null
    createdAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    supplier?: XOR<SupplierRelationFilter, SupplierWhereInput>
    items?: PurchaseOrderItemListRelationFilter
  }, "id">

  export type PurchaseOrderOrderByWithAggregationInput = {
    id?: SortOrder
    supplierId?: SortOrder
    orderDate?: SortOrder
    expectedDate?: SortOrderInput | SortOrder
    receivedDate?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PurchaseOrderCountOrderByAggregateInput
    _max?: PurchaseOrderMaxOrderByAggregateInput
    _min?: PurchaseOrderMinOrderByAggregateInput
  }

  export type PurchaseOrderScalarWhereWithAggregatesInput = {
    AND?: PurchaseOrderScalarWhereWithAggregatesInput | PurchaseOrderScalarWhereWithAggregatesInput[]
    OR?: PurchaseOrderScalarWhereWithAggregatesInput[]
    NOT?: PurchaseOrderScalarWhereWithAggregatesInput | PurchaseOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PurchaseOrder"> | string
    supplierId?: StringWithAggregatesFilter<"PurchaseOrder"> | string
    orderDate?: DateTimeWithAggregatesFilter<"PurchaseOrder"> | Date | string
    expectedDate?: DateTimeNullableWithAggregatesFilter<"PurchaseOrder"> | Date | string | null
    receivedDate?: DateTimeNullableWithAggregatesFilter<"PurchaseOrder"> | Date | string | null
    status?: StringWithAggregatesFilter<"PurchaseOrder"> | string
    notes?: StringNullableWithAggregatesFilter<"PurchaseOrder"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PurchaseOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PurchaseOrder"> | Date | string
  }

  export type PurchaseOrderItemWhereInput = {
    AND?: PurchaseOrderItemWhereInput | PurchaseOrderItemWhereInput[]
    OR?: PurchaseOrderItemWhereInput[]
    NOT?: PurchaseOrderItemWhereInput | PurchaseOrderItemWhereInput[]
    id?: StringFilter<"PurchaseOrderItem"> | string
    purchaseOrderId?: StringFilter<"PurchaseOrderItem"> | string
    materialId?: StringFilter<"PurchaseOrderItem"> | string
    quantity?: FloatFilter<"PurchaseOrderItem"> | number
    unitCost?: FloatFilter<"PurchaseOrderItem"> | number
    receivedQty?: FloatFilter<"PurchaseOrderItem"> | number
    createdAt?: DateTimeFilter<"PurchaseOrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrderItem"> | Date | string
    purchaseOrder?: XOR<PurchaseOrderRelationFilter, PurchaseOrderWhereInput>
    material?: XOR<RawMaterialRelationFilter, RawMaterialWhereInput>
  }

  export type PurchaseOrderItemOrderByWithRelationInput = {
    id?: SortOrder
    purchaseOrderId?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    receivedQty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    purchaseOrder?: PurchaseOrderOrderByWithRelationInput
    material?: RawMaterialOrderByWithRelationInput
  }

  export type PurchaseOrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PurchaseOrderItemWhereInput | PurchaseOrderItemWhereInput[]
    OR?: PurchaseOrderItemWhereInput[]
    NOT?: PurchaseOrderItemWhereInput | PurchaseOrderItemWhereInput[]
    purchaseOrderId?: StringFilter<"PurchaseOrderItem"> | string
    materialId?: StringFilter<"PurchaseOrderItem"> | string
    quantity?: FloatFilter<"PurchaseOrderItem"> | number
    unitCost?: FloatFilter<"PurchaseOrderItem"> | number
    receivedQty?: FloatFilter<"PurchaseOrderItem"> | number
    createdAt?: DateTimeFilter<"PurchaseOrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrderItem"> | Date | string
    purchaseOrder?: XOR<PurchaseOrderRelationFilter, PurchaseOrderWhereInput>
    material?: XOR<RawMaterialRelationFilter, RawMaterialWhereInput>
  }, "id">

  export type PurchaseOrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    purchaseOrderId?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    receivedQty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PurchaseOrderItemCountOrderByAggregateInput
    _avg?: PurchaseOrderItemAvgOrderByAggregateInput
    _max?: PurchaseOrderItemMaxOrderByAggregateInput
    _min?: PurchaseOrderItemMinOrderByAggregateInput
    _sum?: PurchaseOrderItemSumOrderByAggregateInput
  }

  export type PurchaseOrderItemScalarWhereWithAggregatesInput = {
    AND?: PurchaseOrderItemScalarWhereWithAggregatesInput | PurchaseOrderItemScalarWhereWithAggregatesInput[]
    OR?: PurchaseOrderItemScalarWhereWithAggregatesInput[]
    NOT?: PurchaseOrderItemScalarWhereWithAggregatesInput | PurchaseOrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PurchaseOrderItem"> | string
    purchaseOrderId?: StringWithAggregatesFilter<"PurchaseOrderItem"> | string
    materialId?: StringWithAggregatesFilter<"PurchaseOrderItem"> | string
    quantity?: FloatWithAggregatesFilter<"PurchaseOrderItem"> | number
    unitCost?: FloatWithAggregatesFilter<"PurchaseOrderItem"> | number
    receivedQty?: FloatWithAggregatesFilter<"PurchaseOrderItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PurchaseOrderItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PurchaseOrderItem"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    notes?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    sales?: SaleListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sales?: SaleOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    notes?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    sales?: SaleListRelationFilter
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    address?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type SaleWhereInput = {
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    id?: StringFilter<"Sale"> | string
    customerId?: StringNullableFilter<"Sale"> | string | null
    saleDate?: DateTimeFilter<"Sale"> | Date | string
    totalAmount?: FloatFilter<"Sale"> | number
    discount?: FloatFilter<"Sale"> | number
    tax?: FloatFilter<"Sale"> | number
    status?: StringFilter<"Sale"> | string
    notes?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
    items?: SaleItemListRelationFilter
  }

  export type SaleOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    saleDate?: SortOrder
    totalAmount?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    items?: SaleItemOrderByRelationAggregateInput
  }

  export type SaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    customerId?: StringNullableFilter<"Sale"> | string | null
    saleDate?: DateTimeFilter<"Sale"> | Date | string
    totalAmount?: FloatFilter<"Sale"> | number
    discount?: FloatFilter<"Sale"> | number
    tax?: FloatFilter<"Sale"> | number
    status?: StringFilter<"Sale"> | string
    notes?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
    items?: SaleItemListRelationFilter
  }, "id">

  export type SaleOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    saleDate?: SortOrder
    totalAmount?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SaleCountOrderByAggregateInput
    _avg?: SaleAvgOrderByAggregateInput
    _max?: SaleMaxOrderByAggregateInput
    _min?: SaleMinOrderByAggregateInput
    _sum?: SaleSumOrderByAggregateInput
  }

  export type SaleScalarWhereWithAggregatesInput = {
    AND?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    OR?: SaleScalarWhereWithAggregatesInput[]
    NOT?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sale"> | string
    customerId?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    saleDate?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    totalAmount?: FloatWithAggregatesFilter<"Sale"> | number
    discount?: FloatWithAggregatesFilter<"Sale"> | number
    tax?: FloatWithAggregatesFilter<"Sale"> | number
    status?: StringWithAggregatesFilter<"Sale"> | string
    notes?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
  }

  export type SaleItemWhereInput = {
    AND?: SaleItemWhereInput | SaleItemWhereInput[]
    OR?: SaleItemWhereInput[]
    NOT?: SaleItemWhereInput | SaleItemWhereInput[]
    id?: StringFilter<"SaleItem"> | string
    saleId?: StringFilter<"SaleItem"> | string
    finishedGoodId?: StringFilter<"SaleItem"> | string
    quantity?: IntFilter<"SaleItem"> | number
    unitPrice?: FloatFilter<"SaleItem"> | number
    totalPrice?: FloatFilter<"SaleItem"> | number
    createdAt?: DateTimeFilter<"SaleItem"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
    finishedGood?: XOR<FinishedGoodRelationFilter, FinishedGoodWhereInput>
  }

  export type SaleItemOrderByWithRelationInput = {
    id?: SortOrder
    saleId?: SortOrder
    finishedGoodId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    sale?: SaleOrderByWithRelationInput
    finishedGood?: FinishedGoodOrderByWithRelationInput
  }

  export type SaleItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SaleItemWhereInput | SaleItemWhereInput[]
    OR?: SaleItemWhereInput[]
    NOT?: SaleItemWhereInput | SaleItemWhereInput[]
    saleId?: StringFilter<"SaleItem"> | string
    finishedGoodId?: StringFilter<"SaleItem"> | string
    quantity?: IntFilter<"SaleItem"> | number
    unitPrice?: FloatFilter<"SaleItem"> | number
    totalPrice?: FloatFilter<"SaleItem"> | number
    createdAt?: DateTimeFilter<"SaleItem"> | Date | string
    sale?: XOR<SaleRelationFilter, SaleWhereInput>
    finishedGood?: XOR<FinishedGoodRelationFilter, FinishedGoodWhereInput>
  }, "id">

  export type SaleItemOrderByWithAggregationInput = {
    id?: SortOrder
    saleId?: SortOrder
    finishedGoodId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    _count?: SaleItemCountOrderByAggregateInput
    _avg?: SaleItemAvgOrderByAggregateInput
    _max?: SaleItemMaxOrderByAggregateInput
    _min?: SaleItemMinOrderByAggregateInput
    _sum?: SaleItemSumOrderByAggregateInput
  }

  export type SaleItemScalarWhereWithAggregatesInput = {
    AND?: SaleItemScalarWhereWithAggregatesInput | SaleItemScalarWhereWithAggregatesInput[]
    OR?: SaleItemScalarWhereWithAggregatesInput[]
    NOT?: SaleItemScalarWhereWithAggregatesInput | SaleItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SaleItem"> | string
    saleId?: StringWithAggregatesFilter<"SaleItem"> | string
    finishedGoodId?: StringWithAggregatesFilter<"SaleItem"> | string
    quantity?: IntWithAggregatesFilter<"SaleItem"> | number
    unitPrice?: FloatWithAggregatesFilter<"SaleItem"> | number
    totalPrice?: FloatWithAggregatesFilter<"SaleItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SaleItem"> | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    rawMaterials?: RawMaterialCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    rawMaterials?: RawMaterialUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rawMaterials?: RawMaterialUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rawMaterials?: RawMaterialUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SupplierCreateInput = {
    id?: string
    name: string
    contact?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rawMaterials?: RawMaterialCreateNestedManyWithoutSupplierInput
    purchaseOrders?: PurchaseOrderCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: string
    name: string
    contact?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rawMaterials?: RawMaterialUncheckedCreateNestedManyWithoutSupplierInput
    purchaseOrders?: PurchaseOrderUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawMaterials?: RawMaterialUpdateManyWithoutSupplierNestedInput
    purchaseOrders?: PurchaseOrderUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawMaterials?: RawMaterialUncheckedUpdateManyWithoutSupplierNestedInput
    purchaseOrders?: PurchaseOrderUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: string
    name: string
    contact?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawMaterialCreateInput = {
    id?: string
    name: string
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutRawMaterialsInput
    supplier?: SupplierCreateNestedOneWithoutRawMaterialsInput
    recipeItems?: RecipeItemCreateNestedManyWithoutRawMaterialInput
    adjustments?: AdjustmentCreateNestedManyWithoutMaterialInput
    purchaseOrderItems?: PurchaseOrderItemCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialUncheckedCreateInput = {
    id?: string
    name: string
    categoryId: string
    supplierId?: string | null
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemUncheckedCreateNestedManyWithoutRawMaterialInput
    adjustments?: AdjustmentUncheckedCreateNestedManyWithoutMaterialInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutRawMaterialsNestedInput
    supplier?: SupplierUpdateOneWithoutRawMaterialsNestedInput
    recipeItems?: RecipeItemUpdateManyWithoutRawMaterialNestedInput
    adjustments?: AdjustmentUpdateManyWithoutMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUncheckedUpdateManyWithoutRawMaterialNestedInput
    adjustments?: AdjustmentUncheckedUpdateManyWithoutMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialCreateManyInput = {
    id?: string
    name: string
    categoryId: string
    supplierId?: string | null
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RawMaterialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawMaterialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinishedGoodCreateInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemCreateNestedManyWithoutFinishedGoodInput
    usedAsSubAssembly?: RecipeItemCreateNestedManyWithoutSubAssemblyInput
    saleItems?: SaleItemCreateNestedManyWithoutFinishedGoodInput
  }

  export type FinishedGoodUncheckedCreateInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemUncheckedCreateNestedManyWithoutFinishedGoodInput
    usedAsSubAssembly?: RecipeItemUncheckedCreateNestedManyWithoutSubAssemblyInput
    saleItems?: SaleItemUncheckedCreateNestedManyWithoutFinishedGoodInput
  }

  export type FinishedGoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUpdateManyWithoutFinishedGoodNestedInput
    usedAsSubAssembly?: RecipeItemUpdateManyWithoutSubAssemblyNestedInput
    saleItems?: SaleItemUpdateManyWithoutFinishedGoodNestedInput
  }

  export type FinishedGoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUncheckedUpdateManyWithoutFinishedGoodNestedInput
    usedAsSubAssembly?: RecipeItemUncheckedUpdateManyWithoutSubAssemblyNestedInput
    saleItems?: SaleItemUncheckedUpdateManyWithoutFinishedGoodNestedInput
  }

  export type FinishedGoodCreateManyInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FinishedGoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinishedGoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeItemCreateInput = {
    id?: string
    requiredQuantity: number
    unit: string
    finishedGood: FinishedGoodCreateNestedOneWithoutRecipeItemsInput
    rawMaterial?: RawMaterialCreateNestedOneWithoutRecipeItemsInput
    subAssembly?: FinishedGoodCreateNestedOneWithoutUsedAsSubAssemblyInput
  }

  export type RecipeItemUncheckedCreateInput = {
    id?: string
    finishedGoodId: string
    rawMaterialId?: string | null
    subAssemblyId?: string | null
    requiredQuantity: number
    unit: string
  }

  export type RecipeItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    finishedGood?: FinishedGoodUpdateOneRequiredWithoutRecipeItemsNestedInput
    rawMaterial?: RawMaterialUpdateOneWithoutRecipeItemsNestedInput
    subAssembly?: FinishedGoodUpdateOneWithoutUsedAsSubAssemblyNestedInput
  }

  export type RecipeItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    rawMaterialId?: NullableStringFieldUpdateOperationsInput | string | null
    subAssemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeItemCreateManyInput = {
    id?: string
    finishedGoodId: string
    rawMaterialId?: string | null
    subAssemblyId?: string | null
    requiredQuantity: number
    unit: string
  }

  export type RecipeItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    rawMaterialId?: NullableStringFieldUpdateOperationsInput | string | null
    subAssemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type AdjustmentCreateInput = {
    id?: string
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
    material: RawMaterialCreateNestedOneWithoutAdjustmentsInput
  }

  export type AdjustmentUncheckedCreateInput = {
    id?: string
    materialId: string
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type AdjustmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    material?: RawMaterialUpdateOneRequiredWithoutAdjustmentsNestedInput
  }

  export type AdjustmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdjustmentCreateManyInput = {
    id?: string
    materialId: string
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type AdjustmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdjustmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderCreateInput = {
    id?: string
    orderDate?: Date | string
    expectedDate?: Date | string | null
    receivedDate?: Date | string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplier: SupplierCreateNestedOneWithoutPurchaseOrdersInput
    items?: PurchaseOrderItemCreateNestedManyWithoutPurchaseOrderInput
  }

  export type PurchaseOrderUncheckedCreateInput = {
    id?: string
    supplierId: string
    orderDate?: Date | string
    expectedDate?: Date | string | null
    receivedDate?: Date | string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PurchaseOrderItemUncheckedCreateNestedManyWithoutPurchaseOrderInput
  }

  export type PurchaseOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplier?: SupplierUpdateOneRequiredWithoutPurchaseOrdersNestedInput
    items?: PurchaseOrderItemUpdateManyWithoutPurchaseOrderNestedInput
  }

  export type PurchaseOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PurchaseOrderItemUncheckedUpdateManyWithoutPurchaseOrderNestedInput
  }

  export type PurchaseOrderCreateManyInput = {
    id?: string
    supplierId: string
    orderDate?: Date | string
    expectedDate?: Date | string | null
    receivedDate?: Date | string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderItemCreateInput = {
    id?: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutItemsInput
    material: RawMaterialCreateNestedOneWithoutPurchaseOrderItemsInput
  }

  export type PurchaseOrderItemUncheckedCreateInput = {
    id?: string
    purchaseOrderId: string
    materialId: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutItemsNestedInput
    material?: RawMaterialUpdateOneRequiredWithoutPurchaseOrderItemsNestedInput
  }

  export type PurchaseOrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseOrderId?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderItemCreateManyInput = {
    id?: string
    purchaseOrderId: string
    materialId: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseOrderId?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateInput = {
    id?: string
    saleDate?: Date | string
    totalAmount: number
    discount?: number
    tax?: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutSalesInput
    items?: SaleItemCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateInput = {
    id?: string
    customerId?: string | null
    saleDate?: Date | string
    totalAmount: number
    discount?: number
    tax?: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutSalesNestedInput
    items?: SaleItemUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleCreateManyInput = {
    id?: string
    customerId?: string | null
    saleDate?: Date | string
    totalAmount: number
    discount?: number
    tax?: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
    sale: SaleCreateNestedOneWithoutItemsInput
    finishedGood: FinishedGoodCreateNestedOneWithoutSaleItemsInput
  }

  export type SaleItemUncheckedCreateInput = {
    id?: string
    saleId: string
    finishedGoodId: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type SaleItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sale?: SaleUpdateOneRequiredWithoutItemsNestedInput
    finishedGood?: FinishedGoodUpdateOneRequiredWithoutSaleItemsNestedInput
  }

  export type SaleItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateManyInput = {
    id?: string
    saleId: string
    finishedGoodId: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type SaleItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type RawMaterialListRelationFilter = {
    every?: RawMaterialWhereInput
    some?: RawMaterialWhereInput
    none?: RawMaterialWhereInput
  }

  export type RawMaterialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PurchaseOrderListRelationFilter = {
    every?: PurchaseOrderWhereInput
    some?: PurchaseOrderWhereInput
    none?: PurchaseOrderWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PurchaseOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contact?: SortOrder
    website?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type SupplierNullableRelationFilter = {
    is?: SupplierWhereInput | null
    isNot?: SupplierWhereInput | null
  }

  export type RecipeItemListRelationFilter = {
    every?: RecipeItemWhereInput
    some?: RecipeItemWhereInput
    none?: RecipeItemWhereInput
  }

  export type AdjustmentListRelationFilter = {
    every?: AdjustmentWhereInput
    some?: AdjustmentWhereInput
    none?: AdjustmentWhereInput
  }

  export type PurchaseOrderItemListRelationFilter = {
    every?: PurchaseOrderItemWhereInput
    some?: PurchaseOrderItemWhereInput
    none?: PurchaseOrderItemWhereInput
  }

  export type RecipeItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdjustmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PurchaseOrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RawMaterialCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    supplierId?: SortOrder
    totalQuantity?: SortOrder
    unit?: SortOrder
    costPerUnit?: SortOrder
    reorderThreshold?: SortOrder
    committedQuantity?: SortOrder
    onOrderQuantity?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RawMaterialAvgOrderByAggregateInput = {
    totalQuantity?: SortOrder
    costPerUnit?: SortOrder
    reorderThreshold?: SortOrder
    committedQuantity?: SortOrder
    onOrderQuantity?: SortOrder
  }

  export type RawMaterialMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    supplierId?: SortOrder
    totalQuantity?: SortOrder
    unit?: SortOrder
    costPerUnit?: SortOrder
    reorderThreshold?: SortOrder
    committedQuantity?: SortOrder
    onOrderQuantity?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RawMaterialMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    supplierId?: SortOrder
    totalQuantity?: SortOrder
    unit?: SortOrder
    costPerUnit?: SortOrder
    reorderThreshold?: SortOrder
    committedQuantity?: SortOrder
    onOrderQuantity?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RawMaterialSumOrderByAggregateInput = {
    totalQuantity?: SortOrder
    costPerUnit?: SortOrder
    reorderThreshold?: SortOrder
    committedQuantity?: SortOrder
    onOrderQuantity?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SaleItemListRelationFilter = {
    every?: SaleItemWhereInput
    some?: SaleItemWhereInput
    none?: SaleItemWhereInput
  }

  export type SaleItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FinishedGoodCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    batchCode?: SortOrder
    quantityOnHand?: SortOrder
    retailPrice?: SortOrder
    calculatedCogs?: SortOrder
    vesselSizeOz?: SortOrder
    fragranceLoadPercent?: SortOrder
    laborCostPerUnit?: SortOrder
    overheadFlat?: SortOrder
    overheadPercent?: SortOrder
    isSubAssembly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FinishedGoodAvgOrderByAggregateInput = {
    quantityOnHand?: SortOrder
    retailPrice?: SortOrder
    calculatedCogs?: SortOrder
    vesselSizeOz?: SortOrder
    fragranceLoadPercent?: SortOrder
    laborCostPerUnit?: SortOrder
    overheadFlat?: SortOrder
    overheadPercent?: SortOrder
  }

  export type FinishedGoodMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    batchCode?: SortOrder
    quantityOnHand?: SortOrder
    retailPrice?: SortOrder
    calculatedCogs?: SortOrder
    vesselSizeOz?: SortOrder
    fragranceLoadPercent?: SortOrder
    laborCostPerUnit?: SortOrder
    overheadFlat?: SortOrder
    overheadPercent?: SortOrder
    isSubAssembly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FinishedGoodMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sku?: SortOrder
    batchCode?: SortOrder
    quantityOnHand?: SortOrder
    retailPrice?: SortOrder
    calculatedCogs?: SortOrder
    vesselSizeOz?: SortOrder
    fragranceLoadPercent?: SortOrder
    laborCostPerUnit?: SortOrder
    overheadFlat?: SortOrder
    overheadPercent?: SortOrder
    isSubAssembly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FinishedGoodSumOrderByAggregateInput = {
    quantityOnHand?: SortOrder
    retailPrice?: SortOrder
    calculatedCogs?: SortOrder
    vesselSizeOz?: SortOrder
    fragranceLoadPercent?: SortOrder
    laborCostPerUnit?: SortOrder
    overheadFlat?: SortOrder
    overheadPercent?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FinishedGoodRelationFilter = {
    is?: FinishedGoodWhereInput
    isNot?: FinishedGoodWhereInput
  }

  export type RawMaterialNullableRelationFilter = {
    is?: RawMaterialWhereInput | null
    isNot?: RawMaterialWhereInput | null
  }

  export type FinishedGoodNullableRelationFilter = {
    is?: FinishedGoodWhereInput | null
    isNot?: FinishedGoodWhereInput | null
  }

  export type RecipeItemFinishedGoodIdRawMaterialIdCompoundUniqueInput = {
    finishedGoodId: string
    rawMaterialId: string
  }

  export type RecipeItemCountOrderByAggregateInput = {
    id?: SortOrder
    finishedGoodId?: SortOrder
    rawMaterialId?: SortOrder
    subAssemblyId?: SortOrder
    requiredQuantity?: SortOrder
    unit?: SortOrder
  }

  export type RecipeItemAvgOrderByAggregateInput = {
    requiredQuantity?: SortOrder
  }

  export type RecipeItemMaxOrderByAggregateInput = {
    id?: SortOrder
    finishedGoodId?: SortOrder
    rawMaterialId?: SortOrder
    subAssemblyId?: SortOrder
    requiredQuantity?: SortOrder
    unit?: SortOrder
  }

  export type RecipeItemMinOrderByAggregateInput = {
    id?: SortOrder
    finishedGoodId?: SortOrder
    rawMaterialId?: SortOrder
    subAssemblyId?: SortOrder
    requiredQuantity?: SortOrder
    unit?: SortOrder
  }

  export type RecipeItemSumOrderByAggregateInput = {
    requiredQuantity?: SortOrder
  }

  export type RawMaterialRelationFilter = {
    is?: RawMaterialWhereInput
    isNot?: RawMaterialWhereInput
  }

  export type AdjustmentCountOrderByAggregateInput = {
    id?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type AdjustmentAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type AdjustmentMaxOrderByAggregateInput = {
    id?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type AdjustmentMinOrderByAggregateInput = {
    id?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type AdjustmentSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SupplierRelationFilter = {
    is?: SupplierWhereInput
    isNot?: SupplierWhereInput
  }

  export type PurchaseOrderCountOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    orderDate?: SortOrder
    expectedDate?: SortOrder
    receivedDate?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    orderDate?: SortOrder
    expectedDate?: SortOrder
    receivedDate?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseOrderMinOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    orderDate?: SortOrder
    expectedDate?: SortOrder
    receivedDate?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PurchaseOrderRelationFilter = {
    is?: PurchaseOrderWhereInput
    isNot?: PurchaseOrderWhereInput
  }

  export type PurchaseOrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    purchaseOrderId?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    receivedQty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseOrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitCost?: SortOrder
    receivedQty?: SortOrder
  }

  export type PurchaseOrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    purchaseOrderId?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    receivedQty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseOrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    purchaseOrderId?: SortOrder
    materialId?: SortOrder
    quantity?: SortOrder
    unitCost?: SortOrder
    receivedQty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseOrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitCost?: SortOrder
    receivedQty?: SortOrder
  }

  export type SaleListRelationFilter = {
    every?: SaleWhereInput
    some?: SaleWhereInput
    none?: SaleWhereInput
  }

  export type SaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerNullableRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type SaleCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    saleDate?: SortOrder
    totalAmount?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
  }

  export type SaleMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    saleDate?: SortOrder
    totalAmount?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    saleDate?: SortOrder
    totalAmount?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SaleSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
  }

  export type SaleRelationFilter = {
    is?: SaleWhereInput
    isNot?: SaleWhereInput
  }

  export type SaleItemCountOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    finishedGoodId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type SaleItemMaxOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    finishedGoodId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleItemMinOrderByAggregateInput = {
    id?: SortOrder
    saleId?: SortOrder
    finishedGoodId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type SaleItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type RawMaterialCreateNestedManyWithoutCategoryInput = {
    create?: XOR<RawMaterialCreateWithoutCategoryInput, RawMaterialUncheckedCreateWithoutCategoryInput> | RawMaterialCreateWithoutCategoryInput[] | RawMaterialUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RawMaterialCreateOrConnectWithoutCategoryInput | RawMaterialCreateOrConnectWithoutCategoryInput[]
    createMany?: RawMaterialCreateManyCategoryInputEnvelope
    connect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
  }

  export type RawMaterialUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<RawMaterialCreateWithoutCategoryInput, RawMaterialUncheckedCreateWithoutCategoryInput> | RawMaterialCreateWithoutCategoryInput[] | RawMaterialUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RawMaterialCreateOrConnectWithoutCategoryInput | RawMaterialCreateOrConnectWithoutCategoryInput[]
    createMany?: RawMaterialCreateManyCategoryInputEnvelope
    connect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type RawMaterialUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<RawMaterialCreateWithoutCategoryInput, RawMaterialUncheckedCreateWithoutCategoryInput> | RawMaterialCreateWithoutCategoryInput[] | RawMaterialUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RawMaterialCreateOrConnectWithoutCategoryInput | RawMaterialCreateOrConnectWithoutCategoryInput[]
    upsert?: RawMaterialUpsertWithWhereUniqueWithoutCategoryInput | RawMaterialUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: RawMaterialCreateManyCategoryInputEnvelope
    set?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    disconnect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    delete?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    connect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    update?: RawMaterialUpdateWithWhereUniqueWithoutCategoryInput | RawMaterialUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: RawMaterialUpdateManyWithWhereWithoutCategoryInput | RawMaterialUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: RawMaterialScalarWhereInput | RawMaterialScalarWhereInput[]
  }

  export type RawMaterialUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<RawMaterialCreateWithoutCategoryInput, RawMaterialUncheckedCreateWithoutCategoryInput> | RawMaterialCreateWithoutCategoryInput[] | RawMaterialUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: RawMaterialCreateOrConnectWithoutCategoryInput | RawMaterialCreateOrConnectWithoutCategoryInput[]
    upsert?: RawMaterialUpsertWithWhereUniqueWithoutCategoryInput | RawMaterialUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: RawMaterialCreateManyCategoryInputEnvelope
    set?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    disconnect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    delete?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    connect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    update?: RawMaterialUpdateWithWhereUniqueWithoutCategoryInput | RawMaterialUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: RawMaterialUpdateManyWithWhereWithoutCategoryInput | RawMaterialUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: RawMaterialScalarWhereInput | RawMaterialScalarWhereInput[]
  }

  export type RawMaterialCreateNestedManyWithoutSupplierInput = {
    create?: XOR<RawMaterialCreateWithoutSupplierInput, RawMaterialUncheckedCreateWithoutSupplierInput> | RawMaterialCreateWithoutSupplierInput[] | RawMaterialUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: RawMaterialCreateOrConnectWithoutSupplierInput | RawMaterialCreateOrConnectWithoutSupplierInput[]
    createMany?: RawMaterialCreateManySupplierInputEnvelope
    connect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
  }

  export type PurchaseOrderCreateNestedManyWithoutSupplierInput = {
    create?: XOR<PurchaseOrderCreateWithoutSupplierInput, PurchaseOrderUncheckedCreateWithoutSupplierInput> | PurchaseOrderCreateWithoutSupplierInput[] | PurchaseOrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutSupplierInput | PurchaseOrderCreateOrConnectWithoutSupplierInput[]
    createMany?: PurchaseOrderCreateManySupplierInputEnvelope
    connect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
  }

  export type RawMaterialUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<RawMaterialCreateWithoutSupplierInput, RawMaterialUncheckedCreateWithoutSupplierInput> | RawMaterialCreateWithoutSupplierInput[] | RawMaterialUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: RawMaterialCreateOrConnectWithoutSupplierInput | RawMaterialCreateOrConnectWithoutSupplierInput[]
    createMany?: RawMaterialCreateManySupplierInputEnvelope
    connect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
  }

  export type PurchaseOrderUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<PurchaseOrderCreateWithoutSupplierInput, PurchaseOrderUncheckedCreateWithoutSupplierInput> | PurchaseOrderCreateWithoutSupplierInput[] | PurchaseOrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutSupplierInput | PurchaseOrderCreateOrConnectWithoutSupplierInput[]
    createMany?: PurchaseOrderCreateManySupplierInputEnvelope
    connect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RawMaterialUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<RawMaterialCreateWithoutSupplierInput, RawMaterialUncheckedCreateWithoutSupplierInput> | RawMaterialCreateWithoutSupplierInput[] | RawMaterialUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: RawMaterialCreateOrConnectWithoutSupplierInput | RawMaterialCreateOrConnectWithoutSupplierInput[]
    upsert?: RawMaterialUpsertWithWhereUniqueWithoutSupplierInput | RawMaterialUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: RawMaterialCreateManySupplierInputEnvelope
    set?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    disconnect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    delete?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    connect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    update?: RawMaterialUpdateWithWhereUniqueWithoutSupplierInput | RawMaterialUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: RawMaterialUpdateManyWithWhereWithoutSupplierInput | RawMaterialUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: RawMaterialScalarWhereInput | RawMaterialScalarWhereInput[]
  }

  export type PurchaseOrderUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<PurchaseOrderCreateWithoutSupplierInput, PurchaseOrderUncheckedCreateWithoutSupplierInput> | PurchaseOrderCreateWithoutSupplierInput[] | PurchaseOrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutSupplierInput | PurchaseOrderCreateOrConnectWithoutSupplierInput[]
    upsert?: PurchaseOrderUpsertWithWhereUniqueWithoutSupplierInput | PurchaseOrderUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: PurchaseOrderCreateManySupplierInputEnvelope
    set?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    disconnect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    delete?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    connect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    update?: PurchaseOrderUpdateWithWhereUniqueWithoutSupplierInput | PurchaseOrderUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: PurchaseOrderUpdateManyWithWhereWithoutSupplierInput | PurchaseOrderUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: PurchaseOrderScalarWhereInput | PurchaseOrderScalarWhereInput[]
  }

  export type RawMaterialUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<RawMaterialCreateWithoutSupplierInput, RawMaterialUncheckedCreateWithoutSupplierInput> | RawMaterialCreateWithoutSupplierInput[] | RawMaterialUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: RawMaterialCreateOrConnectWithoutSupplierInput | RawMaterialCreateOrConnectWithoutSupplierInput[]
    upsert?: RawMaterialUpsertWithWhereUniqueWithoutSupplierInput | RawMaterialUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: RawMaterialCreateManySupplierInputEnvelope
    set?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    disconnect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    delete?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    connect?: RawMaterialWhereUniqueInput | RawMaterialWhereUniqueInput[]
    update?: RawMaterialUpdateWithWhereUniqueWithoutSupplierInput | RawMaterialUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: RawMaterialUpdateManyWithWhereWithoutSupplierInput | RawMaterialUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: RawMaterialScalarWhereInput | RawMaterialScalarWhereInput[]
  }

  export type PurchaseOrderUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<PurchaseOrderCreateWithoutSupplierInput, PurchaseOrderUncheckedCreateWithoutSupplierInput> | PurchaseOrderCreateWithoutSupplierInput[] | PurchaseOrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutSupplierInput | PurchaseOrderCreateOrConnectWithoutSupplierInput[]
    upsert?: PurchaseOrderUpsertWithWhereUniqueWithoutSupplierInput | PurchaseOrderUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: PurchaseOrderCreateManySupplierInputEnvelope
    set?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    disconnect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    delete?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    connect?: PurchaseOrderWhereUniqueInput | PurchaseOrderWhereUniqueInput[]
    update?: PurchaseOrderUpdateWithWhereUniqueWithoutSupplierInput | PurchaseOrderUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: PurchaseOrderUpdateManyWithWhereWithoutSupplierInput | PurchaseOrderUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: PurchaseOrderScalarWhereInput | PurchaseOrderScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutRawMaterialsInput = {
    create?: XOR<CategoryCreateWithoutRawMaterialsInput, CategoryUncheckedCreateWithoutRawMaterialsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutRawMaterialsInput
    connect?: CategoryWhereUniqueInput
  }

  export type SupplierCreateNestedOneWithoutRawMaterialsInput = {
    create?: XOR<SupplierCreateWithoutRawMaterialsInput, SupplierUncheckedCreateWithoutRawMaterialsInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutRawMaterialsInput
    connect?: SupplierWhereUniqueInput
  }

  export type RecipeItemCreateNestedManyWithoutRawMaterialInput = {
    create?: XOR<RecipeItemCreateWithoutRawMaterialInput, RecipeItemUncheckedCreateWithoutRawMaterialInput> | RecipeItemCreateWithoutRawMaterialInput[] | RecipeItemUncheckedCreateWithoutRawMaterialInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutRawMaterialInput | RecipeItemCreateOrConnectWithoutRawMaterialInput[]
    createMany?: RecipeItemCreateManyRawMaterialInputEnvelope
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
  }

  export type AdjustmentCreateNestedManyWithoutMaterialInput = {
    create?: XOR<AdjustmentCreateWithoutMaterialInput, AdjustmentUncheckedCreateWithoutMaterialInput> | AdjustmentCreateWithoutMaterialInput[] | AdjustmentUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: AdjustmentCreateOrConnectWithoutMaterialInput | AdjustmentCreateOrConnectWithoutMaterialInput[]
    createMany?: AdjustmentCreateManyMaterialInputEnvelope
    connect?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
  }

  export type PurchaseOrderItemCreateNestedManyWithoutMaterialInput = {
    create?: XOR<PurchaseOrderItemCreateWithoutMaterialInput, PurchaseOrderItemUncheckedCreateWithoutMaterialInput> | PurchaseOrderItemCreateWithoutMaterialInput[] | PurchaseOrderItemUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: PurchaseOrderItemCreateOrConnectWithoutMaterialInput | PurchaseOrderItemCreateOrConnectWithoutMaterialInput[]
    createMany?: PurchaseOrderItemCreateManyMaterialInputEnvelope
    connect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
  }

  export type RecipeItemUncheckedCreateNestedManyWithoutRawMaterialInput = {
    create?: XOR<RecipeItemCreateWithoutRawMaterialInput, RecipeItemUncheckedCreateWithoutRawMaterialInput> | RecipeItemCreateWithoutRawMaterialInput[] | RecipeItemUncheckedCreateWithoutRawMaterialInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutRawMaterialInput | RecipeItemCreateOrConnectWithoutRawMaterialInput[]
    createMany?: RecipeItemCreateManyRawMaterialInputEnvelope
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
  }

  export type AdjustmentUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: XOR<AdjustmentCreateWithoutMaterialInput, AdjustmentUncheckedCreateWithoutMaterialInput> | AdjustmentCreateWithoutMaterialInput[] | AdjustmentUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: AdjustmentCreateOrConnectWithoutMaterialInput | AdjustmentCreateOrConnectWithoutMaterialInput[]
    createMany?: AdjustmentCreateManyMaterialInputEnvelope
    connect?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
  }

  export type PurchaseOrderItemUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: XOR<PurchaseOrderItemCreateWithoutMaterialInput, PurchaseOrderItemUncheckedCreateWithoutMaterialInput> | PurchaseOrderItemCreateWithoutMaterialInput[] | PurchaseOrderItemUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: PurchaseOrderItemCreateOrConnectWithoutMaterialInput | PurchaseOrderItemCreateOrConnectWithoutMaterialInput[]
    createMany?: PurchaseOrderItemCreateManyMaterialInputEnvelope
    connect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryUpdateOneRequiredWithoutRawMaterialsNestedInput = {
    create?: XOR<CategoryCreateWithoutRawMaterialsInput, CategoryUncheckedCreateWithoutRawMaterialsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutRawMaterialsInput
    upsert?: CategoryUpsertWithoutRawMaterialsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutRawMaterialsInput, CategoryUpdateWithoutRawMaterialsInput>, CategoryUncheckedUpdateWithoutRawMaterialsInput>
  }

  export type SupplierUpdateOneWithoutRawMaterialsNestedInput = {
    create?: XOR<SupplierCreateWithoutRawMaterialsInput, SupplierUncheckedCreateWithoutRawMaterialsInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutRawMaterialsInput
    upsert?: SupplierUpsertWithoutRawMaterialsInput
    disconnect?: SupplierWhereInput | boolean
    delete?: SupplierWhereInput | boolean
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutRawMaterialsInput, SupplierUpdateWithoutRawMaterialsInput>, SupplierUncheckedUpdateWithoutRawMaterialsInput>
  }

  export type RecipeItemUpdateManyWithoutRawMaterialNestedInput = {
    create?: XOR<RecipeItemCreateWithoutRawMaterialInput, RecipeItemUncheckedCreateWithoutRawMaterialInput> | RecipeItemCreateWithoutRawMaterialInput[] | RecipeItemUncheckedCreateWithoutRawMaterialInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutRawMaterialInput | RecipeItemCreateOrConnectWithoutRawMaterialInput[]
    upsert?: RecipeItemUpsertWithWhereUniqueWithoutRawMaterialInput | RecipeItemUpsertWithWhereUniqueWithoutRawMaterialInput[]
    createMany?: RecipeItemCreateManyRawMaterialInputEnvelope
    set?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    disconnect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    delete?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    update?: RecipeItemUpdateWithWhereUniqueWithoutRawMaterialInput | RecipeItemUpdateWithWhereUniqueWithoutRawMaterialInput[]
    updateMany?: RecipeItemUpdateManyWithWhereWithoutRawMaterialInput | RecipeItemUpdateManyWithWhereWithoutRawMaterialInput[]
    deleteMany?: RecipeItemScalarWhereInput | RecipeItemScalarWhereInput[]
  }

  export type AdjustmentUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<AdjustmentCreateWithoutMaterialInput, AdjustmentUncheckedCreateWithoutMaterialInput> | AdjustmentCreateWithoutMaterialInput[] | AdjustmentUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: AdjustmentCreateOrConnectWithoutMaterialInput | AdjustmentCreateOrConnectWithoutMaterialInput[]
    upsert?: AdjustmentUpsertWithWhereUniqueWithoutMaterialInput | AdjustmentUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: AdjustmentCreateManyMaterialInputEnvelope
    set?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
    disconnect?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
    delete?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
    connect?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
    update?: AdjustmentUpdateWithWhereUniqueWithoutMaterialInput | AdjustmentUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: AdjustmentUpdateManyWithWhereWithoutMaterialInput | AdjustmentUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: AdjustmentScalarWhereInput | AdjustmentScalarWhereInput[]
  }

  export type PurchaseOrderItemUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<PurchaseOrderItemCreateWithoutMaterialInput, PurchaseOrderItemUncheckedCreateWithoutMaterialInput> | PurchaseOrderItemCreateWithoutMaterialInput[] | PurchaseOrderItemUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: PurchaseOrderItemCreateOrConnectWithoutMaterialInput | PurchaseOrderItemCreateOrConnectWithoutMaterialInput[]
    upsert?: PurchaseOrderItemUpsertWithWhereUniqueWithoutMaterialInput | PurchaseOrderItemUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: PurchaseOrderItemCreateManyMaterialInputEnvelope
    set?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    disconnect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    delete?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    connect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    update?: PurchaseOrderItemUpdateWithWhereUniqueWithoutMaterialInput | PurchaseOrderItemUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: PurchaseOrderItemUpdateManyWithWhereWithoutMaterialInput | PurchaseOrderItemUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: PurchaseOrderItemScalarWhereInput | PurchaseOrderItemScalarWhereInput[]
  }

  export type RecipeItemUncheckedUpdateManyWithoutRawMaterialNestedInput = {
    create?: XOR<RecipeItemCreateWithoutRawMaterialInput, RecipeItemUncheckedCreateWithoutRawMaterialInput> | RecipeItemCreateWithoutRawMaterialInput[] | RecipeItemUncheckedCreateWithoutRawMaterialInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutRawMaterialInput | RecipeItemCreateOrConnectWithoutRawMaterialInput[]
    upsert?: RecipeItemUpsertWithWhereUniqueWithoutRawMaterialInput | RecipeItemUpsertWithWhereUniqueWithoutRawMaterialInput[]
    createMany?: RecipeItemCreateManyRawMaterialInputEnvelope
    set?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    disconnect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    delete?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    update?: RecipeItemUpdateWithWhereUniqueWithoutRawMaterialInput | RecipeItemUpdateWithWhereUniqueWithoutRawMaterialInput[]
    updateMany?: RecipeItemUpdateManyWithWhereWithoutRawMaterialInput | RecipeItemUpdateManyWithWhereWithoutRawMaterialInput[]
    deleteMany?: RecipeItemScalarWhereInput | RecipeItemScalarWhereInput[]
  }

  export type AdjustmentUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<AdjustmentCreateWithoutMaterialInput, AdjustmentUncheckedCreateWithoutMaterialInput> | AdjustmentCreateWithoutMaterialInput[] | AdjustmentUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: AdjustmentCreateOrConnectWithoutMaterialInput | AdjustmentCreateOrConnectWithoutMaterialInput[]
    upsert?: AdjustmentUpsertWithWhereUniqueWithoutMaterialInput | AdjustmentUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: AdjustmentCreateManyMaterialInputEnvelope
    set?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
    disconnect?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
    delete?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
    connect?: AdjustmentWhereUniqueInput | AdjustmentWhereUniqueInput[]
    update?: AdjustmentUpdateWithWhereUniqueWithoutMaterialInput | AdjustmentUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: AdjustmentUpdateManyWithWhereWithoutMaterialInput | AdjustmentUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: AdjustmentScalarWhereInput | AdjustmentScalarWhereInput[]
  }

  export type PurchaseOrderItemUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: XOR<PurchaseOrderItemCreateWithoutMaterialInput, PurchaseOrderItemUncheckedCreateWithoutMaterialInput> | PurchaseOrderItemCreateWithoutMaterialInput[] | PurchaseOrderItemUncheckedCreateWithoutMaterialInput[]
    connectOrCreate?: PurchaseOrderItemCreateOrConnectWithoutMaterialInput | PurchaseOrderItemCreateOrConnectWithoutMaterialInput[]
    upsert?: PurchaseOrderItemUpsertWithWhereUniqueWithoutMaterialInput | PurchaseOrderItemUpsertWithWhereUniqueWithoutMaterialInput[]
    createMany?: PurchaseOrderItemCreateManyMaterialInputEnvelope
    set?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    disconnect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    delete?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    connect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    update?: PurchaseOrderItemUpdateWithWhereUniqueWithoutMaterialInput | PurchaseOrderItemUpdateWithWhereUniqueWithoutMaterialInput[]
    updateMany?: PurchaseOrderItemUpdateManyWithWhereWithoutMaterialInput | PurchaseOrderItemUpdateManyWithWhereWithoutMaterialInput[]
    deleteMany?: PurchaseOrderItemScalarWhereInput | PurchaseOrderItemScalarWhereInput[]
  }

  export type RecipeItemCreateNestedManyWithoutFinishedGoodInput = {
    create?: XOR<RecipeItemCreateWithoutFinishedGoodInput, RecipeItemUncheckedCreateWithoutFinishedGoodInput> | RecipeItemCreateWithoutFinishedGoodInput[] | RecipeItemUncheckedCreateWithoutFinishedGoodInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutFinishedGoodInput | RecipeItemCreateOrConnectWithoutFinishedGoodInput[]
    createMany?: RecipeItemCreateManyFinishedGoodInputEnvelope
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
  }

  export type RecipeItemCreateNestedManyWithoutSubAssemblyInput = {
    create?: XOR<RecipeItemCreateWithoutSubAssemblyInput, RecipeItemUncheckedCreateWithoutSubAssemblyInput> | RecipeItemCreateWithoutSubAssemblyInput[] | RecipeItemUncheckedCreateWithoutSubAssemblyInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutSubAssemblyInput | RecipeItemCreateOrConnectWithoutSubAssemblyInput[]
    createMany?: RecipeItemCreateManySubAssemblyInputEnvelope
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
  }

  export type SaleItemCreateNestedManyWithoutFinishedGoodInput = {
    create?: XOR<SaleItemCreateWithoutFinishedGoodInput, SaleItemUncheckedCreateWithoutFinishedGoodInput> | SaleItemCreateWithoutFinishedGoodInput[] | SaleItemUncheckedCreateWithoutFinishedGoodInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutFinishedGoodInput | SaleItemCreateOrConnectWithoutFinishedGoodInput[]
    createMany?: SaleItemCreateManyFinishedGoodInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type RecipeItemUncheckedCreateNestedManyWithoutFinishedGoodInput = {
    create?: XOR<RecipeItemCreateWithoutFinishedGoodInput, RecipeItemUncheckedCreateWithoutFinishedGoodInput> | RecipeItemCreateWithoutFinishedGoodInput[] | RecipeItemUncheckedCreateWithoutFinishedGoodInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutFinishedGoodInput | RecipeItemCreateOrConnectWithoutFinishedGoodInput[]
    createMany?: RecipeItemCreateManyFinishedGoodInputEnvelope
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
  }

  export type RecipeItemUncheckedCreateNestedManyWithoutSubAssemblyInput = {
    create?: XOR<RecipeItemCreateWithoutSubAssemblyInput, RecipeItemUncheckedCreateWithoutSubAssemblyInput> | RecipeItemCreateWithoutSubAssemblyInput[] | RecipeItemUncheckedCreateWithoutSubAssemblyInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutSubAssemblyInput | RecipeItemCreateOrConnectWithoutSubAssemblyInput[]
    createMany?: RecipeItemCreateManySubAssemblyInputEnvelope
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
  }

  export type SaleItemUncheckedCreateNestedManyWithoutFinishedGoodInput = {
    create?: XOR<SaleItemCreateWithoutFinishedGoodInput, SaleItemUncheckedCreateWithoutFinishedGoodInput> | SaleItemCreateWithoutFinishedGoodInput[] | SaleItemUncheckedCreateWithoutFinishedGoodInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutFinishedGoodInput | SaleItemCreateOrConnectWithoutFinishedGoodInput[]
    createMany?: SaleItemCreateManyFinishedGoodInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RecipeItemUpdateManyWithoutFinishedGoodNestedInput = {
    create?: XOR<RecipeItemCreateWithoutFinishedGoodInput, RecipeItemUncheckedCreateWithoutFinishedGoodInput> | RecipeItemCreateWithoutFinishedGoodInput[] | RecipeItemUncheckedCreateWithoutFinishedGoodInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutFinishedGoodInput | RecipeItemCreateOrConnectWithoutFinishedGoodInput[]
    upsert?: RecipeItemUpsertWithWhereUniqueWithoutFinishedGoodInput | RecipeItemUpsertWithWhereUniqueWithoutFinishedGoodInput[]
    createMany?: RecipeItemCreateManyFinishedGoodInputEnvelope
    set?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    disconnect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    delete?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    update?: RecipeItemUpdateWithWhereUniqueWithoutFinishedGoodInput | RecipeItemUpdateWithWhereUniqueWithoutFinishedGoodInput[]
    updateMany?: RecipeItemUpdateManyWithWhereWithoutFinishedGoodInput | RecipeItemUpdateManyWithWhereWithoutFinishedGoodInput[]
    deleteMany?: RecipeItemScalarWhereInput | RecipeItemScalarWhereInput[]
  }

  export type RecipeItemUpdateManyWithoutSubAssemblyNestedInput = {
    create?: XOR<RecipeItemCreateWithoutSubAssemblyInput, RecipeItemUncheckedCreateWithoutSubAssemblyInput> | RecipeItemCreateWithoutSubAssemblyInput[] | RecipeItemUncheckedCreateWithoutSubAssemblyInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutSubAssemblyInput | RecipeItemCreateOrConnectWithoutSubAssemblyInput[]
    upsert?: RecipeItemUpsertWithWhereUniqueWithoutSubAssemblyInput | RecipeItemUpsertWithWhereUniqueWithoutSubAssemblyInput[]
    createMany?: RecipeItemCreateManySubAssemblyInputEnvelope
    set?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    disconnect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    delete?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    update?: RecipeItemUpdateWithWhereUniqueWithoutSubAssemblyInput | RecipeItemUpdateWithWhereUniqueWithoutSubAssemblyInput[]
    updateMany?: RecipeItemUpdateManyWithWhereWithoutSubAssemblyInput | RecipeItemUpdateManyWithWhereWithoutSubAssemblyInput[]
    deleteMany?: RecipeItemScalarWhereInput | RecipeItemScalarWhereInput[]
  }

  export type SaleItemUpdateManyWithoutFinishedGoodNestedInput = {
    create?: XOR<SaleItemCreateWithoutFinishedGoodInput, SaleItemUncheckedCreateWithoutFinishedGoodInput> | SaleItemCreateWithoutFinishedGoodInput[] | SaleItemUncheckedCreateWithoutFinishedGoodInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutFinishedGoodInput | SaleItemCreateOrConnectWithoutFinishedGoodInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutFinishedGoodInput | SaleItemUpsertWithWhereUniqueWithoutFinishedGoodInput[]
    createMany?: SaleItemCreateManyFinishedGoodInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutFinishedGoodInput | SaleItemUpdateWithWhereUniqueWithoutFinishedGoodInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutFinishedGoodInput | SaleItemUpdateManyWithWhereWithoutFinishedGoodInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type RecipeItemUncheckedUpdateManyWithoutFinishedGoodNestedInput = {
    create?: XOR<RecipeItemCreateWithoutFinishedGoodInput, RecipeItemUncheckedCreateWithoutFinishedGoodInput> | RecipeItemCreateWithoutFinishedGoodInput[] | RecipeItemUncheckedCreateWithoutFinishedGoodInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutFinishedGoodInput | RecipeItemCreateOrConnectWithoutFinishedGoodInput[]
    upsert?: RecipeItemUpsertWithWhereUniqueWithoutFinishedGoodInput | RecipeItemUpsertWithWhereUniqueWithoutFinishedGoodInput[]
    createMany?: RecipeItemCreateManyFinishedGoodInputEnvelope
    set?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    disconnect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    delete?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    update?: RecipeItemUpdateWithWhereUniqueWithoutFinishedGoodInput | RecipeItemUpdateWithWhereUniqueWithoutFinishedGoodInput[]
    updateMany?: RecipeItemUpdateManyWithWhereWithoutFinishedGoodInput | RecipeItemUpdateManyWithWhereWithoutFinishedGoodInput[]
    deleteMany?: RecipeItemScalarWhereInput | RecipeItemScalarWhereInput[]
  }

  export type RecipeItemUncheckedUpdateManyWithoutSubAssemblyNestedInput = {
    create?: XOR<RecipeItemCreateWithoutSubAssemblyInput, RecipeItemUncheckedCreateWithoutSubAssemblyInput> | RecipeItemCreateWithoutSubAssemblyInput[] | RecipeItemUncheckedCreateWithoutSubAssemblyInput[]
    connectOrCreate?: RecipeItemCreateOrConnectWithoutSubAssemblyInput | RecipeItemCreateOrConnectWithoutSubAssemblyInput[]
    upsert?: RecipeItemUpsertWithWhereUniqueWithoutSubAssemblyInput | RecipeItemUpsertWithWhereUniqueWithoutSubAssemblyInput[]
    createMany?: RecipeItemCreateManySubAssemblyInputEnvelope
    set?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    disconnect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    delete?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    connect?: RecipeItemWhereUniqueInput | RecipeItemWhereUniqueInput[]
    update?: RecipeItemUpdateWithWhereUniqueWithoutSubAssemblyInput | RecipeItemUpdateWithWhereUniqueWithoutSubAssemblyInput[]
    updateMany?: RecipeItemUpdateManyWithWhereWithoutSubAssemblyInput | RecipeItemUpdateManyWithWhereWithoutSubAssemblyInput[]
    deleteMany?: RecipeItemScalarWhereInput | RecipeItemScalarWhereInput[]
  }

  export type SaleItemUncheckedUpdateManyWithoutFinishedGoodNestedInput = {
    create?: XOR<SaleItemCreateWithoutFinishedGoodInput, SaleItemUncheckedCreateWithoutFinishedGoodInput> | SaleItemCreateWithoutFinishedGoodInput[] | SaleItemUncheckedCreateWithoutFinishedGoodInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutFinishedGoodInput | SaleItemCreateOrConnectWithoutFinishedGoodInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutFinishedGoodInput | SaleItemUpsertWithWhereUniqueWithoutFinishedGoodInput[]
    createMany?: SaleItemCreateManyFinishedGoodInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutFinishedGoodInput | SaleItemUpdateWithWhereUniqueWithoutFinishedGoodInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutFinishedGoodInput | SaleItemUpdateManyWithWhereWithoutFinishedGoodInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type FinishedGoodCreateNestedOneWithoutRecipeItemsInput = {
    create?: XOR<FinishedGoodCreateWithoutRecipeItemsInput, FinishedGoodUncheckedCreateWithoutRecipeItemsInput>
    connectOrCreate?: FinishedGoodCreateOrConnectWithoutRecipeItemsInput
    connect?: FinishedGoodWhereUniqueInput
  }

  export type RawMaterialCreateNestedOneWithoutRecipeItemsInput = {
    create?: XOR<RawMaterialCreateWithoutRecipeItemsInput, RawMaterialUncheckedCreateWithoutRecipeItemsInput>
    connectOrCreate?: RawMaterialCreateOrConnectWithoutRecipeItemsInput
    connect?: RawMaterialWhereUniqueInput
  }

  export type FinishedGoodCreateNestedOneWithoutUsedAsSubAssemblyInput = {
    create?: XOR<FinishedGoodCreateWithoutUsedAsSubAssemblyInput, FinishedGoodUncheckedCreateWithoutUsedAsSubAssemblyInput>
    connectOrCreate?: FinishedGoodCreateOrConnectWithoutUsedAsSubAssemblyInput
    connect?: FinishedGoodWhereUniqueInput
  }

  export type FinishedGoodUpdateOneRequiredWithoutRecipeItemsNestedInput = {
    create?: XOR<FinishedGoodCreateWithoutRecipeItemsInput, FinishedGoodUncheckedCreateWithoutRecipeItemsInput>
    connectOrCreate?: FinishedGoodCreateOrConnectWithoutRecipeItemsInput
    upsert?: FinishedGoodUpsertWithoutRecipeItemsInput
    connect?: FinishedGoodWhereUniqueInput
    update?: XOR<XOR<FinishedGoodUpdateToOneWithWhereWithoutRecipeItemsInput, FinishedGoodUpdateWithoutRecipeItemsInput>, FinishedGoodUncheckedUpdateWithoutRecipeItemsInput>
  }

  export type RawMaterialUpdateOneWithoutRecipeItemsNestedInput = {
    create?: XOR<RawMaterialCreateWithoutRecipeItemsInput, RawMaterialUncheckedCreateWithoutRecipeItemsInput>
    connectOrCreate?: RawMaterialCreateOrConnectWithoutRecipeItemsInput
    upsert?: RawMaterialUpsertWithoutRecipeItemsInput
    disconnect?: RawMaterialWhereInput | boolean
    delete?: RawMaterialWhereInput | boolean
    connect?: RawMaterialWhereUniqueInput
    update?: XOR<XOR<RawMaterialUpdateToOneWithWhereWithoutRecipeItemsInput, RawMaterialUpdateWithoutRecipeItemsInput>, RawMaterialUncheckedUpdateWithoutRecipeItemsInput>
  }

  export type FinishedGoodUpdateOneWithoutUsedAsSubAssemblyNestedInput = {
    create?: XOR<FinishedGoodCreateWithoutUsedAsSubAssemblyInput, FinishedGoodUncheckedCreateWithoutUsedAsSubAssemblyInput>
    connectOrCreate?: FinishedGoodCreateOrConnectWithoutUsedAsSubAssemblyInput
    upsert?: FinishedGoodUpsertWithoutUsedAsSubAssemblyInput
    disconnect?: FinishedGoodWhereInput | boolean
    delete?: FinishedGoodWhereInput | boolean
    connect?: FinishedGoodWhereUniqueInput
    update?: XOR<XOR<FinishedGoodUpdateToOneWithWhereWithoutUsedAsSubAssemblyInput, FinishedGoodUpdateWithoutUsedAsSubAssemblyInput>, FinishedGoodUncheckedUpdateWithoutUsedAsSubAssemblyInput>
  }

  export type RawMaterialCreateNestedOneWithoutAdjustmentsInput = {
    create?: XOR<RawMaterialCreateWithoutAdjustmentsInput, RawMaterialUncheckedCreateWithoutAdjustmentsInput>
    connectOrCreate?: RawMaterialCreateOrConnectWithoutAdjustmentsInput
    connect?: RawMaterialWhereUniqueInput
  }

  export type RawMaterialUpdateOneRequiredWithoutAdjustmentsNestedInput = {
    create?: XOR<RawMaterialCreateWithoutAdjustmentsInput, RawMaterialUncheckedCreateWithoutAdjustmentsInput>
    connectOrCreate?: RawMaterialCreateOrConnectWithoutAdjustmentsInput
    upsert?: RawMaterialUpsertWithoutAdjustmentsInput
    connect?: RawMaterialWhereUniqueInput
    update?: XOR<XOR<RawMaterialUpdateToOneWithWhereWithoutAdjustmentsInput, RawMaterialUpdateWithoutAdjustmentsInput>, RawMaterialUncheckedUpdateWithoutAdjustmentsInput>
  }

  export type SupplierCreateNestedOneWithoutPurchaseOrdersInput = {
    create?: XOR<SupplierCreateWithoutPurchaseOrdersInput, SupplierUncheckedCreateWithoutPurchaseOrdersInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutPurchaseOrdersInput
    connect?: SupplierWhereUniqueInput
  }

  export type PurchaseOrderItemCreateNestedManyWithoutPurchaseOrderInput = {
    create?: XOR<PurchaseOrderItemCreateWithoutPurchaseOrderInput, PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput> | PurchaseOrderItemCreateWithoutPurchaseOrderInput[] | PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput[]
    connectOrCreate?: PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput | PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput[]
    createMany?: PurchaseOrderItemCreateManyPurchaseOrderInputEnvelope
    connect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
  }

  export type PurchaseOrderItemUncheckedCreateNestedManyWithoutPurchaseOrderInput = {
    create?: XOR<PurchaseOrderItemCreateWithoutPurchaseOrderInput, PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput> | PurchaseOrderItemCreateWithoutPurchaseOrderInput[] | PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput[]
    connectOrCreate?: PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput | PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput[]
    createMany?: PurchaseOrderItemCreateManyPurchaseOrderInputEnvelope
    connect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SupplierUpdateOneRequiredWithoutPurchaseOrdersNestedInput = {
    create?: XOR<SupplierCreateWithoutPurchaseOrdersInput, SupplierUncheckedCreateWithoutPurchaseOrdersInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutPurchaseOrdersInput
    upsert?: SupplierUpsertWithoutPurchaseOrdersInput
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutPurchaseOrdersInput, SupplierUpdateWithoutPurchaseOrdersInput>, SupplierUncheckedUpdateWithoutPurchaseOrdersInput>
  }

  export type PurchaseOrderItemUpdateManyWithoutPurchaseOrderNestedInput = {
    create?: XOR<PurchaseOrderItemCreateWithoutPurchaseOrderInput, PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput> | PurchaseOrderItemCreateWithoutPurchaseOrderInput[] | PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput[]
    connectOrCreate?: PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput | PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput[]
    upsert?: PurchaseOrderItemUpsertWithWhereUniqueWithoutPurchaseOrderInput | PurchaseOrderItemUpsertWithWhereUniqueWithoutPurchaseOrderInput[]
    createMany?: PurchaseOrderItemCreateManyPurchaseOrderInputEnvelope
    set?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    disconnect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    delete?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    connect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    update?: PurchaseOrderItemUpdateWithWhereUniqueWithoutPurchaseOrderInput | PurchaseOrderItemUpdateWithWhereUniqueWithoutPurchaseOrderInput[]
    updateMany?: PurchaseOrderItemUpdateManyWithWhereWithoutPurchaseOrderInput | PurchaseOrderItemUpdateManyWithWhereWithoutPurchaseOrderInput[]
    deleteMany?: PurchaseOrderItemScalarWhereInput | PurchaseOrderItemScalarWhereInput[]
  }

  export type PurchaseOrderItemUncheckedUpdateManyWithoutPurchaseOrderNestedInput = {
    create?: XOR<PurchaseOrderItemCreateWithoutPurchaseOrderInput, PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput> | PurchaseOrderItemCreateWithoutPurchaseOrderInput[] | PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput[]
    connectOrCreate?: PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput | PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput[]
    upsert?: PurchaseOrderItemUpsertWithWhereUniqueWithoutPurchaseOrderInput | PurchaseOrderItemUpsertWithWhereUniqueWithoutPurchaseOrderInput[]
    createMany?: PurchaseOrderItemCreateManyPurchaseOrderInputEnvelope
    set?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    disconnect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    delete?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    connect?: PurchaseOrderItemWhereUniqueInput | PurchaseOrderItemWhereUniqueInput[]
    update?: PurchaseOrderItemUpdateWithWhereUniqueWithoutPurchaseOrderInput | PurchaseOrderItemUpdateWithWhereUniqueWithoutPurchaseOrderInput[]
    updateMany?: PurchaseOrderItemUpdateManyWithWhereWithoutPurchaseOrderInput | PurchaseOrderItemUpdateManyWithWhereWithoutPurchaseOrderInput[]
    deleteMany?: PurchaseOrderItemScalarWhereInput | PurchaseOrderItemScalarWhereInput[]
  }

  export type PurchaseOrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<PurchaseOrderCreateWithoutItemsInput, PurchaseOrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutItemsInput
    connect?: PurchaseOrderWhereUniqueInput
  }

  export type RawMaterialCreateNestedOneWithoutPurchaseOrderItemsInput = {
    create?: XOR<RawMaterialCreateWithoutPurchaseOrderItemsInput, RawMaterialUncheckedCreateWithoutPurchaseOrderItemsInput>
    connectOrCreate?: RawMaterialCreateOrConnectWithoutPurchaseOrderItemsInput
    connect?: RawMaterialWhereUniqueInput
  }

  export type PurchaseOrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<PurchaseOrderCreateWithoutItemsInput, PurchaseOrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PurchaseOrderCreateOrConnectWithoutItemsInput
    upsert?: PurchaseOrderUpsertWithoutItemsInput
    connect?: PurchaseOrderWhereUniqueInput
    update?: XOR<XOR<PurchaseOrderUpdateToOneWithWhereWithoutItemsInput, PurchaseOrderUpdateWithoutItemsInput>, PurchaseOrderUncheckedUpdateWithoutItemsInput>
  }

  export type RawMaterialUpdateOneRequiredWithoutPurchaseOrderItemsNestedInput = {
    create?: XOR<RawMaterialCreateWithoutPurchaseOrderItemsInput, RawMaterialUncheckedCreateWithoutPurchaseOrderItemsInput>
    connectOrCreate?: RawMaterialCreateOrConnectWithoutPurchaseOrderItemsInput
    upsert?: RawMaterialUpsertWithoutPurchaseOrderItemsInput
    connect?: RawMaterialWhereUniqueInput
    update?: XOR<XOR<RawMaterialUpdateToOneWithWhereWithoutPurchaseOrderItemsInput, RawMaterialUpdateWithoutPurchaseOrderItemsInput>, RawMaterialUncheckedUpdateWithoutPurchaseOrderItemsInput>
  }

  export type SaleCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput> | SaleCreateWithoutCustomerInput[] | SaleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCustomerInput | SaleCreateOrConnectWithoutCustomerInput[]
    createMany?: SaleCreateManyCustomerInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput> | SaleCreateWithoutCustomerInput[] | SaleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCustomerInput | SaleCreateOrConnectWithoutCustomerInput[]
    createMany?: SaleCreateManyCustomerInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type SaleUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput> | SaleCreateWithoutCustomerInput[] | SaleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCustomerInput | SaleCreateOrConnectWithoutCustomerInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutCustomerInput | SaleUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SaleCreateManyCustomerInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutCustomerInput | SaleUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutCustomerInput | SaleUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput> | SaleCreateWithoutCustomerInput[] | SaleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutCustomerInput | SaleCreateOrConnectWithoutCustomerInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutCustomerInput | SaleUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SaleCreateManyCustomerInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutCustomerInput | SaleUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutCustomerInput | SaleUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutSalesInput = {
    create?: XOR<CustomerCreateWithoutSalesInput, CustomerUncheckedCreateWithoutSalesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSalesInput
    connect?: CustomerWhereUniqueInput
  }

  export type SaleItemCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type SaleItemUncheckedCreateNestedManyWithoutSaleInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
  }

  export type CustomerUpdateOneWithoutSalesNestedInput = {
    create?: XOR<CustomerCreateWithoutSalesInput, CustomerUncheckedCreateWithoutSalesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSalesInput
    upsert?: CustomerUpsertWithoutSalesInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutSalesInput, CustomerUpdateWithoutSalesInput>, CustomerUncheckedUpdateWithoutSalesInput>
  }

  export type SaleItemUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutSaleInput | SaleItemUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutSaleInput | SaleItemUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutSaleInput | SaleItemUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type SaleItemUncheckedUpdateManyWithoutSaleNestedInput = {
    create?: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput> | SaleItemCreateWithoutSaleInput[] | SaleItemUncheckedCreateWithoutSaleInput[]
    connectOrCreate?: SaleItemCreateOrConnectWithoutSaleInput | SaleItemCreateOrConnectWithoutSaleInput[]
    upsert?: SaleItemUpsertWithWhereUniqueWithoutSaleInput | SaleItemUpsertWithWhereUniqueWithoutSaleInput[]
    createMany?: SaleItemCreateManySaleInputEnvelope
    set?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    disconnect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    delete?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    connect?: SaleItemWhereUniqueInput | SaleItemWhereUniqueInput[]
    update?: SaleItemUpdateWithWhereUniqueWithoutSaleInput | SaleItemUpdateWithWhereUniqueWithoutSaleInput[]
    updateMany?: SaleItemUpdateManyWithWhereWithoutSaleInput | SaleItemUpdateManyWithWhereWithoutSaleInput[]
    deleteMany?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
  }

  export type SaleCreateNestedOneWithoutItemsInput = {
    create?: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutItemsInput
    connect?: SaleWhereUniqueInput
  }

  export type FinishedGoodCreateNestedOneWithoutSaleItemsInput = {
    create?: XOR<FinishedGoodCreateWithoutSaleItemsInput, FinishedGoodUncheckedCreateWithoutSaleItemsInput>
    connectOrCreate?: FinishedGoodCreateOrConnectWithoutSaleItemsInput
    connect?: FinishedGoodWhereUniqueInput
  }

  export type SaleUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    connectOrCreate?: SaleCreateOrConnectWithoutItemsInput
    upsert?: SaleUpsertWithoutItemsInput
    connect?: SaleWhereUniqueInput
    update?: XOR<XOR<SaleUpdateToOneWithWhereWithoutItemsInput, SaleUpdateWithoutItemsInput>, SaleUncheckedUpdateWithoutItemsInput>
  }

  export type FinishedGoodUpdateOneRequiredWithoutSaleItemsNestedInput = {
    create?: XOR<FinishedGoodCreateWithoutSaleItemsInput, FinishedGoodUncheckedCreateWithoutSaleItemsInput>
    connectOrCreate?: FinishedGoodCreateOrConnectWithoutSaleItemsInput
    upsert?: FinishedGoodUpsertWithoutSaleItemsInput
    connect?: FinishedGoodWhereUniqueInput
    update?: XOR<XOR<FinishedGoodUpdateToOneWithWhereWithoutSaleItemsInput, FinishedGoodUpdateWithoutSaleItemsInput>, FinishedGoodUncheckedUpdateWithoutSaleItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RawMaterialCreateWithoutCategoryInput = {
    id?: string
    name: string
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplier?: SupplierCreateNestedOneWithoutRawMaterialsInput
    recipeItems?: RecipeItemCreateNestedManyWithoutRawMaterialInput
    adjustments?: AdjustmentCreateNestedManyWithoutMaterialInput
    purchaseOrderItems?: PurchaseOrderItemCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    supplierId?: string | null
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemUncheckedCreateNestedManyWithoutRawMaterialInput
    adjustments?: AdjustmentUncheckedCreateNestedManyWithoutMaterialInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialCreateOrConnectWithoutCategoryInput = {
    where: RawMaterialWhereUniqueInput
    create: XOR<RawMaterialCreateWithoutCategoryInput, RawMaterialUncheckedCreateWithoutCategoryInput>
  }

  export type RawMaterialCreateManyCategoryInputEnvelope = {
    data: RawMaterialCreateManyCategoryInput | RawMaterialCreateManyCategoryInput[]
  }

  export type RawMaterialUpsertWithWhereUniqueWithoutCategoryInput = {
    where: RawMaterialWhereUniqueInput
    update: XOR<RawMaterialUpdateWithoutCategoryInput, RawMaterialUncheckedUpdateWithoutCategoryInput>
    create: XOR<RawMaterialCreateWithoutCategoryInput, RawMaterialUncheckedCreateWithoutCategoryInput>
  }

  export type RawMaterialUpdateWithWhereUniqueWithoutCategoryInput = {
    where: RawMaterialWhereUniqueInput
    data: XOR<RawMaterialUpdateWithoutCategoryInput, RawMaterialUncheckedUpdateWithoutCategoryInput>
  }

  export type RawMaterialUpdateManyWithWhereWithoutCategoryInput = {
    where: RawMaterialScalarWhereInput
    data: XOR<RawMaterialUpdateManyMutationInput, RawMaterialUncheckedUpdateManyWithoutCategoryInput>
  }

  export type RawMaterialScalarWhereInput = {
    AND?: RawMaterialScalarWhereInput | RawMaterialScalarWhereInput[]
    OR?: RawMaterialScalarWhereInput[]
    NOT?: RawMaterialScalarWhereInput | RawMaterialScalarWhereInput[]
    id?: StringFilter<"RawMaterial"> | string
    name?: StringFilter<"RawMaterial"> | string
    categoryId?: StringFilter<"RawMaterial"> | string
    supplierId?: StringNullableFilter<"RawMaterial"> | string | null
    totalQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    unit?: StringNullableFilter<"RawMaterial"> | string | null
    costPerUnit?: FloatNullableFilter<"RawMaterial"> | number | null
    reorderThreshold?: FloatNullableFilter<"RawMaterial"> | number | null
    committedQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    onOrderQuantity?: FloatNullableFilter<"RawMaterial"> | number | null
    imagePath?: StringNullableFilter<"RawMaterial"> | string | null
    createdAt?: DateTimeFilter<"RawMaterial"> | Date | string
    updatedAt?: DateTimeFilter<"RawMaterial"> | Date | string
  }

  export type RawMaterialCreateWithoutSupplierInput = {
    id?: string
    name: string
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutRawMaterialsInput
    recipeItems?: RecipeItemCreateNestedManyWithoutRawMaterialInput
    adjustments?: AdjustmentCreateNestedManyWithoutMaterialInput
    purchaseOrderItems?: PurchaseOrderItemCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialUncheckedCreateWithoutSupplierInput = {
    id?: string
    name: string
    categoryId: string
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemUncheckedCreateNestedManyWithoutRawMaterialInput
    adjustments?: AdjustmentUncheckedCreateNestedManyWithoutMaterialInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialCreateOrConnectWithoutSupplierInput = {
    where: RawMaterialWhereUniqueInput
    create: XOR<RawMaterialCreateWithoutSupplierInput, RawMaterialUncheckedCreateWithoutSupplierInput>
  }

  export type RawMaterialCreateManySupplierInputEnvelope = {
    data: RawMaterialCreateManySupplierInput | RawMaterialCreateManySupplierInput[]
  }

  export type PurchaseOrderCreateWithoutSupplierInput = {
    id?: string
    orderDate?: Date | string
    expectedDate?: Date | string | null
    receivedDate?: Date | string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PurchaseOrderItemCreateNestedManyWithoutPurchaseOrderInput
  }

  export type PurchaseOrderUncheckedCreateWithoutSupplierInput = {
    id?: string
    orderDate?: Date | string
    expectedDate?: Date | string | null
    receivedDate?: Date | string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PurchaseOrderItemUncheckedCreateNestedManyWithoutPurchaseOrderInput
  }

  export type PurchaseOrderCreateOrConnectWithoutSupplierInput = {
    where: PurchaseOrderWhereUniqueInput
    create: XOR<PurchaseOrderCreateWithoutSupplierInput, PurchaseOrderUncheckedCreateWithoutSupplierInput>
  }

  export type PurchaseOrderCreateManySupplierInputEnvelope = {
    data: PurchaseOrderCreateManySupplierInput | PurchaseOrderCreateManySupplierInput[]
  }

  export type RawMaterialUpsertWithWhereUniqueWithoutSupplierInput = {
    where: RawMaterialWhereUniqueInput
    update: XOR<RawMaterialUpdateWithoutSupplierInput, RawMaterialUncheckedUpdateWithoutSupplierInput>
    create: XOR<RawMaterialCreateWithoutSupplierInput, RawMaterialUncheckedCreateWithoutSupplierInput>
  }

  export type RawMaterialUpdateWithWhereUniqueWithoutSupplierInput = {
    where: RawMaterialWhereUniqueInput
    data: XOR<RawMaterialUpdateWithoutSupplierInput, RawMaterialUncheckedUpdateWithoutSupplierInput>
  }

  export type RawMaterialUpdateManyWithWhereWithoutSupplierInput = {
    where: RawMaterialScalarWhereInput
    data: XOR<RawMaterialUpdateManyMutationInput, RawMaterialUncheckedUpdateManyWithoutSupplierInput>
  }

  export type PurchaseOrderUpsertWithWhereUniqueWithoutSupplierInput = {
    where: PurchaseOrderWhereUniqueInput
    update: XOR<PurchaseOrderUpdateWithoutSupplierInput, PurchaseOrderUncheckedUpdateWithoutSupplierInput>
    create: XOR<PurchaseOrderCreateWithoutSupplierInput, PurchaseOrderUncheckedCreateWithoutSupplierInput>
  }

  export type PurchaseOrderUpdateWithWhereUniqueWithoutSupplierInput = {
    where: PurchaseOrderWhereUniqueInput
    data: XOR<PurchaseOrderUpdateWithoutSupplierInput, PurchaseOrderUncheckedUpdateWithoutSupplierInput>
  }

  export type PurchaseOrderUpdateManyWithWhereWithoutSupplierInput = {
    where: PurchaseOrderScalarWhereInput
    data: XOR<PurchaseOrderUpdateManyMutationInput, PurchaseOrderUncheckedUpdateManyWithoutSupplierInput>
  }

  export type PurchaseOrderScalarWhereInput = {
    AND?: PurchaseOrderScalarWhereInput | PurchaseOrderScalarWhereInput[]
    OR?: PurchaseOrderScalarWhereInput[]
    NOT?: PurchaseOrderScalarWhereInput | PurchaseOrderScalarWhereInput[]
    id?: StringFilter<"PurchaseOrder"> | string
    supplierId?: StringFilter<"PurchaseOrder"> | string
    orderDate?: DateTimeFilter<"PurchaseOrder"> | Date | string
    expectedDate?: DateTimeNullableFilter<"PurchaseOrder"> | Date | string | null
    receivedDate?: DateTimeNullableFilter<"PurchaseOrder"> | Date | string | null
    status?: StringFilter<"PurchaseOrder"> | string
    notes?: StringNullableFilter<"PurchaseOrder"> | string | null
    createdAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrder"> | Date | string
  }

  export type CategoryCreateWithoutRawMaterialsInput = {
    id?: string
    name: string
  }

  export type CategoryUncheckedCreateWithoutRawMaterialsInput = {
    id?: string
    name: string
  }

  export type CategoryCreateOrConnectWithoutRawMaterialsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutRawMaterialsInput, CategoryUncheckedCreateWithoutRawMaterialsInput>
  }

  export type SupplierCreateWithoutRawMaterialsInput = {
    id?: string
    name: string
    contact?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrders?: PurchaseOrderCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateWithoutRawMaterialsInput = {
    id?: string
    name: string
    contact?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrders?: PurchaseOrderUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierCreateOrConnectWithoutRawMaterialsInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutRawMaterialsInput, SupplierUncheckedCreateWithoutRawMaterialsInput>
  }

  export type RecipeItemCreateWithoutRawMaterialInput = {
    id?: string
    requiredQuantity: number
    unit: string
    finishedGood: FinishedGoodCreateNestedOneWithoutRecipeItemsInput
    subAssembly?: FinishedGoodCreateNestedOneWithoutUsedAsSubAssemblyInput
  }

  export type RecipeItemUncheckedCreateWithoutRawMaterialInput = {
    id?: string
    finishedGoodId: string
    subAssemblyId?: string | null
    requiredQuantity: number
    unit: string
  }

  export type RecipeItemCreateOrConnectWithoutRawMaterialInput = {
    where: RecipeItemWhereUniqueInput
    create: XOR<RecipeItemCreateWithoutRawMaterialInput, RecipeItemUncheckedCreateWithoutRawMaterialInput>
  }

  export type RecipeItemCreateManyRawMaterialInputEnvelope = {
    data: RecipeItemCreateManyRawMaterialInput | RecipeItemCreateManyRawMaterialInput[]
  }

  export type AdjustmentCreateWithoutMaterialInput = {
    id?: string
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type AdjustmentUncheckedCreateWithoutMaterialInput = {
    id?: string
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type AdjustmentCreateOrConnectWithoutMaterialInput = {
    where: AdjustmentWhereUniqueInput
    create: XOR<AdjustmentCreateWithoutMaterialInput, AdjustmentUncheckedCreateWithoutMaterialInput>
  }

  export type AdjustmentCreateManyMaterialInputEnvelope = {
    data: AdjustmentCreateManyMaterialInput | AdjustmentCreateManyMaterialInput[]
  }

  export type PurchaseOrderItemCreateWithoutMaterialInput = {
    id?: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    purchaseOrder: PurchaseOrderCreateNestedOneWithoutItemsInput
  }

  export type PurchaseOrderItemUncheckedCreateWithoutMaterialInput = {
    id?: string
    purchaseOrderId: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderItemCreateOrConnectWithoutMaterialInput = {
    where: PurchaseOrderItemWhereUniqueInput
    create: XOR<PurchaseOrderItemCreateWithoutMaterialInput, PurchaseOrderItemUncheckedCreateWithoutMaterialInput>
  }

  export type PurchaseOrderItemCreateManyMaterialInputEnvelope = {
    data: PurchaseOrderItemCreateManyMaterialInput | PurchaseOrderItemCreateManyMaterialInput[]
  }

  export type CategoryUpsertWithoutRawMaterialsInput = {
    update: XOR<CategoryUpdateWithoutRawMaterialsInput, CategoryUncheckedUpdateWithoutRawMaterialsInput>
    create: XOR<CategoryCreateWithoutRawMaterialsInput, CategoryUncheckedCreateWithoutRawMaterialsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutRawMaterialsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutRawMaterialsInput, CategoryUncheckedUpdateWithoutRawMaterialsInput>
  }

  export type CategoryUpdateWithoutRawMaterialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateWithoutRawMaterialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SupplierUpsertWithoutRawMaterialsInput = {
    update: XOR<SupplierUpdateWithoutRawMaterialsInput, SupplierUncheckedUpdateWithoutRawMaterialsInput>
    create: XOR<SupplierCreateWithoutRawMaterialsInput, SupplierUncheckedCreateWithoutRawMaterialsInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutRawMaterialsInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutRawMaterialsInput, SupplierUncheckedUpdateWithoutRawMaterialsInput>
  }

  export type SupplierUpdateWithoutRawMaterialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrders?: PurchaseOrderUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateWithoutRawMaterialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrders?: PurchaseOrderUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type RecipeItemUpsertWithWhereUniqueWithoutRawMaterialInput = {
    where: RecipeItemWhereUniqueInput
    update: XOR<RecipeItemUpdateWithoutRawMaterialInput, RecipeItemUncheckedUpdateWithoutRawMaterialInput>
    create: XOR<RecipeItemCreateWithoutRawMaterialInput, RecipeItemUncheckedCreateWithoutRawMaterialInput>
  }

  export type RecipeItemUpdateWithWhereUniqueWithoutRawMaterialInput = {
    where: RecipeItemWhereUniqueInput
    data: XOR<RecipeItemUpdateWithoutRawMaterialInput, RecipeItemUncheckedUpdateWithoutRawMaterialInput>
  }

  export type RecipeItemUpdateManyWithWhereWithoutRawMaterialInput = {
    where: RecipeItemScalarWhereInput
    data: XOR<RecipeItemUpdateManyMutationInput, RecipeItemUncheckedUpdateManyWithoutRawMaterialInput>
  }

  export type RecipeItemScalarWhereInput = {
    AND?: RecipeItemScalarWhereInput | RecipeItemScalarWhereInput[]
    OR?: RecipeItemScalarWhereInput[]
    NOT?: RecipeItemScalarWhereInput | RecipeItemScalarWhereInput[]
    id?: StringFilter<"RecipeItem"> | string
    finishedGoodId?: StringFilter<"RecipeItem"> | string
    rawMaterialId?: StringNullableFilter<"RecipeItem"> | string | null
    subAssemblyId?: StringNullableFilter<"RecipeItem"> | string | null
    requiredQuantity?: FloatFilter<"RecipeItem"> | number
    unit?: StringFilter<"RecipeItem"> | string
  }

  export type AdjustmentUpsertWithWhereUniqueWithoutMaterialInput = {
    where: AdjustmentWhereUniqueInput
    update: XOR<AdjustmentUpdateWithoutMaterialInput, AdjustmentUncheckedUpdateWithoutMaterialInput>
    create: XOR<AdjustmentCreateWithoutMaterialInput, AdjustmentUncheckedCreateWithoutMaterialInput>
  }

  export type AdjustmentUpdateWithWhereUniqueWithoutMaterialInput = {
    where: AdjustmentWhereUniqueInput
    data: XOR<AdjustmentUpdateWithoutMaterialInput, AdjustmentUncheckedUpdateWithoutMaterialInput>
  }

  export type AdjustmentUpdateManyWithWhereWithoutMaterialInput = {
    where: AdjustmentScalarWhereInput
    data: XOR<AdjustmentUpdateManyMutationInput, AdjustmentUncheckedUpdateManyWithoutMaterialInput>
  }

  export type AdjustmentScalarWhereInput = {
    AND?: AdjustmentScalarWhereInput | AdjustmentScalarWhereInput[]
    OR?: AdjustmentScalarWhereInput[]
    NOT?: AdjustmentScalarWhereInput | AdjustmentScalarWhereInput[]
    id?: StringFilter<"Adjustment"> | string
    materialId?: StringFilter<"Adjustment"> | string
    quantity?: FloatFilter<"Adjustment"> | number
    reason?: StringFilter<"Adjustment"> | string
    notes?: StringNullableFilter<"Adjustment"> | string | null
    createdAt?: DateTimeFilter<"Adjustment"> | Date | string
  }

  export type PurchaseOrderItemUpsertWithWhereUniqueWithoutMaterialInput = {
    where: PurchaseOrderItemWhereUniqueInput
    update: XOR<PurchaseOrderItemUpdateWithoutMaterialInput, PurchaseOrderItemUncheckedUpdateWithoutMaterialInput>
    create: XOR<PurchaseOrderItemCreateWithoutMaterialInput, PurchaseOrderItemUncheckedCreateWithoutMaterialInput>
  }

  export type PurchaseOrderItemUpdateWithWhereUniqueWithoutMaterialInput = {
    where: PurchaseOrderItemWhereUniqueInput
    data: XOR<PurchaseOrderItemUpdateWithoutMaterialInput, PurchaseOrderItemUncheckedUpdateWithoutMaterialInput>
  }

  export type PurchaseOrderItemUpdateManyWithWhereWithoutMaterialInput = {
    where: PurchaseOrderItemScalarWhereInput
    data: XOR<PurchaseOrderItemUpdateManyMutationInput, PurchaseOrderItemUncheckedUpdateManyWithoutMaterialInput>
  }

  export type PurchaseOrderItemScalarWhereInput = {
    AND?: PurchaseOrderItemScalarWhereInput | PurchaseOrderItemScalarWhereInput[]
    OR?: PurchaseOrderItemScalarWhereInput[]
    NOT?: PurchaseOrderItemScalarWhereInput | PurchaseOrderItemScalarWhereInput[]
    id?: StringFilter<"PurchaseOrderItem"> | string
    purchaseOrderId?: StringFilter<"PurchaseOrderItem"> | string
    materialId?: StringFilter<"PurchaseOrderItem"> | string
    quantity?: FloatFilter<"PurchaseOrderItem"> | number
    unitCost?: FloatFilter<"PurchaseOrderItem"> | number
    receivedQty?: FloatFilter<"PurchaseOrderItem"> | number
    createdAt?: DateTimeFilter<"PurchaseOrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"PurchaseOrderItem"> | Date | string
  }

  export type RecipeItemCreateWithoutFinishedGoodInput = {
    id?: string
    requiredQuantity: number
    unit: string
    rawMaterial?: RawMaterialCreateNestedOneWithoutRecipeItemsInput
    subAssembly?: FinishedGoodCreateNestedOneWithoutUsedAsSubAssemblyInput
  }

  export type RecipeItemUncheckedCreateWithoutFinishedGoodInput = {
    id?: string
    rawMaterialId?: string | null
    subAssemblyId?: string | null
    requiredQuantity: number
    unit: string
  }

  export type RecipeItemCreateOrConnectWithoutFinishedGoodInput = {
    where: RecipeItemWhereUniqueInput
    create: XOR<RecipeItemCreateWithoutFinishedGoodInput, RecipeItemUncheckedCreateWithoutFinishedGoodInput>
  }

  export type RecipeItemCreateManyFinishedGoodInputEnvelope = {
    data: RecipeItemCreateManyFinishedGoodInput | RecipeItemCreateManyFinishedGoodInput[]
  }

  export type RecipeItemCreateWithoutSubAssemblyInput = {
    id?: string
    requiredQuantity: number
    unit: string
    finishedGood: FinishedGoodCreateNestedOneWithoutRecipeItemsInput
    rawMaterial?: RawMaterialCreateNestedOneWithoutRecipeItemsInput
  }

  export type RecipeItemUncheckedCreateWithoutSubAssemblyInput = {
    id?: string
    finishedGoodId: string
    rawMaterialId?: string | null
    requiredQuantity: number
    unit: string
  }

  export type RecipeItemCreateOrConnectWithoutSubAssemblyInput = {
    where: RecipeItemWhereUniqueInput
    create: XOR<RecipeItemCreateWithoutSubAssemblyInput, RecipeItemUncheckedCreateWithoutSubAssemblyInput>
  }

  export type RecipeItemCreateManySubAssemblyInputEnvelope = {
    data: RecipeItemCreateManySubAssemblyInput | RecipeItemCreateManySubAssemblyInput[]
  }

  export type SaleItemCreateWithoutFinishedGoodInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
    sale: SaleCreateNestedOneWithoutItemsInput
  }

  export type SaleItemUncheckedCreateWithoutFinishedGoodInput = {
    id?: string
    saleId: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type SaleItemCreateOrConnectWithoutFinishedGoodInput = {
    where: SaleItemWhereUniqueInput
    create: XOR<SaleItemCreateWithoutFinishedGoodInput, SaleItemUncheckedCreateWithoutFinishedGoodInput>
  }

  export type SaleItemCreateManyFinishedGoodInputEnvelope = {
    data: SaleItemCreateManyFinishedGoodInput | SaleItemCreateManyFinishedGoodInput[]
  }

  export type RecipeItemUpsertWithWhereUniqueWithoutFinishedGoodInput = {
    where: RecipeItemWhereUniqueInput
    update: XOR<RecipeItemUpdateWithoutFinishedGoodInput, RecipeItemUncheckedUpdateWithoutFinishedGoodInput>
    create: XOR<RecipeItemCreateWithoutFinishedGoodInput, RecipeItemUncheckedCreateWithoutFinishedGoodInput>
  }

  export type RecipeItemUpdateWithWhereUniqueWithoutFinishedGoodInput = {
    where: RecipeItemWhereUniqueInput
    data: XOR<RecipeItemUpdateWithoutFinishedGoodInput, RecipeItemUncheckedUpdateWithoutFinishedGoodInput>
  }

  export type RecipeItemUpdateManyWithWhereWithoutFinishedGoodInput = {
    where: RecipeItemScalarWhereInput
    data: XOR<RecipeItemUpdateManyMutationInput, RecipeItemUncheckedUpdateManyWithoutFinishedGoodInput>
  }

  export type RecipeItemUpsertWithWhereUniqueWithoutSubAssemblyInput = {
    where: RecipeItemWhereUniqueInput
    update: XOR<RecipeItemUpdateWithoutSubAssemblyInput, RecipeItemUncheckedUpdateWithoutSubAssemblyInput>
    create: XOR<RecipeItemCreateWithoutSubAssemblyInput, RecipeItemUncheckedCreateWithoutSubAssemblyInput>
  }

  export type RecipeItemUpdateWithWhereUniqueWithoutSubAssemblyInput = {
    where: RecipeItemWhereUniqueInput
    data: XOR<RecipeItemUpdateWithoutSubAssemblyInput, RecipeItemUncheckedUpdateWithoutSubAssemblyInput>
  }

  export type RecipeItemUpdateManyWithWhereWithoutSubAssemblyInput = {
    where: RecipeItemScalarWhereInput
    data: XOR<RecipeItemUpdateManyMutationInput, RecipeItemUncheckedUpdateManyWithoutSubAssemblyInput>
  }

  export type SaleItemUpsertWithWhereUniqueWithoutFinishedGoodInput = {
    where: SaleItemWhereUniqueInput
    update: XOR<SaleItemUpdateWithoutFinishedGoodInput, SaleItemUncheckedUpdateWithoutFinishedGoodInput>
    create: XOR<SaleItemCreateWithoutFinishedGoodInput, SaleItemUncheckedCreateWithoutFinishedGoodInput>
  }

  export type SaleItemUpdateWithWhereUniqueWithoutFinishedGoodInput = {
    where: SaleItemWhereUniqueInput
    data: XOR<SaleItemUpdateWithoutFinishedGoodInput, SaleItemUncheckedUpdateWithoutFinishedGoodInput>
  }

  export type SaleItemUpdateManyWithWhereWithoutFinishedGoodInput = {
    where: SaleItemScalarWhereInput
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyWithoutFinishedGoodInput>
  }

  export type SaleItemScalarWhereInput = {
    AND?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
    OR?: SaleItemScalarWhereInput[]
    NOT?: SaleItemScalarWhereInput | SaleItemScalarWhereInput[]
    id?: StringFilter<"SaleItem"> | string
    saleId?: StringFilter<"SaleItem"> | string
    finishedGoodId?: StringFilter<"SaleItem"> | string
    quantity?: IntFilter<"SaleItem"> | number
    unitPrice?: FloatFilter<"SaleItem"> | number
    totalPrice?: FloatFilter<"SaleItem"> | number
    createdAt?: DateTimeFilter<"SaleItem"> | Date | string
  }

  export type FinishedGoodCreateWithoutRecipeItemsInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usedAsSubAssembly?: RecipeItemCreateNestedManyWithoutSubAssemblyInput
    saleItems?: SaleItemCreateNestedManyWithoutFinishedGoodInput
  }

  export type FinishedGoodUncheckedCreateWithoutRecipeItemsInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usedAsSubAssembly?: RecipeItemUncheckedCreateNestedManyWithoutSubAssemblyInput
    saleItems?: SaleItemUncheckedCreateNestedManyWithoutFinishedGoodInput
  }

  export type FinishedGoodCreateOrConnectWithoutRecipeItemsInput = {
    where: FinishedGoodWhereUniqueInput
    create: XOR<FinishedGoodCreateWithoutRecipeItemsInput, FinishedGoodUncheckedCreateWithoutRecipeItemsInput>
  }

  export type RawMaterialCreateWithoutRecipeItemsInput = {
    id?: string
    name: string
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutRawMaterialsInput
    supplier?: SupplierCreateNestedOneWithoutRawMaterialsInput
    adjustments?: AdjustmentCreateNestedManyWithoutMaterialInput
    purchaseOrderItems?: PurchaseOrderItemCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialUncheckedCreateWithoutRecipeItemsInput = {
    id?: string
    name: string
    categoryId: string
    supplierId?: string | null
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    adjustments?: AdjustmentUncheckedCreateNestedManyWithoutMaterialInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialCreateOrConnectWithoutRecipeItemsInput = {
    where: RawMaterialWhereUniqueInput
    create: XOR<RawMaterialCreateWithoutRecipeItemsInput, RawMaterialUncheckedCreateWithoutRecipeItemsInput>
  }

  export type FinishedGoodCreateWithoutUsedAsSubAssemblyInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemCreateNestedManyWithoutFinishedGoodInput
    saleItems?: SaleItemCreateNestedManyWithoutFinishedGoodInput
  }

  export type FinishedGoodUncheckedCreateWithoutUsedAsSubAssemblyInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemUncheckedCreateNestedManyWithoutFinishedGoodInput
    saleItems?: SaleItemUncheckedCreateNestedManyWithoutFinishedGoodInput
  }

  export type FinishedGoodCreateOrConnectWithoutUsedAsSubAssemblyInput = {
    where: FinishedGoodWhereUniqueInput
    create: XOR<FinishedGoodCreateWithoutUsedAsSubAssemblyInput, FinishedGoodUncheckedCreateWithoutUsedAsSubAssemblyInput>
  }

  export type FinishedGoodUpsertWithoutRecipeItemsInput = {
    update: XOR<FinishedGoodUpdateWithoutRecipeItemsInput, FinishedGoodUncheckedUpdateWithoutRecipeItemsInput>
    create: XOR<FinishedGoodCreateWithoutRecipeItemsInput, FinishedGoodUncheckedCreateWithoutRecipeItemsInput>
    where?: FinishedGoodWhereInput
  }

  export type FinishedGoodUpdateToOneWithWhereWithoutRecipeItemsInput = {
    where?: FinishedGoodWhereInput
    data: XOR<FinishedGoodUpdateWithoutRecipeItemsInput, FinishedGoodUncheckedUpdateWithoutRecipeItemsInput>
  }

  export type FinishedGoodUpdateWithoutRecipeItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAsSubAssembly?: RecipeItemUpdateManyWithoutSubAssemblyNestedInput
    saleItems?: SaleItemUpdateManyWithoutFinishedGoodNestedInput
  }

  export type FinishedGoodUncheckedUpdateWithoutRecipeItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAsSubAssembly?: RecipeItemUncheckedUpdateManyWithoutSubAssemblyNestedInput
    saleItems?: SaleItemUncheckedUpdateManyWithoutFinishedGoodNestedInput
  }

  export type RawMaterialUpsertWithoutRecipeItemsInput = {
    update: XOR<RawMaterialUpdateWithoutRecipeItemsInput, RawMaterialUncheckedUpdateWithoutRecipeItemsInput>
    create: XOR<RawMaterialCreateWithoutRecipeItemsInput, RawMaterialUncheckedCreateWithoutRecipeItemsInput>
    where?: RawMaterialWhereInput
  }

  export type RawMaterialUpdateToOneWithWhereWithoutRecipeItemsInput = {
    where?: RawMaterialWhereInput
    data: XOR<RawMaterialUpdateWithoutRecipeItemsInput, RawMaterialUncheckedUpdateWithoutRecipeItemsInput>
  }

  export type RawMaterialUpdateWithoutRecipeItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutRawMaterialsNestedInput
    supplier?: SupplierUpdateOneWithoutRawMaterialsNestedInput
    adjustments?: AdjustmentUpdateManyWithoutMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialUncheckedUpdateWithoutRecipeItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adjustments?: AdjustmentUncheckedUpdateManyWithoutMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type FinishedGoodUpsertWithoutUsedAsSubAssemblyInput = {
    update: XOR<FinishedGoodUpdateWithoutUsedAsSubAssemblyInput, FinishedGoodUncheckedUpdateWithoutUsedAsSubAssemblyInput>
    create: XOR<FinishedGoodCreateWithoutUsedAsSubAssemblyInput, FinishedGoodUncheckedCreateWithoutUsedAsSubAssemblyInput>
    where?: FinishedGoodWhereInput
  }

  export type FinishedGoodUpdateToOneWithWhereWithoutUsedAsSubAssemblyInput = {
    where?: FinishedGoodWhereInput
    data: XOR<FinishedGoodUpdateWithoutUsedAsSubAssemblyInput, FinishedGoodUncheckedUpdateWithoutUsedAsSubAssemblyInput>
  }

  export type FinishedGoodUpdateWithoutUsedAsSubAssemblyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUpdateManyWithoutFinishedGoodNestedInput
    saleItems?: SaleItemUpdateManyWithoutFinishedGoodNestedInput
  }

  export type FinishedGoodUncheckedUpdateWithoutUsedAsSubAssemblyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUncheckedUpdateManyWithoutFinishedGoodNestedInput
    saleItems?: SaleItemUncheckedUpdateManyWithoutFinishedGoodNestedInput
  }

  export type RawMaterialCreateWithoutAdjustmentsInput = {
    id?: string
    name: string
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutRawMaterialsInput
    supplier?: SupplierCreateNestedOneWithoutRawMaterialsInput
    recipeItems?: RecipeItemCreateNestedManyWithoutRawMaterialInput
    purchaseOrderItems?: PurchaseOrderItemCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialUncheckedCreateWithoutAdjustmentsInput = {
    id?: string
    name: string
    categoryId: string
    supplierId?: string | null
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemUncheckedCreateNestedManyWithoutRawMaterialInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialCreateOrConnectWithoutAdjustmentsInput = {
    where: RawMaterialWhereUniqueInput
    create: XOR<RawMaterialCreateWithoutAdjustmentsInput, RawMaterialUncheckedCreateWithoutAdjustmentsInput>
  }

  export type RawMaterialUpsertWithoutAdjustmentsInput = {
    update: XOR<RawMaterialUpdateWithoutAdjustmentsInput, RawMaterialUncheckedUpdateWithoutAdjustmentsInput>
    create: XOR<RawMaterialCreateWithoutAdjustmentsInput, RawMaterialUncheckedCreateWithoutAdjustmentsInput>
    where?: RawMaterialWhereInput
  }

  export type RawMaterialUpdateToOneWithWhereWithoutAdjustmentsInput = {
    where?: RawMaterialWhereInput
    data: XOR<RawMaterialUpdateWithoutAdjustmentsInput, RawMaterialUncheckedUpdateWithoutAdjustmentsInput>
  }

  export type RawMaterialUpdateWithoutAdjustmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutRawMaterialsNestedInput
    supplier?: SupplierUpdateOneWithoutRawMaterialsNestedInput
    recipeItems?: RecipeItemUpdateManyWithoutRawMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialUncheckedUpdateWithoutAdjustmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUncheckedUpdateManyWithoutRawMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type SupplierCreateWithoutPurchaseOrdersInput = {
    id?: string
    name: string
    contact?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rawMaterials?: RawMaterialCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateWithoutPurchaseOrdersInput = {
    id?: string
    name: string
    contact?: string | null
    website?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rawMaterials?: RawMaterialUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierCreateOrConnectWithoutPurchaseOrdersInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutPurchaseOrdersInput, SupplierUncheckedCreateWithoutPurchaseOrdersInput>
  }

  export type PurchaseOrderItemCreateWithoutPurchaseOrderInput = {
    id?: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    material: RawMaterialCreateNestedOneWithoutPurchaseOrderItemsInput
  }

  export type PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput = {
    id?: string
    materialId: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderItemCreateOrConnectWithoutPurchaseOrderInput = {
    where: PurchaseOrderItemWhereUniqueInput
    create: XOR<PurchaseOrderItemCreateWithoutPurchaseOrderInput, PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput>
  }

  export type PurchaseOrderItemCreateManyPurchaseOrderInputEnvelope = {
    data: PurchaseOrderItemCreateManyPurchaseOrderInput | PurchaseOrderItemCreateManyPurchaseOrderInput[]
  }

  export type SupplierUpsertWithoutPurchaseOrdersInput = {
    update: XOR<SupplierUpdateWithoutPurchaseOrdersInput, SupplierUncheckedUpdateWithoutPurchaseOrdersInput>
    create: XOR<SupplierCreateWithoutPurchaseOrdersInput, SupplierUncheckedCreateWithoutPurchaseOrdersInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutPurchaseOrdersInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutPurchaseOrdersInput, SupplierUncheckedUpdateWithoutPurchaseOrdersInput>
  }

  export type SupplierUpdateWithoutPurchaseOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawMaterials?: RawMaterialUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateWithoutPurchaseOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contact?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawMaterials?: RawMaterialUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type PurchaseOrderItemUpsertWithWhereUniqueWithoutPurchaseOrderInput = {
    where: PurchaseOrderItemWhereUniqueInput
    update: XOR<PurchaseOrderItemUpdateWithoutPurchaseOrderInput, PurchaseOrderItemUncheckedUpdateWithoutPurchaseOrderInput>
    create: XOR<PurchaseOrderItemCreateWithoutPurchaseOrderInput, PurchaseOrderItemUncheckedCreateWithoutPurchaseOrderInput>
  }

  export type PurchaseOrderItemUpdateWithWhereUniqueWithoutPurchaseOrderInput = {
    where: PurchaseOrderItemWhereUniqueInput
    data: XOR<PurchaseOrderItemUpdateWithoutPurchaseOrderInput, PurchaseOrderItemUncheckedUpdateWithoutPurchaseOrderInput>
  }

  export type PurchaseOrderItemUpdateManyWithWhereWithoutPurchaseOrderInput = {
    where: PurchaseOrderItemScalarWhereInput
    data: XOR<PurchaseOrderItemUpdateManyMutationInput, PurchaseOrderItemUncheckedUpdateManyWithoutPurchaseOrderInput>
  }

  export type PurchaseOrderCreateWithoutItemsInput = {
    id?: string
    orderDate?: Date | string
    expectedDate?: Date | string | null
    receivedDate?: Date | string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplier: SupplierCreateNestedOneWithoutPurchaseOrdersInput
  }

  export type PurchaseOrderUncheckedCreateWithoutItemsInput = {
    id?: string
    supplierId: string
    orderDate?: Date | string
    expectedDate?: Date | string | null
    receivedDate?: Date | string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderCreateOrConnectWithoutItemsInput = {
    where: PurchaseOrderWhereUniqueInput
    create: XOR<PurchaseOrderCreateWithoutItemsInput, PurchaseOrderUncheckedCreateWithoutItemsInput>
  }

  export type RawMaterialCreateWithoutPurchaseOrderItemsInput = {
    id?: string
    name: string
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutRawMaterialsInput
    supplier?: SupplierCreateNestedOneWithoutRawMaterialsInput
    recipeItems?: RecipeItemCreateNestedManyWithoutRawMaterialInput
    adjustments?: AdjustmentCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialUncheckedCreateWithoutPurchaseOrderItemsInput = {
    id?: string
    name: string
    categoryId: string
    supplierId?: string | null
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemUncheckedCreateNestedManyWithoutRawMaterialInput
    adjustments?: AdjustmentUncheckedCreateNestedManyWithoutMaterialInput
  }

  export type RawMaterialCreateOrConnectWithoutPurchaseOrderItemsInput = {
    where: RawMaterialWhereUniqueInput
    create: XOR<RawMaterialCreateWithoutPurchaseOrderItemsInput, RawMaterialUncheckedCreateWithoutPurchaseOrderItemsInput>
  }

  export type PurchaseOrderUpsertWithoutItemsInput = {
    update: XOR<PurchaseOrderUpdateWithoutItemsInput, PurchaseOrderUncheckedUpdateWithoutItemsInput>
    create: XOR<PurchaseOrderCreateWithoutItemsInput, PurchaseOrderUncheckedCreateWithoutItemsInput>
    where?: PurchaseOrderWhereInput
  }

  export type PurchaseOrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: PurchaseOrderWhereInput
    data: XOR<PurchaseOrderUpdateWithoutItemsInput, PurchaseOrderUncheckedUpdateWithoutItemsInput>
  }

  export type PurchaseOrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplier?: SupplierUpdateOneRequiredWithoutPurchaseOrdersNestedInput
  }

  export type PurchaseOrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplierId?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawMaterialUpsertWithoutPurchaseOrderItemsInput = {
    update: XOR<RawMaterialUpdateWithoutPurchaseOrderItemsInput, RawMaterialUncheckedUpdateWithoutPurchaseOrderItemsInput>
    create: XOR<RawMaterialCreateWithoutPurchaseOrderItemsInput, RawMaterialUncheckedCreateWithoutPurchaseOrderItemsInput>
    where?: RawMaterialWhereInput
  }

  export type RawMaterialUpdateToOneWithWhereWithoutPurchaseOrderItemsInput = {
    where?: RawMaterialWhereInput
    data: XOR<RawMaterialUpdateWithoutPurchaseOrderItemsInput, RawMaterialUncheckedUpdateWithoutPurchaseOrderItemsInput>
  }

  export type RawMaterialUpdateWithoutPurchaseOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutRawMaterialsNestedInput
    supplier?: SupplierUpdateOneWithoutRawMaterialsNestedInput
    recipeItems?: RecipeItemUpdateManyWithoutRawMaterialNestedInput
    adjustments?: AdjustmentUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialUncheckedUpdateWithoutPurchaseOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUncheckedUpdateManyWithoutRawMaterialNestedInput
    adjustments?: AdjustmentUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type SaleCreateWithoutCustomerInput = {
    id?: string
    saleDate?: Date | string
    totalAmount: number
    discount?: number
    tax?: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SaleItemCreateNestedManyWithoutSaleInput
  }

  export type SaleUncheckedCreateWithoutCustomerInput = {
    id?: string
    saleDate?: Date | string
    totalAmount: number
    discount?: number
    tax?: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: SaleItemUncheckedCreateNestedManyWithoutSaleInput
  }

  export type SaleCreateOrConnectWithoutCustomerInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput>
  }

  export type SaleCreateManyCustomerInputEnvelope = {
    data: SaleCreateManyCustomerInput | SaleCreateManyCustomerInput[]
  }

  export type SaleUpsertWithWhereUniqueWithoutCustomerInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutCustomerInput, SaleUncheckedUpdateWithoutCustomerInput>
    create: XOR<SaleCreateWithoutCustomerInput, SaleUncheckedCreateWithoutCustomerInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutCustomerInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutCustomerInput, SaleUncheckedUpdateWithoutCustomerInput>
  }

  export type SaleUpdateManyWithWhereWithoutCustomerInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutCustomerInput>
  }

  export type SaleScalarWhereInput = {
    AND?: SaleScalarWhereInput | SaleScalarWhereInput[]
    OR?: SaleScalarWhereInput[]
    NOT?: SaleScalarWhereInput | SaleScalarWhereInput[]
    id?: StringFilter<"Sale"> | string
    customerId?: StringNullableFilter<"Sale"> | string | null
    saleDate?: DateTimeFilter<"Sale"> | Date | string
    totalAmount?: FloatFilter<"Sale"> | number
    discount?: FloatFilter<"Sale"> | number
    tax?: FloatFilter<"Sale"> | number
    status?: StringFilter<"Sale"> | string
    notes?: StringNullableFilter<"Sale"> | string | null
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
  }

  export type CustomerCreateWithoutSalesInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateWithoutSalesInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutSalesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutSalesInput, CustomerUncheckedCreateWithoutSalesInput>
  }

  export type SaleItemCreateWithoutSaleInput = {
    id?: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
    finishedGood: FinishedGoodCreateNestedOneWithoutSaleItemsInput
  }

  export type SaleItemUncheckedCreateWithoutSaleInput = {
    id?: string
    finishedGoodId: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type SaleItemCreateOrConnectWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    create: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput>
  }

  export type SaleItemCreateManySaleInputEnvelope = {
    data: SaleItemCreateManySaleInput | SaleItemCreateManySaleInput[]
  }

  export type CustomerUpsertWithoutSalesInput = {
    update: XOR<CustomerUpdateWithoutSalesInput, CustomerUncheckedUpdateWithoutSalesInput>
    create: XOR<CustomerCreateWithoutSalesInput, CustomerUncheckedCreateWithoutSalesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutSalesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutSalesInput, CustomerUncheckedUpdateWithoutSalesInput>
  }

  export type CustomerUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemUpsertWithWhereUniqueWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    update: XOR<SaleItemUpdateWithoutSaleInput, SaleItemUncheckedUpdateWithoutSaleInput>
    create: XOR<SaleItemCreateWithoutSaleInput, SaleItemUncheckedCreateWithoutSaleInput>
  }

  export type SaleItemUpdateWithWhereUniqueWithoutSaleInput = {
    where: SaleItemWhereUniqueInput
    data: XOR<SaleItemUpdateWithoutSaleInput, SaleItemUncheckedUpdateWithoutSaleInput>
  }

  export type SaleItemUpdateManyWithWhereWithoutSaleInput = {
    where: SaleItemScalarWhereInput
    data: XOR<SaleItemUpdateManyMutationInput, SaleItemUncheckedUpdateManyWithoutSaleInput>
  }

  export type SaleCreateWithoutItemsInput = {
    id?: string
    saleDate?: Date | string
    totalAmount: number
    discount?: number
    tax?: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutItemsInput = {
    id?: string
    customerId?: string | null
    saleDate?: Date | string
    totalAmount: number
    discount?: number
    tax?: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleCreateOrConnectWithoutItemsInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
  }

  export type FinishedGoodCreateWithoutSaleItemsInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemCreateNestedManyWithoutFinishedGoodInput
    usedAsSubAssembly?: RecipeItemCreateNestedManyWithoutSubAssemblyInput
  }

  export type FinishedGoodUncheckedCreateWithoutSaleItemsInput = {
    id?: string
    name: string
    sku?: string | null
    batchCode: string
    quantityOnHand?: number
    retailPrice: number
    calculatedCogs?: number
    vesselSizeOz?: number | null
    fragranceLoadPercent?: number | null
    laborCostPerUnit?: number | null
    overheadFlat?: number | null
    overheadPercent?: number | null
    isSubAssembly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeItems?: RecipeItemUncheckedCreateNestedManyWithoutFinishedGoodInput
    usedAsSubAssembly?: RecipeItemUncheckedCreateNestedManyWithoutSubAssemblyInput
  }

  export type FinishedGoodCreateOrConnectWithoutSaleItemsInput = {
    where: FinishedGoodWhereUniqueInput
    create: XOR<FinishedGoodCreateWithoutSaleItemsInput, FinishedGoodUncheckedCreateWithoutSaleItemsInput>
  }

  export type SaleUpsertWithoutItemsInput = {
    update: XOR<SaleUpdateWithoutItemsInput, SaleUncheckedUpdateWithoutItemsInput>
    create: XOR<SaleCreateWithoutItemsInput, SaleUncheckedCreateWithoutItemsInput>
    where?: SaleWhereInput
  }

  export type SaleUpdateToOneWithWhereWithoutItemsInput = {
    where?: SaleWhereInput
    data: XOR<SaleUpdateWithoutItemsInput, SaleUncheckedUpdateWithoutItemsInput>
  }

  export type SaleUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinishedGoodUpsertWithoutSaleItemsInput = {
    update: XOR<FinishedGoodUpdateWithoutSaleItemsInput, FinishedGoodUncheckedUpdateWithoutSaleItemsInput>
    create: XOR<FinishedGoodCreateWithoutSaleItemsInput, FinishedGoodUncheckedCreateWithoutSaleItemsInput>
    where?: FinishedGoodWhereInput
  }

  export type FinishedGoodUpdateToOneWithWhereWithoutSaleItemsInput = {
    where?: FinishedGoodWhereInput
    data: XOR<FinishedGoodUpdateWithoutSaleItemsInput, FinishedGoodUncheckedUpdateWithoutSaleItemsInput>
  }

  export type FinishedGoodUpdateWithoutSaleItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUpdateManyWithoutFinishedGoodNestedInput
    usedAsSubAssembly?: RecipeItemUpdateManyWithoutSubAssemblyNestedInput
  }

  export type FinishedGoodUncheckedUpdateWithoutSaleItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    batchCode?: StringFieldUpdateOperationsInput | string
    quantityOnHand?: IntFieldUpdateOperationsInput | number
    retailPrice?: FloatFieldUpdateOperationsInput | number
    calculatedCogs?: FloatFieldUpdateOperationsInput | number
    vesselSizeOz?: NullableFloatFieldUpdateOperationsInput | number | null
    fragranceLoadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    laborCostPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadFlat?: NullableFloatFieldUpdateOperationsInput | number | null
    overheadPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    isSubAssembly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUncheckedUpdateManyWithoutFinishedGoodNestedInput
    usedAsSubAssembly?: RecipeItemUncheckedUpdateManyWithoutSubAssemblyNestedInput
  }

  export type RawMaterialCreateManyCategoryInput = {
    id?: string
    name: string
    supplierId?: string | null
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RawMaterialUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplier?: SupplierUpdateOneWithoutRawMaterialsNestedInput
    recipeItems?: RecipeItemUpdateManyWithoutRawMaterialNestedInput
    adjustments?: AdjustmentUpdateManyWithoutMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUncheckedUpdateManyWithoutRawMaterialNestedInput
    adjustments?: AdjustmentUncheckedUpdateManyWithoutMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawMaterialCreateManySupplierInput = {
    id?: string
    name: string
    categoryId: string
    totalQuantity?: number | null
    unit?: string | null
    costPerUnit?: number | null
    reorderThreshold?: number | null
    committedQuantity?: number | null
    onOrderQuantity?: number | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderCreateManySupplierInput = {
    id?: string
    orderDate?: Date | string
    expectedDate?: Date | string | null
    receivedDate?: Date | string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RawMaterialUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutRawMaterialsNestedInput
    recipeItems?: RecipeItemUpdateManyWithoutRawMaterialNestedInput
    adjustments?: AdjustmentUpdateManyWithoutMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeItems?: RecipeItemUncheckedUpdateManyWithoutRawMaterialNestedInput
    adjustments?: AdjustmentUncheckedUpdateManyWithoutMaterialNestedInput
    purchaseOrderItems?: PurchaseOrderItemUncheckedUpdateManyWithoutMaterialNestedInput
  }

  export type RawMaterialUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    totalQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    costPerUnit?: NullableFloatFieldUpdateOperationsInput | number | null
    reorderThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    committedQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    onOrderQuantity?: NullableFloatFieldUpdateOperationsInput | number | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PurchaseOrderItemUpdateManyWithoutPurchaseOrderNestedInput
  }

  export type PurchaseOrderUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PurchaseOrderItemUncheckedUpdateManyWithoutPurchaseOrderNestedInput
  }

  export type PurchaseOrderUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeItemCreateManyRawMaterialInput = {
    id?: string
    finishedGoodId: string
    subAssemblyId?: string | null
    requiredQuantity: number
    unit: string
  }

  export type AdjustmentCreateManyMaterialInput = {
    id?: string
    quantity: number
    reason: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type PurchaseOrderItemCreateManyMaterialInput = {
    id?: string
    purchaseOrderId: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeItemUpdateWithoutRawMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    finishedGood?: FinishedGoodUpdateOneRequiredWithoutRecipeItemsNestedInput
    subAssembly?: FinishedGoodUpdateOneWithoutUsedAsSubAssemblyNestedInput
  }

  export type RecipeItemUncheckedUpdateWithoutRawMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    subAssemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeItemUncheckedUpdateManyWithoutRawMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    subAssemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type AdjustmentUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdjustmentUncheckedUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdjustmentUncheckedUpdateManyWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderItemUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchaseOrder?: PurchaseOrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type PurchaseOrderItemUncheckedUpdateWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseOrderId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderItemUncheckedUpdateManyWithoutMaterialInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchaseOrderId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeItemCreateManyFinishedGoodInput = {
    id?: string
    rawMaterialId?: string | null
    subAssemblyId?: string | null
    requiredQuantity: number
    unit: string
  }

  export type RecipeItemCreateManySubAssemblyInput = {
    id?: string
    finishedGoodId: string
    rawMaterialId?: string | null
    requiredQuantity: number
    unit: string
  }

  export type SaleItemCreateManyFinishedGoodInput = {
    id?: string
    saleId: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type RecipeItemUpdateWithoutFinishedGoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    rawMaterial?: RawMaterialUpdateOneWithoutRecipeItemsNestedInput
    subAssembly?: FinishedGoodUpdateOneWithoutUsedAsSubAssemblyNestedInput
  }

  export type RecipeItemUncheckedUpdateWithoutFinishedGoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawMaterialId?: NullableStringFieldUpdateOperationsInput | string | null
    subAssemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeItemUncheckedUpdateManyWithoutFinishedGoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawMaterialId?: NullableStringFieldUpdateOperationsInput | string | null
    subAssemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeItemUpdateWithoutSubAssemblyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    finishedGood?: FinishedGoodUpdateOneRequiredWithoutRecipeItemsNestedInput
    rawMaterial?: RawMaterialUpdateOneWithoutRecipeItemsNestedInput
  }

  export type RecipeItemUncheckedUpdateWithoutSubAssemblyInput = {
    id?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    rawMaterialId?: NullableStringFieldUpdateOperationsInput | string | null
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeItemUncheckedUpdateManyWithoutSubAssemblyInput = {
    id?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    rawMaterialId?: NullableStringFieldUpdateOperationsInput | string | null
    requiredQuantity?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type SaleItemUpdateWithoutFinishedGoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sale?: SaleUpdateOneRequiredWithoutItemsNestedInput
  }

  export type SaleItemUncheckedUpdateWithoutFinishedGoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemUncheckedUpdateManyWithoutFinishedGoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderItemCreateManyPurchaseOrderInput = {
    id?: string
    materialId: string
    quantity: number
    unitCost: number
    receivedQty?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseOrderItemUpdateWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    material?: RawMaterialUpdateOneRequiredWithoutPurchaseOrderItemsNestedInput
  }

  export type PurchaseOrderItemUncheckedUpdateWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseOrderItemUncheckedUpdateManyWithoutPurchaseOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    materialId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    unitCost?: FloatFieldUpdateOperationsInput | number
    receivedQty?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateManyCustomerInput = {
    id?: string
    saleDate?: Date | string
    totalAmount: number
    discount?: number
    tax?: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SaleUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: SaleItemUncheckedUpdateManyWithoutSaleNestedInput
  }

  export type SaleUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemCreateManySaleInput = {
    id?: string
    finishedGoodId: string
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type SaleItemUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedGood?: FinishedGoodUpdateOneRequiredWithoutSaleItemsNestedInput
  }

  export type SaleItemUncheckedUpdateWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleItemUncheckedUpdateManyWithoutSaleInput = {
    id?: StringFieldUpdateOperationsInput | string
    finishedGoodId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplierCountOutputTypeDefaultArgs instead
     */
    export type SupplierCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplierCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RawMaterialCountOutputTypeDefaultArgs instead
     */
    export type RawMaterialCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RawMaterialCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FinishedGoodCountOutputTypeDefaultArgs instead
     */
    export type FinishedGoodCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FinishedGoodCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseOrderCountOutputTypeDefaultArgs instead
     */
    export type PurchaseOrderCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseOrderCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerCountOutputTypeDefaultArgs instead
     */
    export type CustomerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleCountOutputTypeDefaultArgs instead
     */
    export type SaleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplierDefaultArgs instead
     */
    export type SupplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplierDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RawMaterialDefaultArgs instead
     */
    export type RawMaterialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RawMaterialDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FinishedGoodDefaultArgs instead
     */
    export type FinishedGoodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FinishedGoodDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecipeItemDefaultArgs instead
     */
    export type RecipeItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecipeItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdjustmentDefaultArgs instead
     */
    export type AdjustmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdjustmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseOrderDefaultArgs instead
     */
    export type PurchaseOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseOrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseOrderItemDefaultArgs instead
     */
    export type PurchaseOrderItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseOrderItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerDefaultArgs instead
     */
    export type CustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleDefaultArgs instead
     */
    export type SaleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SaleItemDefaultArgs instead
     */
    export type SaleItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SaleItemDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}