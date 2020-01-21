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
    const { calendarSettings } = this.props;
    const { defaultView } = calendarSettings;

    this.state = {
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
      ],
      defaultView,
      calendarWeekends: true,
      buttonText: { list: 'Llista' }
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
    const { events, defaultView, header, calendarWeekends, buttonText } = this.state;
    return (
          <FullCalendar
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
                // schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
              weekends={calendarWeekends}
              header={header}
              minTime="06:00:00"
              maxTime="21:00:00"
              buttonText={buttonText}
              allDayDefault={false}
              allDay={false}
            // dateClick={this.handleDateClick}
            />
    );
  }
}

export default Calendar;
