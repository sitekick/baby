import React from 'react';

function WeightDisplay(props) {
	
	const style = {
		fontSize : ".75em"
	}
	
	const weightObj = ozConverter(props.weightOz)
	
	
	function ozConverter(ounces) {
	
			const lb = Math.floor(ounces / 16);
			const lb_remainder = ounces % 16;
			const oz = Math.floor(lb_remainder);
			
			return {
				lb : lb,
				oz : oz
			};
		}
	
	return <span>{weightObj.lb} <span style={style}>lbs.</span> {weightObj.oz} <span style={style}>oz.</span></span>
	
}

export default WeightDisplay;