import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Import components from other files
import AddRecipeForm from './AddRecipeForm';

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

class AddRecipe extends Component {
  state = {
  	name: "",
  	ingredients: [],
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return(
	  	<div className={this.props.classes.root}>
	      <Grid container spacing={24}>
	        <Grid item xs={2}>
	          <Paper className={this.props.classes.paper}>
	          	<Typography variant="h4" color="inherit">Add Recipe</Typography>
	          </Paper>
	        </Grid>
	        <Grid item xs={10}>
	          <Paper className={this.props.classes.paper}>
	          	<Typography variant="h4" color="inherit">|</Typography>
	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={this.props.classes.paper}>xs=2</Paper>
	        </Grid>
	        <Grid item xs={8}>
	          <Paper className={this.props.classes.paper}>
	          	<AddRecipeForm />
	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={this.props.classes.paper}>xs=2</Paper>
	        </Grid>
	        <Grid item xs={4}>
	          <Paper className={this.props.classes.paper}>xs=4</Paper>
	        </Grid>
	        <Grid item xs={4}>
	          <Paper className={this.props.classes.paper}>xs=4</Paper>
	        </Grid>
	        <Grid item xs={4}>
	          <Paper className={this.props.classes.paper}>xs=4</Paper>
	        </Grid>
	      </Grid>
		</div>
    	);
  }
}

AddRecipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecipe);