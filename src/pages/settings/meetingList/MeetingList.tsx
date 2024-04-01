import ContentCard from "@/components/contentCard/ContentCard";
import { MeetingApi, MeetingRoomSearchResult } from "@/service/meeting-service";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { CardDiv, Title } from "./style";
import { history } from "umi";

function MeetingList() {
  const [meetRoomList, setMeetRoomList] = useState<MeetingRoomSearchResult[]>(
    [],
  );

  const getMeetingRomm = async () => {
    const res = await MeetingApi.list();
    setMeetRoomList(res.data.list);
    console.log(res);
  };

  useEffect(() => {
    getMeetingRomm();
  }, []);

  return (
    <ContentCard title="会议室">
      <CardDiv>
        {meetRoomList.map((item) => {
          return (
            <Card className="card-content" key={item.id}>
              <Title>{item.name}</Title>
              <div>位置：{item.location}</div>
              <div>可容纳：{item.capacity}人</div>
              <div>设备: {item.equipment ? item.equipment : "无"}</div>
              <button
                className="bookings"
                onClick={() => {
                  history.push(`/booking-details?id=${item.id}`);
                }}
              >
                详情
              </button>
            </Card>
          );
        })}
      </CardDiv>
    </ContentCard>
  );
}

export default MeetingList;
