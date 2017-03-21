import React, {Component, PropTypes} from 'react';
import SimpleDatePicker from '../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../library/WeightDisplay';
import CloseButton from '../library/CloseButton';

export default class Settings extends Component {
	
	constructor(props){
		super(props)
		
		this.state = {
			settings : Object.assign({},props.appSettings),
			valid : null
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
				this.state.settings.dueDate = dueDateDefault;
				
				//birth details date
				let birthDetailsDateDefault;
				if (Object.keys(this.props.appSettings.birthDetails.date).length > 0 ){
					birthDetailsDateDefault = this.props.appSettings.birthDetails.date;
				} else {
					birthDetailsDateDefault = Object.keys(this.props.appSettings.dueDate).length > 0 && this.props.appSettings.dueDate || dueDateDefault;
				}
					
				this.state.settings.birthDetails.date = birthDetailsDateDefault;
				this.setState(this.state);
			}
		}
		this.handlers = {
			onChange : {
				field : (e) => {
					var field =	{
						name : e.target.name,
						type : e.target.type,
						value : e.target.type === 'checkbox' ? e.target.checked : e.target.value,
						validation : (e.target.attributes['data-validate']) ? e.target.attributes['data-validate'].value : null
					};
					this.state.settings[field.name] = field.value
					this.setState(this.state);
				},
				birthDetails : {
					field : (e) => {
						Object.assign(this.state.settings.birthDetails,{[e.target.name] : e.target.value});
						this.setState(this.state);
					},
					config : (e) => {
						let index = this.state.settings.birthDetails.guessable.indexOf(e.target.value);
						if(index >= 0){
							this.state.settings.birthDetails.guessable.splice(index, 1)
						} else {
							this.state.settings.birthDetails.guessable.push(e.target.value)
							this.state.settings.birthDetails[e.target.value] = this.helpers.resetBirthDetail(e.target.value);
						}
						this.setState(this.state);
					}
				}
			}
		}
		this.methods = {
			CloseButton : {
				clickAction : () => {
					let original = JSON.stringify(this.props.appSettings);
					let submitted = JSON.stringify(this.state.settings);
				
					if(original != submitted){
						this.props.settingsSubmit(this.state.settings);
					} 
						
					this.props.closeButtonClickAction('settings','input');
				}
			},
			SimpleDatePicker : {
				onChangeDate : (obj, name) => {
					if(name === 'settingsFormDueDate' || name === 'guessFormDueDate') 
						Object.assign(this.state.settings.dueDate,obj);
	
					if(name === 'settingsFormBirthDate') 
						Object.assign(this.state.settings.birthDetails.date,obj);
		
					this.setState(this.state);
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
					return 80;
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
			}
		}
	}
	
	componentWillMount() {
		this.mount.stateDefaults();
	}
	
	render() {
		
		return (
			<div className="mode settings">
			<CloseButton clickAction={this.methods.CloseButton.clickAction}/>
			<h2>Settings</h2>
			<form className="settings">
				<div className="appStatus" >
					<input type="checkbox" name="appStatus" onChange={this.handlers.onChange.field} checked={this.state.settings.appStatus} />
					<h3>App Status</h3>
						{(this.state.settings.appStatus)  
						? <p>Accepting guesses from friends and family</p>
						: <p>Not longer accepting guesses from friends and family</p>
						}
				</div>
				<table>
				<tbody>
					<tr>
						<td><p>Header</p></td>
						<td colSpan="2">
							<input name="header" type="text" onChange={this.handlers.onChange.field} value={this.state.settings.header} disabled={!this.state.settings.appStatus}/>
						</td></tr>
					<tr>
						<td><p>Message</p></td>
						<td colSpan="2">
							<input name="message" type="text" onChange={this.handlers.onChange.field} value={this.state.settings.message} disabled={!this.state.settings.appStatus} />
						</td></tr>
					<tr>
						<td><p>Due Date</p></td>
						<td colSpan="2">
							<SimpleDatePicker componentName="settingsFormDueDate" startDate= {this.state.settings.dueDate} onChangeDate={this.methods.SimpleDatePicker.onChangeDate} selectMode="MDY" disableComponent={!this.state.settings.appStatus} />
						</td></tr>
					{/* Birth Details:*/}
					<tr>
						<td colSpan="3">
							<h3>Baby Details</h3>
						</td></tr>
					<tr>
						{/* Baby Details:Gender */}
						<td>
							<input type="checkbox" name="guessGender" value="gender" checked={this.helpers.isGuessable('gender')} onChange={this.handlers.onChange.birthDetails.config}/>
							<p>Gender</p>
						</td>
							{!this.helpers.isGuessable('gender') 
							?
							<td colSpan="2">
							<input id="gender-boy" checked={(this.state.settings.birthDetails.gender == 'boy')} name="gender" type="radio" data-validate='selection' value="boy" onChange={this.handlers.onChange.birthDetails.field} />
							<label htmlFor="gender-boy">Boy </label>
							<input id="gender-girl" checked={(this.state.settings.birthDetails.gender == 'girl')} name="gender" type="radio" data-validate='selection' value="girl" onChange={this.handlers.onChange.birthDetails.field} />
							<label htmlFor="gender-girl">Girl</label>
							</td>
							: 
							<td colSpan="2"><label>Participants may guess the gender</label></td>
							}
						</tr>
					<tr>
						{/* Baby Details:Weight */}
						<td>
							<input type="checkbox" name="guessWeight" value="weight" checked={this.helpers.isGuessable('weight')} onChange={this.handlers.onChange.birthDetails.config}/>
							<p>Weight</p>
						</td>
						{!this.helpers.isGuessable('weight') 
						?
						<td colSpan="2"><WeightDisplay weightOz={this.state.settings.birthDetails.weight} /> <input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.settings.birthDetails.weight} data-validate='touch' onChange={this.handlers.onChange.birthDetails.field} /></td>
						 : 
						 <td colSpan="2"><label>Participants may guess the weight</label></td>
						 }
					</tr>
					<tr>
						{/* Baby Details:Date */}
						<td>
						<input type="checkbox" name="guessDate" value="date" checked={this.helpers.isGuessable('date')} onChange={this.handlers.onChange.birthDetails.config}/>
						<p>Day of Birth</p>
						</td>
						{!this.helpers.isGuessable('date')
						?
						<td colSpan="2"><SimpleDatePicker key="birthDetails" componentName="settingsFormBirthDate" startDate={this.state.settings.birthDetails.date}  onChangeDate={this.methods.SimpleDatePicker.onChangeDate} selectMode="MDY" /></td>
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
