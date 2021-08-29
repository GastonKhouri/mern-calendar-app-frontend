import { authreducer } from "../../reducers/authReducer"
import { types } from "../../types/types";


describe('Pruebas en el authReducer', () => {

    test('debe de retornar el estado por defecto', () => {

        const initState = {
            checking: true,
            uid: null,
            name: null
        }

        const state = authreducer(initState, {});

        expect(state).toEqual(initState);
        
    })

    test('debe de autenticar al usuario', () => {

        const initState = {
            checking: true,
            uid: null,
            name: null
        }

        const state = authreducer(initState, {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Gaston'
            }
        });

        expect(state).toEqual({ checking: false, uid: '123', name: 'Gaston' });
        
    })
    
    
})
