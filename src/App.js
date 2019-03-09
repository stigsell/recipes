import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';


// Components in other files
import Menu from './Menu'
import Main from './Main'
import Footer from './Footer'

const styles = theme => ({
  
});



function Album(props) {
  // const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Menu />
      <Main />
      <Footer />
    </React.Fragment>
  );
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);