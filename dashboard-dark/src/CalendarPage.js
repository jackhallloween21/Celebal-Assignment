import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const events = [
  { title: 'Meeting', start: new Date(), end: new Date() },
];

export default function CalendarPage() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Calendar</h2>
      <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
    </div>
  );
}
