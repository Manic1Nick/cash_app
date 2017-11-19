import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from 'react-mdl';

var React = require('react');

require('./css/CategorySelector.css');

var CategorySelector = React.createClass({
	render() {  
		return (
            <div>
                <Dialog open={this.props.openCategorySelector}>
                    <DialogTitle>Select category</DialogTitle>
                    <DialogContent>
                        <div>
                            <List>
                                {
                                    Object.keys(this.props.categories).map((category, idx) => {
                                        return <ListItem 
                                                    key={idx} 
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => { this.props.addCategory(category) }}>
                                                    {category}
                                                </ListItem>
                                    })
                                }
                            </List>
                        </div>
                    </DialogContent>
                    <DialogActions fullWidth>
                        <Button type='button' onClick={this.props.closeCategorySelector}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );        
	}
});

module.exports = CategorySelector;