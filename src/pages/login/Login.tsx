import { UserApi, LoginUser } from "@/service/user-service";
import { LoginPage, Title } from "./style";
import { Button, Form, Input, message } from "antd";
import { Link, history } from "umi";
import { useAppDispatch } from "@/hooks/useAppStore";
import { updateUserInfo, initUserInfo } from "@/store/userSlice";
import { useEffect } from "react";

function Login() {
  const layout1 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  console.log("pro", process.env);
  const { UMI_ENV = "" } = process.env;
  console.log("UMI_ENV", UMI_ENV);

  useEffect(() => {
    dispatch(initUserInfo());
  }, []);

  const dispatch = useAppDispatch();

  const onFinish = async (values: LoginUser) => {
    const res = await UserApi.login(values);
    console.log("res", res);

    dispatch(updateUserInfo(res.data));
    message.success("登录成功");
    history.replace("/");
  };

  return (
    <LoginPage>
      <Title>会议室预定系统</Title>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入最少6位密码!", min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="link">
            <Link to="/register">创建账号</Link>
            <Link to="/edit-password">忘记密码</Link>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </LoginPage>
  );
}

export default Login;
