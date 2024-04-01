import ContentCard from "@/components/contentCard/ContentCard";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import {
  StatisticApi,
  UserBookingData,
  MeetingRoomUsedData,
} from "@/service/statistic-service";
import "./style.css";

function Statistic() {
  const [userBookingData, setUserBookingData] =
    useState<Array<UserBookingData>>();
  const [meetingRoomUsedData, setMeetingRoomUsedData] =
    useState<Array<MeetingRoomUsedData>>();

  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  const getStatisticData = async () => {
    const res = await StatisticApi.userBookingCount();
    setUserBookingData(res.data);
    const res2 = await StatisticApi.meetingRoomUsedCount();
    setMeetingRoomUsedData(res2.data);
  };

  useEffect(() => {
    getStatisticData();
  }, []);

  useEffect(() => {
    const myChart = echarts.init(containerRef.current);
    if (!userBookingData) {
      return;
    }
    myChart.setOption({
      title: {
        text: "用户预定情况",
      },
      tooltip: {},
      xAxis: {
        data: userBookingData?.map((item) => item.username),
      },
      yAxis: {},
      series: [
        {
          name: "预定次数",
          type: "pie",
          data: userBookingData?.map((item) => {
            return {
              name: item.username,
              value: item.bookingCount,
            };
          }),
        },
      ],
    });
  }, [userBookingData]);

  useEffect(() => {
    const myChart = echarts.init(containerRef2.current);

    if (!meetingRoomUsedData) {
      return;
    }

    myChart.setOption({
      title: {
        text: "会议室使用情况",
      },
      tooltip: {},
      xAxis: {
        data: meetingRoomUsedData?.map((item) => item.meetingRoomName),
      },
      yAxis: {},
      series: [
        {
          name: "使用次数",
          type: "bar",
          data: meetingRoomUsedData?.map((item) => {
            return {
              name: item.meetingRoomName,
              value: item.usedCount,
            };
          }),
        },
      ],
    });
  }, [meetingRoomUsedData]);

  return (
    <ContentCard title="统计">
      <div id="statistics">
        <div className="statistics-chart" ref={containerRef}></div>
        <div className="statistics-chart" ref={containerRef2}></div>
      </div>
    </ContentCard>
  );
}

export default Statistic;
