import React from 'react';
import { Layout } from '../../components';
import SectionHeader from '../../components/SectionHeader';
import Calendar from '../../components/common/Calendar';

const gameZone = () => {
  const calendarSettings = {
    defaultView: 'timeGridWeek',
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek listWeek'
      // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: [
      {
        title: 'event 1',
        start: '2020-01-20T14:00:00',
        end: '2020-01-20T15:00:00'
      },
      {
        title: 'event 2',
        start: '2020-01-22T14:30:00',
        end: '2020-01-22T15:30:00'
      }
    ]
  };
  const title = 'Zona de Joc';
  const text = 'Estas pensant en una tarda de joc amb els teus amics? No perdis el temps i reserva ja el teu espai!';

  return (
    <Layout>
      <SectionHeader title={title} text={text} />
      <div className="calendar-page-wrapper">
        <div className="calendar-div">
          <Calendar calendarSettings={calendarSettings} />
        </div>
      </div>
    </Layout>
  );
};

export default gameZone;
