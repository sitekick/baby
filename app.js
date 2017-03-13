import React from 'react';
import ReactDOM from 'react-dom';
import GuessApp from './src/containers/GuessApp';

//CSS Theme
require("./src/scss/styles.scss");

(function() {
	
	var xhr = new XMLHttpRequest();
	var url = 'src/data/babyGuesses.json';
	
	if(!xhr) {
		ReactDOM.render(<p>Could not load data</p>, document.getElementById('app'));
	} else {
		xhr.onreadystatechange = _loadData;
		xhr.open('GET', url);
		xhr.send();
	}
	
	function _loadData() {
		
		if(xhr.readyState === xhr.DONE) {
			
			if(xhr.status === 200){
				var data = JSON.parse(xhr.responseText);
				ReactDOM.render(<GuessApp data={data} />, document.getElementById('app'));
			}
		}
	}
	
})()