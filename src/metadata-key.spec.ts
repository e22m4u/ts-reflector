import {expect} from 'chai';
import {MetadataKey} from '../src';

describe('MetadataKey', () => {
  describe('toString', () => {
    it('returns a string representation', () => {
      const key1 = new MetadataKey();
      expect(String(key1)).to.be.eq('MetadataKey');
      const key2 = new MetadataKey('key');
      expect(String(key2)).to.be.eq('MetadataKey(key)');
    });
  });
});
