import "./Table.css";
import { useEffect } from "react";
import Editbtn from "../../assets/edit.svg";
import Deletebtn from "../../assets/delete.svg";

interface Task  {
  taskname: string;
  date: string;
  time: string;
  status: string;
  description: string;
};


interface TaskMap  {
  [key: string]: Task;
};

interface Tableprops{
    taskitems:TaskMap;
    setTaskitems:React.Dispatch<React.SetStateAction<TaskMap>>;
    editId:string | null;
    setEditId:React.Dispatch<React.SetStateAction<string | null>>;
};

const Table = ({ taskitems, setTaskitems, editId, setEditId }:Tableprops) => {
  const deletetask = (id:string) => {
    return () => {
      delete taskitems[id];
      setEditId(null);
      setTaskitems({ ...taskitems });
    };
  };
  useEffect(() => {
    if (editId) {
      const task = taskitems[editId];
      (document.getElementById("taskname") as HTMLInputElement).value = task.taskname;
      (document.getElementById("date") as HTMLInputElement).value = task.date;
      (document.getElementById("time") as HTMLInputElement).value = task.time;
      (document.getElementById("status") as HTMLInputElement).value = task.status;
      (document.getElementById("description") as HTMLInputElement).value = task.description;
    }
  }, [editId]);
  return (
    <div className="tablebody">
      <table className="tablecls">
        <thead>
          <tr className="headrow">
            <th>Task</th>
            <th>Date and Time</th>
            <th>Status</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(taskitems).map((id) => {
            let description_txt;
            if (taskitems[id].description.length > 30) {
              description_txt = taskitems[id].description.substring(0, 30) + "...";
            } else {
              description_txt = taskitems[id].description;
            }
            return (
              <tr>
                <td>{taskitems[id].taskname}</td>
                <td>
                  {taskitems[id].date} {taskitems[id].time}
                </td>
                <td className={taskitems[id].status}>{taskitems[id].status}</td>
                <td className="tooltip">{description_txt}<span className="tooltiptext">{taskitems[id].description}</span></td>
                <td>
                  <button className="editbtn" onClick={() => setEditId(id)}>
                    <img src={Editbtn} alt="edit" style={{ height: "20px", width: "20px" }}/>
                  </button>
                  <button className="deletebtn" onClick={deletetask(id)}>
                    <img src={Deletebtn} alt="delete" style={{ height: "20px", width: "20px" }}/>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;