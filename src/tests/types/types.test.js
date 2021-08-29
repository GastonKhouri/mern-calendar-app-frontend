import { types } from "../../types/types"

describe('Pruebas en types', () => {

    test('deben de estar todos los tipos', () => {

        const typesTest = {

            uiOpenModal: '[UI] Open modal',
            uiCloseModal: '[UI] Close modal',
        
        
            eventSetActive: '[Event] Set active',
            eventStartAddNew: '[Event] Start add new',
            eventAddNew: '[Event] Add new',
            eventClearActive: '[Event] Clear active',
            eventUpdated: '[Event] Updated event',
            eventDeleted: '[Event] Deleted event',
            eventLoaded: '[Event] Events loaded',
            eventLogout: '[Event] Event logout',
        
            authChekingFinish: '[Auth] Finish checking login state',
            authStartLogin: '[Auth] Start login',
            authLogin: '[Auth] Login',
            authStartRegister: '[Auth] Start Register',
            authStartTokenRenew: '[Auth] Start token renew',
            authLogout: '[Auth] Logout',
        
        
        }

        expect(types).toEqual(typesTest);
        
    })
    
    
})


