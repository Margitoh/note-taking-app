import "./Styles.css";
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
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SidebarComponent from "../sidebar/Sidebar";
import EditorComponent from "../editor/Editor";
import UserPanel from "../user/UserPanel";

const firebaseConfig = {
  /* Use your own Firebase configuration */
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

class MainComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      userUID: null,
      selectedNoteIndex: null,
      selectedNote: null,
      notes: [],
    };
  }

  setUserUID = (uid) => {
    this.setState({ userUID: uid }, () => {
      this.fetchNotes();
    });
  };

  fetchNotes = () => {
    const { userUID } = this.state;

    if (!userUID) return;

    const notesCollection = collection(db, "notes");
    const userQuery = query(notesCollection, where("uid", "==", userUID));

    onSnapshot(userQuery, (snapshot) => {
      const notes = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });

      // Sort the notes by timestamp
      notes.sort((a, b) => b.timestamp - a.timestamp);

      this.setState({ notes: notes });
    });
  };

  selectNote = (note, index) =>
    this.setState({ selectedNoteIndex: index, selectedNote: note });

  async newNote(title) {
    const { userUID } = this.state;

    const note = {
      title: title,
      body: "",
      uid: userUID,
    };

    const newNoteRef = await addDoc(collection(db, "notes"), {
      title: note.title,
      body: note.body,
      timestamp: serverTimestamp(),
      uid: note.uid,
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
              const newIndex = 0;
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
        <div className="container">
          <SidebarComponent
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            deleteNote={this.deleteNote}
            selectNote={this.selectNote}
            newNote={this.newNote.bind(this)}
          />
          <UserPanel setUserUID={this.setUserUID} />

          {this.state.selectedNote && (
            <EditorComponent
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}
            />
          )}
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    const auth = getAuth();
    const notesCollection = collection(db, "notes");

    onSnapshot(notesCollection, (snapshot) => {
      const notes = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });

      // Sort the notes by timestamp
      notes.sort((a, b) => b.timestamp - a.timestamp);

      this.setState({ notes: notes });
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setUserUID(user.uid);
      } else {
        this.setState({ userUID: null });
      }
    });
  };
}

export default MainComponent;
