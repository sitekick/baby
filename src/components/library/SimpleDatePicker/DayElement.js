import React, { PropTypes } from 'react';

function DayElement(props) {
		
		var daysInMonth = props.month[1] || 31;
		var options = [];
		for(let d=1; d<= daysInMonth; d++){
			options.push(<option key={d} value={d} >{d}</option>);
		};
	
	
	return (
		<select id="date-day" onClick={props.validateDay} onChange={(e)=>{props.onChangeDay({day : Number(e.target.value)})}} value={props.selectedDay} style={props.styleObj}>{options}</select>
	)
}

DayElement.propTypes = {
	onChangeDay : React.PropTypes.func.isRequired,
	validateDay : React.PropTypes.func
}

export default DayElement;