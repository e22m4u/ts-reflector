# @e22m4u/ts-reflector

A typed wrapper of the Metadata Reflection API.

## Installation

```bash
npm install @e22m4u/ts-reflector
```

## Usage

Metadata definition by the `MetadataKey<T>`

```ts
import {Reflector} from '@e22m4u/ts-metadata';
import {MetadataKey} from '@e22m4u/ts-metadata';

type MyMetadata = {foo: string};
class Target {/* ... */}

// Create a typed key by the MetadataKey<T>.
const key = new MetadataKey<MyMetadata>();

// Define a unique metadata entry on the target,
// `defineMetadata` checks metadata type by the key.
Reflector.defineMetadata(key, {foo: 'bar'}, Target);

// TypeError: Argument of type 'string' is not assignable
// to parameter of type MyMetadata.
Reflector.defineMetadata(key, 'string', Target);

// ReturnType of `getMetadata` and `getOwnMetadata`
// will be inferred automatically by the given key.
const result = Reflector.getMetadata(key, Target); // MyMetadata
```

The utility `getDecoratorTargetType` returns type of decorator target.

```ts
import {getDecoratorTargetType} from '@e22m4u/ts-metadata';
import {DecoratorTargetType as DTT} from '@e22m4u/ts-metadata';

// Let's say that we have a decorator.
function myDecorator(
  target: object,
  propertyKey?: string,
  descriptorOrIndex?: PropertyDescriptor | number,
) {
  // To get the type of a given target we should
  // pass decorator parameters as arguments of
  // the function `getDecoratorTargetType`.
  const type = getDecoratorTargetType(
    target,
    propertyKey,
    descriptorOrIndex,
  );
  // Now we have `DecoratorTargetType`
  // to determine decorator usage.
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

## Testing

```bash
npm run test
```

## License

MIT
