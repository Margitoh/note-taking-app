import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import styles from "./Styles";

class UserPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      userEmail: null,
      isPanelVisible: false,
    };
  }

  componentDidMount() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ userEmail: user.email });
      } else {
        this.setState({ userEmail: null });
      }
    });
  }

  togglePanel = () => {
    this.setState((prevState) => ({
      isPanelVisible: !prevState.isPanelVisible,
    }));
  };

  handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  render() {
    const { classes } = this.props;
    const { userEmail, isPanelVisible } = this.state;

    return (
      <div className={classes.userContainer}>
        <IconButton onClick={this.togglePanel} className={classes.toggleButton}>
          {isPanelVisible ? (
            <ExpandMoreIcon fontSize="inherit" />
          ) : (
            <ExpandLessIcon fontSize="inherit" />
          )}
        </IconButton>
        {isPanelVisible && (
          <div className={classes.panel}>
            {userEmail ? (
              <>
                <p>Hello, {userEmail}</p>
                <Button
                  className={classes.signOutBtn}
                  onClick={this.handleSignOut}
                  variant="outlined"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <p>User not logged in</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(UserPanel);
