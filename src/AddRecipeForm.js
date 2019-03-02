import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class AddRecipeForm extends Component {
  state = {
  	open: true,
  	name: "",
  	ingredients: [],
  	ingredientText: "",
  }

  onChange = (event) => {
    this.setState({ingredientText: event.target.value});
  }

  addIngredient = (e) => {
  	e.preventDefault();
  	this.state.ingredients.push(this.state.ingredientText)
  	console.log(this.state.ingredients)
  	this.setState({ingredientText: ""});
  }


  render() {
    return(
	  	<div className={this.props.classes.root}>
	      <Grid container spacing={24}>
	      	<List>
	      		<ListItem>
	      			<ListItemText primary="Name"></ListItemText>
	      		</ListItem>
	      		<ListItem>
	      			<TextField
			          id="outlined-dense"
			          label="Recipe name"
			          className={'name-text-field'}
			          margin="dense"
			          variant="outlined"
			        />
		        </ListItem>
		        <form onSubmit={(e) => { e.preventDefault(); this.addIngredient(e); } }>
			        <ListItem>
		      			<ListItemText primary="Ingredients"></ListItemText>
		      			<Button size="large" onClick={this.addIngredient}>+</Button>
		      		</ListItem>
		      		 <ListItem>
			          <TextField
				          id="outlined-dense"
				          label="Ingredient name"
				          className={'ingredient-text-field'}
				          margin="dense"
				          variant="outlined"
				          onChange={this.onChange}
				          value={this.state.ingredientText}
				        />
			        </ListItem>
			        {
      					this.state.ingredients.map((ingredient, index) => <ListItem key={index}>{ingredient}</ListItem>)
    				}
			    </form>
	      	</List>
	      </Grid>
		</div>
    	);
  }
}

AddRecipeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecipeForm);