import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

class GameZoneCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        { title: 'event 1', date: '2020-01-20' }
      ]
    };
  }

  render() {
    const { events } = this.state;
    return (
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable
        unselectAuto
        events={events}
      />
    );
  }
}

export default GameZoneCalendar;
