import React, { PropTypes } from 'react';
import WeightDisplay from '../../../library/WeightDisplay';

var classNames = require('classnames');

function Guess(props) {	
		
		var date = new Date(props.date.year, props.date.month, props.date.day);
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
		
		var rowClass = classNames({pending : props.pendingState === true})
		
		var genderIconClass = classNames(
			'gender-icon',
			{boy : props.gender === 'boy'},
			{girl : props.gender === 'girl'}
		);	
		
		return (
		
		<tr className={rowClass} >
			<td >
			{props.canEdit &&
				<button onClick={function(){props.onRemove(props.index)}}>x</button>
			} 
				<span>{props.guessNumber}.</span> {props.name} </td>
			<td className={cellClass('gender')}><div className={genderIconClass} /></td>
			<td className={cellClass('weight')}><WeightDisplay weightOz={props.weight} /></td>
			<td className={cellClass('date')}>{date.toDateString()}</td>
		</tr>
		)
	
}

Guess.propTypes = {
	onRemove : PropTypes.func.isRequired
}

export default Guess;