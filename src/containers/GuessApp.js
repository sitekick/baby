import React, { Component, PropTypes } from 'react';
import Header from '../components/Header/Header';
import Input from '../components/modes/Input/Input';
import Help from '../components/modes/Help';
import Settings from '../components/modes/Settings';
import BodyClass from '../components/library/BodyClass';
import update from 'immutability-helper';
import axios from 'axios';

export default class GuessApp extends Component{
	
	constructor(props){
		
		super(props);
		
		this.state = {
			settings : {},
			guesses : {},
			display : {
				currentIndex : 0,
				modes : ['input','help','settings']
			}
		}
		
		this.mount = {
			stateDefaults: () => {
				let delta = update(this.state, {
					settings : { $set : props.data.settings },
					guesses : { $set : props.data.guesses }
				})
				
			this.setState(delta)
			}
		}
		this.methods = {
			Input : {
				onGuessRemove : index => {
					let delta = update(this.state, {
						guesses : {$splice : [[index, 1]]}
					})
					this.setState(delta);
					this.helpers.saveJSON();
				},
				onGuessAdd : guess => {
					let delta = update(this.state, {
						guesses : {$push : [guess]},
					})
					this.setState(delta);
					this.helpers.saveJSON();
				}
			},
			Settings : {
				saveSettings : updatedSettings => {
					this.state.settings = updatedSettings;
					this.setState(this.state);
					
					this.helpers.saveJSON();
				}
			},
			components : {
				changeMode : (source, target) => {
					//this.state.display.currentIndex = this.state.display.modes.findIndex( (display)=>{ return display === target}) 
					//this.setState(this.state);
					
					let delta = update(this.state, {
						display : {
							currentIndex : { $set : this.state.display.modes.findIndex( (display)=>{ return display === target}) }
						}
					})
					this.setState(delta);
				}
			}
		}
		this.helpers = {
			saveJSON : () => {
				var data = Object.assign({},{settings : this.state.settings}, {guesses : this.state.guesses});
				var newDataString = JSON.stringify(data);
			   
			   axios.post('inc/process.php', newDataString)
			   .then( response => {
				   //console.log(response);
			   })
			   .catch( error => {
				   console.log(error)
			   })
			   
			}
		}
	}
	
	componentWillMount() {
		this.mount.stateDefaults()
	}
	
	componentDidMount() {
		//console.log('mount', this.state.settings)
	}
	
/*
	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextState.settings)
		
		return true;
	}
*/
	
	
	render(){
		
		return (
			<BodyClass sniffUA={true} addClasses='pink' >
			<div className="wrapper">
				<Header appSettings={this.state.settings} menuMenuSelect={this.methods.components.changeMode} />
				{/* INPUT */}
				{this.state.display.modes[this.state.display.currentIndex] === 'input' &&
					<Input 
					appSettings={this.state.settings}
					guessTableBabyGuesses={this.state.guesses}
					guessTableAlterGuesses={this.methods.Input.onGuessRemove} 
					guessFormGuessMode={this.state.mode}
					guessFormOnAdd={this.methods.Input.onGuessAdd}
					/>
				}
				{/* HELP */}
				{this.state.display.modes[this.state.display.currentIndex] === 'help' &&
					<Help closeButtonClickAction={this.methods.components.changeMode} />
				}
				{/* SETTINGS */}
				{this.state.display.modes[this.state.display.currentIndex] === 'settings' &&
					<Settings appSettings={this.state.settings} closeButtonClickAction={this.methods.components.changeMode} settingsSubmit={this.methods.Settings.saveSettings}/>
				}
								
			</div>
			</BodyClass>
		);
	}
}