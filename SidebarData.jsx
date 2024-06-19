import React from "react";
import * as SlIcons from "react-icons/sl";
import { PiPencilLineLight } from "react-icons/pi";
import { IoCheckmarkDone } from "react-icons/io5";
import * as BsIcons from "react-icons/bs"; 
import { IoIosLogOut } from "react-icons/io"; 
import css from "../styles/Personal_account.css";

export const SidebarData = [
    {
        title: 'Новые обращения',
        path: '/newappeals',
        icon: <SlIcons.SlEnvolopeLetter />,
        cName: 'nav-text'
    }, 
    {
        title: 'Обращения в работе',
        path: '/appealsinwork',
        icon: <PiPencilLineLight />,
        cName: 'nav-text'
    }, 
    {
        title: 'Завершенные обращения',
        path: '/completedappeals',
        icon: <IoCheckmarkDone />,
        cName: 'nav-text'
    }, 
    {
        title: 'Статистика',
        path: '/statistics',
        icon: <BsIcons.BsGraphUpArrow />,
        cName: 'nav-text'
    }
]
