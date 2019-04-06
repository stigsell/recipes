import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Routes
import { BrowserRouter } from 'react-router-dom';

const theme = createMuiTheme({
   palette: {
      primary: {
         light: '#fff',
         main: '#43a047',
         dark: '#000'
      },
      secondary: {
        main: '#1b5e20',
      },
   },
   typography: { 
      useNextVariants: true
   }
});

ReactDOM.render((
	<BrowserRouter>
		<MuiThemeProvider theme = { theme }>
			<App />
		</MuiThemeProvider>
	</BrowserRouter>
	), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
