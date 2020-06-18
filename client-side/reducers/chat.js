import {GET_MESSAGES, POST_MESSAGE } from '../actions/types';

const initialState = {
    messages: [],
};

// TODO - MTL - consider using an object that returns functions rather than a switch statement.
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case POST_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        default:
            return state;
   }
};
