function TaskCard({title, status, onDelete, id}){
    return(
        <div className="task-card">
            <h3>{title}</h3>
            <p>Status: {status}</p>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}
export default TaskCard;