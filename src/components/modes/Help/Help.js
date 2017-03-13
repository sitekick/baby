import React, {PropTypes} from 'react';
import CloseButton from '../../library/CloseButton';


function Help(props) {
	
	const style = {
		wrapper : {
			width: "95%",
			margin: "0 2.5% 1em",
		}
	}
	
	return (
		<div className="mode help" style={style.wrapper} >
			<CloseButton floatAlign="right" clickAction={() => {props.closeButtonClickAction('input')}}/>
			<h2>Help</h2>
			<p>Information...</p>
		</div> 
		
	)
}

Help.propTypes = {
	closeButtonClickAction : PropTypes.func.isRequired
}


export default Help;

