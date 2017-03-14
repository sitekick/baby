import React from 'react';

function WeightDisplay(props) {
	
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
	
	return <span className="display-weight">{weightObj.lb} <span className="suffix">lbs.</span> {weightObj.oz} <span className="suffix">oz.</span></span>
	
}

export default WeightDisplay;