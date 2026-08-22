import { uploadRequest } from '../client';

export const uploadApi = {
  // Upload Single Image
  uploadSingleImage: (formData: FormData) =>
    uploadRequest('/upload', formData),

  // Upload Multiple Images
  uploadMultipleImages: (formData: FormData) =>
    uploadRequest('/upload/multiple', formData),
};
