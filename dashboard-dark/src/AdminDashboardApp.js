import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import CalendarPage from "./pages/CalendarPage";
import Tables from "./pages/Tables";
import ThemeProvider from "./context/ThemeProvider";

export default function AdminDashboardApp() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 flex-1 overflow-auto">
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