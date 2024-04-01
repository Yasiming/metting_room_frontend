import request from "@/utils/request";

class MeetingService {
  create(data: CreateMeetingRoomDto) {
    return request.post("/meeting-room", data);
  }
  list(params?: SearchMeetingRoom) {
    return request.get<{ list: MeetingRoomSearchResult[]; totalCount: number }>(
      "/meeting-room/list",
      {
        params,
      },
    );
  }

  delete(id: number) {
    return request.delete(`/meeting-room/${id}`);
  }

  update(id: number, data: CreateMeetingRoomDto) {
    return request.put("/meeting-room/update", {
      id,
      ...data,
    });
  }
}
export interface SearchMeetingRoom {
  name: string;
  capacity: number;
  equipment: string;
}

export interface MeetingRoomSearchResult {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
  isBooked: boolean;
  createTime: Date;
  updateTime: Date;
}

export interface CreateMeetingRoomDto {
  name: string;

  capacity: number;

  location: string;

  equipment: string;

  description: string;
}

export const MeetingApi = new MeetingService();
