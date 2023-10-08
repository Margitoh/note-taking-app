import "./App.css";
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import SidebarComponent from "./sidebar/Sidebar";
import EditorComponent from "./editor/Editor";

const firebaseConfig = {
  /*use own code provided by firebase*/
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

  selectNote = (note, index) =>
    this.setState({ selectedNoteIndex: index, selectedNote: note });

  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />

        {this.state.selectedNote && (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
          />
        )}
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
