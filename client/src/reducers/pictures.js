const INITIAL_STATE = {
	pictures: [], 
	selectedPicture: null
};

export function pictures(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SAVE_PICTURES':
			return {...state, pictures: action.pictures}
		case 'SELECTED_PICTURE_TO_EDIT':
			return {...state, selectedPicture: action.selectedPicture}
		case 'SAVE_CROPPED_IMAGE':
			return { 
				...state, 
				pictures: state.pictures.map(
						(picture) => picture.src === action.oldUrl ? {...picture, updatedUrl: action.newUrl} : picture
				)
		 	}
			return {...state, pictures: action.pictures}			
		default:
				return state;
	}
}