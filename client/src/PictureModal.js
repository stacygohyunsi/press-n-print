import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import AvatarEditor from 'react-avatar-editor';
import { changeModalStatus } from './actions/modal';
import { saveCroppedImage } from './actions/pictures';

const customStyles = {
	content : {
		'textAlign':'center'
	}
};

class PictureModal extends Component {
  constructor(props) {
		super(props);
		this.closeModal = this.closeModal.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
		this.state = {
			value: 1,
			preview: null
		}
	}

	onChange (event) {
		this.setState({ value: event.target.value });
	}

	closeModal() {
		this.props.changeModalStatus('close');
	}
	
	onClickSave = () => {
    if (this.editor) {
			const canvas = this.editor.getImage();
			const canvas2 = this.editor.getImage().toDataURL('image/png', 1);
			console.log('CANVAS', canvas);
			this.props.saveCroppedImage(canvas2, this.props.selectedPicture);
			this.props.changeModalStatus('close');
			// this.setState({preview: canvas});
			// var fd = new FormData();
			// canvas.toBlob((blob) => {
			// 	console.log('blob image', blob);
			// 	fd.append('upl', blob, 'blobby.txt');
			// 	fetch('http://localhost:5000/api/upload',
			// 	{
			// 			method: 'post',
			// 			body: fd
			// 	}); 
      //   //this.props.uploadCroppedActionPhoto(blob);
      // });	

    }
	}

	setEditorRef = (editor) => this.editor = editor;

	render() {
		return (
			<Modal
			style={customStyles}
			isOpen={this.props.modalIsOpen}
			onAfterOpen={this.afterOpenModal}
			onRequestClose={this.closeModal}
			contentLabel="Example Modal"
			>
				<AvatarEditor
					ref={this.setEditorRef}
					image={this.props.selectedPicture}
					width={200}
					height={300}
					border={100}
					crossOrigin='anonymous'
					color={[0, 0, 0, 0.6]}
					scale={this.state.value}
					rotate={0}
				/>
				<div>
					Zoom: <input 
					id="typeinp" 
					type="range" 
					min="0" max="5" 
					value={this.state.value} 
					onChange={this.onChange}
					step="0.1"/>
				</div>
				
				<button className="modalButton" onClick={this.closeModal}>Close</button>
				<button className="modalButton" onClick={this.onClickSave}>Save</button>
			</Modal>
		)
	}

}

const mapStateToProps = (state, ownProps) => {
	return {
		selectedPicture: state.pictures.selectedPicture,
		modalIsOpen: state.modal.modalIsOpen
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
		changeModalStatus: (status) => dispatch(changeModalStatus(status)),
		saveCroppedImage: (newUrl, oldUrl) => dispatch(saveCroppedImage(newUrl, oldUrl))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PictureModal);