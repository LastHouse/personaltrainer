import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function MyCalendar() {
  moment.locale();
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => fetchAllWorkouts(), []);

  const fetchAllWorkouts = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  };

  const evs = events.map(event => ({
    title:
      event.activity +
      ' ' +
      event.customer.firstname +
      ' ' +
      event.customer.lastname,
    start: moment.utc(event.date).toDate(),
    end: moment
      .utc(event.date)
      .add(event.duration, 'minutes')
      .toDate()
  }));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={evs}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
