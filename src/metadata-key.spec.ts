import {expect} from 'chai';
import {MetadataKey} from './metadata-key.js';

describe('MetadataKey', function () {
  describe('toString', function () {
    it('returns a string representation', function () {
      const key1 = new MetadataKey();
      expect(String(key1)).to.be.eq('MetadataKey');
      const key2 = new MetadataKey('key');
      expect(String(key2)).to.be.eq('MetadataKey(key)');
    });
  });
});
