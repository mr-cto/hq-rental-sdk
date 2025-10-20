import client from '../../client';

export interface FileItem {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  url: string;
  category?: string;
  description?: string;
  uploaded_by?: string;
  uploaded_at: string;
  metadata?: Record<string, any>;
}

export interface UploadFilePayload {
  file: File | Blob;
  filename?: string;
  category?: string;
  description?: string;
  metadata?: Record<string, any>;
}

// Files Management
export const listFiles = async (params?: Record<string, any>): Promise<FileItem[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<FileItem[]>(`/files${query}`);
};

export const uploadFile = async (payload: UploadFilePayload): Promise<FileItem> => {
  const formData = new FormData();
  formData.append('file', payload.file);
  
  if (payload.filename) formData.append('filename', payload.filename);
  if (payload.category) formData.append('category', payload.category);
  if (payload.description) formData.append('description', payload.description);
  if (payload.metadata) formData.append('metadata', JSON.stringify(payload.metadata));
  
  return client.post<FileItem>('/files', formData);
};

export const deleteFile = async (fileId: string): Promise<void> =>
  client.delete<void>(`/files/${fileId}`);

export default {
  listFiles,
  uploadFile,
  deleteFile,
};