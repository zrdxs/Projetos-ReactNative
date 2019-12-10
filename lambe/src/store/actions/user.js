import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    LOADING_USER, 
    USER_LOADED } from './actionsTypes'
import axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
import { API_KEY } from 'react-native-dotenv';

import { setMessage } from './message'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () =>{
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = user => {
       return dispatch => {
           dispatch(loadingUser())
           axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
               email: user.email,
               password: user.password,
               returnSecureToken: true
           })
              .catch(err => {
                dispatch(setMessage({
                    title:'Erro',
                    text: 'Ocorreu um erro inesperado!'
                 }));
              })
              .then(res => {
                  console.log(res)
                  if (res.data.localId) {
                     axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name 
                     })
                        .catch(err => {
                            dispatch(setMessage({
                                title:'Erro',
                                text: 'Ocorreu um erro inesperado!'
                             }));
                        })
                        .then(() => {
                            dispatch(login(user))
                        })
                  }
              })
       }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    //chamada assincronas
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
           .catch(err => {
                dispatch(setMessage({
                    title:'Erro',
                    text: 'Ocorreu um erro inesperado!'
                }));
           })
           .then(res => {
               if(res.data.localId){
                   user.token = res.data.idToken
                   axios.get(`/users/${res.data.localId}.json`)
                        .catch(err => {
                            dispatch(setMessage({
                                title:'Erro',
                                text: 'Ocorreu um erro inesperado!'
                             }));
                        })
                        //cada axios.get ou post tem seu proprio res
                        .then(res => {
                            //deletando o atributo password
                            delete user.password,
                            user.name = res.data.name
                            //enviando para outra action
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })
               }
           })
    }
}




