import React, { useState} from "react";
import DataTable from 'react-data-table-component';
import css from "../styles/Completed_requests.css";
import { BrowserRouter as Router, Link } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';

function Completed_requests() {
    const [searchValue, setSearchValue] = useState(""); // Состояние для отслеживания ввода пользователя

    // Обработчик изменения ввода пользователя
    function handleChange(event) {
        setSearchValue(event.target.value);
    }

    const placeholder = searchValue.length === 0 ? "Найти обращение...": "";

    const columns = [
        {
            name: <span className="table-header">Дата обращения</span>,
            selector: 'date',
            cell: row => <span className="date-cell">{row.date}</span>
        },
        {
            name: <span className="table-header">Тема</span>,
            selector: 'topic',
            cell: row => <span className="topic-cell">{row.topic}</span>
        },
        {
            name: <span className="table-header">Отправитель</span>,
            selector: 'name',
            cell: row => <span className="name-cell">{row.name}</span>
        },
        {
            name: <span className="table-header">Действие</span>,
            cell: row => <Button variant="primary" className="custom-button">Просмотр</Button>
        }
    ];
    const data = [
        {
            id: 1,
            date: '21.03.2024',
            topic: 'Сломан принтер',
            name: 'Аноним',
            action: 'Просмотр'
        },
        {
            id: 2,
            date: '22.03.2024',
            topic: 'Не работает Wi-Fi',
            name: 'Анатолий Некрасов',
            action: 'Просмотр'
        }

    ]
    const [records, setRecords] = useState(data);

    function handleFilter(event){
        const value = event.target.value.toLowerCase();
        const newData = data.filter(row =>
            row.date.toLowerCase().includes(value) ||
            row.topic.toLowerCase().includes(value) ||
            row.name.toLowerCase().includes(value)

        );
        setRecords(newData);
    }
    return (
        <div className='container mt-5'>
            <Router>
                <div className="header">
                    <div className="left">
                    <Link to="/" className="back-button">Назад</Link>
                    </div>
                    <div className="right">
                        <input type="text" onChange={handleFilter} className="search-input" placeholder={placeholder} />
                        <button className="search-button">Поиск</button>
                    </div>
                </div>
            </Router>
            <div className="data-section">
                <h1 className="table-name">Завершенные обращения</h1>
                <DataTable
                    columns={columns}
                    data={records}
                    fixedHeader
                    className="data-table"
                ></DataTable>
                </div>
        </div>
    );
}

export default Completed_requests;