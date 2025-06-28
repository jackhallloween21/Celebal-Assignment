import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Kanban from "./Kanban";
import CalendarPage from "./CalendarPage";
import Tables from "./Tables";
import ThemeProvider from "./ThemeProvider";

import './theme.css';

export default function AdminDashboardApp() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
          {/* Sidebar should be sticky/fixed for proper navbar positioning */}
          <div className="sticky top-0 h-screen z-20">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Header should be sticky at the top */}
            <div className="sticky top-0 z-10">
              <Header />
            </div>
            <main className="p-6 flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/tables" element={<Tables />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}
