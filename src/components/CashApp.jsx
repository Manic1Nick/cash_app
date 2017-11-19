import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';

var React = require('react');
var ReactMDL = require('react-mdl');
const { Table, TableHeader, Switch } = ReactMDL;
//var jsonfile = require('jsonfile');
const CATEGORIES = require('../../files/categories.json');
const ITEMS = require('../../files/items.json');

var Menu = require('./Menu.jsx');
var ItemsList = require('./ItemsList.jsx');
var Actions = require('./Actions.jsx');
var ItemCreator = require('./ItemCreator.jsx');
var MenuSummarize = require('./MenuSummarize.jsx');
var MenuSelect = require('./MenuSelect.jsx');
var FieldSelector = require('./FieldSelector.jsx');

require('./css/CashApp.css');

/*var CATEGORIES = { 
    'Food': ['Groceries','Restoraunt'],
    'Automobile': ['Fuel','Maintance'],
    'Utilities': ['Internet'],
    'Salary': [''],
    'Bonuses': ['']
};*/

/*var ITEMS = [
    {date: '07.10.17', category: 'Food', subCategory: 'Groceries', amount: -2.90, type: 'expense'},
    {date: '07.10.17', category: 'Automobile', subCategory: 'Fuel', amount: -55.10, type: 'expense'},
    {date: '07.10.17', category: 'Utilities', subCategory: 'Internet', amount: -8.50, type: 'expense'},
    {date: '07.10.17', category: 'Salary', subCategory: '', amount: 200.00, type: 'income'},
    {date: '07.10.17', category: 'Bonus', subCategory: '', amount: 40.00, type: 'income'}
];*/

