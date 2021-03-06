import React, {Component, PropTypes} from 'react';
import Validation from '../library/Validation';
import SimpleDatePicker from '../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../library/WeightDisplay';
import PasswordProtect from '../library/PasswordProtect';
import CloseButton from '../library/CloseButton';
import ErrorMessage from '../library/ErrorMessage';
import Switch from '../library/Switch';
import update from 'immutability-helper';

export default class Settings extends Component {
	
	constructor(props){
		super(props)
		
		this.state = {
			settings : {
				appStatus: props.appStatus,
				authKey: props.authKey,
				header: props.header,
				message: props.message,
				dueDate: {
					year : props.dueDate.year,
					month : props.dueDate.month,
					day : props.dueDate.day
				},
				birthDetails: {
					guessable: props.birthDetails.guessable,
					gender: props.birthDetails.gender,
					weight: props.birthDetails.weight,
					date: {
						year : props.birthDetails.date.year,
						month : props.birthDetails.date.month,
						day : props.birthDetails.date.day
					}
				},
				edit : props.edit
			},
			valid : {},
			submitted : false,
			changed : false
		}
		
		this.handlers = {
			onChange : {
				field : (e) => {
					
					let value;
					switch(e.target.type){
						case 'checkbox' :
						value = e.target.checked;
						break;
						default :
						value = e.target.value;
					}
					
					let delta = update(this.state, {
						settings : {
							[e.target.name] : { $set : value}
						},
						changed : { $set : true }
					});
					this.setState(delta);
				},
				birthDetails : {
					field : (e) => {
						let delta = update(this.state, {
								settings : {
									birthDetails : {
										[e.target.name] : { $set : e.target.value}
									}
								},
								changed : { $set : true }
							})
						this.setState(delta);
					},
					config : (e) => {
						let indexGuessable = this.state.settings.birthDetails.guessable.indexOf(e.target.value);
						let delta;
						if(indexGuessable >= 0){
							//unchecked: do not accept guesses of current field/detail; remove from guessable array
							delta = update(this.state, {
								settings : {
									birthDetails : {
										guessable : { $splice : [[indexGuessable, 1]]}
									}
								},
								changed : { $set : true }
							})
						} else {
							//checked: accept guesses of current field/detail; add to guessable array; reset default values
							delta = update(this.state, {
								settings : {
									birthDetails : {
										guessable : { $push : [e.target.value] },
										[e.target.value] : { $set : this.helpers.resetBirthDetail(e.target.value)}
									}
								},
								changed : { $set : true }
							})
						}
						//check for prior push to validation process for toggled configuration
						let indexValid = Object.keys(this.state.valid).indexOf(e.target.value);
						if(indexValid >= 0){
							const updatedValidObj = Object.assign({},this.state.valid);
							delete updatedValidObj[e.target.value]
							
							delta = update(delta,{
								valid : {$set : updatedValidObj}
							})
						}
						//if no guessable fields, set appStatus to false
						if(delta.settings.birthDetails.guessable.length === 0){
							delta = update(delta,{
								settings: {
									appStatus : {$set : false}
								}
							})
						}
						this.setState(delta);
					}
				}
			}
		}
		this.methods = {
			CloseButton : {
				clickAction : () => {
					
					if( this.helpers.allFieldsValid() ) {
						if(this.state.changed)
							this.props.settingsSubmit(this.state.settings);
					 
						this.props.closeButtonClickAction('settings','input');
					} else {
						this.setState({submitted : true})
					}
				}
			},
			PasswordProtect : {
				CloseButtonClickAction : () => {
					this.props.closeButtonClickAction('settings','input');
				},
				authorizeAction : () => {
					//console.log('authorized')
				}
			},
			SimpleDatePicker : {
				onChangeDate : (segment, value, component) => {
					let delta;
					if(component === 'dueDate') {
						delta = update(this.state, {
							settings : {
								dueDate : {
									[segment] : { $set : value}
								}
							} ,
							changed : { $set : true }
						});
					}
						
					if(component === 'dayOfBirth'){
						delta = update(this.state, {
							settings : {
								birthDetails : {
									date : { 
										[segment] : {$set : value}
									}
								}
							},
							changed : { $set : true } 
						});
					} 
		
					this.setState(delta);
				}
			},
			Validation : {
				isValid : (field, bool) => {
					
				this.setState((prevState, props)=>({
					valid : Object.assign(prevState.valid, {[field] : bool})
				}));

				}
			}
		}
		this.helpers = {
			isGuessable : detail => {
				return this.state.settings.birthDetails.guessable.indexOf(detail) >= 0
			},
			resetBirthDetail : detail => {
				switch(detail){
				case 'gender' :
					return '';
				break;
				case 'weight' : 
					return 0;
				break;	
				case 'date' : 
					return {
						year : this.state.settings.dueDate.year,
						month : this.state.settings.dueDate.month,				
						day :  this.state.settings.dueDate.day
					}
				default : 
					return false;
				}
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
	

	render() {
		
		return (
			<PasswordProtect authKey={this.state.settings.authKey} CloseButtonClickAction={this.methods.PasswordProtect.CloseButtonClickAction} authorizeAction={this.methods.PasswordProtect.authorizeAction} >
			<div className="mode settings">
				<CloseButton clickAction={this.methods.CloseButton.clickAction} />
				<h2>Settings</h2>
				<ErrorMessage errors={this.state.valid} messageHeader="Check the following fields:" display={this.state.submitted === true && this.helpers.allFieldsValid() === false} />
				<form>
					<div className="appStatus" >
						<Switch size="large">
						<input type="checkbox" name="appStatus" onChange={this.handlers.onChange.field} checked={this.state.settings.appStatus} />
						</Switch>
						<h3>App Status</h3>
							{(this.state.settings.appStatus)  
							? <p>Accepting guesses from friends and family</p>
							: <p>No longer accepting guesses from friends and family</p>
							}
					</div>
					<div className="inputs">
						<div className="input-wrapper"><p>Header</p>
							<Validation fieldName="header" messageContent="Enter a header" validationMethod="nonblank" isValid={this.methods.Validation.isValid}>	
								<input name="header" type="text" onChange={this.handlers.onChange.field} value={this.state.settings.header}  />
							</Validation>
						</div>
						<div className="input-wrapper"><p>Message</p>
							<Validation fieldName="message" messageContent="Enter a message" validationMethod="nonblank" isValid={this.methods.Validation.isValid} >
								<input name="message" type="text" onChange={this.handlers.onChange.field} value={this.state.settings.message}  />
							</Validation>
						</div>
						<div className="input-wrapper"><p>Due Date</p>
							<SimpleDatePicker componentName="dueDate" startDate= {this.state.settings.dueDate} onChangeDate={this.methods.SimpleDatePicker.onChangeDate} selectMode="MDY"  />
						</div>
						{/* Birth Details:*/}
						<h3>Baby Details</h3>
						<p>If a detail of this child is known, deactivate the appropriate field and enter the known value.</p>
						{/* Gender */}
						<div className="input-wrapper switch-config">
							<Switch size="medium">
								<input type="checkbox" name="guessGender" value="gender" checked={this.helpers.isGuessable('gender')} onChange={this.handlers.onChange.birthDetails.config} />
							</Switch>
							<p>Gender</p>
							{!this.helpers.isGuessable('gender') 
							?
							<div className="detail-field preset">
								<Validation fieldName="gender" messageContent="Select the gender" validationMethod="selection" isValid={this.methods.Validation.isValid}>
									<input id="gender-boy" checked={(this.state.settings.birthDetails.gender == 'boy')} name="gender" type="radio" value="boy" onChange={this.handlers.onChange.birthDetails.field} />
									<label htmlFor="gender-boy">Boy </label>
									<input id="gender-girl" checked={(this.state.settings.birthDetails.gender == 'girl')} name="gender" type="radio" value="girl" onChange={this.handlers.onChange.birthDetails.field} />
									<label htmlFor="gender-girl">Girl</label>
								</Validation>
							</div>
							: 
							<div className="detail-field guessable">
								<label>Participants may guess the gender</label>
							</div>
							}
						</div>
						{/* Baby Details:Weight */}
						<div className="input-wrapper switch-config weight">
							<Switch size="medium">
								<input type="checkbox" name="guessWeight" value="weight" checked={this.helpers.isGuessable('weight')} onChange={this.handlers.onChange.birthDetails.config} />
							</Switch>
							<p>Weight</p>
							{!this.helpers.isGuessable('weight') 
							?
							<div className="detail-field preset">
								<Validation fieldName="weight" messageContent="Enter the weight" validationMethod="change" isValid={this.methods.Validation.isValid}>
									<label><WeightDisplay weightOz={this.state.settings.birthDetails.weight} /></label>
									<input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.settings.birthDetails.weight} data-validate='touch' onChange={this.handlers.onChange.birthDetails.field} />
								</Validation>
							</div>
						 	: 
						 	<div className="detail-field guessable">
						 		<label>Participants may guess the weight</label>
						 	</div>
						 	}
						</div>
						{/* Baby Details:Date */}
						<div className="input-wrapper switch-config date">
							<Switch size="medium">
								<input type="checkbox" name="guessDate" value="date" checked={this.helpers.isGuessable('date')} onChange={this.handlers.onChange.birthDetails.config} />
							</Switch>
							<p>Birth Date</p>
							{!this.helpers.isGuessable('date')
							?
							<div className="detail-field preset">
								<SimpleDatePicker componentName="dayOfBirth" startDate={this.state.settings.birthDetails.date} onChangeDate={this.methods.SimpleDatePicker.onChangeDate} selectMode="MDY" />
							</div>
							:
							<div className="detail-field guessable">
								<label>Participants may guess the birth date</label>
							</div>
						 	}
						</div>
						{/* Baby Details End */}
						<h3>Settings</h3>
						<div className="input-wrapper switch-config">
							<Switch size="medium">
								<input type="checkbox" name="edit" checked={this.state.settings.edit} onChange={this.handlers.onChange.field} />
							</Switch>
							<p>Edit Mode</p>
							{this.state.settings.edit 
							?
							<div className="detail-field edit-mode">
								<label htmlFor="edit">Remove entries from the list of guesses</label>
							</div>
							:
							<div className="detail-field edit-mode">
								<label htmlFor="edit">Entries locked</label>
							</div>
							}
						</div>
					</div>
				</form>
			</div>
		</PasswordProtect>	
		)
	}
}

Settings.propTypes = {
	closeButtonClickAction : PropTypes.func.isRequired,
	settingsSubmit : PropTypes.func.isRequired
}
