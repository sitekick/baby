import React, { PropTypes } from 'react';
import WeightDisplay from '../../../library/WeightDisplay';

function Guess(props) {	
		
		var date = new Date(props.day.year, props.day.month, props.day.day);
		
		const style = {
			tr : {
				backgroundColor: (props.index % 2) ? '#FFF' : '#E8EBF7',
			},
			td : {
				padding: ".5em 0 .5em .5em",
				fontSize: "1.25em"
			},
			icon : {
				backgroundImage: "url(src/img/babySlices.png)",
				backgroundRepeat: "no-repeat",
				backgroundSize: "200% 400%",
				width: 40,
				height: 40,
			},
			girl : {
				backgroundPosition: "0% 100%"
			},
			boy : {
				backgroundPosition: "100% 66.66667%"
			},
			applySlice(gender){
				return Object.assign({},this.icon, this[gender]);
			}
		};
		
		return (
		
		<tr className={(props.pendingState === true) ? 'pending' : ''} style={style.tr} >
			<td style={style.td}>
			{props.canEdit &&
				<button onClick={function(){props.onRemove(props.index)}}>x</button>
			} 
				{props.name}</td>
			<td style={style.td}><div style={style.applySlice(props.gender)} /></td>
			<td style={style.td}><WeightDisplay weightOz={props.weight} /></td>
			<td style={style.td}>{date.toDateString()}</td>
		</tr>
		)
	
}

Guess.propTypes = {
	onRemove : PropTypes.func.isRequired
}

export default Guess;