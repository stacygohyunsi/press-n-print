import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { pictures } from './pictures';
import { modal } from './modal';

export default combineReducers({
	pictures,
	modal
})