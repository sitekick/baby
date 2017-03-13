import React, { PropTypes } from 'react';

function YearElement(props) {
	
	
	const years = [props.selectedYear-1,props.selectedYear,props.selectedYear+1];
	
	return (
		<select id="date-year" onClick={props.validateYear} onChange={(e)=>{props.onChangeYear({year : Number(e.target.value)})}} value={props.selectedYear} >
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
	validateYear: React.PropTypes.func
}

export default YearElement;