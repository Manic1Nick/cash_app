import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield, RadioGroup, Radio, FABButton, Icon } from 'react-mdl';

var React = require('react');
var CategorySelector = require('./CategorySelector.jsx');
var SubCategorySelector = require('./SubCategorySelector.jsx');

require('./css/ItemCreator.css');

var ItemCreator = React.createClass({
    getInitialState() {
        return {
            type: 'expense',
            category: '',
            subCategory: '',
            amount: '',
            openCategorySelector: false,
            openSubCategorySelector: false
        }
    },

    handleCreateNewItem() {
        var currentDateText = () => {
            var options={ year: '2-digit', month: '2-digit', day: '2-digit' };
            return new Date().toLocaleString("ru",options);
        };

        var newItem= {
            date: currentDateText(),
            type: this.state.type,
            category: this.state.category ? this.state.category : '-',
            subCategory: this.state.subCategory ? this.state.subCategory : '-',
            amount: this.state.amount ? this.state.type == 'expense' ? -this.state.amount : this.state.amount : 0
        };

        this.props.createNewItem(newItem);

        this.props.closeItemCreator();
        this.setState({ type: 'expense', category: '', subCategory: '', amount: '' });
    },

    handleSelectCategory(category) {
        this.setState({ category, openCategorySelector: false });
    },

    handleSelectSubCategory(subCategory) {
        this.setState({ subCategory, openSubCategorySelector: false });
    },

    handleOpenCategorySelector() {
        this.setState({ openCategorySelector: true });
    },

    handleOpenSubCategorySelector() {
        this.setState({ openSubCategorySelector: true });
    },

    handleCloseCategorySelector() {
        this.setState({ openCategorySelector: false });
    },

    handleCloseSubCategorySelector() {
        this.setState({ openSubCategorySelector: false });
    },

    handleClose() {
        this.props.closeItemCreator();
        this.setState({ type: 'expense', category: '', subCategory: '', amount: '' });
    },

	render() {
		return (
            <div>
                <Dialog open={this.props.openItemCreator}>
                    <DialogTitle>New item</DialogTitle>
                    <DialogContent>
                        <div>
                            <RadioGroup name="type" value={this.state.type}>
                                <Radio value="expense" 
                                    onClick={() => { this.setState({ type: 'expense' }) }} 
                                    ripple
                                >
                                    Expense
                                </Radio>
                                <Radio value="income" 
                                    onClick={() => { this.setState({ type: 'income' }) }} 
                                    ripple
                                >
                                    Income
                                </Radio>
                            </RadioGroup>

                            <Textfield
                                onChange={(event) => { this.setState({ category: event.target.value }) }}
                                label="Input new category"
                                style={{width: '180px'}}
                                value={this.state.category}
                            />
                            <FABButton onClick={this.handleOpenCategorySelector} mini>
                                <Icon name="+" />
                            </FABButton>

                            <Textfield
                                onChange={(event) => { this.setState({ subCategory: event.target.value }) }}
                                label="Input new sub-category"
                                style={{width: '180px'}}
                                value={this.state.subCategory}
                            />
                            <FABButton onClick={this.handleOpenSubCategorySelector} mini>
                                <Icon name="+" />
                            </FABButton>

                            <Textfield
                                onChange={(event) => { this.setState({ amount: event.target.value }) }}
                                pattern="-?[0-9]*(\.[0-9]+)?"
                                error="Input is not a number!"
                                label="Input amount"
                                style={{width: '180px'}}
                                value={this.state.amount}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions fullWidth>
                        <Button type='button' onClick={this.handleCreateNewItem}>Add</Button>
                        <Button type='button' onClick={this.handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <CategorySelector 
                    openCategorySelector={this.state.openCategorySelector}
                    closeCategorySelector={this.handleCloseCategorySelector} 
                    categories={this.props.categories} 
                    addCategory={this.handleSelectCategory}
                />
                <SubCategorySelector 
                    openSubCategorySelector={this.state.openSubCategorySelector}
                    closeSubCategorySelector={this.handleCloseSubCategorySelector} 
                    subCategories={this.props.categories[this.state.category]} 
                    addSubCategory={this.handleSelectSubCategory}
                />
            </div>
        );        
	}
});

module.exports = ItemCreator;