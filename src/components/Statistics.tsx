import { useContext } from "react";
import { Statistic, Theme } from "../App";
import '../style/Statistic.css'
export default function Statistics(props: any) {
  const contextColor = useContext(Theme);
  const contextStat = useContext(Statistic);
  return (
    <div className={contextColor.color ? "statistic_light statistic"  : "statistic_dark statistic"}>
      <h2>Statistic:</h2>
      <ul>
        <li>All tasks: {props.task.length}</li>
        <li>Deleted tasks: {contextStat.stat.deleted}</li>
        <li>Checked tasks: {contextStat.stat.checked}</li>
        <li>Edited tasks: {contextStat.stat.edited}</li>
      </ul>
    </div>
  );
}
