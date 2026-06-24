function TaskCard({title, status, onDelete, onStatusChange, id}){
    return(
        <div className="task-card">
            <h3>{title}</h3>
            <button 
                className={status.replace(" ","-")}
                onClick={()=> onStatusChange(id)}>{status}</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}
export default TaskCard;