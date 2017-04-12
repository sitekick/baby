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
	
	if(props.displayBlock) {
		return (
			<div className="display-weight">
			{ props.weightOz > 0 && 
				<span>
		{weightObj.lb} <span className="suffix">lbs.</span> {weightObj.oz} <span className="suffix">oz.</span>
				</span>
			}
			</div> 
		)
	} else {
		return (
			<span className="display-weight">
			{ props.weightOz > 0 && 
				<span>
		{weightObj.lb} <span className="suffix">lbs.</span> {weightObj.oz} <span className="suffix">oz.</span>
				</span>
			}
			</span> 
		)
	}
	
}

export default WeightDisplay;