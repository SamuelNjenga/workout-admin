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

import { useUsers } from "src/contexts/UserContext";

const UsersBarChart = () => {
  const { userCategories } = useUsers();

  return (
    <BarChart
      width={500}
      height={300}
      data={userCategories}
      layout="horizontal"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Role.roleName" />
      <YAxis dataKey="total_count" />
      <Tooltip />
      <Legend />
      <Bar dataKey="total_count" fill="#8884d8" />
    </BarChart>
  );
};

export default UsersBarChart;
