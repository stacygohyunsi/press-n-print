var AWS = require('aws-sdk');

AWS.config.update({
	accessKeyId: 'AKIAJ52CZ7RYXYONXZ4Q',
	secretAccessKey: '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',
	region: 'ap-southeast-1'
});

var s3 = new AWS.S3();

let params = {
	Bucket: 'test-bucket',
	Key: 'output.jpg',
	Body: blobData,
	ContentEncoding: 'base64',
	ContentType: 'image/png'
}
s3.upload(params, function (err, data) {
	if (err) {
		console.log("Error uploading data: ", perr);
	} else {
		console.log("Successfully uploaded data to myBucket/myKey");
	}
});