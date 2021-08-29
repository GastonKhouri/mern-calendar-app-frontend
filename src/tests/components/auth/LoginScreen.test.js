import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { startlogin, startRegister } from '../../../actions/auth';
import LoginScreen from '../../../components/auth/LoginScreen';

jest.mock('../../../actions/auth', () => ({
   startlogin: jest.fn(),
   startRegister: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()   
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen />
    </Provider>
)

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        
    })

    test('debe de llamar el dispatch del login', () => {

        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'fernando@gmail.com'
            }
        })

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        })

        wrapper.find('form').at(0).simulate('submit');

        expect(startlogin).toHaveBeenCalledWith('fernando@gmail.com', '123456')
        
    })

    test('no hay registro si las contraseñas no son iguales', () => {

        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '12342431'
            }
        })

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '12312132'
            }
        })

        wrapper.find('form').at(1).simulate('submit');

        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben ser iguales', 'error');
        
    })

    test('hay registro si las contraseñas son iguales', () => {

        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        })

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        })

        wrapper.find('form').at(1).simulate('submit');

        expect(startRegister).toHaveBeenCalledWith('', '', '123456');
        expect(Swal.fire).not.toHaveBeenCalled();
        
    })
    
    
    
    
})
