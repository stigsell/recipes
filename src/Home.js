import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


// Import other components
import RecipeCard from './RecipeCard'



const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
});

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.classes = styles;
  }

  state = {
    cards: [],
  }

  componentDidMount() {
    axios.get('https://lf2ekvkoh6.execute-api.us-east-1.amazonaws.com/dev/allRecipes')  //http://localhost:3000/allRecipes
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ cards: res.data.result.Items });
        console.log(this.state.cards)
      })
  }
  render() {
    return (
        <main>
          {/* Hero unit */}
          <div className={this.props.classes.heroUnit}>
            <div className={this.props.classes.heroContent}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Recipes
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                These are some of my favorite recipes. Enjoy!
              </Typography>
              
            </div>
          </div>
          <div className={classNames(this.props.classes.layout, this.props.classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {this.state.cards.map(card => (
                // <Grid item xs={12} sm={6} md={4} lg={3}>
                  <RecipeCard card={card} name={card.name} recipeShortName={card.recipeShortName} />
                // </Grid>
              ))}
            </Grid>
          </div>
        </main>
      )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
