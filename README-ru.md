# @e22m4u/ts-reflector

*[English](./README.md) | Русский*

Типизированная обертка для
[Metadata Reflection API](https://rbuckton.github.io/reflect-metadata/)

## Установка

```bash
npm install @e22m4u/ts-reflector
```

#### Поддержка декораторов

Для объявления мета-данных с помощью декораторов, потребуется добавить
указанные ниже опции в файл `tsconfig.json` вашего проекта.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## MetadataKey\<T\>

Ниже приведен пример использования ключа `MetadataKey<T>`
для хранения метаданных. Значение проверяется на соответствие
заданному ключу перед сохранением. Кроме того, тип метаданных
будет автоматически выведен при извлечении по ключу.

```ts
import {Reflector} from '@e22m4u/ts-metadata';
import {MetadataKey} from '@e22m4u/ts-metadata';

type MyData = {foo: string};
class Target {/* ... */}

// создание ключа MetadataKey<T>
// для мета-данных типа MyData
const key = new MetadataKey<MyData>();

// назначение мета-данных классу Target
// с помощью метода `defineMetadata`
Reflector.defineMetadata(key, {foo: 'bar'}, Target);

// метод `defineMetadata` проверяет тип
// устанавливаемого значения на соответствие
// ключу MetadataKey<MyData>, где допустимым
// значением является MyData
Reflector.defineMetadata(key, 'string', Target);
// TypeError: Argument of type 'string' is not assignable
// to parameter of type MyData.

// тип возвращаемых значений методов `getMetadata`
// и `getOwnMetadata` выводится согласно ключу
const result = Reflector.getMetadata(key, Target); // MyData
```

## getDecoratorTargetType

С помощью утилиты `getDecoratorTargetType` можно определить
место применения декоратора.

```ts
import {getDecoratorTargetType} from '@e22m4u/ts-metadata';
import {DecoratorTargetType as DTT} from '@e22m4u/ts-metadata';

// объявление декоратора
function myDecorator(
  target: object,
  propertyKey?: string,
  descriptorOrIndex?: PropertyDescriptor | number,
) {
  // передача всех аргументов
  // декоратора в утилиту
  const type = getDecoratorTargetType(
    target,
    propertyKey,
    descriptorOrIndex,
  );
  // сравнение возвращаемго значения
  // для определения места применения
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

## Тесты

```bash
npm run test
```

## Лицензия

MIT
