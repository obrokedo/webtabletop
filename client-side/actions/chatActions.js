import {GET_MESSAGES, POST_MESSAGE } from './types';


export const fetchMessages = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(comments => dispatch({
        type: GET_MESSAGES,
        payload: comments
    }));
}

export const postMessage = (messageData) => dispatch => {
    return dispatch({
        type: POST_MESSAGE,
        payload: messageData
    });
}
