import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, red, grey } from '@material-ui/core/colors';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'none',
  },
  textField: {
  	width: 250,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  addRecipeDropdown: {
  	width: 350,
  },
  spacing: 4
});

const categories = [
  {
    value: 'Breakfast'
  },
  {
    value: 'Lunch'
  },
  {
    value: 'Dinner'
  },
]

class AddRecipeForm extends Component {
  state = {
  	open: true,
  	name: "",
  	category: "",
  	ingredients: [],
  	ingredientText: "",
  	steps: [],
  	stepText: "",
    photoUploadStatus: "PENDING",
    url: ""
  }

  // Source: https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
  slugify = (string) => {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
    const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with ‘and’
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

  };

  handleUploadChange = (ev) => {
    console.log("handleUploadChange")
    this.setState({success: false, url : ""});
    
  }

  onChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  onChangeCategory = (event) => {
    this.setState({category: event.target.value});
  }

  onChangeIngredient = (event) => {
    this.setState({ingredientText: event.target.value});
  }

  onChangeStep = (event) => {
    this.setState({stepText: event.target.value});
  }

  addIngredient = (e) => {
  	e.preventDefault();
  	if(this.state.ingredientText.length > 0) {
  		this.state.ingredients.push(this.state.ingredientText)
  		this.setState({ingredientText: ""});
  	}
  }

  removeIngredient = (ingredient) => {
    const index = this.state.ingredients.indexOf(ingredient);
    if (index > -1) {
      const newIngredients = this.state.ingredients.filter((ing) => ing !== ingredient)
      this.setState({ingredients: newIngredients})
    }
  }

  addStep = (e) => {
  	e.preventDefault();
  	if(this.state.stepText.length > 0) {

  		this.state.steps.push(this.state.steps.length + 1 +  ". " + this.state.stepText);  // Add numbers to steps
  		this.setState({stepText: ""});
  	}
  }

  removeStep = (step) => {
    const index = this.state.steps.indexOf(step);
    if (index > -1) {
      const newSteps = this.state.steps.filter((s) => s !== step)
      this.setState({steps: newSteps})
    }
  }

  sendRecipeData = () => {
  	// event.preventDefault();
  	console.log(this.state)
  	console.log(this)

  	const body = {
      recipeShortName: this.state.name,
      name: this.state.name,
      category: this.state.category,
      ingredients: JSON.stringify(this.state.ingredients),
      steps: JSON.stringify(this.state.steps),
    };
    console.log(body);
    axios.post('https://bqdu4pltqh.execute-api.us-east-1.amazonaws.com/dev/recipes', { body })  // http://localhost:3000/recipes
    .then(res => {
      if(res.status === 200){
        console.log("Successfully added recipe");
        console.log(res);
        if(window.location.host == "localhost:3001"){
          window.location.replace("http://localhost:3001"); 
        } else {
          window.location.replace("http://recipes.stig.co");
        }
        
      } else {
        console.log("Error adding recipe");
        console.log(res);
      }
    	
        console.log(res.data);
    })
  }

  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileExtension = fileParts[1];
    let data = new FormData();
    for (var i = 0; i < this.uploadInput.files.length; i++) {
        let file = this.uploadInput.files.item(i);
        data.append('images[' + i + ']', file, file.name);
    }
    console.log('fileName before')
    console.log(fileName)
    fileName = this.slugify(this.state.name)
    fileExtension = 'jpg'
    console.log(fileName)
    console.log(fileExtension)
    console.log(file)
    
