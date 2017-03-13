import React, { PropTypes } from 'react';
import Guess from './Guess';
import Predictor from './Predictor';

function GuessTable(props) {	 
		
	const style = {
		
		table : {
			width: "100%",
			margin: 0,
			borderCollapse: "collapse",
			textAlign: "left",
			color: "#2F4550"
		}, 
		thead : {
			tr : {
				color: "#B4869F",
				textTransform: "uppercase",
				fontSize: "1.125em"
			}
		}
	};
	
	return (
		<table style={style.table}>
			<thead>
				<tr style={style.thead.tr}>
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