import { useContext, useState } from "react";
import { Theme } from "../App";
import "../style/AddTask.css";
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

export default function AddTasks(props: TypeTask) {
  const contextColor = useContext(Theme);
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");

  const handlerAddTask = () => {
    props.setTask([
      {
        id: props.task.length + 1,
        title: titleText,
        completed: false,
        body: bodyText,
      },
      ...props.task,
    ]);
    setTitleText("");
    setBodyText("");
  };
  return (
    <div
      className={
        contextColor.color ? "addTask_light addTask" : "addTask_dark addTask"
      }
    >
      <div className="addTask__inputs">
        <input
          type="text"
          onChange={(event) => {
            setTitleText(event.target.value);
          }}
          placeholder="Type title"
          value={titleText}
        />
        <input
          type="text"
          onChange={(event) => {
            setBodyText(event.target.value);
          }}
          placeholder="Type body"
          value={bodyText}
        />
      </div>

      <button   className={
        contextColor.color ? "addTaskButton_light" : "addTaskButton_dark"
      } onClick={handlerAddTask}>Add task</button>
    </div>
  );
}
