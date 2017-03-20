import React, { Component } from 'react';

export default class Countdown extends Component {
	
	constructor(props) {
		
		super(props);
		
		this.state = {
			dueDateObj : new Date(props.dueDate.year,props.dueDate.month,props.dueDate.day),
			segments : { d: 0, h: 0, m: 0, s: 0 },
			countdown : false
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
		
		let targetTime = this.state.dueDateObj.getTime();
		let remainingTime = targetTime  - Date.now();
		let countdown = targetTime > Date.now() ? true : false;
		
		const remainingMillis = ( countdown ) ? remainingTime : 0;	
		this.setState({
			countdown : countdown,
			segments: this._formatCount(remainingMillis)
			}
			);


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
		let message;
		if(this.state.countdown){
			message = `${this.state.segments.d} days • ${this.state.segments.h}  hours • ${this.state.segments.m} min • ${this.state.segments.s} secs`;
		} else {
			message = 'The Due Date has Passed!';
		}
		
		return <div className="timer">{message}</div>;
	}
}