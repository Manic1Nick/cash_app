import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';

var React = require('react');
var ReactMDL = require('react-mdl');
const { Tabs, Tab } = ReactMDL;

require('./css/Menu.css');

var Menu = React.createClass({
	getInitialState() {
		return {
			tabs: ['Expenses', 'Incomes', 'All'],
			activeTab: 0
		}
	},

	componentDidMount() {
		let idx = this.state.activeTab;
        this.props.onType(this.state.tabs[idx]);
    },

    handleChange(tabId) {
    	this.setState({ activeTab: tabId });
    	this.props.onType(this.state.tabs[tabId]);
    },

	render() {
		return (
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded">
                <Tabs activeTab={this.state.activeTab} onChange={this.handleChange} ripple>
                	{
                		this.state.tabs.map((tab) => { 
                			return <Tab key={tab}>{tab}</Tab> 
                		})
                	}
                </Tabs>
            </div>    
        );
	}
});

module.exports = Menu;