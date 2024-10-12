# @e22m4u/ts-reflector

*English | [Русский](./README-ru.md)*

Typed wrapper for
[The Metadata Reflection API](https://rbuckton.github.io/reflect-metadata/)

## Installation

```bash
npm install @e22m4u/ts-reflector
```

#### ES-module support

To use this module, your project must support ECMAScript
module loading. The recommended way to set up a TypeScript
project to work with ESM is to follow the steps below.

1. add `"type": "module"` to the `package.json` file
2. add the options below to the `tsconfig.json`

```json
{
  "module": "NodeNext",
  "moduleResolution": "NodeNext"
}
```

#### Decorator support

To declare metadata using decorators, you'll need to add
the options below to your project's `tsconfig.json` file.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Example

Setting and retrieving metadata using the `MetadataKey<T>` key.

```ts
import {Reflector} from '@e22m4u/ts-metadata';
import {MetadataKey} from '@e22m4u/ts-metadata';

type MyData = {foo: string};
class Target {/* ... */}

// create the MetadataKey<T> of MyData
const key = new MetadataKey<MyData>();

// assign metadata to the Target class
// using the `defineMetadata` method
Reflector.defineMetadata(key, {foo: 'bar'}, Target);

// the `defineMetadata` method checks the type
// of the given value by the MetadataKey<MyData>
// key which requires MyData
Reflector.defineMetadata(key, 'string', Target);
// TypeError: Argument of type 'string' is not assignable
// to parameter of type MyData.

// return type of `getMetadata` and `getOwnMetadata`
// methods is inferred by the given key
const result = Reflector.getMetadata(key, Target); // MyData
```

## Utilities

You can use the `getDecoratorTargetType` function to determine
where a decorator is applied.

```ts
import {getDecoratorTargetType} from '@e22m4u/ts-metadata';
import {DecoratorTargetType as DTT} from '@e22m4u/ts-metadata';

// declare a decorator
function myDecorator(
  target: object,
  propertyKey?: string,
  descriptorOrIndex?: PropertyDescriptor | number,
) {
  // pass all decorator arguments
  // to the utility function
  const type = getDecoratorTargetType(
    target,
    propertyKey,
    descriptorOrIndex,
  );
  // compare the returned value
  // to determine where it's applied
  if (type === DTT.CONSTRUCTOR)
    console.log('@myDecorator is applied to a class');
  if (type === DTT.STATIC_METHOD)
    console.log('@myDecorator is applied to a static method');
  if (type === DTT.INSTANCE_METHOD)
    console.log('@myDecorator is applied to an instance method');
  if (type === DTT.STATIC_PROPERTY)
    console.log('@myDecorator is applied to a static property');
  if (type === DTT.INSTANCE_PROPERTY)
    console.log('@myDecorator is applied to an instance property');
  if (type === DTT.CONSTRUCTOR_PARAMETER)
    console.log('@myDecorator is applied to a constructor parameter');
  if (type === DTT.STATIC_METHOD_PARAMETER)
    console.log('@myDecorator is applied to a static method parameter');
  if (type === DTT.INSTANCE_METHOD_PARAMETER)
    console.log('@myDecorator is applied to an instance method parameter');
};

```

## Tests

```bash
npm run test
```

## License

MIT
