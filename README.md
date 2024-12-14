# @e22m4u/ts-reflector

*English | [Русский](./README-ru.md)*

A typed wrapper for
[The Metadata Reflection API](https://rbuckton.github.io/reflect-metadata/)

## Installation

```bash
npm install @e22m4u/ts-reflector
```

#### Experimental decorators

To enable experimental decorators support add the following
options to your `tsconfig.json` file.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## MetadataKey<T>

Here's an example of using MetadataKey<T> for storing metadata. Values
are validated against the given key type before storage. The metadata
type is also automatically inferred when retrieving values.

```ts
import {Reflector} from '@e22m4u/ts-metadata';
import {MetadataKey} from '@e22m4u/ts-metadata';

type MyData = {foo: string};
class Target {/* ... */}

// Create a MetadataKey<T> for MyData type
const key = new MetadataKey<MyData>();

// Assign metadata to the Target class
Reflector.defineMetadata(key, {foo: 'bar'}, Target);

// The defineMetadata method validates the value type
// against the MetadataKey<MyData> type constraint
Reflector.defineMetadata(key, 'string', Target);
// TypeError: Argument of type 'string' is not assignable
// to parameter of type MyData.

// Return types from getMetadata and getOwnMetadata
// are automatically inferred from the key type
const result = Reflector.getMetadata(key, Target); // MyData
```

## getDecoratorTargetType

The `getDecoratorTargetType` utility provides a simple way to identify where
a decorator is applied in your code. When writing custom decorators, it's often
necessary to implement different behavior based on whether the decorator is used
on a class, method, property, or parameter. This utility returns an enum value
indicating the exact location of the decorator.

```ts
import {getDecoratorTargetType} from '@e22m4u/ts-metadata';
import {DecoratorTargetType as DTT} from '@e22m4u/ts-metadata';

// Define a decorator
function myDecorator(
  target: object,
  propertyKey?: string,
  descriptorOrIndex?: PropertyDescriptor | number,
) {
  // Pass the decorator arguments to the utility
  const type = getDecoratorTargetType(
    target,
    propertyKey,
    descriptorOrIndex,
  );
  // Check the returned type to determine the decorator's location
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
