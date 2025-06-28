
import React from 'react';
import { useTheme } from './ThemeProvider';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

export default function Tables() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">User Table</h2>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <table className="w-full mt-4 text-left border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}