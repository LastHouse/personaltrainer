import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment, { duration } from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function MyCalendar() {
  // Setup the localizer by providing the moment (or globalize) Object
  // to the correct localizer.
  moment.locale();
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => fetchAllWorkouts(), []);

  const fetchAllWorkouts = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
        let appointments = data;
        console.log(appointments);
        console.log(moment.utc(appointments[3].date).toDate());
        console.log(
          moment
            .utc(appointments[3].date)
            .add(appointments[3].duration, 'minutes')
            .toDate()
        );

        for (let i = 0; i < appointments.length; i++) {
          appointments[i].title = appointments[i].activity;
          appointments[i].start = moment.utc(appointments[i].date).toDate();
          appointments[i].end = moment
            .utc(appointments[i].date)
            .add(appointments[i].duration, 'minutes')
            .toDate();
        }
        //setEvents({ events: appointments });
      })
      .catch(err => console.error(err));
  };

  // end laskee oikein, mutta ne pitää ajaa oikein eventseihin.

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
