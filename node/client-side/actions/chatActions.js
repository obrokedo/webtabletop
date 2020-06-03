import {GET_MESSAGES, POST_MESSAGE } from './types';


export const fetchMessages = () => dispatch => {
    console.log('fetching');
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(comments => dispatch({
            type: GET_MESSAGES,
            payload: comments
        }));
}
