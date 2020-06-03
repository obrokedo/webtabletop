import { combineReducers } from 'redux';
import chatReducer from './chat';

export default combineReducers({
    chatData: chatReducer
});
