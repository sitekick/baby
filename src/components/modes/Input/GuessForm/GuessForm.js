import React, { Component, PropTypes } from 'react';
import BabyImage from './BabyImage';
import ErrorMessage from '../../../library/ErrorMessage';
import Validation from '../../../library/Validation';
import SimpleDatePicker from '../../../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../../../library/WeightDisplay';
import LockIcon from '../../../library/LockIcon';
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
						//console.log(segment, value)
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
				
					var now = new Date();
					
					return {
						month : now.getMonth(), 
						day : now.getDate(), 
						year : now.getFullYear()
					};
					
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
		
		componentDidUpdate(){
			//console.log('valid2',this.state.valid)
		}
		
		render() {
			
			let headerText;
			if(this.state.settings.appStatus) {
				headerText = 'Enter your Guess about this Baby';
			} else {
				headerText = 'No Longer Accepting Guesses';
			}
			
			return (
				<div className="guess-form">
					<h3>{headerText}</h3>
					<form onSubmit={this.handlers.onSubmit}>
					<table>
						<tbody>
							<tr>
								<td className="babyimg" rowSpan="3">
									<BabyImage gender={this.state.birthGuess.gender} ounces={this.state.birthGuess.weight} />
								</td>
								{/* Gender */}
								<td colSpan="2"><p>Gender</p>
									<Validation fieldName="gender" messageContent="Select a gender" validationMethod="selection" isValid={this.methods.Validation.isValid}>	
									<input id="gender-boy" checked={(this.state.birthGuess.gender == 'boy')} name="gender" type="radio" value="boy" onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('gender') || !this.state.settings.appStatus } />
									<label htmlFor="gender-boy">Boy </label>
									<input id="gender-girl" checked={(this.state.birthGuess.gender == 'girl')} name="gender" type="radio" value="girl" onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('gender') || !this.state.settings.appStatus } />
									<label htmlFor="gender-girl">Girl</label> <LockIcon display={!this.helpers.isGuessable('gender') ? 'lavendar' : 'off'}/>
									</Validation>
								</td>
							</tr><tr>
								{/* Weight */}
								<td colSpan="2"><p>Weight</p>
									<Validation fieldName="weight" messageContent="Select the weight" validationMethod="change" isValid={this.methods.Validation.isValid}>	
									<input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.birthGuess.weight} onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('weight') || !this.state.settings.appStatus } /> <LockIcon display={!this.helpers.isGuessable('weight') ? 'lavendar' : 'off'}/>
									</Validation>
								</td>
							</tr><tr>
								{/* Date */}
								<td colSpan="2"><p>Date</p>
									<SimpleDatePicker componentName="guessFormDate" startDate={this.state.birthGuess.date} onChangeDate={this.methods.SimpleDatePicker.onChangeDate} selectMode="MD" disableComponent={!this.helpers.isGuessable('date') || !this.state.settings.appStatus } validationMethod="touch" messageContent="Select the date" isValid={ this.methods.Validation.isValid }/> 
									<LockIcon display={!this.helpers.isGuessable('date') ? 'lavendar' : 'off'}/>
									
								</td>
						</tr><tr className="submit-row">
								<td>
									<WeightDisplay weightOz={this.state.birthGuess.weight} />
								</td>
								<td>
									{/* Name */}
									{this.state.settings.appStatus &&
										<Validation fieldName="name" messageContent="Enter your name" validationMethod="nonblank" isValid={this.methods.Validation.isValid}>
										<input id="name" name="name" type="text" value={this.state.birthGuess.name} placeholder="Your Name" onChange={this.handlers.onChange.field} />
										</Validation>
										
									}
								</td>
								<td>
									{/* Submit */}
									{this.state.settings.appStatus &&
									<input id="submit" type="submit" value="Submit" disabled={!this.helpers.allFieldsValid()}/>
									}
								</td>
							</tr>
						</tbody>
					</table>
					</form>
				</div>
				)
		}
}

GuessForm.propTypes = {
	onAdd : PropTypes.func.isRequired
}