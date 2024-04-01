import { getUserInfo } from "@/utils";
import { Navigate, Outlet } from "umi";
import { useAppSelector } from "@/hooks/useAppStore";

export default () => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
function useAuth() {
  const userInfo = useAppSelector((state) => state.user);
  if (userInfo && userInfo.accessToken) {
    return { isLogin: true };
  }
  return { isLogin: false };
}
