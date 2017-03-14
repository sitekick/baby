import React, { PropTypes } from 'react';

function MonthElement(props) {
	
	return (
		<select id="date-month" onClick={props.validateMonth} onChange={(e)=>{props.onChangeMonth({month : Number(e.target.value)})}} value={props.selectedMonth} disabled={props.disableSelect}>{
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
	validateMonth: React.PropTypes.func
}

export default MonthElement;