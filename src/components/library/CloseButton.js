import React, {PropTypes} from 'react'


function CloseButton(props) {
	
	
	const style = {
		button : {
			fontSize: "2em",
			backgroundColor: "transparent",
			border: 0,
			cursor: "pointer",
			float: (props.floatAlign) ? props.floatAlign : "none"
		}
/*
		align : {
			float: (props.floatAlign) ? props.floatAlign : "none"
		}
*/
	}
	
	return <button onClick={props.clickAction} style={style.button}>✕</button>
		
}

export default CloseButton;

CloseButton.propTypes = {
	clickAction : PropTypes.func.isRequired
}