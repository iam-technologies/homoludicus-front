import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import caLocale from '@fullcalendar/core/locales/ca';

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
        defaultView="dayGridWeek"
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          resourceTimeGridPlugin
        ]}
        selectable
        unselectAuto
        events={events}
        locale={caLocale}
      />
    );
  }
}

export default GameZoneCalendar;
