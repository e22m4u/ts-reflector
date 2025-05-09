/* eslint @typescript-eslint/no-unused-vars: 0 */
import {expect} from 'chai';
import {getDecoratorTargetType} from './get-decorator-target-type.js';
import {DecoratorTargetType as DTT} from './get-decorator-target-type.js';

describe('getDecoratorTargetType', function () {
  const validate = function (value: DTT) {
    return function (
      target: object,
      propertyKey?: string,
      descriptorOrIndex?: PropertyDescriptor | number,
    ) {
      const type = getDecoratorTargetType(
        target,
        propertyKey,
        descriptorOrIndex,
      );
      expect(value).to.be.eq(type);
    };
  };

  it('returns CONSTRUCTOR', function () {
    @validate(DTT.CONSTRUCTOR)
    class Target {}
  });

  it('returns INSTANCE', function () {
    class Target {}
    const decorator = validate(DTT.INSTANCE);
    decorator(Target.prototype);
  });

  it('returns STATIC_METHOD', function () {
    class Target {
      @validate(DTT.STATIC_METHOD)
      static method() {
        /**/
      }
    }
  });

  it('returns INSTANCE_METHOD', function () {
    class Target {
      @validate(DTT.INSTANCE_METHOD)
      method() {
        /**/
      }
    }
  });

  it('returns STATIC_PROPERTY', function () {
    class Target {
      @validate(DTT.STATIC_PROPERTY)
      static prop?: unknown;
    }
  });

  it('returns INSTANCE_PROPERTY', function () {
    class Target {
      @validate(DTT.INSTANCE_PROPERTY)
      prop?: unknown;
    }
  });

  it('returns CONSTRUCTOR_PARAMETER', function () {
    class Target {
      constructor(
        @validate(DTT.CONSTRUCTOR_PARAMETER)
        param: unknown,
      ) {
        /**/
      }
    }
  });

  it('returns STATIC_METHOD_PARAMETER', function () {
    class Target {
      static method(
        @validate(DTT.STATIC_METHOD_PARAMETER)
        param: unknown,
      ) {
        /**/
      }
    }
  });

  it('returns INSTANCE_METHOD_PARAMETER', function () {
    class Target {
      method(
        @validate(DTT.INSTANCE_METHOD_PARAMETER)
        param: unknown,
      ) {
        /**/
      }
    }
  });
});
