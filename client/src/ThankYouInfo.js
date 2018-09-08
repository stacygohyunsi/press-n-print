import React , { Component } from 'react';
import * as qs from 'query-string';

class ThankYouInfo extends Component {
  constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		let paymentId = qs.parse(this.props.location.search).paymentId;
		let PayerID = qs.parse(this.props.location.search).PayerID;
		fetch(`http://localhost:5000/api/executepayment?paymentId=${paymentId}&PayerID=${PayerID}`,
		{
				method: 'get'
		});
	}

	render() {
		return (
			<div>Thanks for completing payment</div>
		)
	}
}

export default ThankYouInfo;