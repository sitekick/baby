import React from 'react';
import {render} from 'react-dom';
import GuessApp from './src/containers/GuessApp';
import axios from 'axios';
import Modernizr from 'modernizr';

import 'babel-polyfill';

//CSS Theme
require("./src/scss/styles.scss");


axios.get('./src/data/babyGuesses.json')
.then( response => {
	render(<GuessApp data={response.data} />, document.getElementById('app'))
}).catch( error => {
	console.log(error)
	render(<p>Could not load data</p>, document.getElementById('app'))
});



