import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { eventSetActive } from '../../../actions/events';
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages';
import { types } from '../../../types/types';

Storage.prototype.setItem = jest.fn();

jest.mock('../../../actions/events', ()=> ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    calendar: {
        events: []
    },
    auth: {
        uid: '123',
        name: 'Gaston'
    },
    ui: {
        modalOpen: false
    }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
)

describe('Pruebas en <CalendarScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        
    })

    test('pruebas con las interacciones del calendario', () => {

        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toEqual(messages)

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 'Hola' });
        expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hola' })

        act(() => {
            calendar.prop('onView')('week');
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');

        
    })
    
    
    
})
