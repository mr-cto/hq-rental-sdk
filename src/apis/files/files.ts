import client from '../../client';

export interface FileItem {
  id?: string;
  filename: string;
  original_filename?: string;
  original_name?: string; // Alias for backward compatibility
  mime_type?: string;
  size?: number;
  path?: string;
  url?: string;
  created_at?: string;
  updated_at?: string;
  uploaded_at?: string;
  category?: string;
  description?: string;
  uploaded_by?: string;
  metadata?: any;
}

export interface UploadFilePayload {
  file: File | Blob;
  filename?: string;
  description?: string;
  category?: string;
  metadata?: any;
}

/**
 * Shows a list of files
 */
export const listFiles = async (params?: Record<string, any>): Promise<FileItem[]> => {
  if (params) {
    const query = new URLSearchParams(params).toString();
    return client.get<FileItem[]>(`/files?${query}`);
  }
  return client.get<FileItem[]>('/files');
};

/**
 * upload file
 */
export const uploadFile = async (payload: UploadFilePayload): Promise<FileItem> => {
  const formData = new FormData();
  formData.append('file', payload.file);
  if (payload.filename) {
    formData.append('filename', payload.filename);
  }
  if (payload.description) {
    formData.append('description', payload.description);
  }
  if (payload.category) {
    formData.append('category', payload.category);
  }
  if (payload.metadata) {
    formData.append('metadata', JSON.stringify(payload.metadata));
  }
  return client.post<FileItem>('/files', formData);
};

/**
 * Delete file
 */
export const deleteFile = async (id: string): Promise<void> => client.delete<void>(`/files/${id}`);

export default {
  listFiles,
  uploadFile,
  deleteFile,
};
