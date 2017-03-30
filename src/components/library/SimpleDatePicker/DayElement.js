import React, { PropTypes } from 'react';

function DayElement(props) {
		
		var daysInMonth = props.month[1] || 31;
		var options = [];
		for(let d=1; d<= daysInMonth; d++){
			options.push(<option key={d} value={d} >{d}</option>);
		};
	
	
	return (
		<select id="date-day" name="day" onFocus={(e) => props.focusDay(e)} onChange={(e)=>{props.onChangeDay(e)}} value={props.selectedDay} disabled={props.disableSelect} >{options}</select>
	)
}

DayElement.propTypes = {
	onChangeDay : React.PropTypes.func.isRequired,
	focusDay : React.PropTypes.func
}

export default DayElement;