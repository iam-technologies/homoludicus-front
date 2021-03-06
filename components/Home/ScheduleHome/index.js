import React from 'react';
import Link from 'next/link';

const ScheduleHome = () => {
  const events = [{
    title: 'event 1',
    date: '20/02/2020',
    hour: '17.30h',
    month: 'FEBRER'
  }, {
    title: 'event 2',
    date: '20/02/2020',
    hour: '17.30h',
    month: 'FEBRER'
  }, {
    title: 'event 3',
    date: '20/02/2020',
    hour: '17.30h',
    month: 'FEBRER'
  }];

  return (
    <div className="schedule-div">
      <h2>Agenda 2019/20</h2>
      <div className="scheduled-events">
        <div className="scheduled-event" />
        {events.map((event) => {
          return (
            <div key={event.title} className="scheduled-event">
              <div className="event-data">
                <p>{event.title}</p>
                <p>{event.date}</p>
                <p>{event.hour}</p>
              </div>
              <Link href="/#">
                <a>
                  <button className="button-ghost-black">Asistir</button>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleHome;
