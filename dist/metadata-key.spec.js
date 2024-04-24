"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
describe('MetadataKey', () => {
    describe('toString', () => {
        it('returns a string representation', () => {
            const key1 = new src_1.MetadataKey();
            (0, chai_1.expect)(String(key1)).to.be.eq('MetadataKey');
            const key2 = new src_1.MetadataKey('key');
            (0, chai_1.expect)(String(key2)).to.be.eq('MetadataKey(key)');
        });
    });
});
