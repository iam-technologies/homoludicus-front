import React, { useState } from 'react';
import { Layout } from '../../components';
import SectionHeader from '../../components/SectionHeader';
import Calendar from '../../components/common/Calendar';

const activities = () => {
  const defaultSec = 'eventos';
  const [currentSec, setCurrentSec] = useState(defaultSec);

  const calendarSettings = {
    defaultView: 'dayGridMonth',
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth listWeek'
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

  const title = 'Activitats';
  const text = '';

  const onEvents = currentSec === 'eventos' ? '-clicked' : '';
  const onCampaigns = currentSec === 'eventos' ? '' : '-clicked';
  return (
      <Layout>
          <div className="activities-div">
              <SectionHeader title={title} text={text} />
              <div className="section-wrapper">
                  <div className="section-selector">
                      <button
                          className={`select-button ${onEvents}`}
                          onClick={() => setCurrentSec('eventos')}
                        >
                            Eventos
                        </button>
                      <button
                          className={`select-button ${onCampaigns}`}
                          onClick={() => setCurrentSec('campañas')}
                        >
                            Ligas y campañas
                        </button>
                    </div>
                </div>
              {currentSec === 'eventos'
                  ? (
                      <div className="calendar-page-wrapper">
                          <div className="calendar-div">
                              <Calendar calendarSettings={calendarSettings} />
                            </div>
                        </div>
                  )
                  : <p>LIGAS Y CAMPAÑAS</p>}

            </div>

        </Layout>
  );
};

export default activities;
