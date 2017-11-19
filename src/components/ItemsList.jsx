import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';

var React = require('react');
var ReactMDL = require('react-mdl');
const { Table, TableHeader } = ReactMDL;

require('./css/ItemsList.css');

var ItemsList = React.createClass({
    render() {
    	let items = this._addRowTotal(this.props.items, this.props.currentType);
        return (
        	<div className="list">
        		<Table				    
				    sortable
				    shadow={0}
				    rows={items}
				>
					<TableHeader
    				    name="date"
    				    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare(isAsc ? b : a)}
    				    tooltip="The date of create"
    				>
    				    Date
    				</TableHeader>
					<TableHeader
    				    name="category"
    				    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare(isAsc ? b : a)}
    				    tooltip="Your category of expenses or incomes"
    				>
    				    Category
    				</TableHeader>
    				<TableHeader
    				    name="subCategory"
    				    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare(isAsc ? b : a)}
    				    tooltip="This is sub-category of item"
    				>
    				    Sub-Category
    				</TableHeader>
    				<TableHeader
    				    numeric
    				    name="amount"
    				    sortFn={(a, b, isAsc) => (isAsc ? a : b)*100 > (isAsc ? b : a)*100}
    				    cellFormatter={(amount) => `\$ ${amount.toFixed(2)}`}
    				    tooltip="Summ"
    				>
    				    Amount
    				</TableHeader>
				</Table>        			
        	</div>
        );
    },

    _addRowTotal(items, currentType) {
    	items = items.filter((item) => { return item.subCategory.indexOf('TOTAL') === -1 });
        let total = 0;
        items.forEach((item) => { total += item.amount });
    	items.push({date: '', category: '', subCategory: 'TOTAL:', amount: total, type: ''});
        return items;
    }
});

module.exports = ItemsList;