# Recipes

## To-Dos
- ~~Create RecipeCard component and place them on homepage~~
- ~~Create ViewRecipe component that loads when you click on a recipe (or go to /recipe/recipe-name)~~
- Change theme primary color to green
- ~~Clean up layout of add-recipe (category dropdown is shifted right, maybe move up upload button)~~
- ~~Initialize backend API using AWS Lambda running Node.JS, DynamoDB, and API Gateway~~
- Connect React frontend to API
- ~~Deploy frontend to S3 bucket~~
- ~~Create CI/CD pipeline for deploy~~
- Set up linter, tests
- Better processing of numeric ingredient amounts
- Autocomplete ingredients
- Mealplan feature: Add meals to "shopping cart", then all ingredients are displayed for all meals
- PDF printing of recipes
- Protected admin console to edit/delete recipes

### Small Things
- Prevent 'not-found' from being a recipe name (used for 404)
- Make typography inside recipe card not underlined for link
- Create 'not-found' route that routes to specific page (right now it routes to viewrecipe)
- Reorganize source folder

## Scripts to Run

### Frontend

### yarn start

Must be inside /api.  Starts local server for frontend on localhost:3000

### yarn build

Must be inside /api.  Builds frontend for production.

### yarn deploy

Must be inside /api.  Deploys frontend to AWS using S3.


### Backend

### sls deploy

Must be inside /api.  Deploys backend to AWS using CloudFormation.

### sls offline start

Must be inside /api.  Starts offline server for backend on localhost:3000.

### sls dynamodb install

Must be inside /api.  Sets up DynamoDB table for offline. Should only need to run once.

## Other Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

