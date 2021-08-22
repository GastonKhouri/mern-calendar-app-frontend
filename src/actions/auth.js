import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";


export const startlogin = (correo, password) => {

    return async(dispatch) => {

        const resp = await fetchSinToken('auth/login', { correo, password }, 'POST');
        const data = await resp.json();
        
        if(data.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: data.usuario.uid,
                name: data.usuario.nombre
            }))
        } else {
            Swal.fire('Error', data.msg, 'error');
        }

    }
    
}

export const startRegister = ( nombre, correo, password, role = 'ADMIN_ROLE' ) => {

    return async(dispatch) => {

        const resp = await fetchSinToken('usuarios', { nombre, correo, password, role }, 'POST');
        const data = await resp.json();
        
        if(data.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: data.usuario.uid,
                name: data.usuario.nombre
            }))
        } else {
            Swal.fire('Error', data.errors[0].msg, 'error');
        }

    }
    
}

export const startChecking = () => {

    return async(dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const data = await resp.json();
        
        if(data.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: data.usuario.uid,
                name: data.usuario.nombre
            }))
        } else {
            dispatch(checkingFinish());
        }

    }

}

const checkingFinish = () => ({
    type: types.authChekingFinish
})


const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(logout());

    }
}

const logout = () => ({
    type: types.authLogout   
})


