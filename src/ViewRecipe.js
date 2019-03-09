import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
  	ingredients: ["2 avocados", "onion", "cilantro",],
    steps: ["1. Mash avocados", "2. Cut onions", "3. Mix and enjoy!"],
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
	        <Grid item md={2}>
	        </Grid>
	        <Grid item sm={8} md={8}>
	          <Paper className={this.props.classes.paper}>
    	        <Grid container spacing={24}>
                <Grid item ={4}>
                    <Typography variant="h4" color="default">Recipe Name</Typography>
                    <Image src="https://www.culinaryhill.com/wp-content/uploads/2015/01/Chipotle-Guacamole-9-660x989.jpg" />
                  </Grid>
                  <Grid item xs={8}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Ingredients"></ListItemText>
                      </ListItem>
                        {
                          this.state.ingredients.map((ingredient, index) => <ListItem key={index}>- {ingredient}</ListItem>)
                        }
                      <ListItem>
                        <ListItemText primary="Steps"></ListItemText>
                      </ListItem>
                        {
                          this.state.steps.map((step, index) => <ListItem key={index}>{step}</ListItem>)
                        }
                    </List>
                  </Grid>
            </Grid>
	          </Paper>
	        </Grid>
	        <Grid item md={2}>
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