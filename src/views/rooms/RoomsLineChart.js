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

import { useRooms } from "../../contexts/RoomContext";

const RoomsLineChart = () => {
  const { rooms } = useRooms();

  return (
    <LineChart
      width={500}
      height={300}
      data={rooms}
      layout="horizontal"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis dataKey="size" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="size"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="label" stroke="#82ca9d" />
    </LineChart>
  );
};

export default RoomsLineChart;
