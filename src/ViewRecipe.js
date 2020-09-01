import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

// Import components from other files

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

class ViewRecipe extends Component {
  state = {
  	name: "",
  	ingredients: [],
    steps: [],
    apiData: "",
    recipeShortName: ""
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    console.log('router route')
    console.log(this.props.location)
    const path = this.props.location.pathname;
    let recipePath = path.substring(0,7) + 's/' + path.substring(8)
    console.log(recipePath)
    axios.get('https://bqdu4pltqh.execute-api.us-east-1.amazonaws.com/dev' + recipePath)  // http://localhost:3000
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ name: res.data.name });
        this.setState({ category: res.data.category });
        console.log(res.data.ingredients)
        console.log(JSON.parse(res.data.ingredients))
        if (typeof res.data.ingredients !== 'undefined') {
          this.setState({ ingredients: JSON.parse(res.data.ingredients)});
        }
        if (typeof res.data.steps !== 'undefined') {
          this.setState({ steps: JSON.parse(res.data.steps)});
        }
        if (typeof res.data.recipeShortName !== 'undefined') {
          this.setState({ recipeShortName: res.data.recipeShortName});
        }
        
      })
  }

  render() {
    return(
	  	<div className={this.props.classes.root}>
	      <Grid container spacing={24}>
	        <Grid item md={2}>
	        </Grid>
	        <Grid item sm={12} md={8}>
	          <Paper className={this.props.classes.paper}>
    	        <Grid container spacing={24}>
                <Grid item md={4}>
                    <Typography variant="h4" color="default">{this.state.name}</Typography>
                    <Image src={'https://recipes-photos-dev.s3.amazonaws.com/' + this.state.recipeShortName + '.jpg'} />
                  </Grid>
                  <Grid item xs={12} md={8}>
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

ViewRecipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewRecipe);