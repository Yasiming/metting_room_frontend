import request from "@/utils/request";

class BookingDetails {
  create(data: BookingCreate) {
    return request.post("/booking", data);
  }

  getDetails(params: { id: string }) {
    return request.get<BookingResult[]>("/booking/detail", {
      params,
    });
  }

  apply(params: { id: number }) {
    return request.get("/booking/apply", {
      params,
    });
  }

  reject(params: { id: number }) {
    return request.get("/booking/reject", {
      params,
    });
  }
  unbind(params: { id: number }) {
    return request.get("/booking/unbind", {
      params,
    });
  }
}

export interface BookingCreate {
  meetingRoomId: number;
  startTime: string;
  endTime: string;
  note: string;
}

export interface BookingResult {
  id: number;

  startTime: Date;

  endTime: Date;

  status: string;

  note: string;

  createTime: Date;

  updateTime: Date;

  user: Record<string, any>;
}

export const BookingApi = new BookingDetails();
