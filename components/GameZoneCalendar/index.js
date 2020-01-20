import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import caLocale from '@fullcalendar/core/locales/ca';

class GameZoneCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          title: 'event 1',
          start: '2020-01-20T14:30:00',
          end: '2020-01-20T15:30:00'
        }
      ],
      defaultView: 'dayGridWeek'
    };
  }

  render() {
    const { events, defaultView } = this.state;

    return (
      <FullCalendar
        defaultView={defaultView}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          resourceTimeGridPlugin,
          timeGridPlugin
        ]}
        selectable
        unselectAuto
        events={events}
        locale={caLocale}
        displayEventEnd
        allDaySlot
        allDayText
      />
    );
  }
}

export default GameZoneCalendar;
