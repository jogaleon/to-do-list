import iconLock from '../images/icons/lock.png'
import iconComplete from '../images/icons/complete.png'
import iconDelete from '../images/icons/delete.png'


function Note(props) {
    const {id, text, dateTime, ifLocked, handleChange, toggleLock, completeNote, deleteNote} = props
    let [date, time] = dateTime;
    
    return (
        <div className="note">
            <div className="note--header">
                <div className="note--header--controls">
                    <span className="icon--group1">
                        <img className={`note--lock icon${ifLocked ? ` redFilter` : ``}`} onClick={() => toggleLock(id)} src={iconLock} alt="iconLock" />            
                        <img className="note--complete icon" onClick={() => completeNote(id)} src={iconComplete} alt="iconComplete" />                        
                    </span>
                    <span className="icon--group2">
                        <img className="note--delet icon" onClick={() => deleteNote(id)} src={iconDelete} alt="iconDelete" />
                    </span>
                </div>
                <p className="note--header--date">{date} {time}</p>
                
            </div>
            <textarea className="note--text" value={text} onChange={(e) => handleChange(e, id)} readOnly={ifLocked} placeholder="Note"></textarea>    
        </div>
    )
}

export default Note;