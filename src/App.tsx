import "./App.css";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";
import { useState } from "react";
type Task = {
  taskname: string;
  date: string;
  time: string;
  status: string;
  description: string;
};

type TaskMap = {
  [key: string]: Task;
};

function App() {
  
  const [taskitems, setTaskitems] = useState<TaskMap>({});
  const [editId, setEditId] = useState<string | null>(null);
  return (
    <div className="appbody">
      <Form
        taskitems={taskitems}
        setTaskitems={setTaskitems}
        editId={editId}
        setEditId={setEditId}
      />
      <Table
        taskitems={taskitems}
        setTaskitems={setTaskitems}
        editId={editId}
        setEditId={setEditId}
      />
    </div>
  );
}
export default App;