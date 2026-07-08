export type JsonString = string;
export type IsoDateTimeString = string;
export type IsoDateString = string;
export type UrlString = string;
export type NonEmptyString = string;
export type EntityId = string;
export type Brand<K, T> = K & { readonly __brand: T };

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;
export type Dict<TValue = unknown> = Record<string, TValue>;

export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { readonly [key: string]: JsonValue };
export type JsonArray = readonly JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type SerializableRecord = Record<string, JsonValue>;
export type VoidFn = () => void;
export type AsyncVoidFn = () => Promise<void>;
export type Result<TValue, TError = Error> =
  | { readonly ok: true; readonly value: TValue }
  | { readonly ok: false; readonly error: TError };
