import React, { PropTypes, Component } from 'react';
import DayElement from './DayElement';
import MonthElement from './MonthElement';
import YearElement from './YearElement';
import update from 'immutability-helper';

export default class SimpleDatePicker extends Component {
	
	constructor(props){
		
		super(props)
		
		this.state = { 
			valid : false,
			values : [] 
			};
		
		this.mount = {
			stateDefaults : testArray => {
				let validBool = this.helpers.validate(testArray);
				this.setState( () => ({
					valid : validBool,
					values	: testArray
					}));
			}
		}
		this.handlers = {
			components : {
				onFocus : e => {
					let index = { month : 0, day : 1, year : 2 }
					let delta = update(this.state, {
						values  : { [index[e.target.name]] : { clicked : {$set: true} }}
					})
					this.setState(delta)
				},
				onChange : e => {
					let index = { month : 0, day : 1, year : 2 }
					let delta = update(this.state, {
						values  : { 
							[index[e.target.name]] : { value : {$set: e.target.value} }
						}
					})
					
					this.setState(delta)
					this.props.onChangeDate(e.target.name , Number(e.target.value), this.props.componentName);
				}
			}
		}
		this.helpers = {
			defaultValue : segment => {
				const today = new Date();
				switch(segment){
				case 'day' :
					return this.props.startDate.day || today.getDate();
				break;
				case 'month' :
					return (typeof this.props.startDate.month === 'number') ?  this.props.startDate.month : today.getMonth();				
				break;	
				case 'year' :
					return this.props.startDate.year || today.getFullYear();
				break;		
				default : 
					return false;
				}
			},
			monthData : index => {
				var data = [["January", 31],["February",28],["March",31],["April",30],["May",31],["June",30],["July",31],["August",31],["September",30],["October",31],["November",30],["December",31]];
					
				if(typeof index == 'undefined')
					return data;
				else 
					return data[index];
			},
			configureTests : () => {
				return [
					{
						name : 'month',
						type : 'select',
						value : this.helpers.defaultValue('month'),
						id : 'date-month',
						clicked : false
					},
					{
						name : 'day',
						type : 'select',
						value : this.helpers.defaultValue('day'),
						id : 'date-day',
						clicked : false
					},
					{
						name : 'year',
						type : 'select',
						value : this.helpers.defaultValue('year'),
						id : 'date-year',
						clicked : false
					}]
			},
			validate : testArray => {
				
				switch(props.validationMethod) {
					case 'touch' :
						function noSelections(test) {
							return test.clicked === false; 
						}
						return !testArray.every(noSelections)
					break;
					default: 
						return false;
				}
			},
		}
	} 
	
	componentWillMount() {
		const validationTests = this.helpers.configureTests();
		this.mount.stateDefaults(validationTests);
	}
	
	componentDidMount(){
		if(typeof this.props.isValid === 'function')
			this.props.isValid(this.props.componentName, this.state.valid)
	}

	componentDidUpdate(prevProps, prevState) {
		
		let validBool = this.helpers.validate(this.state.values);
		
		if(prevState.valid !== validBool){
			this.props.isValid(this.props.componentName, validBool)
			this.setState({valid : validBool})
		}
	}
		
	render(){
		
		const style = {
			error : {
				display: (this.state.valid) ? "none" : "block"
			}
		};
		
		return (
			<div className="simple-date-picker validation-field">
				<MonthElement months={this.helpers.monthData()} onChangeMonth={this.handlers.components.onChange} focusMonth={this.handlers.components.onFocus} selectedMonth={this.helpers.defaultValue('month')} disableSelect={this.props.disableComponent} /> 
				<DayElement month={this.helpers.monthData(this.helpers.defaultValue('month'))} onChangeDay={this.handlers.components.onChange} selectedDay={this.helpers.defaultValue('day')} focusDay={this.handlers.components.onFocus} disableSelect={this.props.disableComponent} />
				{this.props.selectMode && this.props.selectMode === "MDY" &&
					<YearElement selectedYear={this.helpers.defaultValue('year')} focusYear={this.handlers.components.onFocus} onChangeYear={this.handlers.components.onChange} disableSelect={this.props.disableComponent} />
				}
				<span className="error-message" style={style.error}>{this.props.messageContent}</span>
			</div>
		)	
	}

}

SimpleDatePicker.propTypes = {
	onChangeDate : PropTypes.func.isRequired,
	isValid  : PropTypes.func,
	componentName : PropTypes.string.isRequired
}


