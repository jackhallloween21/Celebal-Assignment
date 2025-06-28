import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <nav className="p-4 space-y-2">
        <Link to="/" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Dashboard</Link>
        <Link to="/kanban" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Kanban</Link>
        <Link to="/calendar" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Calendar</Link>
        <Link to="/tables" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Tables</Link>
      </nav>
    </aside>
  );
}



