import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'none',
  },
  textField: {
  	width: 250,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  addRecipeDropdown: {
  	width: 250,
  },
});

const categories = [
  {
    value: 'Breakfast'
  },
  {
    value: 'Lunch'
  },
  {
    value: 'Dinner'
  },
]

class AddRecipeForm extends Component {
  state = {
  	open: true,
  	name: "",
  	category: "",
  	ingredients: [],
  	ingredientText: "",
  	steps: [],
  	stepText: "",
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

  };

  onChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  onChangeCategory = (event) => {
    this.setState({category: event.target.value});
  }

  onChangeIngredient = (event) => {
    this.setState({ingredientText: event.target.value});
  }

  onChangeStep = (event) => {
    this.setState({stepText: event.target.value});
  }

  addIngredient = (e) => {
  	e.preventDefault();
  	if(this.state.ingredientText.length > 0) {
  		this.state.ingredients.push(this.state.ingredientText)
  		console.log(this.state.ingredients)
  		this.setState({ingredientText: ""});
  	}
  	console.log(this.state)
  }

  addStep = (e) => {
  	e.preventDefault();
  	if(this.state.stepText.length > 0) {

  		this.state.steps.push(this.state.steps.length + 1 +  ". " + this.state.stepText);  // Add numbers to steps
  		console.log(this.state.steps)
  		this.setState({stepText: ""});
  	}
  	console.log(this.state)
  }

  sendRecipeData = () => {
  	// event.preventDefault();
  	console.log('hello')
  	console.log(this.state)
  	console.log(this)

  	const body = {
      recipeShortName: this.state.name,
      name: this.state.name,
      category: this.state.category,
      ingredients: JSON.stringify(this.state.ingredients),
      steps: JSON.stringify(this.state.steps),
    };
    console.log(body);
    axios.post('https://lf2ekvkoh6.execute-api.us-east-1.amazonaws.com/dev/recipes', { body })  // http://localhost:3000/recipes
    .then(res => {
    	console.log(res);
        console.log(res.data);
    })
  }


  render() {
    return(
	  	<div className={this.props.classes.root}>
	      <Grid container spacing={24}>
  			<Grid container spacing={24}>
  				<Grid item sm={10} md={3}>
	      			<Typography variant="h4" color="default">Add Recipe</Typography>
	      		</Grid>
	      		<Grid item md={7}>
	      		</Grid>
	      		<Grid item sm={2} md={2}>
			        <Button variant="contained" component="span" color="secondary" className={this.props.classes.button} onClick={this.sendRecipeData}>
			          Submit
			        </Button>
			    </Grid>
			</Grid>
			<Grid item sm={10}>
	      	<List>
	      		<ListItem>
	      			<ListItemText primary="Recipe Info"></ListItemText>
	      		</ListItem>
	      		<ListItem>
	      			<TextField
			          id="outlined-dense"
			          label="Recipe name"
			          className={'add-recipe-text-field'}
			          onChange={this.handleChange('name')}
			          margin="dense"
			          variant="outlined"
			        />
		        </ListItem>
		        <ListItem>
			        <TextField
			          id="outlined-select-category"
			          select
			          label="Category"
			          className={'addRecipeDropdown'}
			          value={this.state.category}
			          onChange={this.handleChange('category')}
			          SelectProps={{
			            MenuProps: {
			              className: this.props.classes.menu,
			            },
			          }}
			          helperText="Select recipe category"
			          margin="normal"
			          variant="outlined"
			        >
			          {categories.map(option => (
			            <MenuItem key={option.value} value={option.value}>
			              {option.value}
			            </MenuItem>
			          ))}
			        </TextField>
		        </ListItem>
		        <form onSubmit={(e) => { e.preventDefault(); this.addIngredient(e); } }>
			        <ListItem>
		      			<ListItemText primary="Ingredients"></ListItemText>
		      			
		      		</ListItem>
		      		 <ListItem>
			          <TextField
				          id="outlined-dense"
				          label="Ingredient name"
				          className={'add-recipe-text-field'}
				          margin="dense"
				          variant="outlined"
				          onChange={this.onChangeIngredient}
				          value={this.state.ingredientText}
				        />
				        <Button size="large" disabled={this.state.ingredientText === 0} onClick={this.addIngredient}>+</Button>
			        </ListItem>
			        {
      					this.state.ingredients.map((ingredient, index) => <ListItem key={index}>{ingredient}</ListItem>)
    				}
    			</form>
    			<form onSubmit={(e) => { e.preventDefault(); this.addStep(e); } }>
    				<ListItem>
		      			<ListItemText primary="Steps"></ListItemText>
		      		</ListItem>
		      		<ListItem>
			          <TextField
				          id="outlined-dense"
				          label="Instructions for this step"
				          className={'add-recipe-text-field'}
				          margin="dense"
				          variant="outlined"
				          onChange={this.onChangeStep}
				          value={this.state.stepText}
				        />
				        <Button size="large" disabled={this.state.stepText === 0} onClick={this.addStep}>+</Button>
			        </ListItem>
		      		{
      					this.state.steps.map((step, index) => <ListItem key={index}>{step}</ListItem>)
    				}
    				<ListItem>
		      		<input
				        accept="image/*"
				        className={this.props.classes.input}
				        id="outlined-button-file"
				        multiple
				        type="file"
				      />
				      <label htmlFor="outlined-button-file">
				        <Button variant="outlined" component="span" className={this.props.classes.button}>
				          Upload Photo
				        </Button>
				      </label>
	      		</ListItem>
			    </form>
	      	</List>
	      	</Grid>
	      </Grid>
		</div>
    	);
  }
}

AddRecipeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecipeForm);