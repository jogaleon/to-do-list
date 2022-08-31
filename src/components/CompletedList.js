import CompletedNote from './CompletedNote'



function CompletedList(props) {
    // console.log(props);
    const {completedNotes, clearCompletedList, deleteCompletedNote} = props
    const completedNotesElements = completedNotes.map(note => 
        <CompletedNote 
            key={note.id}
            id={note.id}
            text={note.text}
            dateTime={note.dateTime}
            completeDateTime={note.completeDateTime}
            deleteCompletedNote={deleteCompletedNote}
        />
    )
    return (
        <div className="completedList">
            <h1 className="completedList--title">Completed Tasks</h1>
            <button className="clearButton" onClick={clearCompletedList}>Clear List</button>
            <div>
                {completedNotesElements}
            </div>  
        </div>
    )
}

export default CompletedList