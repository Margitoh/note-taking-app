import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

class SidebarItemComponent extends React.Component {
  selectNote = (note, index) => this.props.selectNote(note, index);

  deleteNote = (note) => {
    if (window.confirm(`Confirm delete: ${note.title}`)) {
      this.props.deleteNote(note);
    }
  };

  render() {
    const { _index, _note, classes, selectedNoteIndex } = this.props;

    return (
      <div key={_index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === _index}
          alignItems="flex-start"
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(_note, _index)}
          >
            <ListItemText
              primary={_note.title}
              secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
            />
          </div>
          <div
            className={classes.deleteIcon}
            onClick={() => this.deleteNote(_note)}
          >
            <DeleteIcon />
          </div>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(SidebarItemComponent);
