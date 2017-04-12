import React, {Component} from 'react';
const bowser = require('bowser');

export default class BodyClass extends Component {
	
	constructor(props) {
		
		super(props);
		
		this.state = {
			userAgent : '',
			bodyClasses : ''
		}
		
		this.methods = {
			UAClass : () => {
				let browserID;
				
				switch(true){
				 
				 case (bowser.name == 'Microsoft Edge'):
				 	browserID = `edge${Math.floor(bowser.version)}`;
				 	break;
				 case (bowser.name == 'Internet Explorer'):
				 	browserID = `ie${Math.floor(bowser.version)}`;
				 	break;
				 case (bowser.name == 'Safari'):
				 	const ver = (bowser.version * 1).toString();
				 	browserID = `sf${ver.replace('.','-')}`;
				 	break;
				 case (bowser.name == 'Chrome'):
				 	browserID = `ch${Math.floor(bowser.version)}`;
				 	break;
				 case (bowser.name == 'Opera'):
				 	browserID = `op${Math.floor(bowser.version)}`;
				 	break;
				 case (bowser.name == 'Firefox'):
				 	browserID = `ff${Math.floor(bowser.version)}`;
				 	break; 
				 default :
				 	browserID = '';
			    }
			    return browserID;
			},
			addClasses: () => {
		
				let classesArray = [];
				
				if ( this.state.userAgent ) 
					classesArray.push(this.state.userAgent)
				
				if ( this.state.bodyClasses ) {
					classesArray = this.state.bodyClasses.split(' ').concat(classesArray)
				}
				
				classesArray.map((bodyClass) => {
					this.helpers.addClass(bodyClass);
				})
			}
		}
		this.helpers = {
			el : document.body,
			hasClass : className =>  {
				if (this.helpers.el.classList)
					return this.helpers.el.classList.contains(className)
				else
					return !!this.helpers.el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
			},
			addClass : className => {
				if (this.helpers.el.classList)
					this.helpers.el.classList.add(className)
				else if (!this.hasClass(this.helpers.el, className)) this.helpers.el.className += " " + className
			},
			removeClass : className => {
				if (this.helpers.el.classList)
					this.helpers.el.classList.remove(className)
				else if (this.hasClass(this.helpers.el, className)) {
					var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
					this.helpers.el.className = this.helpers.el.className.replace(reg, ' ')
				}
			},
			resetClass : () =>  {
				this.helpers.el.className = '';
			}
		}
	}
	
	componentWillReceiveProps(nextProps){
		
		if(nextProps.addClasses != this.state.bodyClasses){
			this.setState({
				bodyClasses : nextProps.addClasses
			})
			//remove current classes
			this.helpers.resetClass();
		}
	}
	
	componentWillMount() {
		
		this.setState({
			userAgent : (this.props.sniffUA && bowser) ? this.methods.UAClass() : '',
			bodyClasses : (this.props.addClasses) ? this.props.addClasses.trim() : '' 
		})
	}
	
	componentDidUpdate() {
		this.methods.addClasses()
	}
	
	componentDidMount() {
		this.methods.addClasses()
	}
	
	componentWillUnmount() {
		this.helpers.resetClass();
	}
	
	render(){
		return this.props.children
	}
}