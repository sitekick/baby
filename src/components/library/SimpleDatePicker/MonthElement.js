import React, { PropTypes } from 'react';

function MonthElement(props) {
	
	return (
		<select id="date-month" name="month" onFocus={(e) => props.focusMonth(e)} onChange={(e)=>{props.onChangeMonth(e)}} value={props.selectedMonth} disabled={props.disableSelect}>{
			props.months.map(function(entry, i){
				return (
					<option key={i} value={i}>{entry[0]}</option>
					);
			})
		}
		</select>
	)
}

MonthElement.propTypes = {
	onChangeMonth : React.PropTypes.func.isRequired,
	focusMonth: React.PropTypes.func
}

export default MonthElement;