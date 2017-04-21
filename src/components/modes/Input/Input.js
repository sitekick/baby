import React, {PropTypes} from 'react';
import GuessTable from './GuessTable';
import GuessForm from './GuessForm';
import Predictor from './Predictor';
import Results from './Results';

function Input(props){
	
		return (
		
		<div className="mode input">
			<GuessTable babyGuesses={props.guessTableBabyGuesses} alterGuesses={props.guessTableAlterGuesses} appSettings={props.appSettings} />
			{ props.appSettings.appStatus ? (
				<div className="component-set">
				<Predictor babyGuesses={props.guessTableBabyGuesses} appSettings={props.appSettings} />
				<GuessForm onAdd={props.guessFormOnAdd} appSettings={props.appSettings} />
				</div>
				) : (
				<div className="component-set">
				{props.appSettings.birthDetails.guessable.length === 0 &&
				<Results message="We are Proud to Announce..." appSettings={props.appSettings} />
				}
				</div>
			)} 
		</div>
	)
}

Input.propTypes =  {
	guessTableAlterGuesses : PropTypes.func.isRequired,
	guessFormOnAdd : PropTypes.func.isRequired
}

export default Input;