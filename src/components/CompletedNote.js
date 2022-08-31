import iconDelete from '../images/icons/delete.png'

function CompletedNote(props) {
    // console.log(props);
    const {id, text, dateTime, completeDateTime, deleteCompletedNote} = props
    const [date, time, completeDate, completeTime] = [...dateTime, ...completeDateTime]
    return(
        <div className="note complete">
            <div className="note--header">
                <div className="note--header--controls">
                    <div className="note--header--date">
                        <p>
                        <span>Date started: {date} {time}</span> <br />
                        <span>Date completed: {completeDate} {completeTime}</span>
                        </p>
                    </div>    
                    <img className="note--delete icon" onClick={() => deleteCompletedNote(id)} src={iconDelete} alt="iconDelete" />
                </div>    
            </div>
            <div className="note--text">
                {text}
            </div>
        </div>
    )
}

export default CompletedNote