import React, { useState } from 'react';
import { Layout } from '../../components';
import SectionHeader from '../../components/SectionHeader';
import Calendar from '../../components/common/Calendar';
import Modal from '../../components/common/Modal';

const gameZone = () => {
  const calendarSettings = {
    defaultView: 'timeGridWeek',
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek listWeek'
      // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    /* Los eventos serán las reservas */
    events: [
      {
        title: 'event 1',
        start: '2020-01-20T14:00:00',
        end: '2020-01-20T15:00:00',
        url: '/erizos-a-la-carrera'
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
  const modalTitle = 'Reserva el teu espai !';
  const defaultModalState = false;
  const [currentSec, setModalState] = useState(defaultModalState);
  const onBook = (info) => {
    console.log(`selected ${info.startStr} to ${info.endStr}`);
    console.log(info.start, '=>', info.end);
    setModalState(true);
    console.log(currentSec, 'currentSec');
  };

  return (
    <>
      {currentSec && <Modal modalTitle={modalTitle} setModalState={setModalState} />}
      <Layout>
        <SectionHeader title={title} text={text} />
        <div className="calendar-page-wrapper">
          <div className="calendar-div">
            <Calendar calendarSettings={calendarSettings} onClicked={onBook} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default gameZone;
