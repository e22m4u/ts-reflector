/* eslint @typescript-eslint/no-unused-vars: 0 */
import {expect} from 'chai';
import {DecoratorTargetType as DTT} from '../../src';
import {getDecoratorTargetType} from './get-decorator-target-type';

describe('getDecoratorTargetType', () => {
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

  it('returns CONSTRUCTOR', () => {
    @validate(DTT.CONSTRUCTOR)
    class Target {}
  });

  it('returns INSTANCE', () => {
    class Target {}
    const decorator = validate(DTT.INSTANCE);
    decorator(Target.prototype);
  });

  it('returns STATIC_METHOD', () => {
    class Target {
      @validate(DTT.STATIC_METHOD)
      static method() {
        /**/
      }
    }
  });

  it('returns INSTANCE_METHOD', () => {
    class Target {
      @validate(DTT.INSTANCE_METHOD)
      method() {
        /**/
      }
    }
  });

  it('returns STATIC_PROPERTY', () => {
    class Target {
      @validate(DTT.STATIC_PROPERTY)
      static prop?: unknown;
    }
  });

  it('returns INSTANCE_PROPERTY', () => {
    class Target {
      @validate(DTT.INSTANCE_PROPERTY)
      prop?: unknown;
    }
  });

  it('returns CONSTRUCTOR_PARAMETER', () => {
    class Target {
      constructor(
        @validate(DTT.CONSTRUCTOR_PARAMETER)
        param: unknown,
      ) {
        /**/
      }
    }
  });

  it('returns STATIC_METHOD_PARAMETER', () => {
    class Target {
      static method(
        @validate(DTT.STATIC_METHOD_PARAMETER)
        param: unknown,
      ) {
        /**/
      }
    }
  });

  it('returns INSTANCE_METHOD_PARAMETER', () => {
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
