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
			const {recipeShortName, name, category, ingredients, steps } = result.Item;
			res.json({ recipeShortName, name, category, ingredients, steps });
		} else {
			res.status(404).json({ error: 'Recipe not found' });
		}
	});
})

//Add Recipe Endpoint
app.post('/recipes', function (req, res) {
	// const { recipeShortName, name } = req.body;
	console.log(req);
	const name = req.query.name;
	const recipeShortName = slugify(name); // Make recipeShortName URL-friendly
	const category = req.query.category;
	const ingredients = req.query.ingredients;
	const steps = req.query.steps;
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

	dynamoDb.put(params, (error) => {
		if (error) {
			console.log(error)
			res.status(400).json({ error: 'Could not add recipe' })
		}
		res.json({ recipeShortName, name, category, ingredients, steps })
	})

})

module.exports.handler = serverless(app);