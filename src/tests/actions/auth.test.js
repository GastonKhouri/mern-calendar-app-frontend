import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import Swal from 'sweetalert2';

import { startChecking, startlogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initState = {}
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones Auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('startLogin correcto', async() => {

        await store.dispatch(startlogin('fernando@gmail.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: { uid: expect.any(String), name: expect.any(String) }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String)); 
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number)); 
        
    })

    test('startLogin incorrecto', async() => {

        await store.dispatch(startlogin('fernando@gmail.com', '12345324'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'El Correo / Password no son correctos - password', 'error');
        
        await store.dispatch(startlogin('fernando123@gmail.com', '12345324'));
        actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'El Correo / Password no son correctos - correo', 'error');

    })

    test('startRegister correcto', async() => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    usuario: {
                        uid: '123ABC',
                        nombre: 'Carlos',
                    },
                    token: '123ABC123ABC'
                }
            }
        }));

        await store.dispatch(startRegister('test', 'test123@test.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123ABC',
                name: 'Carlos', 
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', '123ABC123ABC'); 
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number)); 
        
    })

    test('startChecking correcto', async() => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    usuario: {
                        uid: '123ABC',
                        nombre: 'Carlos',
                    },
                    token: '123ABC123ABC'
                }
            }
        }));

        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin, 
            payload: { uid: '123ABC', name: 'Carlos' }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', '123ABC123ABC')
        
    })
    
    
    
    
    
})
