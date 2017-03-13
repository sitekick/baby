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
		
		var style = {
			table : {
				element : {
					width: "100%",
					borderCollapse: "collapse",
					fontSize: "1.5em",
					backgroundColor: "#E8EBF7",
					color: "#A6B1E1",
				},
				tbody : {
					tr : {
						padding: "20 0"
					}
				}
			},
			appStatus : {
				element : {
					overflow: "hidden",
					height: 50,
				},
				h2 : {
					margin: 0
				},
				switch : {
					float: "right",
					fontSize: "2em"
				},
				msg : {
					fontSize: ".75em",
					fontStyle: "italic",
					margin: 0
				}
			},
			form : {
				element : {},
				field : {
					text : {
						fontSize: "1.5rem",
						padding: ".2em 0 .2em .2em",
						border: "3px solid #E8EBF7",
						width: "92.5%",
					},
					radio : {
						margin: "5px 5px 0 0",
						border: "1px solid red",
						verticalAlign: "top"
					},
					select : {
						fontSize : "1.25rem"
					},
					range : { 
						width: "65%"
					},
					submit: {
						backgroundColor: "#2F4550",
						color: "#FFF",
						borderRadius: 5,
						border: "3px solid #A6B1E1",
						fontSize: "1.25rem",
						margin: "1em 0",
						padding: ".35em 0",
						width: "50%",
						textTransform: "uppercase",
						cursor: "pointer"
					}
				},
				p : {
					element : {
						fontSize: "1.5em",
						margin : "0 0 1em",
						position: "relative"
					}, 
					strong : {
						color : "#A6B1E1",
						minWidth: 90,
						display: "inline-block"	
					}
				},
				label : {
					color: "#2F4550"
				}
			}
		}
		
		
		return (
			<form onSubmit={this.settingsSubmit}>
			<div style={style.appStatus.element} >
			<input name="appStatus" style={style.appStatus.switch} type="checkbox" onChange={this.onFieldChange} checked={this.state.appStatus} />
			<h2 style={style.appStatus.h2}>App Status</h2>
			{(this.state.appStatus)  
				? <p style={style.appStatus.msg}>Accepting guesses from friends and family</p>
				: <p style={style.appStatus.msg}>Not longer accepting guesses from friends and family</p>
			}
			</div>
			<table style={style.table.element}>
			<tbody>
			<tr><td>Babys Name</td><td colSpan="2"><input name="babyName" type="text" onChange={this.onFieldChange} value={this.state.babyName} style={style.form.field.text} /></td></tr>
			
			<tr><td>Message</td><td colSpan="2"><input name="message" type="text" onChange={this.onFieldChange}  value={this.state.message} style={style.form.field.text} /></td></tr>
			
			<tr><td>Due Date</td><td colSpan="2"><SimpleDatePicker componentName="settingsFormDueDate" startDate= {this.state.dueDate} onChangeDate={this.onDatePicker} validateDatePicker={this.validatePicker} selectMode="MDY" /></td></tr>
			<tr><td>Baby Status</td><td colSpan="2"><input name="babyBorn" type="checkbox" onChange={this.onFieldChange} checked={this.state.babyBorn} /></td></tr>
			
			<tr><td colSpan="3"><h3>Birth Details</h3></td></tr>
			<tr>
			{/* Birth Details:Gender */}
			<td>Gender</td><td colSpan="2"><input id="gender-boy" checked={(this.state.birthDetails.gender == 'boy') ? true : false} name="gender" type="radio" data-validate='selection' value="boy" onChange={this.onBirthDetailsFieldChange} style={style.form.field.radio} />
			<label htmlFor="gender-boy" style={style.form.label}>Boy </label>
			<input id="gender-girl" checked={(this.state.birthDetails.gender == 'girl') ? true : false} name="gender" type="radio" data-validate='selection' value="girl" onChange={this.onBirthDetailsFieldChange} style={style.form.field.radio} />
			<label htmlFor="gender-girl" style={style.form.label}>Girl</label>
			</td></tr>
			{/* Birth Details:Weight */}
			<tr>
			<td>Weight</td>
			<td style={{color: "#2F4550"}}><WeightDisplay weightOz={this.state.birthDetails.weight} /></td>
			<td><input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.birthDetails.weight} data-validate='touch'   onChange={this.onBirthDetailsFieldChange} style={style.form.field.range} />
			</td></tr>
			{/* Birth Details:Date */}
			<tr>
			<td>Day of Birth</td><td colSpan="2"><SimpleDatePicker componentName="settingsFormBirthDate" startDate={this.state.birthDetails.date}   onChangeDate={this.onDatePicker} validateDatePicker={this.validatePicker} selectMode="MDY" />
			</td></tr>
			{/* Save Settings */}
			<tr><td>&nbsp;</td><td colSpan="2" >
			<input type="submit" name="submitSettings" style={style.form.field.submit} value="Save" />
			</td></tr>
			
			</tbody>
			</table>
			</form>
		)
	}
}

SettingsForm.propTypes = {
	settingsSubmit : PropTypes.func.isRequired
}
