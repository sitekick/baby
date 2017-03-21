import React, { Component, PropTypes } from 'react';
import BabyImage from './BabyImage';
import ErrorMessage from './ErrorMessage';
import SimpleDatePicker from '../../../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../../../library/WeightDisplay';
import LockIcon from '../../../library/LockIcon';

export default class GuessForm extends Component {
		
		constructor(props) {
		
			super(props);
			
			this.state = {
				name : '',
				gender : null,
				weight : null,
				date : null,
				settings : props.appSettings,
				submitted : false,
				valid : null
			};
			
			this.mount = {
				stateDefaults : () => {
					//birth details
					const details = this.props.appSettings.birthDetails;
					this.state.gender = this.helpers.isGuessable('gender') ? '' : details.gender; 
					this.state.weight = this.helpers.isGuessable('weight') ? 80 : details.weight;
					this.state.date = this.helpers.isGuessable('date') ? this.helpers.resetStateObj('date') : details.date;
					//validatoin flags
					this.state.valid = this.helpers.resetStateObj('valid')
					//save
					this.setState(this.state);
				}
			}
			this.handlers = {
				onChange : {
					field : e => {
						var field =	{
							name : e.target.name,
							type : e.target.type,
							value : e.target.value,
							validation : (e.target.attributes['data-validate']) ? e.target.attributes['data-validate'].value : null
						}
				
						this.setState((prevState, props)=>({
							[field.name] : field.value,
							valid : Object.assign(prevState.valid, {[field.name] : (field.validation) ? this.helpers.validate.field(field) : true})
						}))
					}
				},
				onSubmit : e => {
					e.preventDefault()
					
					var preventSubmit = false
					
					for(let error in this.state.valid){
						if(this.state.valid[error] === false){
							preventSubmit = true
							break
						}
					}
					
					if(preventSubmit) {
						this.setState({submitted : true});
						return
					}
					
					var guess = {name : this.state.name,gender : this.state.gender,weight : this.state.weight,date : this.state.date,pending : true}
					
					this.setState((prevState, props)=>{
						this.props.onAdd(guess);
							return {
								name : '',
								gender : '',
								weight : 80,
								date : this.helpers.resetStateObj('date'),
								valid : this.helpers.resetStateObj('valid'),
								submitted : false
							}
					})
				}
			}
			this.methods = {
				SimpleDatePicker :{
					onChangeDate : (obj) => {
						this.setState((prevState, props)=>({
							date : Object.assign(prevState.date,obj)
						}));
					}
				}
			}
			this.helpers = {
				isGuessable : detail => {
					return this.props.appSettings.birthDetails.guessable.indexOf(detail) >= 0 
				},
				resetStateObj : mode => {
			
					var returnObj;
					
					switch(mode){
						case 'date' :
							var now = new Date();
							returnObj =  {month : now.getMonth(), day : now.getDate(), year : now.getFullYear()};
						break;
						case 'valid' :
							returnObj = {name : false, gender : true, weight : true, date : true};
							//bypass validation flags for non guessablge fields
							this.props.appSettings.birthDetails.guessable.map(function(detail){
							returnObj[detail] = false;
							})
						break;
					}
					return returnObj;
				},
				validate : {
					field : inputObj => {
							switch(inputObj.validation) 	{
							case 'selection' :
							case 'nonblank' :
							case 'touch' :
								if( inputObj.value.trim() ) {
									return true;
									} else {
									return false;
								}
							break;
							default: 
							return false;
							}
					},
					datePicker : () => {
						// just checking to see this field was clicked(on blur) to prevent default date from submitting
						this.setState((prevState, props)=>({
							valid : Object.assign(prevState.valid, {date : true})
						}));
					}	
				}
			}
			
		}
		
		componentWillMount(){
			this.mount.stateDefaults();
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
								<td className="babyimg">
									<BabyImage gender={this.state.gender} ounces={this.state.weight} />
								</td>
								<td colSpan="2">
								{/* Gender */}
								<p>
									<strong>Gender</strong>
									<input id="gender-boy" checked={(this.state.gender == 'boy')} name="gender" type="radio" data-validate='selection' value="boy" onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('gender') || !this.state.settings.appStatus } />
									<label htmlFor="gender-boy">Boy </label>
									<input id="gender-girl" checked={(this.state.gender == 'girl')} name="gender" type="radio" data-validate='selection' value="girl" onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('gender') || !this.state.settings.appStatus } />
									<label htmlFor="gender-girl">Girl</label> <LockIcon display={!this.helpers.isGuessable('gender') ? 'lavendar' : 'off'}/>
									<ErrorMessage fieldName="gender" messageContent="Choose a gender" formSubmitted={this.state.submitted} fieldValidation={this.state.valid} />
								</p>
								{/* Weight */}
								<p>
									<strong>Weight</strong>
									<input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.weight} data-validate='touch' onChange={this.handlers.onChange.field} disabled={!this.helpers.isGuessable('weight') || !this.state.settings.appStatus } /> <LockIcon display={!this.helpers.isGuessable('weight') ? 'lavendar' : 'off'}/>
									<ErrorMessage fieldName="weight" messageContent="Select the weight" formSubmitted={this.state.submitted} fieldValidation={this.state.valid} />
								</p>
								{/* Date */}
								<p>
									<strong>Date</strong>
									<SimpleDatePicker componentName="guessFormDate" startDate={this.state.date} onChangeDate={this.methods.SimpleDatePicker.onChangeDate} validateDatePicker={this.helpers.validate.datePicker} selectMode="MD" disableComponent={!this.helpers.isGuessable('date') || !this.state.settings.appStatus } /> <LockIcon display={!this.helpers.isGuessable('date') ? 'lavendar' : 'off'}/>
									<ErrorMessage fieldName="date" messageContent="Select the date of birth" formSubmitted={this.state.submitted} fieldValidation={this.state.valid} />
								</p>
								</td>
							</tr>
							<tr className="submit-row">
								<td>
									<WeightDisplay weightOz={this.state.weight} />
								</td>
								<td>
									{this.state.settings.appStatus &&
									<p>
										<input id="name" name="name" type="text" data-validate='nonblank' value={this.state.name} placeholder="Your Name" onChange={this.handlers.onChange.field} />
										<ErrorMessage fieldName="name" messageContent="Add your name" formSubmitted={this.state.submitted} fieldValidation={this.state.valid} />
									</p>
									}
								</td>
								<td>
									{this.state.settings.appStatus &&
									<input id="submit" type="submit" value="Submit" />
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