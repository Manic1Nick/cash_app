import 'react-mdl-css/material.css';
import 'react-mdl/extra/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from 'react-mdl';

var React = require('react');

require('./css/FieldSelector.css');

var FieldSelector = React.createClass({
	render() {  
		return (
            <div>
                <Dialog open={this.props.openFieldSelector}>
                    <DialogTitle>Select category</DialogTitle>
                    <DialogContent>
                        <div>
                            <List>
                                {
                                    this.props.listOpenBy.map((value, idx) => {
                                        return <ListItem 
                                                    key={idx} 
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => { this.props.selectBy(value) }}>
                                                    {value}
                                                </ListItem>
                                    })
                                }
                            </List>
                        </div>
                    </DialogContent>
                    <DialogActions fullWidth>
                        <Button type='button' onClick={this.props.closeFieldSelector}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );        
	}
});

module.exports = FieldSelector;