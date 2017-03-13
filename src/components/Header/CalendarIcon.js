import React from 'react';

function CalendarIcon(props) {
	
	const monthAbbr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
	
	const style = {
		wrapper : {
			display: "table-cell",
			verticalAlign: "top",
			width: "15%",
			border: "3px solid #A6B1E1"
		},
		month : {
			backgroundColor: "#A6B1E1",
			color: "#FFF",
			width: "100%",
			height: 19,
			lineHeight: "19px",
			textTransform: "uppercase",
			fontSize: "1.125em"
		},
		day : {
			color: "#A6B1E1",
			backgroundColor: "#FFF",
			width: "100%",
			height: 30,
			lineHeight: "30px",
			fontSize: "1.625em"
		}
	};

	return(
		
		<div className="calendar" style={style.wrapper}>
			<div style={style.month}>{monthAbbr[props.dueDate.month]}</div>
			<div style={style.day}>{props.dueDate.day}</div>
		</div>
	
	)	
}

export default CalendarIcon;