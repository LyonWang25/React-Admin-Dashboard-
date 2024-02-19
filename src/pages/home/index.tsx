import { useCustom } from "@refinedev/core";

import { Col, Row } from "antd";

import { DashboardTotalCountsQuery } from "@/graphql/types";
import { DealChart, UpcomingEnevts } from "@/components";

export const Home = () => {
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          DashboardTotalCard
        </Col>
        <Col xs={24} sm={24} xl={8}>
          DashboardTotalCard
        </Col>
        <Col xs={24} sm={24} xl={8}>
          DashboardTotalCard
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={8} style={{ height: "460px" }}>
          <UpcomingEnevts />
        </Col>
        <Col xs={24} sm={24} xl={16} style={{ height: "460px" }}>
          <DealChart />
        </Col>
      </Row>
    </div>
  );
};
