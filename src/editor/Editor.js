import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';

class EditorComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        text: '',
        title: '',
        id: '',
      };
    }
  
    updateBody = async (val) => {
      await this.setState({ text: val });
      this.update();
    };
  
    update = debounce(() => {
      console.log("Updating database");
    }, 1500);
  
    render() {
      const { classes } = this.props;
  
      return (
        <div className={classes.editorContainer}>
          <ReactQuill 
            style={{ height: '100%' }} 
            value={this.state.text} 
            onChange={this.updateBody} 
          />
        </div>
      );
    }
  }

export default withStyles(styles)(EditorComponent);