import ContentCard from "@/components/contentCard/ContentCard";
import { useAppSelector } from "@/hooks/useAppStore";
import { BookingApi, BookingResult } from "@/service/booking-service";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "umi";
import { CreateMeetingRoomModal } from "./CreateBookingModal";

function BookingDetails() {
  const [searchParams] = useSearchParams();
  const [detailsList, setDetailsList] = useState<BookingResult[]>([]);
  const { userInfo } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const columns: ColumnsType<BookingResult> = [
    {
      title: "会议开始时间",
      dataIndex: "startTime",
    },
    {
      title: "会议结束时间",
      dataIndex: "endTime",
    },
    {
      title: "申请状态",
      dataIndex: "status",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
    },
    {
      title: "申请人",
      render: (_, record) => <Tag>{record.user.nickName}</Tag>,
    },
    {
      title: "联系方式",
      render: (_, record) => <Tag>{record.user.email}</Tag>,
    },
    {
      title: "操作",
      render: (_, record) => (
        <div>
          {userInfo.isAdmin ? (
            <div>
              {record.status !== "审批通过" ? (
                <Popconfirm
                  title="提示"
                  description="是否通过?"
                  onConfirm={() => op(record.id, "apply")}
                  okText="是"
                  cancelText="否"
                >
                  <Button type="text" style={{ color: "#3c8dbc" }}>
                    通过
                  </Button>
                </Popconfirm>
              ) : (
                ""
              )}

              {record.status !== "审批驳回" ? (
                <Popconfirm
                  title="提示"
                  description="是否驳回?"
                  onConfirm={() => op(record.id, "reject")}
                  okText="是"
                  cancelText="否"
                >
                  <Button danger type="text">
                    驳回
                  </Button>
                </Popconfirm>
              ) : (
                ""
              )}
            </div>
          ) : userInfo.id === record.user.id ? (
            <Popconfirm
              title="提示"
              description="是否撤销?"
              onConfirm={() => op(record.id, "unbind")}
              okText="是"
              cancelText="否"
            >
              <Button danger type="text">
                撤销预定
              </Button>
            </Popconfirm>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  const op = async (id: number, type: "apply" | "reject" | "unbind") => {
    if (type === "apply") {
      const res = await BookingApi.apply({ id });
      message.success(res.data);
    } else if (type === "reject") {
      const res = await BookingApi.reject({ id });
      message.success(res.data);
    } else if (type === "unbind") {
      const res = await BookingApi.unbind({ id });
      message.success(res.data);
    }
    getDetails();
  };

  const getDetails = async () => {
    const res = await BookingApi.getDetails({ id: searchParams.get("id")! });
    setDetailsList(
      res.data.map((item) => {
        return {
          key: item.id,
          ...item,
        };
      }),
    );
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <ContentCard title="预约详情">
      <div>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => setIsOpen(true)}
        >
          预约
        </Button>
        <Table key="id" columns={columns} dataSource={detailsList} />
      </div>
      <CreateMeetingRoomModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          getDetails();
        }}
      />
    </ContentCard>
  );
}

export default BookingDetails;
