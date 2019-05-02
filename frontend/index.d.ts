declare module "react-cache" {
  export type Cache = object
  export function createCache(): Cache

  export interface Resource<Input, Value> {
    read(cache: Cache, key: Input): Value
    preload(key: Input): void
  }

  export function createResource<Input, Value>(
    fetch: (input: Input) => PromiseLike<Value>,
    maybeHashInput?: (input: Input) => string | number,
  ): Resource<Input, Value>
}

type StrMap<T> = {
  [s: string]: T
}

declare module "phone-formatter" {
  export function format(input: string, format: string): string
}
