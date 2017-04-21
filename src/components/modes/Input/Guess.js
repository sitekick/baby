import React, { PropTypes } from 'react';
import WeightDisplay from '../../library/WeightDisplay';
import MonthMaker from '../../library/MonthMaker';

var classNames = require('classnames');


function Guess(props) {	
		
		var guessable = props.guessableFields;
		
		function isGuessable(detail){
			return guessable.indexOf(detail) >= 0 
		}
		
		function cellClass(field){
			 
			return (
				classNames(
				field,
				{locked : !isGuessable(field)}
				)
			);
		}
		
		var genderIconClass = classNames(
			'gender-icon',
			{boy : props.gender === 'boy'},
			{girl : props.gender === 'girl'}
		);	
		
		return (
		
		<tr>
			<td >
			{props.canEdit &&
				<button title="click to remove" onClick={ () => { props.onRemove(props.index)} }>✕</button>
			} {props.name} </td>
			<td className={cellClass('gender')}><div className={genderIconClass} /></td>
			<td className={cellClass('weight')}><WeightDisplay weightOz={props.weight} /></td>
			<td className={cellClass('date')}><MonthMaker mode="abbr" monthIntJS={props.date.month}/> {`${props.date.day}, ${props.date.year}`}</td>
		</tr>
		)
	
}

Guess.propTypes = {
	onRemove : PropTypes.func.isRequired
}

export default Guess;