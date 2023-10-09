// UserPanel.js
import React from "react";
import { Button } from "@material-ui/core";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";

class UserPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      userEmail: null,
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

    return (
      <div className={classes.userContainer}>
        {this.state.userEmail ? (
          <>
            <p>Hello, {this.state.userEmail}</p>
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
    );
  }
}

export default withStyles(styles)(UserPanel);
