import request from "@/utils/request";

class EmailService {
  registerCaptcha(params: { address: string }) {
    return request.get("/email/register-captcha", {
      params,
    });
  }
  updateUserCaptcha() {
    return request.get("/email/update-user-captcha");
  }
  updatePasswordCaptcha(params: { address: string }) {
    return request.get("/email/update_password/captcha", {
      params,
    });
  }
}

export const EmailApi = new EmailService();
