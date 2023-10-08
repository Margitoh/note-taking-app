import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component {

    render() {
        return (<div>Hello from the Sidebar ITEM</div>);
    }
}

export default withStyles(styles)(SidebarItemComponent);