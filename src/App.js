import {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import {Temporal} from '@js-temporal/polyfill';

import Note from './components/Note'
import CompletedList from './components/CompletedList'

import addIcon from './images/icons/add2.png'
import listIcon from './images/icons/list2.png'

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes'))?.notes||[]);
  const [completedNotes, setCompletedNotes] = useState(JSON.parse(localStorage.getItem('notes'))?.completedNotes||[]);
  const [showList, setShowList] = useState(false);
  
  useEffect(()=> {
    localStorage.setItem('notes', JSON.stringify({
      notes: notes,
      completedNotes: completedNotes,
    }))
  },[notes,completedNotes])
  
  
  /*Main Handlers*/ 
  function createNote() {
    const newNote = {
      id: nanoid(),
      text: '',
      dateTime: getDateTime(),
      ifLocked: false
    }
    setNotes(prevNotes => [newNote,...prevNotes]);
  }

  function toggleCompletedList() {
    setShowList(prevShowList => !prevShowList)
  }

  function clearCompletedList() {
    console.log("click");
    setCompletedNotes([])
  }

  /*Note Handlers*/
  function handleChange(e, id) {
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === id ?
      {
        ...note,
        text: e.target.value
      } : note
    }))
  }

  function toggleLock(id) {
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === id ?
      {
        ...note,
        ifLocked: !note.ifLocked
      } : note
    }))
  }

  function completeNote(id) {
    let completedNote = notes.find(note => note.id === id)
    setCompletedNotes(prevCompletedNotes => [
      {
        ...completedNote,
        completeDateTime: getDateTime()
      },
      ...prevCompletedNotes
    ])
    deleteNote(id);
  }

  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.filter(note => {
      return note.id !== id;
    }))
  }

  function deleteCompletedNote(id) {
    console.log('click');
    setCompletedNotes(prevNotes => prevNotes.filter(note => {
      return note.id !== id;  
    }))
  }

  /*Helper Functions*/
  function getDateTime() {
    return [
      Temporal.Now.plainDateISO().toString(),
      Temporal.Now.plainTimeISO().round({ smallestUnit: 'second', roundingMode: 'floor' }).toString(),
    ]
  }


  /*Element Mapping*/
  const noteElements = notes.map(note => 
    <Note 
      key={note.id}
      id={note.id}
      text={note.text}
      dateTime={note.dateTime}
      ifLocked={note.ifLocked}
      handleChange={handleChange}
      toggleLock={toggleLock}
      completeNote={completeNote}
      deleteNote={deleteNote}
    />
  )

  return (
    <main className="main">
      <div className="notesList">
        <h1 className="notes--title">To do List</h1>
        <div className="notes--controls">
          <img className="addButton button" onClick={createNote} src={addIcon} alt="addIcon" />
          <img className="listButton button" onClick={toggleCompletedList} src={listIcon} alt="listIcon" />
        </div>
        
        <div className="notes--container">
        {noteElements}
        </div>
      </div>
      {
        showList && <CompletedList 
          completedNotes={completedNotes}
          clearCompletedList={clearCompletedList}
          deleteCompletedNote={deleteCompletedNote}
        />
      }
    </main>
  );  
}

export default App;
