import React, {PropTypes} from 'react';
import GuessTable from './Table/GuessTable';
import GuessForm from './GuessForm/GuessForm';
import Predictor from './Table/Predictor';

function Input(props){
	
	const style = {
		wrapper : {
			width: "95%",
			margin: "0 2.5%"
		}
	}
	
	return (
		<div className="mode input" style={style.wrapper} >
			<GuessTable babyGuesses={props.guessTableBabyGuesses.reverse()} editMode={props.guessTableEditMode} alterGuesses={props.guessTableAlterGuesses} />
			<Predictor babyGuesses={props.guessTableBabyGuesses} />
			<GuessForm onAdd={props.guessFormOnAdd} />
		</div>
	)
}

Input.propTypes =  {
	guessTableAlterGuesses : PropTypes.func.isRequired,
	guessFormOnAdd : PropTypes.func.isRequired
}

export default Input;