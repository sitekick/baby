import React, { Component, PropTypes } from 'react';

import Header from '../components/Header/Header';
import Input from '../components/modes/Input/Input';
import Help from '../components/modes/Help/Help';
import Settings from '../components/modes/Settings/Settings';

export default class GuessApp extends Component{
	
	constructor(props){
		
		super(props);
		
		this.state = {
			settings : props.data.settings,
			guesses : props.data.guesses,
			display : {
				currentIndex : 0,
				modes : ['input','help','settings']
			},
			mode : 'input',
			edit : {
				state : false,
				password : '',
				toggle : true
				},
			pending : null
		}
		
		this.onGuessAdd = this.onGuessAdd.bind(this);
		this.onGuessRemove = this.onGuessRemove.bind(this);
		this.guessRecorded = this.guessRecorded.bind(this); 
		this.saveJSON = this.saveJSON.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
		this.editMode = this.editMode.bind(this);
		this.saveSettings= this.saveSettings.bind(this);
	}
	
	guessRecorded(msg){
		console.log(msg);
	}
	
	editMode(clicked) {

		this.state.display.currentIndex = this.state.display.modes.findIndex( (display)=>{ return display === clicked})
		this.setState(this.state);
		
	}
	
	
	saveJSON(success){
		
		var data = Object.assign({},{settings : this.state.settings}, {guesses : this.state.guesses});
		
		var newDataString = JSON.stringify(data);
		var url = 'inc/process.php';
		
		var xhr = new XMLHttpRequest();
	    xhr.open('POST', url);
	    xhr.onreadystatechange = function() {
	        if (this.readyState==4 && this.status==200) { 
		        success(xhr.responseText); 
		    }
	    };
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.send(newDataString);
	   
	}

	saveSettings(updatedSettings){
		this.state.settings = updatedSettings;
		this.setState(this.state);
		//this.saveJSON(this.guessRecorded);
	}
	
	onGuessAdd(guess) {
		this.state.guesses.push(guess);
		this.setState(this.state);
		//this.saveJSON(this.guessRecorded);
	}
	
	onGuessRemove(index) {
		this.state.guesses.splice(index, 1);
		this.state.edit.state = false;
		this.setState(this.state);
	}
	
	onFieldChange(element, e) {
	
		switch(element) {
			case 'submit' :
			e.preventDefault();
			if(this.state.edit.password == 'yup')
				this.state.edit.state = true;
			case 'button' :
				this.state.edit.toggle = !this.state.edit.toggle;
			case 'password' :
				this.state.edit.password = e.target.value;
			default :
				this.setState(this.state);
		}
		
	}
	
	render(){
		
		const style = {
			wrapper : {
				maxWidth : 600,
				borderWidth: 3,
				borderStyle: "solid",
				margin: "2em auto"
			}
		}
		
		
		return (
			<div className="wrapper" style={style.wrapper}>
				
				<Header appSettings={this.state.settings} menuMenuSelect={this.editMode} />
				{/* INPUT */}
				{this.state.display.modes[this.state.display.currentIndex] === 'input' &&
					<Input 
					appSettings={this.state.settings}
					guessTableBabyGuesses={this.state.guesses}
					guessTableEditMode={this.state.edit}
					guessTableAlterGuesses={this.onGuessRemove} 
					guessFormGuessMode={this.state.mode}
					guessFormOnAdd={this.onGuessAdd}
					/>
				}
				{/* HELP */}
				{this.state.display.modes[this.state.display.currentIndex] === 'help' &&
					<Help closeButtonClickAction={this.editMode} />
				}
				{/* SETTINGS */}
				{this.state.display.modes[this.state.display.currentIndex] === 'settings' &&
					<Settings settingsData={this.state.settings} closeButtonClickAction={this.editMode} settingsFormSettingsSubmit={this.saveSettings}/>
				}
								
			</div>
		);
	}
}