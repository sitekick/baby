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
						<Guess key={index} pendingState={entry.pending} name={entry.name} onRemove={props.alterGuesses} gender={entry.gender} weight={entry.weight} day={entry.day} guessNumber={props.babyGuesses.length - index} canEdit={props.editMode.state}/>
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