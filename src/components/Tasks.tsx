import { useState, useEffect, useContext } from "react";
import { Statistic, Theme } from "../App";
import "../style/Tasks.css";
import { Link, Outlet, useParams } from "react-router-dom";
type TypeTaskFromJson = {
  id: number;
  title: string;
  completed: boolean;
  body: string;
};

type TypeTask = {
  task: TypeTaskFromJson[];
  setTask: (value: TypeTaskFromJson[]) => void;
};

export default function Tasks(props: TypeTask) {
  const [editTitleText, setEditTitleText] = useState<string>("");
  const [editBodyText, setEditBodyText] = useState<string>("");
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [editId, setEditId] = useState<null | number>(null);
  const contextStat = useContext(Statistic);
  const contextColor = useContext(Theme);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => props.setTask(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("Statistic", JSON.stringify(contextStat.stat));
  }, [contextStat.stat]);

  const handlerDelete = (id: number) => {
    props.setTask(props.task.filter((task) => task.id !== id));
    contextStat.setStat({
      ...contextStat.stat,
      deleted: contextStat.stat.deleted + 1,
    });
  };

  const handlerEdit = (id: number, title: string, body: string) => {
    setEditId(id);
    setEditTitleText(title);
    setEditBodyText(body);
    contextStat.setStat({
      ...contextStat.stat,
      edited: contextStat.stat.edited + 1,
    });
  };
  const handlerSave = (id: number) => {
    props.setTask(
      props.task.map((task) => {
        if (task.id === id) {
          return { ...task, title: editTitleText, body: editBodyText };
        } else {
          return task;
        }
      })
    );
    setEditId(null);
    setEditTitleText("");
    setEditBodyText("");
  };

  const handlerCheckBox = (event: any) => {
    setCheckBox(event.target.checked);
    contextStat.setStat({
      ...contextStat.stat,
      checked: contextStat.stat.checked + 1,
    });
  };
  return (
    <>
      <Outlet />
      <div
        className={
          contextColor.color ? "tasks_light tasks" : "tasks_dark tasks"
        }
      >
        {props.task.map((task: TypeTaskFromJson) => (
          <div
            key={task.id}
            className={
              contextColor.color ? "task_light task" : "task_dark task"
            }
          >
            {editId === task.id ? (
              <div className="task__editing">
                <input
                  type="text"
                  value={editTitleText}
                  onChange={(event) => setEditTitleText(event.target.value)}
                />
                <input
                  type="text"
                  value={editBodyText}
                  onChange={(event) => setEditBodyText(event.target.value)}
                />
                <button
                  className={
                    contextColor.color ? "button_light" : "button_dark"
                  }
                  onClick={() => handlerSave(task.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="task__content">
                <Link to={'/post'} state={{post:task}}>
                  <h1>{task.title}</h1>
                  <p>{task.body}</p>
                </Link>
                <div className="task__buttons">
                  <button
                    className={
                      contextColor.color ? "button_light" : "button_dark"
                    }
                    onClick={() => handlerEdit(task.id, task.title, task.body)}
                  >
                    Edit
                  </button>
                  <button
                    className={
                      contextColor.color ? "button_light" : "button_dark"
                    }
                    onClick={() => handlerDelete(task.id)}
                  >
                    Delete
                  </button>
                  <input
                    className="task__checkbox"
                    type="checkbox"
                    onChange={handlerCheckBox}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
