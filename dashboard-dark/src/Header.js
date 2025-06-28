import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/kanban", label: "Kanban" },
    { to: "/calendar", label: "Calendar" },
    { to: "/tables", label: "Tables" }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-8 py-4 flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
        <nav className="flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700 hover:text-indigo-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="bg-indigo-500 text-white px-3 py-1 rounded shadow"
        >
          Toggle Theme
        </button>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
    </header>
  );
}