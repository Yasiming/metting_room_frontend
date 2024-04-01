import ContentCard from "@/components/contentCard/ContentCard";
import {
  MeetingApi,
  SearchMeetingRoom,
  MeetingRoomSearchResult,
} from "@/service/meeting-service";
import { Button, Form, Input, Table, Image, Badge, Popconfirm } from "antd";
import { useEffect, useMemo, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { CreateMeetingRoomModal } from "@/pages/settings/meetingManage/CreateMeetingRoomModal";

function UserManage() {
  const [roomResult, setRoomResult] = useState<MeetingRoomSearchResult[]>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState<any>({});

  const columns: ColumnsType<MeetingRoomSearchResult> = useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "容纳人数",
        dataIndex: "capacity",
      },
      {
        title: "位置",
        dataIndex: "location",
      },
      {
        title: "设备",
        dataIndex: "equipment",
      },
      {
        title: "描述",
        dataIndex: "description",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
      },
      {
        title: "上次更新时间",
        dataIndex: "updateTime",
      },
      {
        title: "预定状态",
        dataIndex: "isBooked",
        render: (_, record) =>
          record.isBooked ? (
            <Badge status="error">已被预订</Badge>
          ) : (
            <Badge status="success">可预定</Badge>
          ),
      },
      {
        title: "操作",
        render: (_, record) => (
          <div>
            <Button
              type="text"
              onClick={() => {
                setIsUpdate(record);
                setIsCreateModalOpen(true);
              }}
            >
              更新
            </Button>
            <Popconfirm
              title="提示"
              description="是否删除?"
              onConfirm={() => DeleteRoom(record.id)}
              okText="是"
              cancelText="否"
            >
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [],
  );

  const SearchRoom = async (values: SearchMeetingRoom) => {
    const res = await MeetingApi.list(values);
    if (res.code === 200) {
      setRoomResult(
        res.data.list.map((item) => {
          return {
            key: item.id,
            ...item,
          };
        }),
      );
    }
  };

  const DeleteRoom = async (id: number) => {
    await MeetingApi.delete(id);
    initSearch();
  };

  const initSearch = () => {
    SearchRoom({
      name: form.getFieldValue("name"),
      equipment: form.getFieldValue("equipment"),
      capacity: form.getFieldValue("capacity"),
    });
  };

  const [form] = Form.useForm();
  useEffect(() => {
    initSearch();
  }, []);

  return (
    <div>
      <ContentCard title="会议室管理">
        <div style={{ marginBottom: "20px" }}>
          <Form
            form={form}
            name="search"
            layout="inline"
            colon={false}
            onFinish={SearchRoom}
          >
            <Form.Item label="会议室名称" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="容纳人数" name="capacity">
              <Input />
            </Form.Item>

            <Form.Item label="位置" name="location">
              <Input />
            </Form.Item>

            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "20px" }}
              >
                搜索会议室
              </Button>
              <Button
                type="primary"
                style={{ background: "green" }}
                onClick={() => {
                  setIsUpdate(false);
                  setIsCreateModalOpen(true);
                }}
              >
                添加会议室
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table columns={columns} dataSource={roomResult} />
        <CreateMeetingRoomModal
          isUpdate={isUpdate}
          isOpen={isCreateModalOpen}
          handleClose={() => {
            setIsCreateModalOpen(false);
            initSearch();
          }}
        />
      </ContentCard>
    </div>
  );
}

export default UserManage;
