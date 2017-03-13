import React, {Component, PropTypes} from 'react';
import SimpleDatePicker from '../../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../../library/WeightDisplay';

export default class SettingsForm extends Component {
	
	constructor(props){
		super(props)
		
		this.state = {
			appStatus : props.fieldValues.appStatus,
			babyName : props.fieldValues.babyName,
			message : props.fieldValues.message,
			dueDate : {
				year : props.fieldValues.dueDate.year,
				month : props.fieldValues.dueDate.month,
				day : props.fieldValues.dueDate.day
			},
			babyBorn : props.fieldValues.babyBorn,
			birthDetails : {
				gender : null,
				weight : 0,
				date : {
					year : props.fieldValues.birthDetails.date.year,
					month : props.fieldValues.birthDetails.date.month,				
					day :  props.fieldValues.birthDetails.date.day
				}
			}
		}
		
		this.onDatePicker = this.onDatePicker.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
		this.onBirthDetailsFieldChange = this.onBirthDetailsFieldChange.bind(this);
		this.onDatePicker = this.onDatePicker.bind(this);
		this.validatePicker = this.validatePicker.bind(this);
		this.settingsSubmit = this.settingsSubmit.bind(this);
	}
	
	onFieldChange(e) {
			
		var field =	{
			name : e.target.name,
			type : e.target.type,
			value : e.target.type === 'checkbox' ? e.target.checked : e.target.value,
			validation : (e.target.attributes['data-validate']) ? e.target.attributes['data-validate'].value : null
		};
		
		this.setState({[field.name] : field.value});
		
		}
	
	onBirthDetailsFieldChange(e) {
			
		Object.assign(this.state.birthDetails,{[e.target.name] : e.target.value});
		
		this.setState(this.state);
	}
	
	onDatePicker(obj, name) {
			
		if(name === 'settingsFormDueDate' || name === 'guessFormDueDate') 
			Object.assign(this.state.dueDate,obj);
	
		if(name === 'settingsFormBirthDate') 
			Object.assign(this.state.birthDetails.date,obj);
		
		this.setState(this.state);
		
	}
	
	settingsSubmit(e) {
		e.preventDefault();
		
		this.props.settingsSubmit(this.state);
	}
	
	validatePicker(){
		
	}
	
	render() {
		
		return (
			<form className="settings" onSubmit={this.settingsSubmit}>
				<div className="appStatus" >
					<input type="checkbox" onChange={this.onFieldChange} checked={this.state.appStatus} />
					<h3>App Status</h3>
						{(this.state.appStatus)  
						? <p>Accepting guesses from friends and family</p>
						: <p>Not longer accepting guesses from friends and family</p>
						}
				</div>
				<table>
				<tbody>
					<tr>
						<td><p>Babys Name</p></td>
						<td colSpan="2">
							<input name="babyName" type="text" onChange={this.onFieldChange} value={this.state.babyName} />
						</td></tr>
					<tr>
						<td><p>Message</p></td>
						<td colSpan="2">
							<input name="message" type="text" onChange={this.onFieldChange} value={this.state.message} />
						</td></tr>
					<tr>
						<td><p>Due Date</p></td>
						<td colSpan="2">
							<SimpleDatePicker componentName="settingsFormDueDate" startDate= {this.state.dueDate} onChangeDate={this.onDatePicker} validateDatePicker={this.validatePicker} selectMode="MDY" />
						</td></tr>
					<tr>
						<td><p>Baby Status</p></td>
						<td colSpan="2">
							<input name="babyBorn" type="checkbox" onChange={this.onFieldChange} checked={this.state.babyBorn} />
						</td></tr>
					<tr>
						<td colSpan="3">
							<h3>Birth Details</h3>
						</td></tr>
					<tr>
						{/* Birth Details:Gender */}
						<td><p>Gender</p></td>
						<td colSpan="2">
							<input id="gender-boy" checked={(this.state.birthDetails.gender == 'boy') ? true : false} name="gender" type="radio" data-validate='selection' value="boy" onChange={this.onBirthDetailsFieldChange} />
							<label htmlFor="gender-boy">Boy </label>
							<input id="gender-girl" checked={(this.state.birthDetails.gender == 'girl') ? true : false} name="gender" type="radio" data-validate='selection' value="girl" onChange={this.onBirthDetailsFieldChange} />
							<label htmlFor="gender-girl">Girl</label>
						</td></tr>
					<tr>
						{/* Birth Details:Weight */}
						<td><p>Weight</p></td>
							<td>
								<WeightDisplay weightOz={this.state.birthDetails.weight} />
							</td>
							<td>
								<input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.birthDetails.weight} data-validate='touch' onChange={this.onBirthDetailsFieldChange} />
							</td></tr>
					<tr>
						{/* Birth Details:Date */}
						<td><p>Day of Birth</p></td>
						<td colSpan="2">
							<SimpleDatePicker componentName="settingsFormBirthDate" startDate={this.state.birthDetails.date}   onChangeDate={this.onDatePicker} validateDatePicker={this.validatePicker} selectMode="MDY" />
						</td></tr>
					<tr>
						{/* Save Settings */}
						<td />
						<td colSpan="2" >
							<input type="submit" name="submitSettings" value="Save" />
						</td>
					</tr>
			</tbody>
			</table>
			</form>
		)
	}
}

SettingsForm.propTypes = {
	settingsSubmit : PropTypes.func.isRequired
}
