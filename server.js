const express = require('express');
const multer = require('multer');
const app = express();
const AWS = require('aws-sdk');
const fs = require('fs');
const paypal = require('paypal-rest-sdk');

const port = process.env.PORT || 5000;

paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: 'AY2Uyw_62aTjHZOGUTD1yvFg6EZcCcXVKArT2FpTTTrhDsZ7RIQWo3IiSwIiUtyet36WdumrJLLrKYLX',
  client_secret: 'ECX9C__nee2XlpCJImquYrR-JC7ZEpif_ZEatpOlt_hopR0r3GnBkW4aqyGbeX7P3zKE42XmncRlt_HI'});

AWS.config.update({
	accessKeyId: 'AKIAJ52CZ7RYXYONXZ4Q',
	secretAccessKey: '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',
	region: 'ap-southeast-1'
});

var s3 = new AWS.S3();

// Allow cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	next();
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


var upload = multer({limits: {fileSize:10*1024*1024}});
var type = upload.single('upl');

app.post('/api/upload', type, function (req, res) {
	 console.log(req.file);
	 let blobData = req.file.buffer;
	 	let params = {
			Bucket: 'newbucket',
			Key: 'output.jpg',
			Body: blobData,
			ContentType: req.file.mimetype,
		}
	 	s3.upload(params, function (err, data) {
		if (err) {
			console.log("Error uploading data: ", err);
		} else {
			console.log("Successfully uploaded data to myBucket/myKey");
		}
	});
});

app.post('/api/makepayment', (req, res) => {
	var payReq = JSON.stringify({
		intent:'sale',
		payer:{
			payment_method:'paypal'
		},
		redirect_urls:{
			return_url:'http://localhost:3000/success',
			cancel_url:'http://localhost:3000/cancel'
		},
		transactions:[{
			amount:{
				total:'10',
				currency:'USD'
			},
			description:'This is the payment transaction description.'
		}]
	});
	paypal.payment.create(payReq, function(error, payment){
		var links = {};
	
		if(error){
			console.error(JSON.stringify(error));
		} else {
			// Capture HATEOAS links
			payment.links.forEach(function(linkObj){
				links[linkObj.rel] = {
					href: linkObj.href,
					method: linkObj.method
				};
			})
	
			// If the redirect URL is present, redirect the customer to that URL
			if (links.hasOwnProperty('approval_url')){
				// Redirect the customer to links['approval_url'].href
				console.log('yes has approval url', links['approval_url'].href);
				res.json({url: links['approval_url'].href});
			} else {
				console.error('no redirect URI present');
			}
		}
	});
})


app.get('/api/executepayment', (req, res) => {
	var paymentId = req.query.paymentId;
	var payerId = { payer_id: req.query.PayerID };
	
	paypal.payment.execute(paymentId, payerId, function(error, payment){
		if(error){
			console.error(JSON.stringify(error));
		} else {
			if (payment.state == 'approved'){
				console.log('payment completed successfully');
			} else {
				console.log('payment not successful');
			}
		}
	});
});

app.post('/api/instagram/accesstoken', (req, res) => {
	console.log(resp.access_token);
	fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${resp.access_token}`, {
		method: 'GET'
	})
	.then(res => {
			return res.json();
	})
	.then(resp => {
		res.json(resp);
	});
});


app.listen(port, () => console.log(`Listening on port ${port}`));