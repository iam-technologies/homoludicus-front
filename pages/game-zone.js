import React from 'react';
import { Layout } from '../components';
import SectionHeader from '../components/SectionHeader';
import Calendar from '../components/common/Calendar';

const gameZone = () => {
  const calendarSettings = {
    defaultView: 'timeGridWeek'
  };
  const title = 'Game Zone';
  const text = 'blablabla';

  return (
    <Layout>
      <SectionHeader title={title} text={text} />
      <Calendar calendarSettings={calendarSettings} />
    </Layout>
  );
};

export default gameZone;
