import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
  },
});

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.classes = styles;
	}
	render() {
		return (
			<footer className={this.props.classes.footer}>
		        <Typography variant="h6" align="center" gutterBottom>
		        </Typography>
		        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
		          ©2020 Created by <a href="http://github.com/stigsell">Nick Stigsell</a> using <a href="http://reactjs.org">React</a> with <a href="http://material-ui.com">Material-UI</a>.
		        </Typography>
		    </footer>
		)
	}
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);