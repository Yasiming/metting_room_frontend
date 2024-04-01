import request from "@/utils/request";

class UploadService {
  uploadAvatar() {
    return "http://localhost:3000/upload/image";
  }
}

export const UploadApi = new UploadService();
