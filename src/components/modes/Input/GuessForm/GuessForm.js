import React, { Component, PropTypes } from 'react';
import BabyImage from './BabyImage';
import ErrorMessage from './ErrorMessage';
import SimpleDatePicker from '../../../library/SimpleDatePicker/SimpleDatePicker';
import WeightDisplay from '../../../library/WeightDisplay';

export default class GuessForm extends Component {
		
		constructor(props) {
		
			super(props);
			
			this.state = {
				name : '',
				gender : '',
				weight : 80,
				day : this._resetStateObj('day'),
				submitted : false,
				valid : this._resetStateObj('valid')				
			};
			
			this.onFieldChange = this.onFieldChange.bind(this);
			this.validateField = this.validateField.bind(this);
			this.onDatePicker = this.onDatePicker.bind(this);	
			this.validatePicker = this.validatePicker.bind(this);
			this.onSubmit = this.onSubmit.bind(this);
			
		}
		
		onFieldChange(e) {
			
			var field =	{
				name : e.target.name,
				type : e.target.type,
				value : e.target.value,
				validation : (e.target.attributes['data-validate']) ? e.target.attributes['data-validate'].value : null
			};
			
			this.setState((prevState, props)=>({
				[field.name] : field.value,
				valid : Object.assign(prevState.valid, {[field.name] : (field.validation) ? this.validateField(field) : true})
			}));
		}
		
		validateField(inputObj){
			
			switch(inputObj.validation){
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
		}
		
		onDatePicker(obj) {
			
			this.setState((prevState, props)=>({
				day : Object.assign(prevState.day,obj)
			}));
		}
		
		validatePicker() {
			// just checking to see this field was clicked to prevent default date from submitting
			
			this.setState((prevState, props)=>({
				valid : Object.assign(prevState.valid, {day : true})
			}));
		}

		
		_resetStateObj(mode){
			
			var returnObj;
			
			switch(mode){
				case 'day' :
				var now = new Date();
				returnObj =  {month : now.getMonth(), day : now.getDate(), year : now.getFullYear()};
				break;
				case 'valid' :
				returnObj = {name : false, gender : false, weight : false, day : false};
				break;
			}
			
			return returnObj;
		}
		
		onSubmit(e) {
			e.preventDefault();
			
			var preventSubmit = false;
			
			
			for(let error in this.state.valid){
				if(this.state.valid[error] === false){
					preventSubmit = true;
					break;
				}
			}
			
			if(preventSubmit) {
				this.setState({submitted : true});
				return;
			}
			
			var guess = {
				name : this.state.name,
				gender : this.state.gender,
				weight : this.state.weight,
				day : this.state.day,
				pending : true
			};
			
			this.setState((prevState, props)=>{
				this.props.onAdd(guess);
					return {
						name : '',
						gender : '',
						weight : 80,
						day : this._resetStateObj('day'),
						valid : this._resetStateObj('valid'),
						submitted : false
					}
			});
		}
	
		render() {
			
			return (
				<div className="guess-form">
					<h3>Enter your Guess about this Baby</h3>
					<form onSubmit={this.onSubmit}>
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
									<input id="gender-boy" checked={(this.state.gender == 'boy') ? true : false} name="gender" type="radio" data-validate='selection' value="boy" onChange={this.onFieldChange} />
									<label htmlFor="gender-boy">Boy </label>
									<input id="gender-girl" checked={(this.state.gender == 'girl') ? true : false} name="gender" type="radio" data-validate='selection' value="girl" onChange={this.onFieldChange} />
									<label htmlFor="gender-girl">Girl</label>
									<ErrorMessage fieldName="gender" messageContent="Choose a gender" formSubmitted={this.state.submitted} fieldValidation={this.state.valid} />
								</p>
								{/* Weight */}
								<p>
									<strong>Weight </strong>
									<input id="weight" name="weight" type="range" min="80" max="224" step="1" value={this.state.weight} data-validate='touch' onChange={this.onFieldChange} />
									<ErrorMessage fieldName="weight" messageContent="Select the weight" formSubmitted={this.state.submitted} fieldValidation={this.state.valid} />
								</p>
								{/* Date */}
								<p>
									<strong>Date </strong> <SimpleDatePicker componentName="guessFormDate" startDate={this.state.day} onChangeDate={this.onDatePicker} validateDatePicker={this.validatePicker} selectMode="MD" />
									<ErrorMessage fieldName="day" messageContent="Select the day of birth" formSubmitted={this.state.submitted} fieldValidation={this.state.valid} />
								</p>
								</td>
							</tr>
							<tr className="submit-row">
								<td>
									<WeightDisplay weightOz={this.state.weight} />
								</td>
								<td>
									<p>
										<input id="name" name="name" type="text" data-validate='nonblank' value={this.state.name} placeholder="Your Name" onChange={this.onFieldChange} />
										<ErrorMessage fieldName="name" messageContent="Add your name" formSubmitted={this.state.submitted} fieldValidation={this.state.valid} />
									</p>
								</td>
								<td>
									<input id="submit" type="submit" value="Submit" />
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