import React, { Component } from 'react';


export default class Countdown extends Component {
	
	constructor(props) {
		
		super(props);
		
		this.state = {
			dueDateObj : new Date(props.dueDate.year,props.dueDate.month,props.dueDate.day),
			segments : { d: 0, h: 0, m: 0, s: 0 }
		};
		
		//set initial time
		this.state.segments = this._formatCount(this.state.dueDateObj.getTime() - Date.now())
	}
	
	_formatCount(time) {
		
		const days = Math.floor(time / (24*60*60*1000));
		const days_remainder = time % (24*60*60*1000);
		const hours = Math.floor(days_remainder / (60*60*1000));
		const hours_remainder = days_remainder % (60*60*1000);
		const minutes = Math.floor(hours_remainder / (60*1000));
		const minutes_remainder = hours_remainder % (60*1000);
		const seconds = Math.floor(minutes_remainder / 1000);
		
		return {
			d : days, 
			h : hours, 
			m : minutes, 
			s : seconds
			};
		
	}
	
	_tickCount() {
		
		const remainingMillis = this.state.dueDateObj.getTime() - Date.now();		
		this.setState({segments: this._formatCount(remainingMillis) });

	}
	
	
	componentWillReceiveProps(props){
		
		this.setState({
			dueDateObj : new Date(props.dueDate.year,props.dueDate.month,props.dueDate.day)
		});
		
	}
	
	componentDidMount() {
		
		this.timer = setInterval(
			()=> this._tickCount()
			, 1000
		);
	}
	
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	
	render() {
		
		const style = {
			timer : {
				wrapper : {
					display: "table-cell",
					verticalAlign: "middle",
					width: "80%"				
				},
				h3 : {
					fontSize: "1.5em",
					color: "#A6B1E1",
					margin: "0 0"
				}
			}
		};
		
		return (
			
			<div className="timer" style={style.timer.wrapper}>
				<h3 style={style.timer.h3}>{this.state.segments.d} days &bull; {this.state.segments.h}  hours &bull; {this.state.segments.m} min &bull; {this.state.segments.s} secs </h3>
			</div>
				
		);
	}
}