import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';

var React = require('react');
var ReactMDL = require('react-mdl');
const { FABButton, Button, Icon, IconButton, Menu, MenuItem } = ReactMDL;

require('./css/Actions.css');

var Actions = React.createClass({
	render() {
		return (
			<div className="actions">
				<div className="buttons">
				<IconButton className="btn-menu" name="more_vert" id="demo-menu-lower-left" />
					    <Menu target="demo-menu-lower-left">
					        <MenuItem onClick={this.props.summarize}>Summarize by...</MenuItem>
					        <MenuItem onClick={this.props.select}>Select by...</MenuItem>
					    </Menu>		
				<div className="btn-add">
					<FABButton onClick={this.props.addNewItem} colored ripple>
					    <Icon name="+" />
					</FABButton>					
				</div>	
				</div>		
				{/*<FABButton onClick={this.props.sort} ripple>
					<Icon name="..." />	
					
				</FABButton>*/}	
			</div>
		);
	}
});

module.exports = Actions;