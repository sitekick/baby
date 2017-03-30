import React, { PropTypes } from 'react';

function YearElement(props) {
	
	
	const years = [props.selectedYear-1,props.selectedYear,props.selectedYear+1];
	
	return (
		<select id="date-year" name="year" onFocus={(e) => props.focusYear(e)} onChange={(e)=>{props.onChangeYear(e)}} value={props.selectedYear} disabled={props.disableSelect}>
		{
			years.map(function(entry, i){
				return (
					<option key={'dueYear'+i} value={years[i]}>{entry}</option>
					);
			})
		}
		</select>
	)
}

YearElement.propTypes = {
	onChangeYear : React.PropTypes.func.isRequired,
	focusYear: React.PropTypes.func
}

export default YearElement;