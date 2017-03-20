import React, {Component, PropTypes} from 'react';
import SimpleDatePicker from '../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../library/WeightDisplay';
import CloseButton from '../library/CloseButton';

export default class Settings extends Component {
	
	constructor(props){
		super(props)
		
		this.state = props.appSettings;
		
		this.onDatePicker = this.onDatePicker.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
		this.onBirthDetailsFieldChange = this.onBirthDetailsFieldChange.bind(this);
		this.onDatePicker = this.onDatePicker.bind(this);
		this.onConfigureGuesses = this.onConfigureGuesses.bind(this);
		this.validatePicker = this.validatePicker.bind(this);
		this.newSettingsMade = this.newSettingsMade.bind(this);
	}
	
	componentWillMount() {
		
		this.state.birthDetails.date = this.setBirthDetailDefault();
		this.setState(this.state);
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
	
	isGuessable(detail){
		
		return this.state.birthDetails.guessable.indexOf(detail) >= 0
		
	}
	
	onConfigureGuesses(e) {
		
		let index = this.state.birthDetails.guessable.indexOf(e.target.value);
		if(index >= 0){
			this.state.birthDetails.guessable.splice(index, 1)
		} else {
			this.state.birthDetails.guessable.push(e.target.value)
			this.state.birthDetails[e.target.value] = this.resetBirthDetail(e.target.value);
		}
		
		this.setState(this.state);
	}
	
	resetBirthDetail(detail){
		
		switch(detail){
			case 'gender' :
				return '';
			break;
			case 'weight' : 
				return 80;
			break;	
			case 'date' : 
			return {
				year : this.state.dueDate.year,
				month : this.state.dueDate.month,				
				day :  this.state.dueDate.day
			}
			default : 
			return false;
		}
	}
	
	setBirthDetailDefault(){
		
		if (Object.keys(this.props.appSettings.birthDetails.date).length > 0 )
			return this.props.appSettings.birthDetails.date;
		else 
			return this.props.appSettings.dueDate;
	}
	
	onDatePicker(obj, name) {
			
		if(name === 'settingsFormDueDate' || name === 'guessFormDueDate') 
			Object.assign(this.state.dueDate,obj);
	
		if(name === 'settingsFormBirthDate') 
			Object.assign(this.state.birthDetails.date,obj);
		
		this.setState(this.state);
		
	}
	
	validatePicker(){
		
	}
	
	newSettingsMade(){
		
		let original = JSON.stringify(this.props.appSettings);
		let submitted = JSON.stringify(this.state);
		
		if(original != submitted)
			this.props.settingsSubmit(this.state);
			
		this.props.closeButtonClickAction('settings','input');
	}
	
	render() {
		
		return (
			<div className="mode settings">
			<CloseButton clickAction={(e) => {this.newSettingsMade()}}/>
			<h2>Settings</h2>
			<form className="settings" onSubmit={this.settingsSubmit}>
				<div className="appStatus" >
					<input type="checkbox" name="appStatus" onChange={this.onFieldChange} checked={this.state.appStatus} />
					<h3>App Status</h3>
						{(this.state.appStatus)  
						? <p>Accepting guesses from friends and family</p>
						: <p>Not longer accepting guesses from friends and family</p>
						}
				</div>
				<table>
				<tbody>
					<tr>
						<td><p>Header</p></td>
						<td colSpan="2">
							<input name="header" type="text" onChange={this.onFieldChange} value={this.state.header} disabled={!this.state.appStatus}/>
						</td></tr>
					<tr>
						<td><p>Message</p></td>
						<td colSpan="2">
							<input name="message" type="text" onChange={this.onFieldChange} value={this.state.message} disabled={!this.state.appStatus} />
						</td></tr>
					<tr>
						<td><p>Due Date</p></td>
						<td colSpan="2">
							<SimpleDatePicker componentName="settingsFormDueDate" startDate= {this.state.dueDate} onChangeDate={this.onDatePicker} validateDatePicker={this.validatePicker} selectMode="MDY" disableComponent={!this.state.appStatus} />
						</td></tr>
					{/* Birth Details:*/}
					<tr>
						<td colSpan="3">
							<h3>Baby Details</h3>
						</td></tr>
					<tr>
						{/* Baby Details:Gender */}
						<td>
							<input type="checkbox" name="guessGender" value="gender" checked={this.isGuessable('gender')}onChange={this.onConfigureGuesses}/>
							<p>Gender</p>
						</td>
							{!this.isGuessable('gender') 
							?
							<td colSpan="2">
							<input id="gender-boy" checked={(this.state.birthDetails.gender == 'boy') ? true : false} name="gender" type="radio" data-validate='selection' value="boy" onChange={this.onBirthDetailsFieldChange} />
							<label htmlFor="gender-boy">Boy </label>
							<input id="gender-girl" checked={(this.state.birthDetails.gender == 'girl') ? true : false} name="gender" type="radio" data-validate='selection' value="girl" onChange={this.onBirthDetailsFieldChange} />
							<label htmlFor="gender-girl">Girl</label>
							</td>
							: 
							<td colSpan="2"><label>Participants may guess the gender</label></td>
							}
						</tr>
					<tr>
						{/* Baby Details:Weight */}
						<td>
							<input type="checkbox" name="guessWeight" value="weight" checked={this.isGuessable('weight')}onChange={this.onConfigureGuesses}/>
							<p>Weight</p>
						</td>
						{!this.isGuessable('weight') 
						?
						<td colSpan="2"><WeightDisplay weightOz={this.state.birthDetails.weight} /> <input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.birthDetails.weight} data-validate='touch' onChange={this.onBirthDetailsFieldChange} /></td>
						 : 
						 <td colSpan="2"><label>Participants may guess the weight</label></td>
						 }
					</tr>
					<tr>
						{/* Baby Details:Date */}
						<td>
						<input type="checkbox" name="guessDate" value="date" checked={this.isGuessable('date')}onChange={this.onConfigureGuesses}/>
						<p>Day of Birth</p>
						</td>
						{!this.isGuessable('date')
						?
						<td colSpan="2"><SimpleDatePicker key="birthDetails" componentName="settingsFormBirthDate" startDate={this.state.birthDetails.date}  onChangeDate={this.onDatePicker} validateDatePicker={this.validatePicker} selectMode="MDY" /></td>
						:
						<td colSpan="2"><label>Participants may guess the date of birth</label></td>
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
