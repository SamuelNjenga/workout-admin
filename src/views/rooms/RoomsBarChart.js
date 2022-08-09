import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useRooms } from "../../contexts/RoomContext";

const RoomsBarChart = () => {
  const { rooms } = useRooms();

  return (
    <BarChart
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
      <Bar dataKey="size" fill="#8884d8" />
    </BarChart>
  );
};

export default RoomsBarChart;
