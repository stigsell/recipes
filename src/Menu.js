import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Router
import { Link } from 'react-router-dom'

import logo from './recipes.png';

const styles = theme => ({
  root: {
  	flexGrow: 1,
  },
  grow: {
  	flexGrow: 1,
  	textDecoration: 'none',
  },
  button: {
  	marginTop: 10
  }
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
							<Link to="/">
								<img 
						      		src={logo}
						      		alt="logo"
						      	/>
							</Link>
							
						</Grid>
						<Grid item>
							<Button color="secondary" className={this.props.classes.button} variant="contained" component={Link} to="/add-recipe">Add Recipe</Button>
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