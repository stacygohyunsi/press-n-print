import React, { Component } from 'react';
import './App.css';
import { changeModalStatus } from './actions/modal';
import { selectPhotoToEdit } from './actions/pictures';
import { connect } from 'react-redux';
import PictureModal from './PictureModal';
import { Link } from 'react-router-dom';

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
		})
		.then(res => {
			return res.json();
		  })
		.then((resp) => {
			console.log(resp);
			window.location = resp.url;
		});
	}

	render() {
		return (
			<div>
				<div className='fixedCustomHeader'>
					<ul>
						<li>Click on your photo to crop/resize:</li>
						<Link className='nextButtonWrapper' to ='/address'>
							<button className='nextButton'>Proceed</button>
						</Link>
					</ul>
				</div>
				<div className='gallery'>
					{this.props.pictures.map((picture) => {
						return picture.isSelected === true ? 
							<div key={picture.src}>
								<img className="imageGrid" onClick={() => this.openModal(picture.src)} src={picture.updatedUrl || picture.src}/>
							</div>
							:
							<div className='none'></div>
					})}
				</div>
				<PictureModal	/>
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