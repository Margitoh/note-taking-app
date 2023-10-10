import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles";

class AuthComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      user: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ user });
        this.props.setUserUID(user.uid);
      } else {
        this.setState({ user: null });
      }
    });
  }

  signUp = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  };

  signIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Sign-in successful");
        this.props.navigateToMain();
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  signOut = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.authContainer}>
        {this.state.user ? (
          <div>
            <Typography variant="h6">
              Welcome, {this.state.user.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.signOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className={classes.form}>
            <TextField
              className={classes.textField}
              label="Email"
              type="email"
              name="email"
              onChange={this.handleInputChange}
            />
            <TextField
              className={classes.textField}
              label="Password"
              type="password"
              name="password"
              onChange={this.handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.signIn(this.state.email, this.state.password)}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => this.signUp(this.state.email, this.state.password)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AuthComponent);
