import React, {PropTypes} from 'react';

function CloseButton(props) {
	
	const style = {
		button : {
			backgroundColor: "transparent",
			border: 0,
			padding: 0,
			cursor: "pointer"
		}
	}
	
	return <button className="closeButton" onClick={props.clickAction} style={style.button}>✕</button>
		
}

export default CloseButton;

CloseButton.propTypes = {
	clickAction : PropTypes.func.isRequired
}