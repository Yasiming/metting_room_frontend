import request from "@/utils/request";
export interface UserBookingData {
  userId: string;
  username: string;
  bookingCount: string;
}
export interface MeetingRoomUsedData {
  meetingRoomName: string;
  meetingRoomId: number;
  usedCount: string;
}

class StatisticService {
  userBookingCount() {
    return request.get("/statistic/userBookingCount");
  }
  meetingRoomUsedCount() {
    return request.get("/statistic/meetingRoomUsedCount");
  }
}

export const StatisticApi = new StatisticService();
