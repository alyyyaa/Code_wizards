import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { CiViewList } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { LiaExclamationSolid } from "react-icons/lia";
import '../styles/Personal_account.css';
import '../styles/Table_same.css';
import Menu from "../pages/Menu.jsx"; 
import Pagination from "../pages/Pagination.jsx"; 

function SearchSameNew() {
    const initialData = [
        { id: 1, date: '21.03.2024', name: 'Аноним', action: 'Просмотр', selected: false, keywords: ['Невкусный', 'кофе'] },
        { id: 2, date: '22.03.2024', name: 'Анатолий Некрасов', action: 'Просмотр', selected: false, keywords: ['Невкусный', 'кофе'] },
        { id: 3, date: '23.03.2024', name: 'Иван Иванов', action: 'Просмотр', selected: false, keywords: ['Плохое', 'обслуживание'] },
        { id: 4, date: '24.03.2024', name: 'Петр Петров', action: 'Просмотр', selected: false, keywords: ['Плохое', 'обслуживание'] },
        { id: 5, date: '25.03.2024', name: 'Сергей Сергеев', action: 'Просмотр', selected: false, keywords: ['Плохое', 'обслуживание'] },
        { id: 6, date: '26.03.2024', name: 'Сергей Сергеев', action: 'Просмотр', selected: false, keywords: ['Грязный', 'пол'] },
    ];

    const [searchValue, setSearchValue] = useState("");
    const [records, setRecords] = useState(initialData);
    const [iconActive, setIconActive] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [topicsArray, setTopicsArray] = useState([]);

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
            name: <span className="custom-table-header">Тема</span>,
            selector: 'topic',
            cell: row => <span className="custom-name-cell">{row.topic}</span>
        },
        {
            name: <span className="custom-table-header">Категория</span>,
            selector: 'category',
            cell: row => <span className="custom-name-cell">{row.category}</span>
        },
        {
            name: <span className="custom-table-header">Действие</span>,
            cell: row => <Button variant="primary" className="custom-action-button">{row.action}</Button>
        }
    ];

    function handleFilter(event) {
        const value = event.target.value.toLowerCase();
        const newData = initialData.filter(row =>
            row.date.toLowerCase().includes(value) ||
            row.name.toLowerCase().includes(value) ||
            (row.topic && row.topic.toLowerCase().includes(value)) ||
            (row.category && row.category.toLowerCase().includes(value))
        );
        setRecords(newData);
        updateTopicsArray(newData);  // Обновляем topicsArray после фильтрации
        setCurrentPage(1);  // Сбрасываем текущую страницу на первую
    }

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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleThirdButtonClick = () => {

    };

    const updateTopicsArray = (data) => {
        const groupedData = data.reduce((acc, record) => {
            const key = record.keywords.join(" ");
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(record);
            return acc;
        }, {});

        const newTopicsArray = Object.keys(groupedData).map(topic => ({
            topic,
            records: groupedData[topic]
        }));

        setTopicsArray(newTopicsArray);
    };

    useEffect(() => {
        updateTopicsArray(records);
    }, [records]);

    const totalPages = topicsArray.length;
    const currentTopicData = topicsArray[currentPage - 1];

    return (
        <div className="personal-account-container">
            <Menu />
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
                            {currentTopicData?.topic}
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
                                <p>{currentTopicData?.topic}</p>
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={currentTopicData?.records || []}
                            fixedHeader
                            className="custom-data-table"
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

export default SearchSameNew;
