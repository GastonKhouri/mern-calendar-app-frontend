import { types } from "../types/types";

const initialState = {
    checking: true,
    uid: null,
    name: null
}

export const authreducer = (state = initialState, action) => {
    

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false,
            }

        case types.authChekingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }
    
        default:
            return state;
    }


}
