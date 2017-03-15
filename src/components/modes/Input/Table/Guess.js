import React, { PropTypes } from 'react';
import WeightDisplay from '../../../library/WeightDisplay';

function Guess(props) {	
		
		var date = new Date(props.date.year, props.date.month, props.date.day);
		
		return (
		
		<tr className={(props.pendingState === true) ? 'pending' : ''} >
			<td >
			{props.canEdit &&
				<button onClick={function(){props.onRemove(props.index)}}>x</button>
			} 
				<span>{props.guessNumber}.</span> {props.name} </td>
			<td><div className={(props.gender === 'boy') ? 'gender boy' : 'gender girl'} /></td>
			<td className="weight"><WeightDisplay weightOz={props.weight} /></td>
			<td>{date.toDateString()}</td>
		</tr>
		)
	
}

Guess.propTypes = {
	onRemove : PropTypes.func.isRequired
}

export default Guess;