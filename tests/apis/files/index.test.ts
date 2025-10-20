import * as filesIndexAPI from '../../../src/apis/files/index';

describe('Files Index API', () => {
  describe('re-exported functions', () => {
    it('should export listFiles function', () => {
      expect(typeof filesIndexAPI.listFiles).toBe('function');
    });

    it('should export uploadFile function', () => {
      expect(typeof filesIndexAPI.uploadFile).toBe('function');
    });

    it('should export deleteFile function', () => {
      expect(typeof filesIndexAPI.deleteFile).toBe('function');
    });
  });

  describe('module exports', () => {
    it('should export files module', () => {
      expect(filesIndexAPI.files).toBeDefined();
      expect(typeof filesIndexAPI.files).toBe('object');
    });
  });
});
