import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from 'react-mdl';

var React = require('react');

require('./css/SubCategorySelector.css');

var SubCategorySelector = React.createClass({
	render() {  
        let subCategories = this.props.subCategories ? this.props.subCategories : [];
		return (
            <div>
                <Dialog open={this.props.openSubCategorySelector}>
                    <DialogTitle>Select sub-category</DialogTitle>
                    <DialogContent>
                        <div>
                            <List>
                                {
                                    subCategories.map((subCategory, idx) => {
                                        return <ListItem 
                                                    key={idx} 
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => { this.props.addSubCategory(subCategory) }}>
                                                    {subCategory}
                                                </ListItem>
                                    })
                                }
                            </List>
                        </div>
                    </DialogContent>
                    <DialogActions fullWidth>
                        <Button type='button' onClick={this.props.closeSubCategorySelector}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );        
	}
});

module.exports = SubCategorySelector;