import React, { PropTypes } from 'react';
import Guess from './Guess';
import Predictor from './Predictor';

function GuessTable(props) {	 
		
	return (
		<table className="guesses">
			<thead>
				<tr>
					<th>Name</th>
					<th>Gender</th>
					<th>Weight</th>
					<th>Day</th>
				</tr>
			</thead>
			<tbody>
				{props.babyGuesses.map( function(entry, index) {
					
				return (
					<Guess key={index} pendingState={entry.pending} name={entry.name} onRemove={props.alterGuesses} gender={entry.gender} weight={entry.weight} day={entry.day} index={index} canEdit={props.editMode.state}/>
				);
				})}
				<Predictor babyGuesses={props.babyGuesses} />
			</tbody>
		</table>	
	)
}

GuessTable.propTypes = {
	alterGuesses : PropTypes.func.isRequired
}

export default GuessTable;