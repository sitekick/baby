import React, { PropTypes } from 'react';
import DayElement from './DayElement';
import MonthElement from './MonthElement';
import YearElement from './YearElement';

function SimpleDatePicker(props) {
	
	var today = new Date();
	
	const pickerMonth = typeof props.startDate.month === 'number' ?  props.startDate.month : today.getMonth();
	const pickerDay = props.startDate.day || today.getDate();
	const pickerYear = props.startDate.year || today.getFullYear();
	
	function onElementChange(value){
		props.onChangeDate(value, props.componentName);
	}
	
	function _monthData(index) {
		
		var data = [["January", 31],["February",28],["March",31],["April",30],["May",31],["June",30],["July",31],["August",31],["September",30],["October",31],["November",30],["December",31]];
		
		if(typeof index == 'undefined'){
			return data;
		} else {
			return data[index];
		}
		
	} 
	
	return (
		<span className="simple-date-picker">
		<MonthElement months={_monthData()} onChangeMonth={onElementChange} validateMonth={props.validateDatePicker} selectedMonth={pickerMonth} /> 
		<DayElement month={_monthData(pickerMonth)} validateDay={props.validateDatePicker} onChangeDay={onElementChange} selectedDay={pickerDay}  />
		{props.selectMode && props.selectMode === "MDY" &&
		<YearElement selectedYear={pickerYear} onChangeYear={onElementChange} />
		}
		</span>
	)
}

SimpleDatePicker.propTypes = {
	onChangeDate : React.PropTypes.func.isRequired,
	validateDatePicker : React.PropTypes.func.isRequired
}

export default SimpleDatePicker;
