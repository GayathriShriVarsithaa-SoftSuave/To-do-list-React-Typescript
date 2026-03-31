import "./Form.css";
import { useEffect } from "react";

//aliases
 type mystr=string;

//interfaces
interface Task  {
  taskname: mystr;
  date: string;
  time: string;
  status: string;
  description: string;
};

interface TaskMap {
  [key: string]: Task;
};

interface FormProps  {
  taskitems: TaskMap;
  setTaskitems: React.Dispatch<React.SetStateAction<TaskMap>>;
  editId: string | null;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
};

const Form = ({ taskitems, setTaskitems, editId, setEditId }: FormProps) => {
  useEffect(() => {
    const form=document.getElementsByClassName("formcls")[0] as HTMLFormElement;
    form.reset();
    const statusSelect = document.getElementById("status") as HTMLSelectElement;
    statusSelect.value = "Select";
  }, [taskitems]);

  const savetask = (e: React.FormEvent) => {
    e.preventDefault();

    const taskname = (document.getElementById("taskname") as HTMLInputElement).value;
    const date = (document.getElementById("date") as HTMLInputElement).value;
    const time = (document.getElementById("time") as HTMLInputElement).value;
    const status = (document.getElementById("status") as HTMLSelectElement).value;
    const description = (document.getElementById("description") as HTMLTextAreaElement).value;

    if (!taskname || !date || !time || status === "Select") {
      alert("Please fill all the fields");
      return;
    }

    const taskdate = new Date(date + "T" + time);
    const currentdate = new Date();
    if (taskdate < currentdate && status !== "completed") {
      alert("Please select a future date and time");
      return;
    }

    let id:string;
    if (editId == null) {
      id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    } else {
      id = editId;
    }

    const newtask: Task = { taskname, date, time, status, description };
    setTaskitems({ ...taskitems, [id]: newtask });
    setEditId(null);
  };

  return (
    <div className="formbody">
      <p className="form-title">Add Task</p>
      <form className="formcls" onSubmit={savetask}>
        <label htmlFor="taskname">Task:</label>
        <input type="text" id="taskname" placeholder="Add task" />
        <br />
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" />
        <br />
        <label htmlFor="time">Time:</label>
        <input type="time" id="time" />
        <br />
        <label htmlFor="status">Status:</label>
        <select id="status">
          <option value="Select" disabled>
            Select
          </option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <br />
        <label htmlFor="description">Description:</label>
        <textarea id="description" placeholder="Add description.." />
      </form>
      <button className="savebtn" onClick={savetask}>
        Save
      </button>
    </div>
  );
};

export default Form;