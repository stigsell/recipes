const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const cors = require('cors');
var fs = require('fs')

const RECIPES_TABLE = process.env.RECIPES_TABLE;
const S3_BUCKET = process.env.S3_BUCKET;

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
	console.log('offline')
	dynamoDb = new AWS.DynamoDB.DocumentClient({
		region: 'localhost',
		endpoint: 'http://localhost:8000'
	})
	console.log('created offline DocumentClient')
	console.log(dynamoDb);
} else {
	dynamoDb = new AWS.DynamoDB.DocumentClient();
}

s3 = new AWS.S3({apiVersion: '2006-03-01'});

// app.use(cors())
app.use(bodyParser.json({ strict: false }));

var whitelist = ['https://recipes.stig.co', 'https://stig.co', 'https://d17jshnvscie1x.cloudfront.net', 'http://recipes.stig.co.s3-website-us-east-1.amazonaws.com', 'http://localhost:3001', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
  	console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Source: https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
function slugify(string) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

//Get All Recipe Endpoint
app.get('/allRecipes/', cors(corsOptions), function (req, res) {
	const params = {
		TableName: RECIPES_TABLE,
	}

	dynamoDb.scan(params, (error, result) => {
		if (error) {
			console.log(error);
			res.status(400).json({ error: 'Could not get all recipes' });
		}
		if (result) {
			// const {recipeShortName, name, category, ingredients, steps } = result;
			// res.json({ recipeShortName, name, category, ingredients, steps });
			res.json({ result })
		} else {
			res.status(404).json({ error: 'General error' });
		}
	});
})

//Get Recipe Endpoint
app.get('/recipes/:recipeShortName', cors(corsOptions), function (req, res) {
	const params = {
		TableName: RECIPES_TABLE,
		Key: {
			recipeShortName: req.params.recipeShortName
		},
	}

	dynamoDb.get(params, (error, result) => {
		if (error) {
			console.log(error);
			res.status(400).json({ error: 'Could not get recipe' });
		}
		if (result.Item) {
			const {recipeShortName, name, category, ingredients, steps } = result.Item;
			res.json({ recipeShortName, name, category, ingredients, steps });
		} else {
			res.status(404).json({ error: 'Recipe not found' });
		}
	});
})

//Add Recipe Endpoint
app.post('/recipes', cors(corsOptions), function (req, res) {
	// const { recipeShortName, name } = req.body;
	const requestbody = req.body.body;
	console.log(req);
	const name = requestbody.name;
	const recipeShortName = slugify(name); // Make recipeShortName URL-friendly
	const category = requestbody.category;
	const ingredients = requestbody.ingredients;
	const steps = requestbody.steps;
	console.log(recipeShortName);
	console.log(name);
	console.log(category);
	console.log(ingredients);
	console.log(steps);
	if (typeof recipeShortName !== 'string') {
		res.status(400).json({ error: '"recipeShortName" must be a string' });
	} else if (typeof name !== 'string') {
		res.status(400).json({ error: '"name" must be a string' });
	}

	// Upload photo


	const params = {
		TableName: RECIPES_TABLE,
		Item: {
			recipeShortName: recipeShortName,
			name: name,
			category: category,
			ingredients: ingredients,
			steps: steps,
		},
	};

	console.log('putting in dynamoDb')
	dynamoDb.put(params, (error) => {
		if (error) {
			console.log(error)
			res.status(400).json({ error: 'Could not add recipe' })
		}
		res.json({ recipeShortName, name, category, ingredients, steps })
	})
	console.log('put in dynamoDb')

})


//Upload Photo Endpoint
app.post('/uploadphoto', cors(corsOptions), function (req, res) {
	const s3 = new AWS.S3();  // Create a new instance of S3
	const fileName = req.body.fileName;
	const fileType = req.body.fileType;
	const fileExtension = fileName.split('.')[1];
	const contentType = 'image/'+fileExtension;

	console.log('S3_BUCKET: ' + S3_BUCKET);
	console.log('req: ' + req);
	console.log('fileName: ' + fileName);
	console.log('fileType: ' + fileType);
	console.log('fileExtension: ' + fileExtension);
	console.log('contentType: ' + contentType);

	const s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName,
		ContentType: contentType
	};

	console.log(s3Params);

 	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if(err){
			console.log(err);
			res.json({success: false, error: err})
		} else {
			console.log('Successfully created presigned URL');
			console.log(data);
		}
	// Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
		const returnData = {
			signedRequest: data,
			url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
		};
	// Send it all back
		res.json({success:true, data:{returnData}});
  });



})

//Get Recipe Endpoint
app.get('/photo/:photoName', cors(corsOptions), function (req, res) {
	const params = { Bucket: keys.S3_BUCKET, Key: req.params.photoName };

	s3.getObject(params, function(err, data) {
      if (err) {
        return res.send({ error: err });
      }
      res.send(data.Body);
    });
})

module.exports.handler = serverless(app);