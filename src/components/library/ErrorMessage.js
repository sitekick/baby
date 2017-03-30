import React from 'react';

function ErrorMessage(props) {
	
	function parseFieldName(fieldname){
		
		const capitals = /[A-Z]/g;
		const fieldnameString = capitalize(fieldname.replace(/[A-Z]/g, ' $&' ));		
		
		return fieldnameString || fieldname;
		
		function capitalize(str){
			let firstLetter = str.charAt(0).toUpperCase(); 
			return firstLetter + str.slice(1);
		}
	}
	
	const style = {
		error : {
			display: (props.display) ? "block" : "none"
		}
	};
	
	
	return (
		// hide error message until first form submission then evaluate validation state for error message display condition 
		<div className="error-message-group" style={style.error}>
			<h4>{props.messageHeader}</h4>
			<ul>
			{Object.keys(props.errors).map((error, index) => {
				if( props.errors[error] === false ) {
					 parseFieldName(error)
					 return <li key={`error-${index}`}>{parseFieldName(error)}</li>
				}
			})
			}
			</ul>
		</div>

	)
}

export default ErrorMessage;