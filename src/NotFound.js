import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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

class NotFound extends Component {
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
	        </Grid>
	        <Grid item xs={8}>
	          <Paper className={this.props.classes.paper}>
              <Typography variant="h4" color="default">Recipe Not Found</Typography>
	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	        </Grid>
	      </Grid>
		</div>
    	);
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);