import { mount } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../../actions/events';
import { uiCloseModal } from '../../../actions/ui';
import CalendarModal from '../../../components/calendar/CalendarModal';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', ()=> ({
    fire: jest.fn(),
}));

jest.mock('../../../actions/events', ()=> ({
    eventStartUpdate: jest.fn(),
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn(),
}));

jest.mock('../../../actions/ui', ()=> ({
    uiCloseModal: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola',
            notes: 'Mundo',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Gaston'
    },
    ui: {
        modalOpen: true
    }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
)

describe('Pruebas en <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('debe de mostrarse correctamente', () => {

        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
        
    })

    test('debe de llamar la accion de actualizar y cerrar el modal', () => {

        wrapper.find('form').simulate('submit');

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(uiCloseModal).toHaveBeenCalled(); 

    })

    test('debe de mostrar error si falta el titulo', () => {

        wrapper.find('form').simulate('submit');

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true)

    })

    test('debe de crear un nuevo evento', () => {

        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '123',
                name: 'Gaston'
            },
            ui: {
                modalOpen: true
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola mundo'
            }
        })

        wrapper.find('form').simulate('submit');

        expect(eventStartAddNew).toHaveBeenCalledWith({
            start: expect.anything(),
            end: expect.anything(),
            title: 'Hola mundo',
            notes: ''
        });

        expect(eventClearActive).toHaveBeenCalled();
        
    })

    test('debe de validar las fechas', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola mundo'
            }
        })

        const hoy = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
        })

        wrapper.find('form').simulate('submit');

        expect(Swal.fire).toHaveBeenCalledWith('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error')
        
    })
    
    
    
    
    
    
})
