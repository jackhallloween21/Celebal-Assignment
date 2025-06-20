import './App.css';
import React, { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Settings,
  Bell,
  Moon,
  Sun,
  Menu,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

const AdminDashboard = () => {
  const [theme, setTheme] = useState("dark")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentDate, setCurrentDate] = useState(new Date())

  // Sample data
  const [salesData] = useState([
    { month: "Jan", sales: 4000, revenue: 2400, users: 240 },
    { month: "Feb", sales: 3000, revenue: 1398, users: 221 },
    { month: "Mar", sales: 2000, revenue: 9800, users: 229 },
    { month: "Apr", sales: 2780, revenue: 3908, users: 200 },
    { month: "May", sales: 1890, revenue: 4800, users: 218 },
    { month: "Jun", sales: 2390, revenue: 3800, users: 250 }
  ])

  const [pieData] = useState([
    { name: "Desktop", value: 400, color: "#8884d8" },
    { name: "Mobile", value: 300, color: "#82ca9d" },
    { name: "Tablet", value: 200, color: "#ffc658" },
    { name: "Other", value: 100, color: "#ff7c7c" }
  ])

  const [tableData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      joined: "2024-02-20"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "Inactive",
      joined: "2024-03-10"
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "Active",
      joined: "2024-04-05"
    }
  ])

  const [kanbanData, setKanbanData] = useState({
    todo: [
      {
        id: 1,
        title: "Design new landing page",
        desc: "Create wireframes and mockups",
        priority: "high"
      },
      {
        id: 2,
        title: "Update user documentation",
        desc: "Review and update API docs",
        priority: "medium"
      }
    ],
    progress: [
      {
        id: 3,
        title: "Implement user authentication",
        desc: "Add OAuth integration",
        priority: "high"
      },
      {
        id: 4,
        title: "Database optimization",
        desc: "Improve query performance",
        priority: "low"
      }
    ],
    done: [
      {
        id: 5,
        title: "Setup CI/CD pipeline",
        desc: "Automated testing and deployment",
        priority: "medium"
      },
      {
        id: 6,
        title: "Mobile responsive design",
        desc: "Optimize for mobile devices",
        priority: "high"
      }
    ]
  })

  const [calendarEvents] = useState([
    { date: "2024-06-20", title: "Team Meeting", type: "meeting" },
    { date: "2024-06-22", title: "Product Launch", type: "event" },
    { date: "2024-06-25", title: "Client Presentation", type: "presentation" }
  ])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const themeClasses = {
    dark: {
      bg: "bg-gray-900",
      cardBg: "bg-gray-800",
      text: "text-white",
      textSecondary: "text-gray-300",
      border: "border-gray-700",
      sidebar: "bg-gray-800 border-gray-700",
      input: "bg-gray-700 border-gray-600 text-white"
    },
    light: {
      bg: "bg-gray-50",
      cardBg: "bg-white",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      border: "border-gray-200",
      sidebar: "bg-white border-gray-200",
      input: "bg-white border-gray-300 text-gray-900"
    }
  }

  const t = themeClasses[theme]

  // Calendar functions
  const getDaysInMonth = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = date => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const hasEvent = calendarEvents.some(event => event.date === dateStr)

      days.push(
        <div
          key={day}
          className={`p-2 h-16 border ${
            t.border
          } cursor-pointer hover:bg-blue-50 ${
            theme === "dark" ? "hover:bg-gray-700" : ""
          } relative`}
        >
          <span className={`text-sm ${t.text}`}>{day}</span>
          {hasEvent && (
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
        </div>
      )
    }

    return days
  }

  // Kanban functions
  const moveCard = (cardId, fromColumn, toColumn) => {
    const card = kanbanData[fromColumn].find(c => c.id === cardId)
    if (card) {
      setKanbanData(prev => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter(c => c.id !== cardId),
        [toColumn]: [...prev[toColumn], card]
      }))
    }
  }

  const KanbanCard = ({ card, column }) => (
    <div
      className={`${t.cardBg} p-4 rounded-lg shadow-sm border ${t.border} mb-3 cursor-move hover:shadow-md transition-shadow`}
    >
      <h4 className={`font-medium ${t.text} mb-2`}>{card.title}</h4>
      <p className={`text-sm ${t.textSecondary} mb-3`}>{card.desc}</p>
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded text-xs ${
            card.priority === "high"
              ? "bg-red-100 text-red-800"
              : card.priority === "medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {card.priority}
        </span>
        <div className="flex gap-1">
          {column !== "done" && (
            <button
              onClick={() =>
                moveCard(
                  card.id,
                  column,
                  column === "todo" ? "progress" : "done"
                )
              }
              className="p-1 hover:bg-gray-200 rounded"
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className={`${t.cardBg} p-6 rounded-xl shadow-sm border ${t.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${t.textSecondary}`}>{title}</p>
          <p className={`text-2xl font-bold ${t.text} mt-1`}>{value}</p>
          <p
            className={`text-sm mt-1 ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value="$45,231"
                change={12}
                icon={DollarSign}
                color="bg-green-500"
              />
              <StatCard
                title="Total Users"
                value="1,234"
                change={8}
                icon={Users}
                color="bg-blue-500"
              />
              <StatCard
                title="Total Orders"
                value="456"
                change={-3}
                icon={ShoppingCart}
                color="bg-purple-500"
              />
              <StatCard
                title="Conversion Rate"
                value="3.2%"
                change={5}
                icon={TrendingUp}
                color="bg-orange-500"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`${t.cardBg} p-6 rounded-xl shadow-sm border ${t.border}`}
              >
                <h3 className={`text-lg font-semibold ${t.text} mb-4`}>
                  Sales Overview
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div
                className={`${t.cardBg} p-6 rounded-xl shadow-sm border ${t.border}`}
              >
                <h3 className={`text-lg font-semibold ${t.text} mb-4`}>
                  Traffic Sources
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Chart */}
            <div
              className={`${t.cardBg} p-6 rounded-xl shadow-sm border ${t.border}`}
            >
              <h3 className={`text-lg font-semibold ${t.text} mb-4`}>
                Revenue vs Sales
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                  <Bar dataKey="sales" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )

      case "tables":
        return (
          <div
            className={`${t.cardBg} rounded-xl shadow-sm border ${t.border}`}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className={`text-lg font-semibold ${t.text}`}>
                  User Management
                </h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className={`pl-10 pr-4 py-2 border rounded-lg ${t.input}`}
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={16} />
                    Add User
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${t.textSecondary} uppercase tracking-wider`}
                    >
                      User
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${t.textSecondary} uppercase tracking-wider`}
                    >
                      Role
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${t.textSecondary} uppercase tracking-wider`}
                    >
                      Status
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${t.textSecondary} uppercase tracking-wider`}
                    >
                      Joined
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${t.textSecondary} uppercase tracking-wider`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tableData.map(user => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 hover:bg-opacity-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${t.text}`}>
                              {user.name}
                            </div>
                            <div className={`text-sm ${t.textSecondary}`}>
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "Admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "Editor"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${t.textSecondary}`}
                      >
                        {user.joined}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case "calendar":
        return (
          <div
            className={`${t.cardBg} rounded-xl shadow-sm border ${t.border}`}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className={`text-lg font-semibold ${t.text}`}>
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric"
                  })}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth() - 1
                        )
                      )
                    }
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Today
                  </button>
                  <button
                    onClick={() =>
                      setCurrentDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth() + 1
                        )
                      )
                    }
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 gap-px mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div
                    key={day}
                    className={`p-2 text-center font-medium ${t.textSecondary}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px">{renderCalendar()}</div>

              <div className="mt-6">
                <h4 className={`font-medium ${t.text} mb-3`}>
                  Upcoming Events
                </h4>
                <div className="space-y-2">
                  {calendarEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          event.type === "meeting"
                            ? "bg-blue-500"
                            : event.type === "event"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      ></div>
                      <div>
                        <p className={`font-medium ${t.text}`}>{event.title}</p>
                        <p className={`text-sm ${t.textSecondary}`}>
                          {event.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "kanban":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(kanbanData).map(([column, cards]) => (
              <div
                key={column}
                className={`${t.cardBg} p-6 rounded-xl shadow-sm border ${t.border}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`font-semibold ${t.text} capitalize flex items-center gap-2`}
                  >
                    {column === "todo" && <Clock size={16} />}
                    {column === "progress" && <AlertCircle size={16} />}
                    {column === "done" && <CheckCircle size={16} />}
                    {column === "todo"
                      ? "To Do"
                      : column === "progress"
                      ? "In Progress"
                      : "Done"}
                    <span className={`text-sm ${t.textSecondary}`}>
                      ({cards.length})
                    </span>
                  </h3>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {cards.map(card => (
                    <KanbanCard key={card.id} card={card} column={column} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return <div className={`${t.text}`}>Select a tab to view content</div>
    }
  }

  return (
    <div className={`min-h-screen ${t.bg} transition-colors duration-200`}>
      {/* Header */}
      <header className={`${t.cardBg} border-b ${t.border} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg hover:bg-gray-100 ${
                theme === "dark" ? "hover:bg-gray-700" : ""
              }`}
            >
              <Menu size={20} className={t.text} />
            </button>
            <h1 className={`text-xl font-bold ${t.text}`}>Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 w-64 border rounded-lg ${t.input}`}
              />
            </div>
            <button
              className={`p-2 rounded-lg hover:bg-gray-100 ${
                theme === "dark" ? "hover:bg-gray-700" : ""
              }`}
            >
              <Bell size={20} className={t.text} />
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg hover:bg-gray-100 ${
                theme === "dark" ? "hover:bg-gray-700" : ""
              }`}
            >
              {theme === "dark" ? (
                <Sun size={20} className={t.text} />
              ) : (
                <Moon size={20} className={t.text} />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className={`text-sm font-medium ${t.text}`}>Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "w-64" : "w-16"} ${
            t.sidebar
          } border-r transition-all duration-300 h-screen sticky top-0`}
        >
          <nav className="p-4">
            <div className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: BarChart },
                { id: "tables", label: "Tables", icon: Users },
                { id: "calendar", label: "Calendar", icon: Calendar },
                { id: "kanban", label: "Kanban", icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === id
                      ? "bg-blue-600 text-white"
                      : `${t.text} hover:bg-gray-100 ${
                          theme === "dark" ? "hover:bg-gray-700" : ""
                        }`
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="font-medium">{label}</span>}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 p-6 overflow-auto ${
            sidebarOpen ? "ml-0" : "ml-0"
          }`}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
