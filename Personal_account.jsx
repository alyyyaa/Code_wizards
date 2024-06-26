import React, { useState } from "react";
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { CiViewList } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import '../styles/Personal_account.css';
import '../styles/DataTable.css';
import Menu from "../pages/Menu.jsx"; 
import Pagination from "../pages/Pagination.jsx"; 

function PersonalAccount() {
    const data = [
        { id: 1, date: '21.03.2024', name: 'Аноним', action: 'Просмотр' },
        { id: 2, date: '22.03.2024', name: 'Анатолий Некрасов', action: 'Просмотр' },
        { id: 3, date: '23.03.2024', name: 'Иван Иванов', action: 'Просмотр' },
        { id: 4, date: '24.03.2024', name: 'Петр Петров', action: 'Просмотр' },
        { id: 5, date: '25.03.2024', name: 'Сергей Сергеев', action: 'Просмотр' },
        { id: 6, date: '26.03.2024', name: 'Алексей Алексеев', action: 'Просмотр' },
        { id: 7, date: '27.03.2024', name: 'Мария Маринова', action: 'Просмотр' },
        { id: 8, date: '28.03.2024', name: 'Ольга Ольгина', action: 'Просмотр' },
        { id: 9, date: '29.03.2024', name: 'Николай Николаев', action: 'Просмотр' },
        { id: 10, date: '30.03.2024', name: 'Александр Александров', action: 'Просмотр' },
        { id: 11, date: '30.03.2024', name: 'Алексанр Александров', action: 'Просмотр' },
    ];

    const [searchValue, setSearchValue] = useState("");
    const [records, setRecords] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5); 
    const [iconActive, setIconActive] = useState(false);

    const placeholder = searchValue.length === 0 ? "Найти обращение..." : "";

    const columns = [
        { name: <span className="custom-table-header">Дата обращения</span>, selector: 'date', cell: row => <span className="custom-date-cell">{row.date}</span> },
        { name: <span className="custom-table-header">Отправитель</span>, selector: 'name', cell: row => <span className="custom-name-cell">{row.name}</span> },
        { name: <span className="custom-table-header">Действие</span>, cell: row => <Button variant="primary" className="custom-action-button">Просмотр</Button> }
    ];

    const handleFilter = () => {
        const newData = data.filter(row =>
            row.date.toLowerCase().includes(searchValue.toLowerCase()) ||
            row.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setRecords(newData);
    };

    const handleIconClick = () => {
        
        setIconActive(!iconActive);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastRecord = currentPage * recordsPerPage; // индекс последней записи
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // индекс первой записи
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(records.length / recordsPerPage); // общее количество страниц

    return (
<div className="personal-account-container">
            <Menu/>
             <div className="content-p">
                 <div className='container mt-5'>
                     <div className="header">
                         <div className="left"></div>
                         <div className="right">
                    <input type="text" onChange={handleFilter} className="custom-search-input" placeholder={placeholder} />
                    <button className="custom-search-button" onClick={handleFilter}>
                           Поиск
                         </button>
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
                        </h1>
                        <DataTable
                            columns={columns}
                            data={currentRecords}
                            fixedHeader
                            className="custom-data-table"
                            noPagination
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalAccount;