    axios.post("https://bqdu4pltqh.execute-api.us-east-1.amazonaws.com/dev/uploadphoto",{  // http://localhost:3000
      fileName : fileName+'.'+fileExtension,
      fileType : 'image/'+fileExtension
    })
    .then(response => {
      console.log(response)
      var presignedURL = response.data.data.returnData.signedRequest;
      var fileURL = response.data.data.returnData.url;
      this.setState({photoUrl: fileURL})
     // Put the fileExtension in the headers for the upload
      var options = {
        headers: {
          'Content-Type': 'image/'+fileExtension
        }
      };
      console.log(presignedURL)
      console.log(file)
      console.log(options)
      axios.put(presignedURL, file, options)
      .then(result => {
        console.log("Successful photo upload")
        this.setState({photoUploadStatus: "SUCCESS"});
      })
      .catch(error => {
        console.error(error);
        this.setState({photoUploadStatus: "FAILURE"});
      })
    })
    .catch(error => {
      console.error(error);
      this.setState({photoUploadStatus: "FAILURE"});
    })
  }


  render() {
    return(
	  	<div className={this.props.classes.root}>
	      <Grid container spacing={24}>
  			<Grid container spacing={24}>
  				<Grid item sm={10} md={3}>
	      			<Typography variant="h4" color="default">Add Recipe</Typography>
	      		</Grid>
	      		<Grid item md={7}>
	      		</Grid>
	      		<Grid item sm={2} md={2}>
			        <Button variant="contained" component="span" color="secondary" className={this.props.classes.button} onClick={this.sendRecipeData}>
			          Submit
			        </Button>
			    </Grid>
			</Grid>
			<Grid item sm={10}>
	      	<List>
	      		<ListItem>
	      			<ListItemText primary="Recipe Info"></ListItemText>
	      		</ListItem>
	      		<ListItem>
	      			<TextField
			          id="standard-dense"
			          label="Recipe name"
			          className={'add-recipe-text-field'}
			          onChange={this.handleChange('name')}
			          fullWidth
			          margin="dense"
			        />
		        </ListItem>
		        <ListItem>
			        <TextField
			          id="standard-select-category"
			          select
			          label="Category"
			          className={'addRecipeDropdown'}
			          value={this.state.category}
			          onChange={this.handleChange('category')}
			          SelectProps={{
			            MenuProps: {
			              className: this.props.classes.menu,
			            },
			          }}
			          helperText="Select recipe category"
			          margin="normal"
			        >
			          {categories.map(option => (
			            <MenuItem key={option.value} value={option.value}>
			              {option.value}
			            </MenuItem>
			          ))}
			        </TextField>
		        </ListItem>
		        <form onSubmit={(e) => { e.preventDefault(); this.addIngredient(e); } }>
			        <ListItem>
		      			<ListItemText primary="Ingredients"></ListItemText>
		      			
		      		</ListItem>
		      		 <ListItem>
			          <TextField
				          id="standard-dense"
				          label="Ingredient name"
				          className={'add-recipe-text-field'}
				          margin="dense"
				          fullWidth
				          onChange={this.onChangeIngredient}
				          value={this.state.ingredientText}
				        />
				        <Button size="large" disabled={this.state.ingredientText === 0} onClick={this.addIngredient}>+</Button>
			        </ListItem>
			        {
      					this.state.ingredients.map((ingredient, index) => { return(
                  <React.Fragment>
                    <ListItem key={index}>{ingredient}
                      <IconButton aria-label="delete" disableRipple="true" onClick={() => this.removeIngredient(ingredient)}>
                        <DeleteIcon fontSize="medium" style={{ color: grey[500] }} />
                      </IconButton>
                     </ListItem>
                  </React.Fragment>
                )})
    				  }
    			</form>
    			<form onSubmit={(e) => { e.preventDefault(); this.addStep(e); } }>
    				<ListItem>
		      			<ListItemText primary="Steps"></ListItemText>
		      	</ListItem>
	      		<ListItem>
		          <TextField
			          id="standard-multiline-flexible"
			          label="Instructions for this step"
			          className={'add-recipe-text-field'}
			          margin="dense"
			          fullWidth
			          onChange={this.onChangeStep}
			          value={this.state.stepText}
			        />
			        <Button size="large" disabled={this.state.stepText === 0} onClick={this.addStep}>+</Button>
		        </ListItem>
	      		{
    					this.state.steps.map((step, index) => { return(
                <React.Fragment>
                  <ListItem key={index}>{step}
                    <IconButton aria-label="delete" disableRipple="true" onClick={() => this.removeStep(step)}>
                        <DeleteIcon fontSize="medium" style={{ color: grey[500] }} />
                    </IconButton>
                  </ListItem>
                </React.Fragment>
                )})
  				  }
          </form>
          <form onSubmit={(e) => { e.preventDefault(); this.handleUpload(e); } }>
    				<ListItem>
  	      		<input
  			        accept="image/*"
  			        className={this.props.classes.input}
  			        id="outlined-button-file"
  			        multiple
  			        type="file"
                onChange={this.handleUpload}
                ref={(ref) => { this.uploadInput = ref; }}
  			      />
            </ListItem>
            <ListItem>
				      <label htmlFor="outlined-button-file">
				        <Button variant="outlined" component="span" className={this.props.classes.button}>
				          Upload Photo
				        </Button>
				      </label>
              {
                this.state.photoUploadStatus === "SUCCESS" ? <CheckIcon fontSize="large" style={{ color: green[500] }} /> : null
              }
              {
                this.state.photoUploadStatus === "FAILURE" ? <CloseIcon fontSize="large" style={{ color: red[500] }} /> : null
              }
	      		</ListItem>
			    </form>
	      	</List>
	      	</Grid>
	      </Grid>
		</div>
    	);
  }
}

AddRecipeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRecipeForm);