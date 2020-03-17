import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import caLocale from '@fullcalendar/core/locales/ca';
import list from '@fullcalendar/list';

class Calendar extends Component {
  constructor(props) {
    super(props);
    const {
      calendarSettings,
      onClicked,
      screen
    } = this.props;
    const { header, events, defaultView } = calendarSettings;

    this.state = {
      header,
      events,
      defaultView,
      calendarWeekends: true,
      buttonText: { list: 'Llista' },
      onClicked,
      screen
    };
  }

  // handleDateClick = (arg) => {
  //   if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
  //     this.setState({  // add new event data
  //       calendarEvents: this.state.calendarEvents.concat({ // creates a new array
  //         title: 'New Event',
  //         start: arg.date,
  //         allDay: arg.allDay
  //       })
  //     })
  //   }
  // }

  render() {
    const {
      events,
      defaultView,
      header,
      calendarWeekends,
      buttonText,
      onClicked,
      screen
    } = this.state;
    console.log(header.right);
    console.log(screen);
    return (
      <FullCalendar
        onClick={onClicked}
        defaultView={defaultView}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          list
        ]}
        selectable
        unselectAuto
        events={events}
        locale={caLocale}
        displayEventEnd
        weekends={calendarWeekends}
        header={header}
        minTime="06:00:00"
        maxTime="21:00:00"
        buttonText={buttonText}
        allDayDefault={false}
        allDay={false}
        eventClick // Conduce directamente a la url del evento. Se le puede pasar una función y anular el default de redirigir.
        select={onClicked}
      />
    );
  }
}
export default Calendar;
