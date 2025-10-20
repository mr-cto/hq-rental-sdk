import * as sheetsIndexAPI from '../../../src/apis/sheets/index';

describe('Sheets Index API', () => {
  describe('re-exported functions', () => {
    it('should export listSheets function', () => {
      expect(typeof sheetsIndexAPI.listSheets).toBe('function');
    });

    it('should export listSheetItems function', () => {
      expect(typeof sheetsIndexAPI.listSheetItems).toBe('function');
    });

    it('should export getSheetItem function', () => {
      expect(typeof sheetsIndexAPI.getSheetItem).toBe('function');
    });

    it('should export createSheetItem function', () => {
      expect(typeof sheetsIndexAPI.createSheetItem).toBe('function');
    });

    it('should export updateSheetItem function', () => {
      expect(typeof sheetsIndexAPI.updateSheetItem).toBe('function');
    });
  });

  describe('module exports', () => {
    it('should export sheetItems module', () => {
      expect(sheetsIndexAPI.sheetItems).toBeDefined();
      expect(typeof sheetsIndexAPI.sheetItems).toBe('object');
    });

    it('should export sheets module', () => {
      expect(sheetsIndexAPI.sheets).toBeDefined();
      expect(typeof sheetsIndexAPI.sheets).toBe('object');
    });
  });
});