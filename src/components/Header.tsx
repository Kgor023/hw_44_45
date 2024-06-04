import { useContext } from "react";
import { Theme } from "../App";
import '../style/Header.css'
import {  NavLink, Outlet } from "react-router-dom";
export default function Header() {
  const contextColor = useContext(Theme);
  const handlerChangeColor = () => {
    contextColor.setColor(!contextColor.color);
  };
  return (
    <div className={contextColor.color ? 'header_area_light' : 'header_area_dark'}>
    <header className={contextColor.color ? 'header_light' : 'header_dark'}>
   <h1>ДЗ по Реакту</h1>
      <button className={contextColor.color ? 'header_lightButton header__button' : 'header_darkButton header__button'} onClick={handlerChangeColor}>Change the theme</button>
  <nav className={contextColor.color ? 'nav_light' : 'nav_dark'}>
  <NavLink to={"/"} >Main</NavLink>
  <NavLink to={"./Tasks"}>Tasks</NavLink>
  <NavLink to={"./Statistics"}>Statistic</NavLink>
  </nav>

    </header>
    <Outlet/>
    </div>
  );
}
