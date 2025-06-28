import React, { useState } from 'react';
import { Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const initialData = {
  todo: [
    { id: 1, title: 'Design new landing page', desc: 'Create wireframes and mockups', priority: 'high' },
    { id: 2, title: 'Update user documentation', desc: 'Review and update API docs', priority: 'medium' },
  ],
  progress: [
    { id: 3, title: 'Implement user authentication', desc: 'Add OAuth integration', priority: 'high' },
    { id: 4, title: 'Database optimization', desc: 'Improve query performance', priority: 'low' },
  ],
  done: [
    { id: 5, title: 'Setup CI/CD pipeline', desc: 'Automated testing and deployment', priority: 'medium' },
    { id: 6, title: 'Mobile responsive design', desc: 'Optimize for mobile devices', priority: 'high' },
  ],
};

const KanbanCard = ({ card, onMove, column }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-3">
      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{card.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{card.desc}</p>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[card.priority]}`}>
          {card.priority}
        </span>
        <div className="flex gap-1">
          {column === 'todo' && (
            <button
              onClick={() => onMove(card.id, 'todo', 'progress')}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-500 dark:text-gray-400"
              title="Move to In Progress"
            >
              →
            </button>
          )}
          {column === 'progress' && (
            <button
              onClick={() => onMove(card.id, 'progress', 'done')}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-500 dark:text-gray-400"
              title="Move to Done"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Kanban() {
  const [data, setData] = useState(initialData);

  const moveCard = (cardId, fromColumn, toColumn) => {
    const card = data[fromColumn].find(c => c.id === cardId);
    if (card) {
      setData(prev => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter(c => c.id !== cardId),
        [toColumn]: [...prev[toColumn], card],
      }));
    }
  };

  const columns = [
    { key: 'todo', title: 'To Do', icon: Clock, color: 'text-blue-600' },
    { key: 'progress', title: 'In Progress', icon: AlertCircle, color: 'text-yellow-600' },
    { key: 'done', title: 'Done', icon: CheckCircle, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(({ key, title, icon: Icon, color }) => (
          <div key={key} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon size={20} className={color} />
                <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm px-2 py-1 rounded-full">
                  {data[key].length}
                </span>
              </div>
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <Plus size={16} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              {data[key].map(card => (
                <KanbanCard
                  key={card.id}
                  card={card}
                  column={key}
                  onMove={moveCard}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}