import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from 'react-mdl';

var React = require('react');

require('./css/MenuSelect.css');

var MenuSelect = React.createClass({
	render() {
		return (
            <div>
                <Dialog open={this.props.openMenuSelect}>
                    <DialogTitle>Select items by:</DialogTitle>
                    <DialogContent>
                        <div>
                            <List>
                                {
                                    this.props.itemFields.map((field, idx) => {
                                        if (field != 'amount' && field != 'type') {
                                            return <ListItem 
                                                    key={idx} 
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => { this.props.selectBy(field) }}>
                                                    {field}
                                                </ListItem>
                                        }                                        
                                    })
                                }
                            </List>
                        </div>
                    </DialogContent>
                    <DialogActions fullWidth>
                        <Button type='button' onClick={this.props.closeMenuSelect}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );        
	}
});

module.exports = MenuSelect;