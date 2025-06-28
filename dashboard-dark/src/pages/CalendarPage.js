import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    start: new Date(2024, 5, 20, 10, 0),
    end: new Date(2024, 5, 20, 11, 0),
  },
  {
    id: 2,
    title: 'Product Launch',
    start: new Date(2024, 5, 22, 14, 0),
    end: new Date(2024, 5, 22, 16, 0),
  },
  {
    id: 3,
    title: 'Client Presentation',
    start: new Date(2024, 5, 25, 9, 0),
    end: new Date(2024, 5, 25, 10, 30),
  },
];

export default function CalendarPage() {
  const [events, setEvents] = useState(initialEvents);
  const [view, setView] = useState('month');

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          title,
          start,
          end,
        },
      ]);
    }
  };

  const handleSelectEvent = (event) => {
    const action = window.confirm(`Delete event "${event.title}"?`);
    if (action) {
      setEvents(events.filter(e => e.id !== event.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
        <div className="flex gap-2">
          {['month', 'week', 'day'].map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                view === viewType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            style={{ height: '100%' }}
            eventPropGetter={() => ({
              style: {
                backgroundColor: '#3b82f6',
                borderRadius: '4px',
                border: 'none',
                color: 'white',
              },
            })}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events
            .filter(event => event.start >= new Date())
            .sort((a, b) => a.start - b.start)
            .slice(0, 5)
            .map(event => (
              <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(event.start, 'MMM dd, yyyy - HH:mm')}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}