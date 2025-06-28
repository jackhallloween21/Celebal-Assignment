import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
];

export default function Dashboard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">User Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

