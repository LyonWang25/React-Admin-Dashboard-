import React, { useState } from "react";
import { Badge, Card, List, Skeleton as AntdSkeleton } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { Text } from "../text";
import dayjs from "dayjs";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { getDate } from "@/utilities/helpers";
import { useList } from "@refinedev/core";
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries";

const UpcomingEnevts = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading } = useList({
    resource: "events",
    pagination:{pageSize: 5},
    sorters:[
      {
        field: "startDate",
        order: "asc"
      }
    ],
    filters:[
      {
        field: "startDate",
        operator: "gte",
        value: dayjs().format("YYYY-MM-DD")
      }
    ],
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY
    }
  })

  
const NoEvent = () => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "220px",
    }}
  >
    No Upcoming Event
  </span>
);

  return (
    <Card
      style={{
        height: "100%",
      }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{
        padding: "0 1rem",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: ".7rem" }}>
            Upcoming events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item) => {
            const renderDate = getDate(item.start, item.endDate);
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{renderDate}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong>
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
      {!isLoading && data?.data.length === 0 && <NoEvent />}
    </Card>
  );
};


export default UpcomingEnevts;
