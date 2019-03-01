import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  	flexGrow: 1,
  },
  grow: {
  	flexGrow: 1,
  },
});

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.classes = styles;
	}
	render() {
		return (
		<div className={this.props.classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Grid justify="space-between" container spacing={24}>
						<Grid item>
							<Typography variant="h6" color="inherit" className={this.props.classes.grow}>
								Recipes</Typography>
						</Grid>
						<Grid item>
							<Button color="secondary" variant="contained">Add Recipe</Button>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
		)
	}
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);