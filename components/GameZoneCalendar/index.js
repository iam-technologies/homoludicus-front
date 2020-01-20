import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

class GameZoneCalendar extends Component {
  render() {
    return (
      <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
    );
  }
}

export default GameZoneCalendar;
