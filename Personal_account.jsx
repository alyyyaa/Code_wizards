import React, { useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { SidebarData } from "./SidebarData";
import { IoIosLogOut } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import '../styles/Personal_account.css';
import '../styles/DataTable.css';
import book from './book.png';

function PersonalAccount() {
    const data = [
        {
            id: 1,
            date: '21.03.2024',
            name: 'Аноним',
            action: 'Просмотр'
        },
        {
            id: 2,
            date: '22.03.2024',
            name: 'Анатолий Некрасов',
            action: 'Просмотр'
        }
    ];

    const [searchValue, setSearchValue] = useState("");
    const [records, setRecords] = useState(data);
    const [iconActive, setIconActive] = useState(false);

    const placeholder = searchValue.length === 0 ? "Найти обращение..." : "";

    const columns = [
        {
            name: <span className="custom-table-header">Дата обращения</span>,
            selector: 'date',
            cell: row => <span className="custom-date-cell">{row.date}</span>
        },
        {
            name: <span className="custom-table-header">Отправитель</span>,
            selector: 'name',
            cell: row => <span className="custom-name-cell">{row.name}</span>
        },
        {
            name: <span className="custom-table-header">Действие</span>,
            cell: row => <Button variant="primary" className="custom-action-button">Просмотр</Button>
        }
    ];

    const handleFilter = () => {
        const newData = data.filter(row =>
            row.date.toLowerCase().includes(searchValue.toLowerCase()) ||
            row.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setRecords(newData);
    };

    const handleIconClick = () => {
        console.log('Иконка была нажата');
        setIconActive(!iconActive);
    };

    return (
        <div className="personal-account-container">
            <nav className="nav-menu">
                <div className="logo-container">
                    <h1 className="logo">SecretVoice</h1>
                </div>
                <ul className="nav-menu-items">
                    {SidebarData.map((item, index) => (
                        <li key={index} className={item.cName} style={{ marginTop: item.marginTop || 0 }}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                    <li className="nav-text" style={{ marginTop: '50px' }}>
                        <Link to="/logout">
                            <IoIosLogOut size={30} />
                            <span>Выйти</span>
                        </Link>
                    </li>
                    <li className="nav-image">
                        <img src={book} alt="book" />
                    </li>
                </ul>
            </nav>
            <div className="content">
                <div className='container mt-5'>
                    <div className="header">
                        <div className="left"></div>
                        <div className="right">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="custom-search-input"
                            placeholder={placeholder}
                        />

                        <button className="custom-search-button" onClick={handleFilter}>
                            Поиск
                        </button>

                        </div>
                    </div>
                    <div className="data-section">
                        <h1 className="custom-table-name">
                            Новые обращения
                            <button className="custom-icon-button" onClick={handleIconClick}>
                                <CiViewList size={30} className="icon" />
                            </button>
                            <button className="custom-search-icon" onClick={handleIconClick}>
                                <IoIosSearch size={30} className="icon" />
                            </button>
                        </h1>
                        <DataTable
                            columns={columns}
                            data={records}
                            fixedHeader
                            className="custom-data-table"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalAccount;
