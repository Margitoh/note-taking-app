import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

class SidebarItemComponent extends React.Component {
  state = {
    isClicked: false,
  };

  selectNote = (note, index) => {
    this.setState({ isClicked: true });

    // Reset the isClicked state after a short delay (e.g., 300ms)
    setTimeout(() => {
      this.setState({ isClicked: false });
      this.props.selectNote(note, index);
    }, 200);
  };

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
          className={`${classes.listItem} ${
            selectedNoteIndex === _index ? classes.selectedItem : ""
          } ${this.state.isClicked ? classes.clickedItem : ""}`}
          selected={selectedNoteIndex === _index}
          alignItems="flex-start"
          onClick={() => this.props.selectNote(_note, _index)}
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
