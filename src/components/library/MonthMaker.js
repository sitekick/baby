import React, {Component} from 'react';

export default class MonthMaker extends Component {
	
	constructor(props){
		
		super(props)
		
		this.helpers = {
			data : [{
					month: "January",
					days: 31
				}, {
					month: "February",
					days: 28
				}, {
					month: "March",
					days: 31
				}, {
					month: "April",
					days: 30
				}, {
					month: "May",
					days: 31
				}, {
					month: "June",
					days: 30
				}, {
					month: "July",
					days: 31
				}, {
					month: "August",
					days: 31
				}, {
					month: "September",
					days: 30
				}, {
					month: "October",
					days: 31
				}, {
					month: "November",
					days: 30
				}, {
					month: "December",
					days: 31
				}],
			getMonthObj : () => {
				return this.helpers.data[props.monthIntJS]
			},
			full : () => {
				let mo = this.helpers.getMonthObj();
				return mo.month;
			},
			abbr : (length) => {
				let mo = this.helpers.getMonthObj();
				return mo.month.slice(0, length);
			}
		}
	}
	
	render(){
		return ( 
			<span className = "month-maker" > 
				{(this.props.mode === 'abbr') ? this.helpers.abbr(3) : this.helpers.full() } 
			</span>
		)
	}
}