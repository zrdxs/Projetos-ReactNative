import { SET_MESSAGE } from '../actions/actionsTypes'

const initialState = {
    title: '',
    text: ''
}

export default reducer = (state = initialState, action) => {
     switch(action.type){
         case SET_MESSAGE:
             return {
                title:action.payload.title,
                text:action.payload.text
             }
         default:
             return state
     }
}

