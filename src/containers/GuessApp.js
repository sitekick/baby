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
			settings : {
				appStatus: props.data.settings.appStatus,
				authKey: props.data.settings.authKey,
				header: props.data.settings.header,
				message: props.data.settings.message,
				dueDate: {},
				birthDetails: {
					guessable: props.data.settings.birthDetails.guessable,
					gender: props.data.settings.birthDetails.gender,
					weight: props.data.settings.birthDetails.weight,
					date: {}
				},
				edit : props.data.settings.edit
			},
			guesses : {},
			display : {
				currentIndex : 0,
				modes : ['input','help','settings']
			}
		}
		
		this.mount = {
			stateDefaults : () => {
				//due date
				let dueDateDefault;
				if (!Object.keys(this.props.data.settings.dueDate).length) {
					let today = new Date();
					dueDateDefault = { year : today.getFullYear(), month : today.getMonth(), day : today.getDate() }
				} else {
					dueDateDefault = this.props.data.settings.dueDate;
				}
				//birth details date
				let birthDetailsDateDefault;
				if (Object.keys(this.props.data.settings.birthDetails.date).length > 0 ){
					birthDetailsDateDefault = this.props.data.settings.birthDetails.date;
				} else {
					birthDetailsDateDefault = Object.keys(this.props.data.settings.dueDate).length > 0 && this.props.data.settings.dueDate || dueDateDefault;
				}
				//save
				let delta = update(this.state,{
					settings : {
						dueDate : { $set : dueDateDefault},
						birthDetails : {
							date : { $set : birthDetailsDateDefault}
						}
					},
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
					this.helpers.saveJSON(delta);
				},
				onGuessAdd : guess => {
					let delta = update(this.state, {
						guesses : {$unshift : [guess]},
					})
					this.setState(delta);
					this.helpers.saveJSON(delta);
				}
			},
			Settings : {
				saveSettings : updatedSettings => {
					//note: immutability helper $merge action would not update state
					this.setState( () => ({
						settings : Object.assign(this.state.settings, updatedSettings)
					}))
					const delta = Object.assign({}, {settings : updatedSettings}, {guesses : this.state.guesses});
					this.helpers.saveJSON(delta);
				}
			},
			components : {
				changeMode : (source, target) => {
				
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
			saveJSON : (data) => {
				var write = Object.assign({},{settings : data.settings}, {guesses : data.guesses});
				var newDataString = JSON.stringify(write);
			    
			   axios.post('inc/process.php', newDataString)
			   .catch( error => {
				   console.log(error)
			   })
			   
			}
		}
	}
	
	componentWillMount() {
		this.mount.stateDefaults()
	}
	
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
					<Settings {...this.state.settings} closeButtonClickAction={this.methods.components.changeMode} settingsSubmit={this.methods.Settings.saveSettings}/>
				}
								
			</div>
			</BodyClass>
		);
	}
}