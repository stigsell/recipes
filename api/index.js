const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');

const RECIPES_TABLE = process.env.RECIPES_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
	dynamoDb = new AWS.DynamoDB.DocumentClient({
		region: 'localhost',
		endpoint: 'http://localhost:8000'
	})
	console.log(dynamoDb);
} else {
	dynamoDb = new AWS.DynamoDB.DocumentClient();
}

app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

//Get Recipe Endpoint
app.get('/recipes/:recipeShortName', function (req, res) {
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
			const {recipeShortName, name} = result.Item;
			res.json({ recipeShortName, name });
		} else {
			res.status(404).json({ error: 'Recipe not found' });
		}
	});
})

//Add Recipe Endpoint
app.post('/recipes', function (req, res) {
	// const { recipeShortName, name } = req.body;
	console.log(req);
	const recipeShortName = req.query.recipeShortName;
	const name = req.query.name;
	console.log(req.body);
	console.log(recipeShortName);
	console.log(name);
	if (typeof recipeShortName !== 'string') {
		res.status(400).json({ error: '"recipeShortName" must be a string' });
	} else if (typeof name !== 'string') {
		res.status(400).json({ error: '"name" must be a string' });
	}

	const params = {
		TableName: RECIPES_TABLE,
		Item: {
			recipeShortName: recipeShortName,
			name: name,
		},
	};

	dynamoDb.put(params, (error) => {
		if (error) {
			console.log(error)
			res.status(400).json({ error: 'Could not add recipe' })
		}
		res.json({ recipeShortName, name })
	})

})

module.exports.handler = serverless(app);