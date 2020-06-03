import {GET_MESSAGES, POST_MESSAGE } from '../actions/types';

const initialState = {
    messages: [],
    newMessage: {}
};

// TODO - MTL - consider using an object that returns functions rather than a switch statement.
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MESSAGES:
            console.log('getting messages');
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
   }
};
