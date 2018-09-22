import React, { Component } from 'react';
import Input from './Input';
import { connect } from 'react-redux';

class Address extends Component {
	constructor(props) {
		super(props);
		this.state =  {
			newUser : {
				name: null, 
				address: null,
				postal: null,
				email: null
			}
		}
		this.handleInput = this.handleInput.bind(this);
		this.makePayment = this.makePayment.bind(this);
	}

	makePayment() {
		console.log(this.props.pictures);
		var fd = new FormData();
		// canvas.toBlob((blob) => {
		// 	console.log('blob image', blob);
		// 	fd.append('upl', blob, 'blobby.txt');
			fetch('http://localhost:5000/api/upload',
			{
					method: 'post',
					body: fd
			}); 
		// 	//this.props.uploadCroppedActionPhoto(blob);
		// });	
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;
		this.setState( prevState => {
			 return { 
					newUser : {
									 ...prevState.newUser, [name]: value
									}
			 }
		}, () => console.log(this.state.newUser)
		)
}
	render() {
		return (
			<div>
				<Input type={'text'}
					title= {'Full Name'} 
					name= {'name'}
					value={this.state.newUser.name} 
					placeholder = {'Enter your name'}
					handleChange = {this.handleInput}
				/>
				<Input type={'text'}
					title= {'Address'} 
					name= {'address'}
					value={this.state.newUser.name} 
					placeholder = {'Enter your name'}
					handleChange = {this.handleInput}
				/>
				<Input type={'text'}
					title= {'Postal Code'} 
					name= {'postal'}
					value={this.state.newUser.name} 
					placeholder = {'Enter your name'}
					handleChange = {this.handleInput}
				/>
				<Input type={'text'}
					title= {'Email address'} 
					name= {'email'}
					value={this.state.newUser.name} 
					placeholder = {'Enter your email'}
					handleChange = {this.handleInput}
				/>	
				<div className='fixedCustomHeader'>
				<button className='nextButton' onClick={this.makePayment}>Proceed</button>
			</div>
			</div>			
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
    pictures: state.pictures.pictures
	}
}

export default connect(mapStateToProps, null)(Address);