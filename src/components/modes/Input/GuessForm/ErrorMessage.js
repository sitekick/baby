import React from 'react';

function ErrorMessage(props) {
	
	const style = {
		error : {
			position: "absolute",
			display: "block",
			bottom: -18,
			left: 0
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
		// hide error message until first form submission then evaluate validation state for error message display condition 
		<span className="error-message" style={(props.formSubmitted) ? style.errorState(props.fieldValidation[props.fieldName]) : style.errorState(true)}>
			{props.messageContent}
		</span>

	)
}

export default ErrorMessage;