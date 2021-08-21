import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

import { uiOpenModal } from '../../actions/ui';
import { messages } from '../../helpers/calendar-messages';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { eventClearActive, eventSetActive } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment().locale('es');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActive());
    }
    

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        } 

    }

    return (
        <div className='calendar-screen'>

            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                onDoubleClickEvent={ onDoubleClick }
                eventPropGetter={ eventStyleGetter }
                onSelectEvent={ onSelectEvent }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView={ onViewChange }
                view={ lastView }
                components={{ event: CalendarEvent }}
            />

            {
                activeEvent && (<DeleteEventFab />)
            }

            <AddNewFab />

            <CalendarModal />

        </div>
    )
}

export default CalendarScreen
