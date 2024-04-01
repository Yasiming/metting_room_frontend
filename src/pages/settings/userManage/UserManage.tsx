import ContentCard from "@/components/contentCard/ContentCard";
import { UserApi } from "@/service/user-service";
import { Button, Form, Input, Table, Image, Badge } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import env from "@/config/env";

interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

interface UserSearchResult {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  createTime: Date;
  isFrozen: boolean;
}

function UserManage() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userResult, setUserResult] = useState<UserSearchResult[]>();
  const [total, setTotal] = useState(0);

  const columns: ColumnsType<UserSearchResult> = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "头像",
      dataIndex: "headPic",
      render: (value) => {
        return value ? (
          <Image width={50} src={`${env.server_host}${value}`} />
        ) : (
          ""
        );
      },
    },
    {
      title: "昵称",
      dataIndex: "nickName",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
    },
    {
      title: "状态",
      dataIndex: "isFrozen",
      render: (_, record) =>
        record.isFrozen ? <Badge status="success">已冻结</Badge> : "",
    },
    {
      title: "操作",
      render: (_, record) => (
        <a
          onClick={async (e) => {
            e.preventDefault();
            await UserApi.freeze({ id: record.id });
            searchUser({ username: "", nickName: "", email: "" });
          }}
        >
          冻结
        </a>
      ),
    },
  ];

  const searchUser = useCallback(
    async (values: SearchUser) => {
      const res = await UserApi.list({ ...values, pageNo, pageSize });
      if (res.code === 200) {
        setTotal(res.data.totalCount);
        setUserResult(
          res.data.list.map((item: UserSearchResult) => {
            return {
              key: item.username,
              ...item,
            };
          }),
        );
      }
    },
    [pageNo, pageSize],
  );

  const changePage = useCallback(
    function (pageNo: number, pageSize: number) {
      setPageNo(pageNo);
      setPageSize(pageSize);
    },
    [pageNo, pageSize],
  );

  const [form] = Form.useForm();
  useEffect(() => {
    searchUser({
      username: form.getFieldValue("username"),
      email: form.getFieldValue("email"),
      nickName: form.getFieldValue("nickName"),
    });
  }, [pageNo, pageSize]);

  return (
    <div>
      <ContentCard title="用户管理">
        <div style={{ marginBottom: "20px" }}>
          <Form
            form={form}
            onFinish={searchUser}
            name="search"
            layout="inline"
            colon={false}
          >
            <Form.Item label="用户名" name="username">
              <Input />
            </Form.Item>

            <Form.Item label="昵称" name="nickName">
              <Input />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ type: "email", message: "请输入合法邮箱地址!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                搜索用户
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={columns}
          dataSource={userResult}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            total,
            onChange: changePage,
          }}
        />
      </ContentCard>
    </div>
  );
}

export default UserManage;
