import { SELECTED_PICTURE_TO_EDIT, SAVE_CROPPED_IMAGE } from './types';
export function selectPhotoToEdit(picture) { 
	return {
		type: SELECTED_PICTURE_TO_EDIT,
		selectedPicture: picture
	}
}

export function saveCroppedImage(newUrl, oldUrl) { 
	return {
		type: SAVE_CROPPED_IMAGE,
		newUrl,
		oldUrl
	}
}