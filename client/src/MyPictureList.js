import React, { Component } from 'react';
import './App.css';
import { changeModalStatus } from './actions/modal';
import { selectPhotoToEdit } from './actions/pictures';
import { connect } from 'react-redux';
import PictureModal from './PictureModal';

class MyPictureList extends Component {
  constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
		this.makePayment = this.makePayment.bind(this);
	}
	
	openModal(pictureUrl) {
		this.props.changeModalStatus('open');
		this.props.selectPhotoToEdit(pictureUrl);
	}

	makePayment() {
		fetch('http://localhost:5000/api/makepayment',
		{
				method: 'post'
		});
	}

	render() {
		return (
			<div>
				{this.props.pictures.map((picture) => {
					return picture.isSelected === true ? 
						<div key={picture.src}>
							<img className="imageGrid" onClick={() => this.openModal(picture.src)} src={picture.updatedUrl || picture.src}/>
						</div>
						:
						<div></div>
				})}
				<PictureModal	/>
				<button onClick={this.makePayment}>Proceed to payment</button>
			</div>
		)				
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
    pictures: state.pictures.pictures
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
		changeModalStatus: (status) => dispatch(changeModalStatus(status)),
		selectPhotoToEdit: (pictureUrl) => dispatch(selectPhotoToEdit(pictureUrl))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MyPictureList);