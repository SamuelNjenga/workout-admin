import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { usePayments } from "src/contexts/PaymentContext";

const MemberPaymentsLineChart = () => {
  const { memberPayments } = usePayments();

  return (
    <LineChart
      width={500}
      height={300}
      data={memberPayments}
      layout="horizontal"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="memberId" />
      <YAxis dataKey="total_amount" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="total_amount"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="memberId" stroke="#82ca9d" />
    </LineChart>
  );
};

export default MemberPaymentsLineChart;
