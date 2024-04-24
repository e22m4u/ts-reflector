"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
const src_2 = require("../src");
const NR = Reflect;
const R = src_1.Reflector;
const METADATA_KEY = new src_2.MetadataKey('key');
const METADATA = { property: 'value' };
describe('Reflector', () => {
    describe('defineMetadata', () => {
        it('allows to define metadata by plain keys', () => {
            class Context {
            }
            const symbolKey = Symbol();
            const stringKey = 'string';
            const numberKey = 10;
            const objectKey = { key: 'value' };
            R.defineMetadata(symbolKey, METADATA, Context);
            R.defineMetadata(stringKey, METADATA, Context);
            R.defineMetadata(numberKey, METADATA, Context);
            R.defineMetadata(objectKey, METADATA, Context);
            const symbolMd = NR.getMetadata(symbolKey, Context);
            const stringMd = NR.getMetadata(stringKey, Context);
            const numberMd = NR.getMetadata(numberKey, Context);
            const objectMd = NR.getMetadata(objectKey, Context);
            (0, chai_1.expect)(symbolMd).to.be.eq(METADATA);
            (0, chai_1.expect)(stringMd).to.be.eq(METADATA);
            (0, chai_1.expect)(numberMd).to.be.eq(METADATA);
            (0, chai_1.expect)(objectMd).to.be.eq(METADATA);
        });
        it('allows define metadata by the MetadataKey', () => {
            class Context {
            }
            const key = new src_2.MetadataKey('key');
            R.defineMetadata(key, METADATA, Context);
            const metadata = NR.getMetadata(key, Context);
            (0, chai_1.expect)(metadata).to.be.eq(METADATA);
        });
        it('can distinguish instances of the MetadataKey', () => {
            class TestClass {
            }
            const metadata1 = 'metadata-1';
            const metadata2 = 'metadata-2';
            const key1 = new src_2.MetadataKey('key');
            const key2 = new src_2.MetadataKey('key');
            R.defineMetadata(key1, metadata1, TestClass);
            R.defineMetadata(key2, metadata2, TestClass);
            const result1 = NR.getMetadata(key1, TestClass);
            const result2 = NR.getMetadata(key2, TestClass);
            (0, chai_1.expect)(result1).to.be.eql(metadata1);
            (0, chai_1.expect)(result2).to.be.eql(metadata2);
            (0, chai_1.expect)(result1).to.be.not.eq(result2);
        });
        it('sets class metadata', () => {
            class Context {
            }
            R.defineMetadata(METADATA_KEY, METADATA, Context);
            const result = NR.getMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('sets prototype metadata', () => {
            class Context {
            }
            R.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
            const result = NR.getMetadata(METADATA_KEY, Context.prototype);
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('sets metadata of a class property', () => {
            class Context {
            }
            R.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
            const result = NR.getMetadata(METADATA_KEY, Context, 'prop');
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('sets metadata of a prototype property', () => {
            class Context {
            }
            R.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
            const result = NR.getMetadata(METADATA_KEY, Context.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
    });
    describe('hasMetadata', () => {
        it('allows to check metadata by scalar keys', () => {
            class Context {
            }
            const symbolKey = Symbol();
            const stringKey = 'string';
            const numberKey = 10;
            const objectKey = { key: 'value' };
            NR.defineMetadata(symbolKey, METADATA, Context);
            NR.defineMetadata(stringKey, METADATA, Context);
            NR.defineMetadata(numberKey, METADATA, Context);
            NR.defineMetadata(objectKey, METADATA, Context);
            const inSymbol = R.hasMetadata(symbolKey, Context);
            const inString = R.hasMetadata(stringKey, Context);
            const inNumber = R.hasMetadata(numberKey, Context);
            const inObject = R.hasMetadata(objectKey, Context);
            (0, chai_1.expect)(inSymbol).to.be.true;
            (0, chai_1.expect)(inString).to.be.true;
            (0, chai_1.expect)(inNumber).to.be.true;
            (0, chai_1.expect)(inObject).to.be.true;
        });
        it('allows to check metadata by the MetadataKey', () => {
            class Context {
            }
            const key = new src_2.MetadataKey('key');
            NR.defineMetadata(key, METADATA, Context);
            const result = R.hasMetadata(key, Context);
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if metadata in a class', () => {
            class Context {
            }
            const noMd = R.hasMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, Context);
            const result = R.hasMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if metadata in a prototype', () => {
            class Context {
            }
            const noMd = R.hasMetadata(METADATA_KEY, Context.prototype);
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
            const result = R.hasMetadata(METADATA_KEY, Context.prototype);
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if metadata in a class property', () => {
            class Context {
            }
            const noMd = R.hasMetadata(METADATA_KEY, Context, 'prop');
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
            const result = R.hasMetadata(METADATA_KEY, Context, 'prop');
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if metadata in a prototype property', () => {
            class Context {
            }
            const noMd = R.hasMetadata(METADATA_KEY, Context.prototype, 'prop');
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
            const result = R.hasMetadata(METADATA_KEY, Context.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if parent metadata in a class', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            const noMd = R.hasMetadata(METADATA_KEY, ContextB);
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
            const result = R.hasMetadata(METADATA_KEY, ContextB);
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if parent metadata in a prototype', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            const noMd = R.hasMetadata(METADATA_KEY, ContextB.prototype);
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype);
            const result = R.hasMetadata(METADATA_KEY, ContextB.prototype);
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if parent metadata in a class property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            const noMd = R.hasMetadata(METADATA_KEY, ContextB, 'prop');
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA, 'prop');
            const result = R.hasMetadata(METADATA_KEY, ContextB, 'prop');
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if parent metadata in a prototype property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            const noMd = R.hasMetadata(METADATA_KEY, ContextB.prototype, 'prop');
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype, 'prop');
            const result = R.hasMetadata(METADATA_KEY, ContextB.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.true;
        });
        it('returns false for child metadata in a class', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
            const result = R.hasMetadata(METADATA_KEY, ContextA);
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for child metadata in a prototype', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype);
            const result = R.hasMetadata(METADATA_KEY, ContextA.prototype);
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for child metadata in a class property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB, 'prop');
            const result = R.hasMetadata(METADATA_KEY, ContextA, 'prop');
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for child metadata in a prototype property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype, 'prop');
            const result = R.hasMetadata(METADATA_KEY, ContextA.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.false;
        });
    });
    describe('hasOwnMetadata', () => {
        it('allows to check metadata by scalar keys', () => {
            class Context {
            }
            const symbolKey = Symbol();
            const stringKey = 'string';
            const numberKey = 10;
            const objectKey = { key: 'value' };
            NR.defineMetadata(symbolKey, METADATA, Context);
            NR.defineMetadata(stringKey, METADATA, Context);
            NR.defineMetadata(numberKey, METADATA, Context);
            NR.defineMetadata(objectKey, METADATA, Context);
            const inSymbol = R.hasOwnMetadata(symbolKey, Context);
            const inString = R.hasOwnMetadata(stringKey, Context);
            const inNumber = R.hasOwnMetadata(numberKey, Context);
            const inObject = R.hasOwnMetadata(objectKey, Context);
            (0, chai_1.expect)(inSymbol).to.be.true;
            (0, chai_1.expect)(inString).to.be.true;
            (0, chai_1.expect)(inNumber).to.be.true;
            (0, chai_1.expect)(inObject).to.be.true;
        });
        it('allows to check metadata by the MetadataKey', () => {
            class Context {
            }
            const key = new src_2.MetadataKey('key');
            NR.defineMetadata(key, METADATA, Context);
            const result = R.hasOwnMetadata(key, Context);
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if metadata in a class', () => {
            class Context {
            }
            const noMd = R.hasOwnMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, Context);
            const result = R.hasOwnMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if metadata in a prototype', () => {
            class Context {
            }
            const noMd = R.hasOwnMetadata(METADATA_KEY, Context.prototype);
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
            const result = R.hasOwnMetadata(METADATA_KEY, Context.prototype);
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if metadata in a class property', () => {
            class Context {
            }
            const noMd = R.hasOwnMetadata(METADATA_KEY, Context, 'prop');
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
            const result = R.hasOwnMetadata(METADATA_KEY, Context, 'prop');
            (0, chai_1.expect)(result).to.be.true;
        });
        it('checks if metadata in a prototype property', () => {
            class Context {
            }
            const noMd = R.hasOwnMetadata(METADATA_KEY, Context.prototype, 'prop');
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
            const result = R.hasOwnMetadata(METADATA_KEY, Context.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.true;
        });
        it('returns false for parent metadata in a class', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            const noMd = R.hasOwnMetadata(METADATA_KEY, ContextB);
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
            const result = R.hasOwnMetadata(METADATA_KEY, ContextB);
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for parent metadata in a prototype', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            const noMd = R.hasOwnMetadata(METADATA_KEY, ContextB.prototype);
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype);
            const result = R.hasOwnMetadata(METADATA_KEY, ContextB.prototype);
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for parent metadata in a class property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            const noMd = R.hasOwnMetadata(METADATA_KEY, ContextB, 'prop');
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA, 'prop');
            const result = R.hasOwnMetadata(METADATA_KEY, ContextB, 'prop');
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for parent metadata in a prototype property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            const noMd = R.hasOwnMetadata(METADATA_KEY, ContextB.prototype, 'prop');
            (0, chai_1.expect)(noMd).to.be.false;
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype, 'prop');
            const result = R.hasOwnMetadata(METADATA_KEY, ContextB.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for child metadata in a class', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
            const result = R.hasOwnMetadata(METADATA_KEY, ContextA);
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for child metadata in a prototype', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype);
            const result = R.hasOwnMetadata(METADATA_KEY, ContextA.prototype);
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for child metadata in a class property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB, 'prop');
            const result = R.hasOwnMetadata(METADATA_KEY, ContextA, 'prop');
            (0, chai_1.expect)(result).to.be.false;
        });
        it('returns false for child metadata in a prototype property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype, 'prop');
            const result = R.hasOwnMetadata(METADATA_KEY, ContextA.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.false;
        });
    });
    describe('getMetadata', () => {
        it('allows to get metadata by plain keys', () => {
            class Context {
            }
            const symbolKey = Symbol();
            const stringKey = 'string';
            const numberKey = 10;
            const objectKey = { key: 'value' };
            NR.defineMetadata(symbolKey, METADATA, Context);
            NR.defineMetadata(stringKey, METADATA, Context);
            NR.defineMetadata(numberKey, METADATA, Context);
            NR.defineMetadata(objectKey, METADATA, Context);
            const symbolMd = R.getMetadata(symbolKey, Context);
            const stringMd = R.getMetadata(stringKey, Context);
            const numberMd = R.getMetadata(numberKey, Context);
            const objectMd = R.getMetadata(objectKey, Context);
            (0, chai_1.expect)(symbolMd).to.be.eq(METADATA);
            (0, chai_1.expect)(stringMd).to.be.eq(METADATA);
            (0, chai_1.expect)(numberMd).to.be.eq(METADATA);
            (0, chai_1.expect)(objectMd).to.be.eq(METADATA);
        });
        it('allows to get metadata by the MetadataKey', () => {
            class Context {
            }
            const key = new src_2.MetadataKey('key');
            NR.defineMetadata(key, METADATA, Context);
            const metadata = R.getMetadata(key, Context);
            (0, chai_1.expect)(metadata).to.be.eq(METADATA);
        });
        it('can distinguish instances of the MetadataKey', () => {
            class TestClass {
            }
            const metadata1 = 'metadata-1';
            const metadata2 = 'metadata-2';
            const key1 = new src_2.MetadataKey('key');
            const key2 = new src_2.MetadataKey('key');
            NR.defineMetadata(key1, metadata1, TestClass);
            NR.defineMetadata(key2, metadata2, TestClass);
            const result1 = R.getMetadata(key1, TestClass);
            const result2 = R.getMetadata(key2, TestClass);
            (0, chai_1.expect)(result1).to.be.eql(metadata1);
            (0, chai_1.expect)(result2).to.be.eql(metadata2);
            (0, chai_1.expect)(result1).to.be.not.eq(result2);
        });
        it('returns class metadata', () => {
            class Context {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, Context);
            const result = R.getMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns prototype metadata', () => {
            class Context {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
            const result = R.getMetadata(METADATA_KEY, Context.prototype);
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns metadata of a class property', () => {
            class Context {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
            const result = R.getMetadata(METADATA_KEY, Context, 'prop');
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns metadata of a prototype property', () => {
            class Context {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
            const result = R.getMetadata(METADATA_KEY, Context.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns parent metadata from a class', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
            const result = R.getMetadata(METADATA_KEY, ContextB);
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns parent metadata from a prototype', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype);
            const result = R.getMetadata(METADATA_KEY, ContextB.prototype);
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns parent metadata from a class property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA, 'prop');
            const result = R.getMetadata(METADATA_KEY, ContextB, 'prop');
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns parent metadata from a prototype property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype, 'prop');
            const result = R.getMetadata(METADATA_KEY, ContextB.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('does not returns child metadata from a class', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
            const result = R.getMetadata(METADATA_KEY, ContextA);
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns child metadata from a prototype', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype);
            const result = R.getMetadata(METADATA_KEY, ContextA.prototype);
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns child metadata from a class property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB, 'prop');
            const result = R.getMetadata(METADATA_KEY, ContextA, 'prop');
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns child metadata from a prototype property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype, 'prop');
            const result = R.getMetadata(METADATA_KEY, ContextA.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('returns undefined if no metadata', () => {
            class Context {
            }
            const result = R.getMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(result).to.be.undefined;
        });
    });
    describe('getOwnMetadata', () => {
        it('allows to get metadata by plain keys', () => {
            class Context {
            }
            const symbolKey = Symbol();
            const stringKey = 'string';
            const numberKey = 10;
            const objectKey = { key: 'value' };
            NR.defineMetadata(symbolKey, METADATA, Context);
            NR.defineMetadata(stringKey, METADATA, Context);
            NR.defineMetadata(numberKey, METADATA, Context);
            NR.defineMetadata(objectKey, METADATA, Context);
            const symbolMd = R.getOwnMetadata(symbolKey, Context);
            const stringMd = R.getOwnMetadata(stringKey, Context);
            const numberMd = R.getOwnMetadata(numberKey, Context);
            const objectMd = R.getOwnMetadata(objectKey, Context);
            (0, chai_1.expect)(symbolMd).to.be.eq(METADATA);
            (0, chai_1.expect)(stringMd).to.be.eq(METADATA);
            (0, chai_1.expect)(numberMd).to.be.eq(METADATA);
            (0, chai_1.expect)(objectMd).to.be.eq(METADATA);
        });
        it('allows to get metadata by the MetadataKey', () => {
            class Context {
            }
            const key = new src_2.MetadataKey('key');
            NR.defineMetadata(key, METADATA, Context);
            const metadata = R.getOwnMetadata(key, Context);
            (0, chai_1.expect)(metadata).to.be.eq(METADATA);
        });
        it('can distinguish instances of the MetadataKey', () => {
            class TestClass {
            }
            const metadata1 = 'metadata-1';
            const metadata2 = 'metadata-2';
            const key1 = new src_2.MetadataKey('key');
            const key2 = new src_2.MetadataKey('key');
            NR.defineMetadata(key1, metadata1, TestClass);
            NR.defineMetadata(key2, metadata2, TestClass);
            const result1 = R.getOwnMetadata(key1, TestClass);
            const result2 = R.getOwnMetadata(key2, TestClass);
            (0, chai_1.expect)(result1).to.be.eql(metadata1);
            (0, chai_1.expect)(result2).to.be.eql(metadata2);
            (0, chai_1.expect)(result1).to.be.not.eq(result2);
        });
        it('returns class metadata', () => {
            class Context {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, Context);
            const result = R.getOwnMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns prototype metadata', () => {
            class Context {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype);
            const result = R.getOwnMetadata(METADATA_KEY, Context.prototype);
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns metadata of a class property', () => {
            class Context {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, Context, 'prop');
            const result = R.getOwnMetadata(METADATA_KEY, Context, 'prop');
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('returns metadata of a prototype property', () => {
            class Context {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, Context.prototype, 'prop');
            const result = R.getOwnMetadata(METADATA_KEY, Context.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.eql(METADATA);
        });
        it('does not returns parent metadata from a class', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
            const result = R.getOwnMetadata(METADATA_KEY, ContextB);
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns parent metadata from a prototype', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype);
            const result = R.getOwnMetadata(METADATA_KEY, ContextB.prototype);
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns parent metadata from a class property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA, 'prop');
            const result = R.getOwnMetadata(METADATA_KEY, ContextB, 'prop');
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns parent metadata from a prototype property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextA.prototype, 'prop');
            const result = R.getOwnMetadata(METADATA_KEY, ContextB.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns child metadata from a class', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
            const result = R.getOwnMetadata(METADATA_KEY, ContextA);
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns child metadata from a prototype', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype);
            const result = R.getOwnMetadata(METADATA_KEY, ContextA.prototype);
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns child metadata from a class property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB, 'prop');
            const result = R.getOwnMetadata(METADATA_KEY, ContextA, 'prop');
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('does not returns child metadata from a prototype property', () => {
            class ContextA {
            }
            class ContextB extends ContextA {
            }
            NR.defineMetadata(METADATA_KEY, METADATA, ContextB.prototype, 'prop');
            const result = R.getOwnMetadata(METADATA_KEY, ContextA.prototype, 'prop');
            (0, chai_1.expect)(result).to.be.undefined;
        });
        it('returns undefined if no metadata', () => {
            class Context {
            }
            const result = R.getOwnMetadata(METADATA_KEY, Context);
            (0, chai_1.expect)(result).to.be.undefined;
        });
    });
});
