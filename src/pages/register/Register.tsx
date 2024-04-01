import { UserApi, RegisterUser } from "@/service/user-service";
import { EmailApi } from "@/service/email-service";
import { RegisterPage, Title } from "./style";
import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { Link, history } from "umi";

function Register() {
  const [form] = Form.useForm();
  const [time, setTime] = useState(10);
  const [isShowCode, setIsShowCode] = useState<boolean>(false);
  const layout1 = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const onFinish = async (values: RegisterUser) => {
    if (values.password !== values.confirmPassword) {
      return message.error("两次密码不一致");
    }
    await UserApi.register(values);
    message.success("注册成功");
    history.push("/login");
  };

  const sendEmail = async () => {
    const address = form.getFieldValue("email");
    await form.validateFields(["email"]);
    await EmailApi.registerCaptcha({ address });
    setTime(120);
    setIsShowCode(true);
    message.success("验证码发送成功！");
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (time > 1 && isShowCode) {
        setTime(time - 1);
      } else {
        setIsShowCode(false);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time, isShowCode]);

  return (
    <RegisterPage>
      <Title>会议室预定系统</Title>
      <Form
        {...layout1}
        form={form}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: "请输入昵称!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{ required: true, message: "请输入确认密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱!" },
            { type: "email", message: "请输入合法邮箱地址!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="验证码"
          name="captcha"
          rules={[{ required: true, message: "请输入验证码!" }]}
        >
          <div className="captcha">
            <Input />

            <Button type="primary" onClick={sendEmail} disabled={isShowCode}>
              {isShowCode ? `${time}秒后重新获取` : "发送验证码"}
            </Button>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="link">
            已有账号？去<Link to="/login">登录</Link>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button className="btn" type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </RegisterPage>
  );
}

export default Register;
