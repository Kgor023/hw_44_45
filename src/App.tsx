import { createContext, useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Statistics from "./components/Statistics";
import "./style/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "./components/Post";

type typeContextColor = {
  color: boolean;
  setColor: (value: boolean) => void;
};
type typeContextStatistic = {
  stat: typeStat;
  setStat: (value: typeStat) => void;
};
type typeTask = {
  id: number;
  title: string;
  completed: boolean;
  body: string;
};
type typeStat = {
  deleted: number;
  checked: number;
  edited: number;
};

export const Theme = createContext<typeContextColor>({
  color: true,
  setColor: () => {},
});
export const Statistic = createContext<typeContextStatistic>({
  stat: {
    deleted: 0,
    checked: 0,
    edited: 0,
  },
  setStat: () => {},
});

function App() {
  const [color, setColor] = useState<boolean>(true);
  const [stat, setStat] = useState<typeStat>({
    deleted: 0,
    checked: 0,
    edited: 0,
  });
  const [task, setTask] = useState<typeTask[]>([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/Tasks",
          element: <Tasks task={task} setTask={setTask} />,
          children: [
            {
              index: true,
              element: <AddTask task={task} setTask={setTask} />,
            },
          ],
        },

        {
          path: "/Statistics",
          element: <Statistics task={task} />,
        },
        {
          path: "/post",
          element: <Post />,
        },
      ],
    },
  ]);

  return (
    <Theme.Provider value={{ color, setColor }}>
      <Statistic.Provider value={{ stat, setStat }}>
        <RouterProvider router={router} />
      </Statistic.Provider>
    </Theme.Provider>
  );
}

export default App;
