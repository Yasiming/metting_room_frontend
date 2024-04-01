import { Form, Modal, TimePicker, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useCallback } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "@/.umi/exports";
import { BookingApi } from "@/service/booking-service";

interface CreateMeetingRoomModalProps {
  isOpen: boolean;
  handleClose: Function;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
export interface CreateMeetingRoom {
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
}

export function CreateMeetingRoomModal(props: CreateMeetingRoomModalProps) {
  const [form] = useForm();
  const [searchParams] = useSearchParams();

  const handleOk = useCallback(
    async function () {
      await form.validateFields();
      const values = form.getFieldsValue();
      let [startTime, endTime] = values.time;

      const meetingRoomId = searchParams.get("id")!;
      startTime = dayjs(startTime).format("YYYY-MM-DD HH:mm:ss");
      endTime = dayjs(endTime).format("YYYY-MM-DD HH:mm:ss");

      const res = await BookingApi.create({
        meetingRoomId: +meetingRoomId,
        startTime,
        endTime,
        note: values.note,
      });

      if (res.code === 200 || res.code === 201) {
        message.success("创建成功");
        props.handleClose();
      }
    },
    [props.isOpen],
  );

  return (
    <Modal
      title={"预约"}
      open={props.isOpen}
      onOk={handleOk}
      cancelText={"取消"}
      onCancel={() => props.handleClose()}
      okText={"创建"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="开始时间"
          name="time"
          rules={[{ required: true, message: "请输入会议室名称!" }]}
        >
          <TimePicker.RangePicker status="warning" />
        </Form.Item>
        <Form.Item label="申请原因" name="note">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
