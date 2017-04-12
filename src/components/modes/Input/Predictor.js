import React, { PropTypes } from 'react';
import WeightDisplay from '../../library/WeightDisplay';
import LockIcon from '../../library/LockIcon';
import MonthMaker from '../../library/MonthMaker';

function Predictor(props){
	
	var stats = {
		entries : 0,
		gender : {
			boy : 0,
			girl : 0
			},
		genderStat() {
			let count = this.gender.boy - this.gender.girl;
			
			switch(true){
				case count > 0:
				return 'Boy';
				break;
				case count < 0:
				return 'Girl'
				default :
				return 'Unclear';
			}
		},
		weight : 0,
		weightStat(){
			return Math.floor(this.weight/this.entries);
		},
		date : 0
	};
	
	var guessable = props.appSettings.birthDetails.guessable;
	
	function isGuessable(detail){
		return guessable.indexOf(detail) >= 0
	}

	
	for(let guess in props.babyGuesses){
		//counter
		stats.entries += 1;
		let data = props.babyGuesses[guess];
		//calc gender
		stats.gender[data.gender] += 1;
		//calc weight
		stats.weight += Number([data.weight]);
		//calc date
		let now = new Date();
		stats.date += Date.UTC([data.date.year],[data.date.month],[data.date.day],now.getHours(),now.getMinutes());
	}
	
	const avgDate = new Date( Math.floor(stats.date/stats.entries) );
	
	return (
		<table className="predictor">
		<tbody>
		<tr className={(stats.genderStat() === 'Girl') ? 'girl' : ''}>
			<td><strong>Prediction</strong></td>
			<td>{stats.genderStat()} <LockIcon display={!isGuessable('gender') ? 'white' : 'off'} /></td>
			<td><WeightDisplay weightOz={stats.weightStat()} /> <LockIcon display={!isGuessable('weight') ? 'white' : 'off'} /></td>
			<td><MonthMaker mode="abbr" monthIntJS={avgDate.getMonth()}/> {`${avgDate.getDate()}, ${avgDate.getFullYear()}`}{} <LockIcon display={!isGuessable('date') ? 'white' : 'off'}/></td>
		</tr>
		</tbody>
		</table>
	)
}

export default Predictor;