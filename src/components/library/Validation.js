import React, {PropTypes, Component} from 'react';
import update from 'immutability-helper';

export default class Validation extends Component {
	
	constructor(props) {
		
		super(props)
		
		this.state = { 
			valid : false,
			tests : [] 
			};
		
		this.mount = {
			stateDefaults : testArray => {
				let validBool = this.helpers.validate(testArray);
				let delta = update(this.state, {
					valid : { $set : validBool },
					tests : { $push : testArray }
				})
				this.setState(delta);
			}
		}
		this.helpers = {
			configureTests : (children) => {
				let testsArray = [];
				if( !Array.isArray(children) ){
					let fieldObj = this.helpers.testObject(children.props);
					testsArray.push(fieldObj);
				} else {
					const inputs = this.helpers.filterChildren(children)
					for(let input in inputs){
						let fieldObj = this.helpers.testObject(inputs[input].props);
						testsArray.push(fieldObj) 
					}
				}
				return testsArray;
			},
			testObject : (object) => ({
				name : object.name,
				type : object.type,
				value : object.value,
				checked : (object.type === 'radio' || object.type === 'checkbox') ? object.checked : false,
				min : (object.type === 'range') ? object.min : false,
				id : (object.id) ? object.id : object.name
			}),
			validate : testArray => {
				
				switch(props.validationMethod) {
					case 'selection' :
						function noSelections(test) {
							return test.checked === false; 
						}
						return !testArray.every(noSelections)
					break;
					case 'nonblank' :
						let nonblank = (testArray) ? testArray[0] : '';
						return (nonblank.value.trim()) ? true: false;
					break;
					case 'change' :
						let change = (testArray) ? testArray[0] : '';
						return (Number(change.value) >= Number(change.min)) ? true : false;
					break;
					default: 
						return false;
				}
			},
			filterChildren : children => {
				
				function _isInput(child){
					return child.type === 'input';
				}
				
				return children.filter(_isInput)
			}
		}
	
	}
	
	componentWillMount() {
		const validationTests = this.helpers.configureTests(this.props.children);
		this.mount.stateDefaults(validationTests);
	}
	
	componentDidMount(){
		if(typeof this.props.isValid === 'function')
			this.props.isValid(this.props.fieldName, this.state.valid)
	}
	
	componentWillReceiveProps(nextProps){
		
		const currentTestsString = JSON.stringify(this.state.tests);
		const nextTests = this.helpers.configureTests(nextProps.children);
		const nextTestsString = JSON.stringify(nextTests);
		
		if(currentTestsString !== nextTestsString) {
			let bool = this.helpers.validate(nextTests);
			
			if(this.state.valid !== bool){
				this.props.isValid(this.props.fieldName, bool)
				this.setState({
					valid : bool,
					tests : nextTests
					})
			}
		} 
	}
	
	
	render() {
		
		const style = {
			error : {
				display: (this.state.valid) ? "none" : "block"
			}
		};
		
		return (
			<div className={`validation-field ${this.props.fieldName}`}>
				{this.props.children}
			<span className="error-message" style={style.error}>{this.props.messageContent}</span>
			</div>
		)
	}
}

Validation.propTypes = {
	isValid : PropTypes.func
}