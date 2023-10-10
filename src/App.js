import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthComponent from "./auth/AuthComponent";
import MainComponent from "./mainComponent/MainComponent";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  handleSignUp = async (email, password) => {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      this.setState({ user });
    } catch (error) {
      console.error("Sign-up error:", error.message);
    }
  };

  handleSignIn = async (email, password) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  setUserUID = (uid) => {
    this.setState({ userUID: uid });
  };

  render() {
    return (
      <Router>
        <div className="app-container">
          <Routes>
            {this.state.user ? (
              <Route path="/" element={<MainComponent />} />
            ) : (
              <Route
                path="/"
                element={
                  <AuthComponent
                    setUserUID={this.setUserUID}
                    signUp={this.handleSignUp}
                    signIn={this.handleSignIn}
                  />
                }
              />
            )}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
