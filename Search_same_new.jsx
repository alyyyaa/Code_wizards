import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { SidebarData } from "./SidebarData";
import { IoIosLogOut } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { LiaExclamationSolid } from "react-icons/lia";
import '../styles/Personal_account.css';
import '../styles/Table_same.css';
import book from './book.png';

function SearchSameNew() {
    const initialData = [
        {
            id: 1,
            date: '21.03.2024',
            name: 'Аноним',
            action: 'Просмотр',
            selected: false 
        },
        {
            id: 2,
            date: '22.03.2024',
            name: 'Анатолий Некрасов',
            action: 'Просмотр',
            selected: false 
        }
    ];

    const [searchValue, setSearchValue] = useState("");
    const [records, setRecords] = useState(initialData);
    const [iconActive, setIconActive] = useState(false);
    const [commonWords, setCommonWords] = useState(["Невкусно", "заменить", "ужасно"]);
    const [selectedRows, setSelectedRows] = useState([]);

    const placeholder = searchValue.length === 0 ? "Найти обращение..." : "";

    const columns = [
        {
            name: '', 
            selector: '',
            cell: row => (
                <div className="custom-checkbox-container">
                    <input type="checkbox" checked={row.selected} onChange={() => handleRowSelected(row)} />
                </div>
            ),
            width: '100px' 
        },
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
            cell: row => <Button variant="primary" className="custom-action-button">{row.action}</Button>
        }
    ];

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        const newData = initialData.filter(row =>
            row.date.toLowerCase().includes(value) ||
            row.name.toLowerCase().includes(value)
        );
        setRecords(newData);
    };

    const handleIconClick = () => {
        setIconActive(!iconActive);
    };

    const handleRowSelected = (row) => {
        const updatedRows = records.map(r =>
            r.id === row.id ? { ...r, selected: !r.selected } : r
        );
        setRecords(updatedRows);

        const selected = updatedRows.filter(r => r.selected);
        setSelectedRows(selected);
    };

    const handleThirdButtonClick = () => {
        console.log("-");
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
                            <input type="text" onChange={handleFilter} className="custom-search-input" placeholder={placeholder} />
                            <button className="custom-search-button">Поиск</button>
                        </div>
                    </div>
                    <div className="data-section">
                        <h1 className="custom-table-name">
                            Новые обращения
                            <button
                                className={`custom-icon-button ${iconActive ? 'active' : ''}`} 
                                onClick={handleIconClick}
                                title="Показать все обращения"
                            >
                                <CiViewList size={30} className="icon" />
                            </button>
                            <button
                                className={`custom-search-icon ${iconActive ? 'active' : ''}`}
                                onClick={handleIconClick}
                                title="Найти одинаковые обращения"
                            >
                                <IoIosSearch size={30} className="icon" />
                            </button>

                            <button className={`custom-third-button ${iconActive ? 'active' : ''}`} onClick={handleThirdButtonClick}>
                                Ответить
                            </button>
                        </h1>
                        <div className="common-words-container">
                            <div className="icon-left">
                                <LiaExclamationSolid size={80} style={{ color: '#F49981' }} />
                            </div>
                            <div className="common-words-content">
                                <h2>Ключевые слова:</h2>
                                <p>{commonWords.join(", ")}</p>
                            </div>
                        </div>
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

export default SearchSameNew;
