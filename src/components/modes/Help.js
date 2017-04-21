import React, {PropTypes} from 'react';
import CloseButton from '../library/CloseButton';


function Help(props) {
	
	const style = {
		wrapper : {
			width: "95%",
			margin: "0 2.5% 1em",
		}
	}
	
	return (
		<div className="mode help" style={style.wrapper} >
			<CloseButton floatAlign="right" clickAction={() => {props.closeButtonClickAction('help', 'input')}}/>
			<h2>Help</h2>
			<h3>Submitting your Guess</h3>
			<p>This app allows you to submit your guess about the details of the upcoming birth of the couple. To participate:</p><ol>
			<li>Select the <strong>Gender</strong></li>
			<li>Using the sliding scale, enter what you think the <strong>Weight</strong> of the child will be when born</li>
			<li>Select the month and day of the <strong>Date</strong> of birth</li>
			<li>Enter <strong>Your Name</strong></li>
			<li>Press Submit</li></ol>
			<p className="note"><span className="lock-icon"></span>In some cases, one or more details of the expected birth may be known by the parents. If such a value has been entered in advance, a lock icon will appear beside that field prohibiting you from making a guess about that birth detail.</p>
		</div> 
		
	)
}

Help.propTypes = {
	closeButtonClickAction : PropTypes.func.isRequired
}


export default Help;

