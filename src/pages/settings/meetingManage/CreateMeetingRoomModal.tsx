import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect } from "react";
import { MeetingApi } from "@/service/meeting-service";

interface CreateMeetingRoomModalProps {
  isUpdate: any;
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

  const handleOk = useCallback(
    async function () {
      await form.validateFields();
      const values = form.getFieldsValue();

      values.description = values.description || "";
      values.equipment = values.equipment || "";

      if (props.isUpdate?.id) {
        await MeetingApi.update(props.isUpdate.id, values);
      } else {
        await MeetingApi.create(values);
      }
      props.handleClose();
    },
    [props.isOpen],
  );
  useEffect(() => {
    if (typeof props.isUpdate === "object") {
      form.setFieldValue("name", props.isUpdate.name);
      form.setFieldValue("location", props.isUpdate.location);
      form.setFieldValue("capacity", props.isUpdate.capacity);
      form.setFieldValue("equipment", props.isUpdate.equipment);
      form.setFieldValue("description", props.isUpdate.description);
    } else {
      form.resetFields();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={(props.isUpdate ? "更新" : "添加") + "会议室"}
      open={props.isOpen}
      onOk={handleOk}
      cancelText={"取消"}
      onCancel={() => props.handleClose()}
      okText={"创建"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="会议室名称"
          name="name"
          rules={[{ required: true, message: "请输入会议室名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="位置"
          name="location"
          rules={[{ required: true, message: "请输入会议室位置!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="容纳人数"
          name="capacity"
          rules={[{ required: true, message: "请输入会议室容量!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="设备"
          name="equipment"
          rules={[{ required: true, message: "请输入设备!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: "请输入描述!" }]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
