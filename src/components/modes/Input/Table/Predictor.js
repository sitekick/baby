import React, { PropTypes } from 'react';
import WeightDisplay from '../../../library/WeightDisplay';

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
		date : 0,
		dateStat(){
			let avgDate = new Date(Math.floor(this.date/this.entries));
			return avgDate.toDateString();
		},
	};
	
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
		stats.date += Date.UTC([data.day.year],[data.day.month],[data.day.day],now.getHours(),now.getMinutes());
	}
	
	return (
		<tr className={`predictor ${(stats.genderStat() === 'Girl') ? 'girl' : ''}`}>
			<td><strong>Prediction</strong></td>
			<td>{stats.genderStat()}</td>
			<td><WeightDisplay weightOz={stats.weightStat()} /></td>
			<td>{stats.dateStat()}</td>
		</tr>
	)
}

export default Predictor;