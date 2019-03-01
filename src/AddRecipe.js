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

const styles = theme => ({
	root: {
	    ...theme.mixins.gutters(),
	    paddingTop: theme.spacing.unit * 2,
	    paddingBottom: theme.spacing.unit * 2,
  	},
  	container: {
    	display: 'flex',
    	flexWrap: 'wrap',
  	},
  	textField: {
    	marginLeft: theme.spacing.unit,
    	marginRight: theme.spacing.unit,
  	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
});

class AddRecipe extends Component {
  state = {
  	name: "",
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return(
          // <div className={this.props.classes.layout}>
          <div>
          	<Paper className={this.props.classes.root} elevation={1}>
            	<Grid container spacing={16}>
            		<Grid item xs={12}>
	              		<Typography component="h1" variant="h2">Add Recipe</Typography>

	              		<form className={this.props.classes.container} noValidate autoComplete="off">
	              			<TextField
					        	id="standard-with-placeholder"
					        	label="Name"
					        	className={this.props.classes.textField}
					        	value={this.state.name}
					        	onChange={this.handleChange('name')}
					        	margin="normal"
					        	variant="outlined"
					        />
              			</form>
              		</Grid>
            	</Grid>
            </Paper>
          </div>
          // </div>
    	);
  }
}

AddRecipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecipe);