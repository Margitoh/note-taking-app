import "./App.css";
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import SidebarComponent from "./sidebar/Sidebar";
import EditorComponent from "./editor/Editor";

const firebaseConfig = {
  /*use own code provided by firebase*/
  apiKey: "AIzaSyCLeiJqW2Qp9D94_seubi4qFNzKEIk5Ee8",
  authDomain: "note-taking-app-d1d08.firebaseapp.com",
  projectId: "note-taking-app-d1d08",
  storageBucket: "note-taking-app-d1d08.appspot.com",
  messagingSenderId: "459716148021",
  appId: "1:459716148021:web:f92d718a84cad731afaa7c",
  measurementId: "G-DTY19GWLR3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    };
  }

  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
        />

        <EditorComponent />
      </div>
    );
  }

  componentDidMount = () => {
    const notesCollection = collection(db, "notes");

    onSnapshot(notesCollection, (snapshot) => {
      const notes = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });

      console.log(notes);
      this.setState({ notes: notes });
    });
  };
}

export default App;
