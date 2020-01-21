import React from 'react';
import { Layout } from '../../components';
import SectionHeader from '../../components/SectionHeader';
import Calendar from '../../components/common/Calendar';

const gameZone = () => {
    const calendarSettings = {
        defaultView: 'timeGridWeek'
    };
    const title = 'Zona de Joc';
    const text = 'blablabla';

    return (
        <Layout>
            <SectionHeader title={title} text={text} />
            <div className="game-page">
                <div className="calendar-div">
                    <Calendar calendarSettings={calendarSettings} />
                </div>
            </div>
        </Layout>
    );
};

export default gameZone;
