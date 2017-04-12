import React, { Component, PropTypes } from 'react';
import BabyImage from './BabyImage';
import ErrorMessage from '../../library/ErrorMessage';
import Validation from '../../library/Validation';
import SimpleDatePicker from '../../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../../library/WeightDisplay';
import LockIcon from '../../library/LockIcon';
import update from 'immutability-helper';

export default class GuessForm extends Component {
		
		constructor(props) {
		
			super(props);
			
			this.state = {
				birthGuess : {},
				settings : {},
				valid : {}
			}
			
			this.mount = {
				stateDefaults : () => {
					//preset birth details
					const presets = this.props.appSettings.birthDetails;
					//save
					let delta = update(this.state, {
						birthGuess : {
							name : { $set : '' },
							gender : { $set : this.helpers.isGuessable('gender') ? '' : presets.gender }, 
							weight : { $set : this.helpers.isGuessable('weight') ? 0 : presets.weight },
							date : { $set : this.helpers.isGuessable('date') ? this.helpers.defaultDateObj() : presets.date }
						},
						settings : { $merge : props.appSettings },
						valid : { $merge : {}}
					})
					this.setState(delta);
				}
			}
			this.handlers = {
				onChange : {
					field : e => {
						var field =	{
							name : e.target.name,
							type : e.target.type,
							value : e.target.value
						}
				
						let delta = update(this.state, {
							birthGuess : {
								[field.name] : { $set : field.value}
							}
						})
						
						this.setState(delta)
					}
				},
				onSubmit : e => {
					e.preventDefault()
					
					if(!this.helpers.allFieldsValid()) {
						return
					}
					
					this.props.onAdd(this.state.birthGuess)
					this.mount.stateDefaults()
				}
			}
			this.methods = {
				SimpleDatePicker :{
					onChangeDate : (segment, value) => {
						
						let delta = update(this.state, {
							birthGuess : {
								date : { 
									[segment] : {$set : value}
								}
							}
						})
						this.setState(delta)
					}
				},
				Validation : {
					isValid : (field, bool) => {
						
						this.setState((prevState, props) => ({
							valid : Object.assign(prevState.valid, {[field] : bool})
						}));
					}
				}
			}
			this.helpers = {
				isGuessable : detail => {
					return this.props.appSettings.birthDetails.guessable.indexOf(detail) >= 0 
				},
				defaultDateObj : () => {
				
					var now = new Date()
					
					return { month : now.getMonth(), day : now.getDate(), year : now.getFullYear() }
					
				},
				allFieldsValid : () => {
					
					let bool = true
					
					for(let error in this.state.valid){
						if(this.state.valid[error] === false){
							bool = false
							break
						}
					}
					return bool;
				}
			}
		}
		
		componentWillMount(){
			this.mount.stateDefaults();
		}
		
		render() {
			
			return (
				<div className="guess-form panel">
					<h3>Enter your Guess about this Baby</h3>
					<div className="flex-wrapper">
					<div className="image flex-item">
						<BabyImage gender={this.state.birthGuess.gender} ounces={this.state.birthGuess.weight} />
						<WeightDisplay weightOz={this.state.birthGuess.weight} displayBlock={true}/>
					</div>
					<div className="inputs flex-item">
						<form onSubmit={this.handlers.onSubmit}>
						{/* Gender */}
						<div className="input-wrapper"><p>Gender</p>
							<Validation fieldName="gender" messageContent="Select a gender" validationMethod="selection" isValid={this.methods.Validation.isValid}>	
								<input id="gender-boy" checked={(this.state.birthGuess.gender == 'boy')} name="gender" type="radio" value="boy" onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('gender')} />
								<label htmlFor="gender-boy">Boy </label>
								<input id="gender-girl" checked={(this.state.birthGuess.gender == 'girl')} name="gender" type="radio" value="girl" onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('gender')} />
								<label htmlFor="gender-girl">Girl</label> <LockIcon display={!this.helpers.isGuessable('gender') ? 'lavendar' : 'off'}/>
								</Validation>
						</div>
						{/* Weight */}
						<div className="input-wrapper"><p>Weight</p>
							<Validation fieldName="weight" messageContent="Select the weight" validationMethod="change" isValid={this.methods.Validation.isValid}>	
							<input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.birthGuess.weight} onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('weight')} /> <LockIcon display={!this.helpers.isGuessable('weight') ? 'lavendar' : 'off'}/>
								</Validation>
							</div>
							{/* Date */}
						<div className="input-wrapper"><p>Date</p>
							<SimpleDatePicker componentName="guessFormDate" startDate={this.state.birthGuess.date} onChangeDate={this.methods.SimpleDatePicker.onChangeDate} selectMode="MD" disableComponent={!this.helpers.isGuessable('date')} validationMethod="touch" messageContent="Select the date" isValid={ this.methods.Validation.isValid }/> 
							<LockIcon display={!this.helpers.isGuessable('date') ? 'lavendar' : 'off'}/>
						</div>
								{/* Name */}
						<div className="input-wrapper submit">
							<Validation fieldName="name" messageContent="Enter your name" validationMethod="nonblank" isValid={this.methods.Validation.isValid}>
							<input id="name" name="name" type="text" value={this.state.birthGuess.name} placeholder="Your Name" onChange={this.handlers.onChange.field} />
							</Validation>
								{/* Submit */}
							<input id="submit" type="submit" value="Submit" disabled={!this.helpers.allFieldsValid()}/>
						</div>
					</form>
					</div>
					</div>
				</div>
			)
		}
}

GuessForm.propTypes = {
	onAdd : PropTypes.func.isRequired
}