import {expect} from 'chai';
import {Reflector} from './reflector.js';
import {MetadataKey} from './metadata-key.js';

const NR = Reflect;
const R = Reflector;

const METADATA_KEY = new MetadataKey<MD>('key');
const METADATA = {property: 'value'};

type MD = typeof METADATA;

describe('Reflector', function () {
  describe('defineMetadata', function () {
    it('allows to define metadata by plain keys', function () {
      class Context {}
      const symbolKey = Symbol();
      const stringKey = 'string';
      const numberKey = 10;
      const objectKey = {key: 'value'};
      R.defineMetadata(symbolKey, METADATA, Context);
      R.defineMetadata(stringKey, METADATA, Context);
      R.defineMetadata(numberKey, METADATA, Context);
      R.defineMetadata(objectKey, METADATA, Context);
      const symbolMd = NR.getMetadata(symbolKey, Context);
      const stringMd = NR.getMetadata(stringKey, Context);
      const numberMd = NR.getMetadata(numberKey, Context);
      const objectMd = NR.getMetadata(objectKey, Context);
      expect(symbolMd).to.be.eq(METADATA);
      expect(stringMd).to.be.eq(METADATA);
      expect(numberMd).to.be.eq(METADATA);
      expect(objectMd).to.be.eq(METADATA);
    });

    it('allows define metadata by the MetadataKey', function () {
      class Context {}
      const key = new MetadataKey<MD>('key');
      R.defineMetadata(key, METADATA, Context);
      const metadata: MD = NR.getMetadata(key, Context);
      expect(metadata).to.be.eq(METADATA);
    });

    it('can distinguish instances of the MetadataKey', function () {
      class TestClass {}
      const metadata1 = 'metadata-1';
      const metadata2 = 'metadata-2';
      const key1 = new MetadataKey('key');
      const key2 = new MetadataKey('key');
      R.defineMetadata(key1, metadata1, TestClass);
      R.defineMetadata(key2, metadata2, TestClass);
      const result1 = NR.getMetadata(key1, TestClass);
      const result2 = NR.getMetadata(key2, TestClass);
      expect(result1).to.be.eql(metadata1);
      expect(result2).to.be.eql(metadata2);
      expect(result1).to.be.not.eq(result2);
    });

    it('sets class metadata', function () {
      class Context {}
      R.defineMetadata(METADATA_KEY, METADATA, Context);
      const result = NR.getMetadata(METADATA_KEY, Context);
      expect(result).to.be.eql(METADATA);
    });

    it('sets prototype metadata', function () {
      class Context {}
      R.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
      const result = NR.getMetadata(METADATA_KEY, Context.prototype);
      expect(result).to.be.eql(METADATA);
    });

    it('sets metadata of a class property', function () {
      class Context {
        prop?: string;
      }
      R.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
      const result = NR.getMetadata(METADATA_KEY, Context, 'prop');
      expect(result).to.be.eql(METADATA);
    });

    it('sets metadata of a prototype property', function () {
      class Context {
        prop?: string;
      }
      R.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
      const result = NR.getMetadata(METADATA_KEY, Context.prototype, 'prop');
      expect(result).to.be.eql(METADATA);
    });
  });

  describe('hasMetadata', function () {
    it('allows to check metadata by scalar keys', function () {
      class Context {}
      const symbolKey = Symbol();
      const stringKey = 'string';
      const numberKey = 10;
      const objectKey = {key: 'value'};
      NR.defineMetadata(symbolKey, METADATA, Context);
      NR.defineMetadata(stringKey, METADATA, Context);
      NR.defineMetadata(numberKey, METADATA, Context);
      NR.defineMetadata(objectKey, METADATA, Context);
      const inSymbol = R.hasMetadata(symbolKey, Context);
      const inString = R.hasMetadata(stringKey, Context);
      const inNumber = R.hasMetadata(numberKey, Context);
      const inObject = R.hasMetadata(objectKey, Context);
      expect(inSymbol).to.be.true;
      expect(inString).to.be.true;
      expect(inNumber).to.be.true;
      expect(inObject).to.be.true;
    });

    it('allows to check metadata by the MetadataKey', function () {
      class Context {}
      const key = new MetadataKey<MD>('key');
      NR.defineMetadata(key, METADATA, Context);
      const result = R.hasMetadata(key, Context);
      expect(result).to.be.true;
    });

    it('checks if metadata in a class', function () {
      class Context {}
      const noMd = R.hasMetadata(METADATA_KEY, Context);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context);
      const result = R.hasMetadata(METADATA_KEY, Context);
      expect(result).to.be.true;
    });

    it('checks if metadata in a prototype', function () {
      class Context {}
      const noMd = R.hasMetadata(METADATA_KEY, Context.prototype);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
      const result = R.hasMetadata(METADATA_KEY, Context.prototype);
      expect(result).to.be.true;
    });

    it('checks if metadata in a class property', function () {
      class Context {
        prop?: string;
      }
      const noMd = R.hasMetadata(METADATA_KEY, Context, 'prop');
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
      const result = R.hasMetadata(METADATA_KEY, Context, 'prop');
      expect(result).to.be.true;
    });

    it('checks if metadata in a prototype property', function () {
      class Context {
        prop?: string;
      }
      const noMd = R.hasMetadata(METADATA_KEY, Context.prototype, 'prop');
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
      const result = R.hasMetadata(METADATA_KEY, Context.prototype, 'prop');
      expect(result).to.be.true;
    });

    it('checks if parent metadata in a class', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      const noMd = R.hasMetadata(METADATA_KEY, ContextB);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
      const result = R.hasMetadata(METADATA_KEY, ContextB);
      expect(result).to.be.true;
    });

    it('checks if parent metadata in a prototype', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      const noMd = R.hasMetadata(METADATA_KEY, ContextB.prototype);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype);
      const result = R.hasMetadata(METADATA_KEY, ContextB.prototype);
      expect(result).to.be.true;
    });

    it('checks if parent metadata in a class property', function () {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      const noMd = R.hasMetadata(METADATA_KEY, ContextB, 'prop');
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA, 'prop');
      const result = R.hasMetadata(METADATA_KEY, ContextB, 'prop');
      expect(result).to.be.true;
    });

    it('checks if parent metadata in a prototype property', function () {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      const noMd = R.hasMetadata(METADATA_KEY, ContextB.prototype, 'prop');
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype, 'prop');
      const result = R.hasMetadata(METADATA_KEY, ContextB.prototype, 'prop');
      expect(result).to.be.true;
    });

    it('returns false for child metadata in a class', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
      const result = R.hasMetadata(METADATA_KEY, ContextA);
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a prototype', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype);
      const result = R.hasMetadata(METADATA_KEY, ContextA.prototype);
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a class property', function () {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB, 'prop');
      const result = R.hasMetadata(METADATA_KEY, ContextA, 'prop');
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a prototype property', function () {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype, 'prop');
      const result = R.hasMetadata(METADATA_KEY, ContextA.prototype, 'prop');
      expect(result).to.be.false;
    });
  });

  describe('hasOwnMetadata', function () {
    it('allows to check metadata by scalar keys', function () {
      class Context {}
      const symbolKey = Symbol();
      const stringKey = 'string';
      const numberKey = 10;
      const objectKey = {key: 'value'};
      NR.defineMetadata(symbolKey, METADATA, Context);
      NR.defineMetadata(stringKey, METADATA, Context);
      NR.defineMetadata(numberKey, METADATA, Context);
      NR.defineMetadata(objectKey, METADATA, Context);
      const inSymbol = R.hasOwnMetadata(symbolKey, Context);
      const inString = R.hasOwnMetadata(stringKey, Context);
      const inNumber = R.hasOwnMetadata(numberKey, Context);
      const inObject = R.hasOwnMetadata(objectKey, Context);
      expect(inSymbol).to.be.true;
      expect(inString).to.be.true;
      expect(inNumber).to.be.true;
      expect(inObject).to.be.true;
    });

    it('allows to check metadata by the MetadataKey', function () {
      class Context {}
      const key = new MetadataKey<MD>('key');
      NR.defineMetadata(key, METADATA, Context);
      const result = R.hasOwnMetadata(key, Context);
      expect(result).to.be.true;
    });

    it('checks if metadata in a class', function () {
      class Context {}
      const noMd = R.hasOwnMetadata(METADATA_KEY, Context);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context);
      const result = R.hasOwnMetadata(METADATA_KEY, Context);
      expect(result).to.be.true;
    });

    it('checks if metadata in a prototype', function () {
      class Context {}
      const noMd = R.hasOwnMetadata(METADATA_KEY, Context.prototype);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
      const result = R.hasOwnMetadata(METADATA_KEY, Context.prototype);
      expect(result).to.be.true;
    });

    it('checks if metadata in a class property', function () {
      class Context {
        prop?: string;
      }
      const noMd = R.hasOwnMetadata(METADATA_KEY, Context, 'prop');
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
      const result = R.hasOwnMetadata(METADATA_KEY, Context, 'prop');
      expect(result).to.be.true;
    });

    it('checks if metadata in a prototype property', function () {
      class Context {
        prop?: string;
      }
      const noMd = R.hasOwnMetadata(METADATA_KEY, Context.prototype, 'prop');
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
      const result = R.hasOwnMetadata(METADATA_KEY, Context.prototype, 'prop');
      expect(result).to.be.true;
    });

    it('returns false for parent metadata in a class', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      const noMd = R.hasOwnMetadata(METADATA_KEY, ContextB);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
      const result = R.hasOwnMetadata(METADATA_KEY, ContextB);
      expect(result).to.be.false;
    });

    it('returns false for parent metadata in a prototype', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      const noMd = R.hasOwnMetadata(METADATA_KEY, ContextB.prototype);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype);
      const result = R.hasOwnMetadata(METADATA_KEY, ContextB.prototype);
      expect(result).to.be.false;
    });

    it('returns false for parent metadata in a class property', function () {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      const noMd = R.hasOwnMetadata(METADATA_KEY, ContextB, 'prop');
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA, 'prop');
      const result = R.hasOwnMetadata(METADATA_KEY, ContextB, 'prop');
      expect(result).to.be.false;
    });

    it('returns false for parent metadata in a prototype property', function () {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      const noMd = R.hasOwnMetadata(METADATA_KEY, ContextB.prototype, 'prop');
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype, 'prop');
      const result = R.hasOwnMetadata(METADATA_KEY, ContextB.prototype, 'prop');
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a class', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
      const result = R.hasOwnMetadata(METADATA_KEY, ContextA);
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a prototype', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype);
      const result = R.hasOwnMetadata(METADATA_KEY, ContextA.prototype);
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a class property', function () {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB, 'prop');
      const result = R.hasOwnMetadata(METADATA_KEY, ContextA, 'prop');
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a prototype property', function () {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype, 'prop');
      const result = R.hasOwnMetadata(METADATA_KEY, ContextA.prototype, 'prop');
      expect(result).to.be.false;
    });
  });

  describe('getMetadata', function () {
    it('allows to get metadata by plain keys', function () {
      class Context {}
      const symbolKey = Symbol();
      const stringKey = 'string';
      const numberKey = 10;
      const objectKey = {key: 'value'};
      NR.defineMetadata(symbolKey, METADATA, Context);
      NR.defineMetadata(stringKey, METADATA, Context);
      NR.defineMetadata(numberKey, METADATA, Context);
      NR.defineMetadata(objectKey, METADATA, Context);
      const symbolMd = R.getMetadata(symbolKey, Context);
      const stringMd = R.getMetadata(stringKey, Context);
      const numberMd = R.getMetadata(numberKey, Context);
      const objectMd = R.getMetadata(objectKey, Context);
      expect(symbolMd).to.be.eq(METADATA);
      expect(stringMd).to.be.eq(METADATA);
      expect(numberMd).to.be.eq(METADATA);
      expect(objectMd).to.be.eq(METADATA);
    });

    it('allows to get metadata by the MetadataKey', function () {
      class Context {}
      const key = new MetadataKey<MD>('key');
      NR.defineMetadata(key, METADATA, Context);
      const metadata: MD | undefined = R.getMetadata(key, Context);
      expect(metadata).to.be.eq(METADATA);
    });

    it('can distinguish instances of the MetadataKey', function () {
      class TestClass {}
      const metadata1 = 'metadata-1';
      const metadata2 = 'metadata-2';
      const key1 = new MetadataKey('key');
      const key2 = new MetadataKey('key');
      NR.defineMetadata(key1, metadata1, TestClass);
      NR.defineMetadata(key2, metadata2, TestClass);
      const result1 = R.getMetadata(key1, TestClass);
      const result2 = R.getMetadata(key2, TestClass);
      expect(result1).to.be.eql(metadata1);
      expect(result2).to.be.eql(metadata2);
      expect(result1).to.be.not.eq(result2);
    });

    it('returns class metadata', function () {
      class Context {}
      NR.defineMetadata(METADATA_KEY, METADATA, Context);
      const result = R.getMetadata(METADATA_KEY, Context);
      expect(result).to.be.eql(METADATA);
    });

    it('returns prototype metadata', function () {
      class Context {}
      NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
      const result = R.getMetadata(METADATA_KEY, Context.prototype);
      expect(result).to.be.eql(METADATA);
    });

    it('returns metadata of a class property', function () {
      class Context {
        prop?: string;
      }
      NR.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
      const result = R.getMetadata(METADATA_KEY, Context, 'prop');
      expect(result).to.be.eql(METADATA);
    });

    it('returns metadata of a prototype property', function () {
      class Context {
        prop?: string;
      }
      NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
      const result = R.getMetadata(METADATA_KEY, Context.prototype, 'prop');
      expect(result).to.be.eql(METADATA);
    });

    it('returns parent metadata from a class', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
      const result = R.getMetadata(METADATA_KEY, ContextB);
      expect(result).to.be.eql(METADATA);
    });

    it('returns parent metadata from a prototype', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype);
      const result = R.getMetadata(METADATA_KEY, ContextB.prototype);
      expect(result).to.be.eql(METADATA);
    });

    it('returns parent metadata from a class property', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA, 'prop');
      const result = R.getMetadata(METADATA_KEY, ContextB, 'prop');
      expect(result).to.be.eql(METADATA);
    });

    it('returns parent metadata from a prototype property', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype, 'prop');
      const result = R.getMetadata(METADATA_KEY, ContextB.prototype, 'prop');
      expect(result).to.be.eql(METADATA);
    });

    it('does not returns child metadata from a class', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
      const result = R.getMetadata(METADATA_KEY, ContextA);
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a prototype', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype);
      const result = R.getMetadata(METADATA_KEY, ContextA.prototype);
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a class property', function () {
      class ContextA {}
      class ContextB extends ContextA {
        prop?: string;
      }
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB, 'prop');
      const result = R.getMetadata(METADATA_KEY, ContextA, 'prop');
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a prototype property', function () {
      class ContextA {}
      class ContextB extends ContextA {
        prop?: string;
      }
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype, 'prop');
      const result = R.getMetadata(METADATA_KEY, ContextA.prototype, 'prop');
      expect(result).to.be.undefined;
    });

    it('returns undefined if no metadata', function () {
      class Context {}
      const result = R.getMetadata(METADATA_KEY, Context);
      expect(result).to.be.undefined;
    });
  });

  describe('getOwnMetadata', function () {
    it('allows to get metadata by plain keys', function () {
      class Context {}
      const symbolKey = Symbol();
      const stringKey = 'string';
      const numberKey = 10;
      const objectKey = {key: 'value'};
      NR.defineMetadata(symbolKey, METADATA, Context);
      NR.defineMetadata(stringKey, METADATA, Context);
      NR.defineMetadata(numberKey, METADATA, Context);
      NR.defineMetadata(objectKey, METADATA, Context);
      const symbolMd = R.getOwnMetadata(symbolKey, Context);
      const stringMd = R.getOwnMetadata(stringKey, Context);
      const numberMd = R.getOwnMetadata(numberKey, Context);
      const objectMd = R.getOwnMetadata(objectKey, Context);
      expect(symbolMd).to.be.eq(METADATA);
      expect(stringMd).to.be.eq(METADATA);
      expect(numberMd).to.be.eq(METADATA);
      expect(objectMd).to.be.eq(METADATA);
    });

    it('allows to get metadata by the MetadataKey', function () {
      class Context {}
      const key = new MetadataKey<MD>('key');
      NR.defineMetadata(key, METADATA, Context);
      const metadata: MD | undefined = R.getOwnMetadata(key, Context);
      expect(metadata).to.be.eq(METADATA);
    });

    it('can distinguish instances of the MetadataKey', function () {
      class TestClass {}
      const metadata1 = 'metadata-1';
      const metadata2 = 'metadata-2';
      const key1 = new MetadataKey('key');
      const key2 = new MetadataKey('key');
      NR.defineMetadata(key1, metadata1, TestClass);
      NR.defineMetadata(key2, metadata2, TestClass);
      const result1 = R.getOwnMetadata(key1, TestClass);
      const result2 = R.getOwnMetadata(key2, TestClass);
      expect(result1).to.be.eql(metadata1);
      expect(result2).to.be.eql(metadata2);
      expect(result1).to.be.not.eq(result2);
    });

    it('returns class metadata', function () {
      class Context {}
      NR.defineMetadata(METADATA_KEY, METADATA, Context);
      const result = R.getOwnMetadata(METADATA_KEY, Context);
      expect(result).to.be.eql(METADATA);
    });

    it('returns prototype metadata', function () {
      class Context {}
      NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
      const result = R.getOwnMetadata(METADATA_KEY, Context.prototype);
      expect(result).to.be.eql(METADATA);
    });

    it('returns metadata of a class property', function () {
      class Context {
        prop?: string;
      }
      NR.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
      const result = R.getOwnMetadata(METADATA_KEY, Context, 'prop');
      expect(result).to.be.eql(METADATA);
    });

    it('returns metadata of a prototype property', function () {
      class Context {
        prop?: string;
      }
      NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
      const result = R.getOwnMetadata(METADATA_KEY, Context.prototype, 'prop');
      expect(result).to.be.eql(METADATA);
    });

    it('does not returns parent metadata from a class', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
      const result = R.getOwnMetadata(METADATA_KEY, ContextB);
      expect(result).to.be.undefined;
    });

    it('does not returns parent metadata from a prototype', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype);
      const result = R.getOwnMetadata(METADATA_KEY, ContextB.prototype);
      expect(result).to.be.undefined;
    });

    it('does not returns parent metadata from a class property', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA, 'prop');
      const result = R.getOwnMetadata(METADATA_KEY, ContextB, 'prop');
      expect(result).to.be.undefined;
    });

    it('does not returns parent metadata from a prototype property', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype, 'prop');
      const result = R.getOwnMetadata(METADATA_KEY, ContextB.prototype, 'prop');
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a class', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
      const result = R.getOwnMetadata(METADATA_KEY, ContextA);
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a prototype', function () {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype);
      const result = R.getOwnMetadata(METADATA_KEY, ContextA.prototype);
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a class property', function () {
      class ContextA {}
      class ContextB extends ContextA {
        prop?: string;
      }
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB, 'prop');
      const result = R.getOwnMetadata(METADATA_KEY, ContextA, 'prop');
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a prototype property', function () {
      class ContextA {}
      class ContextB extends ContextA {
        prop?: string;
      }
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype, 'prop');
      const result = R.getOwnMetadata(METADATA_KEY, ContextA.prototype, 'prop');
      expect(result).to.be.undefined;
    });

    it('returns undefined if no metadata', function () {
      class Context {}
      const result = R.getOwnMetadata(METADATA_KEY, Context);
      expect(result).to.be.undefined;
    });
  });
});
