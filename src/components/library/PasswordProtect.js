import React, {PropTypes, Component} from 'react';
import CloseButton from './CloseButton';
var classNames = require('classnames');

export default class PasswordProtect extends Component {
	
	constructor(props) {
		
		super(props)
		
		this.state = {
			auth : null
		}
		
		this.handlers = {
			onChange : {
				input : (e) => {
					if( e.target.value === this.props.authKey ) {
						this.props.authorizeAction()
						this.setState({auth : true})
					} else if(e.target.value.length >= this.props.authKey.length ) {
						this.refs.authInput.maxLength = this.props.authKey.length
						this.setState({auth : false})
					}
				}
			}
		}
	}
	
	render() {
		
		const style ={
			element : {
				position: "relative"
			},
			overlay : {
				position: "absolute",
				display: (this.state.auth) ? "none" : "block",
			}
		}
		
		var passwordProtectClass = classNames(
			'password-protect',
			{incorrect : this.state.auth === false}
		);
		
		return (
			<div className={passwordProtectClass} style={style.element} >
				<div className="overlay" style={style.overlay} >
					<CloseButton clickAction={this.props.CloseButtonClickAction} />
					<div className="prompt">
					{this.state.auth === false ?
						<h3>Password Incorrect</h3>
					: 
						<h3>Enter Password</h3>
					}
					<input type="password" name="password" ref="authInput" onChange={this.handlers.onChange.input} />
					</div>
				</div>
				<div className="content">
				{this.props.children}
				</div>
			</div>
		)
	}
}

PasswordProtect.propTypes = {
	CloseButtonClickAction : PropTypes.func,
	authorizeAction : PropTypes.func.isRequired
}