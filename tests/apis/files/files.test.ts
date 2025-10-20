import * as filesAPI from '../../../src/apis/files';
import type { FileItem, UploadFilePayload } from '../../../src/apis/files';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = require('../../../src/client');

describe('Files API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('File Management', () => {
    describe('listFiles', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockFiles: FileItem[] = [
          {
            id: 'file-1',
            filename: 'doc_abc123.pdf',
            original_name: 'rental_agreement.pdf',
            mime_type: 'application/pdf',
            size: 2048576,
            url: 'https://storage.example.com/files/doc_abc123.pdf',
            category: 'agreements',
            description: 'Rental agreement document',
            uploaded_by: 'user-1',
            uploaded_at: '2024-01-01T00:00:00Z',
            metadata: { pages: 5, signed: false },
          },
          {
            id: 'file-2',
            filename: 'img_def456.jpg',
            original_name: 'vehicle_damage.jpg',
            mime_type: 'image/jpeg',
            size: 1048576,
            url: 'https://storage.example.com/files/img_def456.jpg',
            category: 'vehicle_photos',
            uploaded_at: '2024-01-01T00:00:00Z',
          },
        ];
        mockClient.get.mockResolvedValue(mockFiles);

        const result = await filesAPI.listFiles();

        expect(mockClient.get).toHaveBeenCalledWith('/files');
        expect(result).toEqual(mockFiles);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { category: 'agreements', mime_type: 'application/pdf' };
        mockClient.get.mockResolvedValue([]);

        await filesAPI.listFiles(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/files?category=agreements&mime_type=application%2Fpdf',
        );
      });

      it('should handle empty params object', async () => {
        mockClient.get.mockResolvedValue([]);

        await filesAPI.listFiles({});

        expect(mockClient.get).toHaveBeenCalledWith('/files?');
      });

      it('should handle complex query parameters', async () => {
        const params = {
          category: 'vehicle_photos',
          uploaded_after: '2024-01-01',
          size_min: '1000',
          size_max: '5000000',
        };
        mockClient.get.mockResolvedValue([]);

        await filesAPI.listFiles(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/files?category=vehicle_photos&uploaded_after=2024-01-01&size_min=1000&size_max=5000000',
        );
      });
    });

    describe('uploadFile', () => {
      it('should call client.post with FormData and all fields', async () => {
        const fileContent = new Blob(['test content'], { type: 'text/plain' });
        const file = new File([fileContent], 'test.txt', { type: 'text/plain' });

        const payload: UploadFilePayload = {
          file,
          filename: 'custom_name.txt',
          category: 'documents',
          description: 'Test document',
          metadata: { version: '1.0', author: 'test user' },
        };

        const mockResult: FileItem = {
          id: 'file-new',
          filename: 'custom_name.txt',
          original_name: 'test.txt',
          mime_type: 'text/plain',
          size: 12,
          url: 'https://storage.example.com/files/custom_name.txt',
          category: 'documents',
          description: 'Test document',
          uploaded_at: '2024-01-01T00:00:00Z',
          metadata: { version: '1.0', author: 'test user' },
        };

        mockClient.post.mockResolvedValue(mockResult);

        const result = await filesAPI.uploadFile(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/files', expect.any(FormData));
        expect(result).toEqual(mockResult);

        // Verify FormData construction
        const formDataCall = mockClient.post.mock.calls[0][1];
        expect(formDataCall).toBeInstanceOf(FormData);
      });

      it('should handle minimal upload payload with just file', async () => {
        const fileContent = new Blob(['minimal content'], { type: 'text/plain' });
        const file = new File([fileContent], 'minimal.txt', { type: 'text/plain' });

        const payload: UploadFilePayload = { file };

        const mockResult: FileItem = {
          id: 'file-minimal',
          filename: 'minimal.txt',
          original_name: 'minimal.txt',
          mime_type: 'text/plain',
          size: 15,
          url: 'https://storage.example.com/files/minimal.txt',
          uploaded_at: '2024-01-01T00:00:00Z',
        };

        mockClient.post.mockResolvedValue(mockResult);

        const result = await filesAPI.uploadFile(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/files', expect.any(FormData));
        expect(result).toEqual(mockResult);
      });

      it('should handle Blob instead of File', async () => {
        const blob = new Blob(['blob content'], { type: 'application/octet-stream' });

        const payload: UploadFilePayload = {
          file: blob,
          filename: 'blob_file.bin',
          category: 'binary',
        };

        const mockResult: FileItem = {
          id: 'file-blob',
          filename: 'blob_file.bin',
          original_name: 'blob_file.bin',
          mime_type: 'application/octet-stream',
          size: 12,
          url: 'https://storage.example.com/files/blob_file.bin',
          category: 'binary',
          uploaded_at: '2024-01-01T00:00:00Z',
        };

        mockClient.post.mockResolvedValue(mockResult);

        const result = await filesAPI.uploadFile(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/files', expect.any(FormData));
        expect(result).toEqual(mockResult);
      });

      it('should handle complex metadata objects', async () => {
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });

        const payload: UploadFilePayload = {
          file,
          metadata: {
            tags: ['important', 'rental'],
            version: 2.1,
            settings: { public: false, expires: '2024-12-31' },
            nested: { deeply: { nested: { value: true } } },
          },
        };

        mockClient.post.mockResolvedValue({ id: 'file-complex' });

        await filesAPI.uploadFile(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/files', expect.any(FormData));
      });
    });

    describe('deleteFile', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await filesAPI.deleteFile('file-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/files/file-1');
      });

      it('should handle special characters in file ID', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await filesAPI.deleteFile('file@special-123');

        expect(mockClient.delete).toHaveBeenCalledWith('/files/file@special-123');
      });

      it('should handle numeric file IDs as strings', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await filesAPI.deleteFile('12345');

        expect(mockClient.delete).toHaveBeenCalledWith('/files/12345');
      });
    });
  });

  describe('Error Handling', () => {
    it('should propagate errors from list operations', async () => {
      const error = new Error('Failed to list files');
      mockClient.get.mockRejectedValue(error);

      await expect(filesAPI.listFiles()).rejects.toThrow('Failed to list files');
    });

    it('should propagate errors from upload operations', async () => {
      const error = new Error('Upload failed');
      mockClient.post.mockRejectedValue(error);

      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      await expect(filesAPI.uploadFile({ file })).rejects.toThrow('Upload failed');
    });

    it('should propagate errors from delete operations', async () => {
      const error = new Error('Delete failed');
      mockClient.delete.mockRejectedValue(error);

      await expect(filesAPI.deleteFile('file-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty file uploads', async () => {
      const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });
      const payload: UploadFilePayload = { file: emptyFile };

      mockClient.post.mockResolvedValue({ id: 'file-empty', size: 0 });

      const result = await filesAPI.uploadFile(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/files', expect.any(FormData));
      expect(result.id).toBe('file-empty');
      expect(result.size).toBe(0);
    });

    it('should handle files with no extension', async () => {
      const file = new File(['content'], 'README', { type: 'text/plain' });
      const payload: UploadFilePayload = { file };

      mockClient.post.mockResolvedValue({
        id: 'file-no-ext',
        filename: 'README',
        original_name: 'README',
      });

      const result = await filesAPI.uploadFile(payload);

      expect(result.filename).toBe('README');
      expect(result.original_name).toBe('README');
    });

    it('should handle very long filenames', async () => {
      const longName = 'a'.repeat(255) + '.txt';
      const file = new File(['content'], longName, { type: 'text/plain' });
      const payload: UploadFilePayload = { file };

      mockClient.post.mockResolvedValue({
        id: 'file-long',
        filename: 'truncated_filename.txt',
        original_name: longName,
      });

      const result = await filesAPI.uploadFile(payload);

      expect(result.original_name).toBe(longName);
      expect(result.filename).toBe('truncated_filename.txt');
    });

    it('should handle undefined parameters gracefully', async () => {
      mockClient.get.mockResolvedValue([]);

      await filesAPI.listFiles(undefined);
      expect(mockClient.get).toHaveBeenCalledWith('/files');
    });

    it('should handle various MIME types', async () => {
      const testCases = [
        { type: 'image/jpeg', extension: '.jpg' },
        { type: 'application/pdf', extension: '.pdf' },
        { type: 'video/mp4', extension: '.mp4' },
        { type: 'application/json', extension: '.json' },
      ];

      for (const testCase of testCases) {
        const file = new File(['content'], `test${testCase.extension}`, { type: testCase.type });
        const payload: UploadFilePayload = { file };

        mockClient.post.mockResolvedValue({
          id: `file-${testCase.extension.slice(1)}`,
          mime_type: testCase.type,
        });

        const result = await filesAPI.uploadFile(payload);
        expect(result.mime_type).toBe(testCase.type);
      }
    });
  });
});
