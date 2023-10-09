import "./App.css";
import React from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
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

  async newNote(title) {
    const note = {
      title: title,
      body: "",
    };

    const newNoteRef = await addDoc(collection(db, "notes"), {
      title: note.title,
      body: note.body,
      timestamp: serverTimestamp(),
    });

    const newID = newNoteRef.id;

    const newNote = { ...note, id: newID };

    this.setState((prevState) => ({
      notes: [newNote, ...prevState.notes],
      selectedNote: newNote,
      selectedNoteIndex: 0,
    }));
  }

  noteUpdate = async (id, noteObj) => {
    const noteToUpdate = this.state.notes.find((note) => note.id === id);

    if (noteToUpdate) {
      await updateDoc(doc(db, "notes", id), {
        title: noteObj.title,
        body: noteObj.body,
        timestamp: serverTimestamp(),
      });

      const updatedNoteIndex = this.state.notes.findIndex(
        (note) => note.id === id
      );

      if (updatedNoteIndex !== -1) {
        const updatedNote = { ...this.state.notes[updatedNoteIndex] };

        const updatedNotes = this.state.notes.filter((note) => note.id !== id);

        updatedNotes.unshift(updatedNote);

        this.setState({
          notes: updatedNotes,
          selectedNote: updatedNote,
          selectedNoteIndex: 0,
        });
      }
    } else {
      console.log("Note not found, cannot update.");
    }
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    const isCurrentlySelected = this.state.selectedNoteIndex === noteIndex;

    await this.setState(
      {
        notes: this.state.notes.filter((_note) => _note !== note),
      },
      async () => {
        const noteDocRef = doc(db, "notes", note.id);
        await deleteDoc(noteDocRef);

        this.setState(
          { selectedNote: null, selectedNoteIndex: null },
          async () => {
            if (isCurrentlySelected) {
              const newIndex = Math.min(noteIndex, this.state.notes.length - 1);
              const newSelectedNote = this.state.notes[newIndex];
              await this.selectNote(newSelectedNote, newIndex);
            }
          }
        );
      }
    );
  };

  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote.bind(this)}
        />

        {this.state.selectedNote && (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
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

      notes.sort((a, b) => b.timestamp - a.timestamp);

      console.log(notes);
      this.setState({ notes: notes });
    });
  };
}

export default App;
