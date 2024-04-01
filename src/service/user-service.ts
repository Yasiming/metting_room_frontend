import request from "@/utils/request";
class UserService {
  login(data: LoginUser) {
    return request.post<LoginUserVo>("/user/login", data);
  }

  register(data: RegisterUser) {
    return request.post("/user/register", data);
  }

  editPassword(data: UpdateUserPassword) {
    return request.post("/user/update_password", data);
  }

  updateUserInfo(data: UpdateUserDto) {
    return request.post("/user/update", data);
  }

  getUserInfo() {
    return request.get<UserInfo>("/user/info");
  }

  refreshToken(params: { refreshToken: string }) {
    return request.get("/user/refresh", {
      params,
    });
  }

  freeze(params: { id: number }) {
    return request.get("/user/freeze", {
      params,
    });
  }

  list(params: {
    username: string;
    nickName: string;
    email: string;
    pageNo: number;
    pageSize: number;
  }) {
    return request.get("/user/list", {
      params,
    });
  }
}

export const UserApi = new UserService();

export interface LoginUser {
  username: string;
  password: string;
}
interface UserInfo {
  id: number;

  username: string;

  nickName: string;

  email: string;

  headPic: string;

  phoneNumber: string;

  isFrozen: boolean;

  isAdmin: boolean;

  createTime: number;

  roles: string[];

  permissions: {
    code: string;
  }[];
}
export interface LoginUserVo {
  userInfo: UserInfo;

  accessToken: string;

  refreshToken: string;
}
export interface RegisterUser {
  username: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  email: string;
  captcha: string;
}
export interface UpdateUserPassword {
  username: string;

  password: string;

  confirmPassword: string;

  email: string;

  captcha: string;
}
export interface UpdateUserDto {
  headPic: string;

  nickName: string;

  email: string;

  captcha: string;
}
