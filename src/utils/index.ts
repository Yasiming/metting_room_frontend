import { LoginUserVo } from "@/service/user-service";

export const USERINFO = "USERINFO";
export const getUserInfo = (): LoginUserVo => {
  const str = localStorage.getItem(USERINFO) || "";
  return str ? JSON.parse(str) : null;
};

export const setUserInfo = (data: LoginUserVo) => {
  localStorage.setItem(USERINFO, JSON.stringify(data));
};
