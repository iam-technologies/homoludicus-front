import React from 'react';
import { Layout } from '../../components';
import SectionHeader from '../../components/SectionHeader';
import Calendar from '../../components/common/Calendar';

const gameZone = () => {
  const calendarSettings = {
    defaultView: 'timeGridWeek'
  };
  const title = 'Activitats';
  const text = '';

  const onActive = '-clicked';

  return (
      <Layout>
          <div className="activities-div">
              <SectionHeader title={title} text={text} />
              <div className="section-selector">
                  <button className={`select-button ${onActive}`}>Eventos</button>
                  <button className={`select-button ${onActive}`}>Ligas y campañas</button>
                </div>
              <div className="calendar-page-wrapper">
                  <div className="calendar-div">
                      <Calendar calendarSettings={calendarSettings} />
                    </div>
                </div>
            </div>

        </Layout>
  );
};

export default gameZone;
