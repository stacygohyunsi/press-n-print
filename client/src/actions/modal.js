import { HIDE_MODAL, SHOW_MODAL } from './types';
export function changeModalStatus(status) { 
	return status === 'open' ? {
		type: SHOW_MODAL
	} :{
		type: HIDE_MODAL
	}
}