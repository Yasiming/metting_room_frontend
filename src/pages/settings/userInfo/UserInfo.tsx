import { UserApi, UpdateUserDto } from "@/service/user-service";
import { EmailApi } from "@/service/email-service";
import { UploadApi } from "@/service/upload-service";
import { ContentFlex } from "./style";
import {
  Button,
  Form,
  GetProp,
  Input,
  Upload,
  UploadProps,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { history } from "umi";
import ContentCard from "@/components/contentCard/ContentCard";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { updateUserInfo } from "@/store/userSlice";
import env from "@/config/env";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const beforeUpload = (file: FileType) => {
  console.log(file);

  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/gif";
  if (!isJpgOrPng) {
    message.error("只能上传JPG/PNG文件!");
  }
  const isLt2M = file.size / 1024 / 1024 < 4;
  console.log(file.size / 1024 / 1024);

  if (!isLt2M) {
    message.error("图片大小必须小于4MB!");
  }
  return isJpgOrPng && isLt2M;
};

const layout1 = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
function UserInfo() {
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [time, setTime] = useState(10);
  const [isShowCode, setIsShowCode] = useState<boolean>(false);

  const sendEmail = async () => {
    setTime(120);
    setIsShowCode(true);
    await EmailApi.updateUserCaptcha();
    message.success("验证码发送成功！");
  };

  // 验证码
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

  // 更新用户信息
  const updateStore = () => {
    UserApi.getUserInfo().then((res) => {
      dispatch(updateUserInfo({ userInfo: res.data }));
    });
  };
  useEffect(() => {
    updateStore();
  }, []);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </button>
  );

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      userInfo.headPic = info.file.response.data;
      setLoading(false);
    } else {
      message.error("上传失败，请稍后尝试");
      setLoading(false);
    }
  };

  const onFinish = async (values: UpdateUserDto) => {
    values.headPic = userInfo.headPic;
    await UserApi.updateUserInfo(values);
    updateStore();
    message.success("更新成功");
    form.resetFields(["captcha"]);
  };

  return (
    <ContentCard title="个人信息">
      <ContentFlex>
        <Form
          className="user-form"
          {...layout1}
          form={form}
          onFinish={onFinish}
          colon={false}
          autoComplete="off"
        >
          <Form.Item
            label="昵称"
            name="nickName"
            initialValue={userInfo.nickName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: "请输入邮箱!" },
              { type: "email", message: "请输入合法邮箱地址!" },
            ]}
            initialValue={userInfo.email}
          >
            <Input disabled />
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
          <Form.Item label wrapperCol={{ span: 24 }}>
            <Button className="btn" type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
        <div className="upload-avatar">
          <Upload
            name="file"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action={UploadApi.uploadAvatar()}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {userInfo.headPic ? (
              <img
                src={env.server_host + userInfo.headPic}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </ContentFlex>
    </ContentCard>
  );
}

export default UserInfo;
