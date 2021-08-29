import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

const initState = {
    modalOpen: false
}

describe('Pruebas en uiReducer', () => {

    test('debe retornar el estado por defecto', () => {

        

        const state = uiReducer(initState, {});

        expect(state).toEqual(initState)
        
    })

    test('debe de abrir y cerrar el modal', () => {

        const modalOpen = uiReducer(initState, { type: types.uiOpenModal });

        expect(modalOpen).toEqual({ modalOpen: true })

        const modalClose = uiReducer(initState, { type: types.uiCloseModal });

        expect(modalClose).toEqual({ modalOpen: false })

        
    })
    
    
    
})
