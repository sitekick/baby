import React from 'react';
import BabyImage from './BabyImage';
import WeightDisplay from '../../library/WeightDisplay';
import MonthMaker from '../../library/MonthMaker';
const Results = props => {
	
	const birthDetail = props.appSettings.birthDetails;
	const birthDate =  ` ${<MonthMaker JSmonthInt={birthDetail.date.month} />} , ${birthDetail.date.day} ${birthDetail.date.year}`;
	
	return (
		<div className="results panel">
			<h3>{props.message}</h3>
			<BabyImage gender={birthDetail.gender} ounces="224" />
			<p>A baby <strong>{birthDetail.gender}</strong> was born on <strong><MonthMaker mode="abbr" monthIntJS={birthDetail.date.month} />{` ${birthDetail.date.day}, ${birthDetail.date.year} `}</strong>  weighing <strong><WeightDisplay weightOz={birthDetail.weight} /></strong></p>
		</div>
	)
	
}

export default Results;