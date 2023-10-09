import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      title: "",
      id: "",
      isSaving: false,
      isLoading: false,
    };
  }

  updateStateFromProps = (props) => {
    const { selectedNote } = props;
    if (selectedNote.id !== this.state.id) {
      this.setState({
        text: selectedNote.body,
        title: selectedNote.title,
        id: selectedNote.id,
      });
    }
  };

  componentDidMount = () => {
    this.updateStateFromProps(this.props);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedNote !== this.props.selectedNote) {
      this.updateStateFromProps(this.props);
    }
  };

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };

  update = debounce(async () => {
    this.setState({ isLoading: true });

    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.setState({ isLoading: false });
  }, 1500);

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.editorContainer}>
        {this.state.isLoading && (
          <div className={classes.loadingOverlay}>
            <CircularProgress size={40} thickness={4} />
          </div>
        )}

        <ReactQuill
          style={{ height: "100%" }}
          value={this.state.text}
          onChange={this.updateBody}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditorComponent);
