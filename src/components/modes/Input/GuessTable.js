import React, { PropTypes } from 'react';
import Guess from './Guess';

function GuessTable(props) {	 
		
	return (
		<div className="scrollwrapper">
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
						<Guess key={index} pendingState={entry.pending} name={entry.name} onRemove={props.alterGuesses} gender={entry.gender} weight={entry.weight} date={entry.date} guessNumber={props.babyGuesses.length - index} canEdit={props.appSettings.edit} guessableFields={props.appSettings.birthDetails.guessable} />
					);
					})}
				</tbody>
			</table>
		</div>	
	)
}

GuessTable.propTypes = {
	alterGuesses : PropTypes.func.isRequired
}

export default GuessTable;