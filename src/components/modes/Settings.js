import React, {Component, PropTypes} from 'react';
import Validation from '../library/Validation';
import SimpleDatePicker from '../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../library/WeightDisplay';
import CloseButton from '../library/CloseButton';
import ErrorMessage from '../library/ErrorMessage';
import update from 'immutability-helper';

export default class Settings extends Component {
	
	constructor(props){
		super(props)
		
		this.state = {
			settings : Object.assign({},props.appSettings),
			valid : {},
			submitted : false
		}
		
		this.mount = {
			stateDefaults : () => {
				//due date
				let dueDateDefault;
				if (!Object.keys(this.props.appSettings.dueDate).length) {
					let today = new Date();
					dueDateDefault = { year : today.getFullYear(), month : today.getMonth(), day : today.getDate() }
				} else {
					dueDateDefault = this.props.appSettings.dueDate;
				}
				//birth details date
				let birthDetailsDateDefault;
				if (Object.keys(this.props.appSettings.birthDetails.date).length > 0 ){
					birthDetailsDateDefault = this.props.appSettings.birthDetails.date;
				} else {
					birthDetailsDateDefault = Object.keys(this.props.appSettings.dueDate).length > 0 && this.props.appSettings.dueDate || dueDateDefault;
				}
				//save
				let delta = update(this.state,{
					settings : {
						dueDate : { $set : dueDateDefault},
						birthDetails : {
							date : { $set : birthDetailsDateDefault}
						}
					}
				})
			
				this.setState(delta)
			}
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
						}
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
								}
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
								}
							})
						} else {
							//checked: accept guesses of current field/detail; add to guessable array; reset default values
							delta = update(this.state, {
								settings : {
									birthDetails : {
										guessable : { $push : [e.target.value] },
										[e.target.value] : { $set : this.helpers.resetBirthDetail(e.target.value)}
									}
								}
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
						
						this.setState(delta);
					}
				}
			}
		}
		this.methods = {
			CloseButton : {
				clickAction : () => {
					
					let original = JSON.stringify(this.props.appSettings);
					let submitted = JSON.stringify(this.state.settings);
					
					if( this.helpers.allFieldsValid() ) {
						if(original != submitted)
							this.props.settingsSubmit(this.state.settings);
					 
						this.props.closeButtonClickAction('settings','input');
					} else {
						this.setState({submitted : true})
					}
				}
			},
			SimpleDatePicker : {
				onChangeDate : (segment, value, component) => {
					
					let delta;
					//let segment = Object.keys(obj);
					if(component === 'dueDate') {
						delta = update(this.state, {
							settings : {
								dueDate : {
									[segment] : { $set : value}
								}
							} 
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
							} 
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
	
	componentWillMount() {
		this.mount.stateDefaults();
	}
	
	render() {
		
		return (
			<div className="mode settings">
			<CloseButton clickAction={this.methods.CloseButton.clickAction} />
			<h2>Settings</h2>
			<ErrorMessage errors={this.state.valid} messageHeader="Check the following fields:" display={this.state.submitted === true && this.helpers.allFieldsValid() === false} />
			<form className="settings">
				<div className="appStatus" >
					<input type="checkbox" name="appStatus" onChange={this.handlers.onChange.field} checked={this.state.settings.appStatus} />
					<h3>App Status</h3>
						{(this.state.settings.appStatus)  
						? <p>Accepting guesses from friends and family</p>
						: <p>No longer accepting guesses from friends and family</p>
						}
				</div>
				<table>
				<tbody>
					<tr>
						<td><label htmlFor="header">Header</label></td>
						<td colSpan="2">
							<Validation fieldName="header" messageContent="Enter a header" validationMethod="nonblank" isValid={this.methods.Validation.isValid}>	
							<input name="header" type="text" onChange={this.handlers.onChange.field} value={this.state.settings.header} disabled={!this.state.settings.appStatus} />
							</Validation>
						</td></tr>
					<tr>
						<td><label htmlFor="message">Message</label></td>
						<td colSpan="2">
						<Validation fieldName="message" messageContent="Enter a message" validationMethod="nonblank" isValid={this.methods.Validation.isValid} >
							<input name="message" type="text" onChange={this.handlers.onChange.field} value={this.state.settings.message} disabled={!this.state.settings.appStatus} />
							</Validation>
						</td></tr>
					<tr>
						<td><label htmlFor="dueDate">Due Date</label></td>
						<td colSpan="2">
							<SimpleDatePicker componentName="dueDate" startDate= {this.state.settings.dueDate} onChangeDate={this.methods.SimpleDatePicker.onChangeDate} selectMode="MDY" disableComponent={!this.state.settings.appStatus} />
						</td></tr>
					{/* Birth Details:*/}
					<tr>
						<td colSpan="3">
							<h3>Baby Details</h3><p>If a detail of this child is known, uncheck the appropriate field and enter the known value.</p>
						</td></tr>
					<tr>
						{/* Baby Details:Gender */}
						<td>
							<input type="checkbox" name="guessGender" value="gender" checked={this.helpers.isGuessable('gender')} onChange={this.handlers.onChange.birthDetails.config}/>
							<label htmlFor="guessGender">Gender</label>
						</td>
							{!this.helpers.isGuessable('gender') 
							?
							<td colSpan="2">
							<Validation fieldName="gender" messageContent="Select the gender" validationMethod="selection" isValid={this.methods.Validation.isValid}>
							<input id="gender-boy" checked={(this.state.settings.birthDetails.gender == 'boy')} name="gender" type="radio" value="boy" onChange={this.handlers.onChange.birthDetails.field} />
							<label className="inner" htmlFor="gender-boy">Boy </label>
							<input id="gender-girl" checked={(this.state.settings.birthDetails.gender == 'girl')} name="gender" type="radio" value="girl" onChange={this.handlers.onChange.birthDetails.field} />
							<label className="inner" htmlFor="gender-girl">Girl</label>
							</Validation>
							</td>
							: 
							<td colSpan="2"><label className="inner">Participants may guess the gender</label></td>
							}
						</tr>
					<tr>
						{/* Baby Details:Weight */}
						<td>
							<input type="checkbox" name="guessWeight" value="weight" checked={this.helpers.isGuessable('weight')} onChange={this.handlers.onChange.birthDetails.config}/>
							<label htmlFor="guessWeight">Weight</label>
						</td>
						{!this.helpers.isGuessable('weight') 
						?
						<td className="weight-field">
						<Validation fieldName="weight" messageContent="Enter the weight" validationMethod="change" isValid={this.methods.Validation.isValid}>
						<input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.settings.birthDetails.weight} data-validate='touch' onChange={this.handlers.onChange.birthDetails.field} /></Validation>
						<label className="inner"><WeightDisplay weightOz={this.state.settings.birthDetails.weight} /></label></td>
						 : 
						 <td colSpan="2"><label className="inner">Participants may guess the weight</label></td>
						 }
					</tr>
					<tr>
						{/* Baby Details:Date */}
						<td>
						<input type="checkbox" name="guessDate" value="date" checked={this.helpers.isGuessable('date')} onChange={this.handlers.onChange.birthDetails.config}/>
						<label htmlFor="guessDate">Day of Birth</label>
						</td>
						{!this.helpers.isGuessable('date')
						?
						<td colSpan="2"><SimpleDatePicker componentName="dayOfBirth" startDate={this.state.settings.birthDetails.date} onChangeDate={this.methods.SimpleDatePicker.onChangeDate} selectMode="MDY" /></td>
						:
						<td colSpan="2"><label className="inner">Participants may guess the date of birth</label></td>
						 }
						</tr>
						{/* Baby Details End */}
			</tbody>
			</table>
			</form>
			</div>
		)
	}
}

Settings.propTypes = {
	closeButtonClickAction : PropTypes.func.isRequired,
	settingsSubmit : PropTypes.func.isRequired
}
