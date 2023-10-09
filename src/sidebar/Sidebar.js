import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/SidebarItem";

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
    };
  }

  newNoteBtnClick = () => {
    if (this.state.addingNote) {
      this.setState({ title: null, addingNote: false });
    } else {
      this.setState({ addingNote: true }, () => {
        if (this.noteInput) {
          this.noteInput.focus();
        }
      });
    }
  };

  updateTitle = (txt) => {
    this.setState({ title: txt });
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  };

  selectNote = (note, index) => this.props.selectNote(note, index);

  deleteNote = (note) => this.props.deleteNote(note);

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;

    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
            {this.state.addingNote ? "Cancel" : "New Note"}
          </Button>
          {this.state.addingNote && (
            <div>
              <input
                type="text"
                className={classes.newNoteInput}
                placeholder="Enter note title"
                onKeyUp={(e) => this.updateTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.newNote();
                  }
                }}
                ref={(input) => (this.noteInput = input)}
              ></input>
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}
              >
                Submit Note
              </Button>
            </div>
          )}
          <List>
            {notes.map((_note, _index) => {
              return (
                <div key={_index}>
                  <SidebarItemComponent
                    _note={_note}
                    _index={_index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  />
                  <Divider />
                </div>
              );
            })}
          </List>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default withStyles(styles)(SidebarComponent);
