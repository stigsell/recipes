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