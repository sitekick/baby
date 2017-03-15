import React, {PropTypes} from 'react';
import GuessTable from './Table/GuessTable';
import GuessForm from './GuessForm/GuessForm';
import Predictor from './Table/Predictor';

function Input(props){
	
	return (
		<div className="mode input">
			<GuessTable babyGuesses={props.guessTableBabyGuesses.reverse()} editMode={props.guessTableEditMode} alterGuesses={props.guessTableAlterGuesses} />
			<Predictor babyGuesses={props.guessTableBabyGuesses} />
			<GuessForm onAdd={props.guessFormOnAdd} appSettings={props.appSettings} />
		</div>
	)
}

Input.propTypes =  {
	guessTableAlterGuesses : PropTypes.func.isRequired,
	guessFormOnAdd : PropTypes.func.isRequired
}

export default Input;