import React from 'react';

function CalendarIcon(props) {
	
	const monthAbbr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
	
	return(
		
		<div className="calendar">
			<div className="month">{monthAbbr[props.dueDate.month]}</div>
			<div className="day">{props.dueDate.day}</div>
		</div>
	
	)	
}

export default CalendarIcon;