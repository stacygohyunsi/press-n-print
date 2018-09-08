
const INITIAL_STATE = { 
	modalIsOpen: false
};

export function modal(state = INITIAL_STATE, action) {
	switch (action.type) {
	case 'SHOW_MODAL':
		return {
			modalIsOpen: true
		}
	case 'HIDE_MODAL':
		return INITIAL_STATE
	default:
		return state;
	}   
}