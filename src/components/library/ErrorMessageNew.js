import React from 'react';

function ErrorMessageNew(props) {
	
	console.log(props.fieldValidation[props.fieldName])
	
	const style = {
		error : {
			//position: "absolute",
			display: (props.fieldValidation[props.fieldName] === true ) ? "none" : "block",
			//bottom: -18,
			//left: 0
		},
		errorOff : { 
			display: "none"
		},
		errorState : function(field) {
			if(field) {
				return Object.assign({},this.error,this.errorOff);
			} else {
				return this.error;
			}
		}
	};
	
	return (
		<span className="error-message" style={style.error}>{props.messageContent}</span>

	)
}

export default ErrorMessageNew;