var CashApp = React.createClass({
    getInitialState() {
        return {
            categories: [],
            items: ITEMS.items,
            visibleItems: [],
            type: 'expense',
            openItemCreator: false,
            openMenuSummarize: false,
            openMenuSelect: false,
            openFieldSelector: false,
            fieldForSelect: ''
        }
    },

    componentDidMount() {
        this.setState({
            categories: CATEGORIES,
            items: ITEMS.items,
            visibleItems: ITEMS.items
        });
    },

    componentDidUpdate() {
        //var file = '../../files/items.json';
        //var items = JSON.stringify(this.state.items);
        //alert({ "items": items });
         
        //jsonfile.writeFile(file, { "items": items }, err => console.error(err));
    },

    handleUseType(newType) {
        var type = 'all';
        if (newType.toLowerCase().indexOf('expense') !== -1) type = 'expense';
        if (newType.toLowerCase().indexOf('income') !== -1) type = 'income';

        var visibleItems = this._getVisibleItems(this.state.items, type);
        this.setState({ visibleItems, type });
    },

    handleNewItemAdd(newItem) {
        var newItems = this.state.items.slice();
        newItems.push(newItem);

        var newCategories = this._updateCategories(newItem);
        var visibleItems = this._getVisibleItems(newItems, this.state.type);
        this.setState({ items: newItems, categories: newCategories, visibleItems });
    },

    handleOpenItemCreator() {
        this.setState({ openItemCreator: true });
    },
    
    handleCloseItemCreator() {
        this.setState({ openItemCreator: false });
    },

    handleOpenMenuSummarize() {
        this.setState({ openMenuSummarize: true });
    },

    handleCloseMenuSummarize() {
        this.setState({ openMenuSummarize: false });
    },

    handleOpenMenuSelect() {
        this.setState({ openMenuSelect: true });
    },

    handleCloseMenuSelect() {
        this.setState({ openMenuSelect: false });
    },

    handleOpenFieldSelector(fieldForSelect) {
        this.setState({ openFieldSelector: true, fieldForSelect });
    },

    handleCloseFieldSelector() {
        this.setState({ openFieldSelector: false });
    },

    handleSummarizeItems(item) {
        var summarizedItems = this._summarizeItems(this.state.items, item);
        var visibleItems = this._getVisibleItems(summarizedItems, this.state.type);
        this.setState({ visibleItems, openMenuSummarize: false });
    },

    handleSelectField(selectBy) {
        var selectedItems = this._selectItems(this.state.items, this.state.fieldForSelect, selectBy);
        var visibleItems = this._getVisibleItems(selectedItems, this.state.type);
        this.setState({ visibleItems, openMenuSelect: false, openFieldSelector: false });
    },

    render() {
        let itemFields = Object.keys(this.state.items[0]);
        return (
            <div className="container">
                <Menu onType={this.handleUseType} />
                <ItemsList items={this._getVisibleItems(this.state.visibleItems, this.state.type)} 
                    itemFields={itemFields} 
                    currentType={this.state.type} 
                />
                <Actions 
                    addNewItem={this.handleOpenItemCreator} 
                    summarize={this.handleOpenMenuSummarize} 
                    select={this.handleOpenMenuSelect} 
                />
                <ItemCreator 
                    categories={this.state.categories} 
                    openItemCreator={this.state.openItemCreator} 
                    closeItemCreator={this.handleCloseItemCreator}
                    createNewItem={this.handleNewItemAdd}
                />
                <MenuSummarize 
                    openMenuSummarize={this.state.openMenuSummarize}
                    itemFields={itemFields}
                    closeMenuSummarize={this.handleCloseMenuSummarize}
                    summarizeBy={this.handleSummarizeItems}
                />
                <MenuSelect 
                    openMenuSelect={this.state.openMenuSelect}
                    itemFields={itemFields}
                    closeMenuSelect={this.handleCloseMenuSelect}
                    selectBy={this.handleOpenFieldSelector}
                />
                <FieldSelector 
                    openFieldSelector={this.state.openFieldSelector}
                    listOpenBy={this._createListOpenBy(this.state.items, this.state.fieldForSelect)}
                    closeFieldSelector={this.handleCloseFieldSelector}
                    selectBy={this.handleSelectField}
                />
            </div>
        );
    },

    _getVisibleItems(items, visibleType) {
        if (visibleType && visibleType.toLowerCase() !== 'all') { 
            return items.filter((item) => { 
                return item.type.toLowerCase() === visibleType.toLowerCase(); 
            });
        };
        return items;         
    },

    _updateCategories(newItem) {
        let category, subCategories, newCategories = this.state.categories;

        Object.keys(newCategories).filter((key) => {
            if (key === newItem.category) category = key;
        });
        
        subCategories = category ? newCategories[newItem.category] : [] ;
        if (!category || subCategories.indexOf(newItem.subCategory) === -1) {
            subCategories.push(newItem.subCategory);
            newCategories[newItem.category] = subCategories;
        } 
        return newCategories;
    },

    _summarizeItems(items, summarizeBy) {
        let key, 
            value = 0, 
            summarizing = {};

        items.slice().forEach((item) => {
            if (item.type == this.state.type || this.state.type == 'all') {
                key = item[summarizeBy];
                value = item.amount;
                if (Object.keys(summarizing).indexOf(key) !== -1) {
                    value = +summarizing[key] + value;
                };
                summarizing[key] = value;
            }
        });
        
        let summarizedItems = [];            
        Object.keys(summarizing).forEach((key) => {
            let defaultItem = {date: '', category: '', subCategory: '', amount: 0, type: this.state.type};
            defaultItem[summarizeBy] = key;
            defaultItem['amount'] = +summarizing[key];
            summarizedItems.push(defaultItem);
        });  

        return summarizedItems;
    },

    _createListOpenBy(items, fieldForSelect) {
        let fieldValue,
            listOpenBy = [];
        items.forEach((item) => {
            fieldValue = item[fieldForSelect];
            let validType = item.type === this.state.type || this.state.type == 'all';
            if (validType && listOpenBy.indexOf(fieldValue) === -1) 
                listOpenBy.push(fieldValue);
        });
        return listOpenBy;
    },

    _selectItems(items, selectedKey, selectedValue) {
        return items.slice().filter((item) => {
            let validType = item.type === this.state.type || this.state.type == 'all';
            return (validType && item[selectedKey] === selectedValue);
        });
    }
});

module.exports = CashApp;