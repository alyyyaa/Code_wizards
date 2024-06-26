import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { CiViewList } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import '../styles/Personal_account.css';
import '../styles/DataTable.css';
import '../styles/Completed_requests.css';
import Menu from "../pages/Menu.jsx";
import Pagination from "../pages/Pagination.jsx";

function PersonalAccount() {
    const data = [
        { id: 1, date: '21.03.2024', name: 'Аноним', topic: 'Уборка', category: 'Кадровые вопросы', action: 'Просмотр' },
        { id: 2, date: '21.03.2024', name: 'Аноним', topic: 'Уборка', category: 'Техническая поддержка', action: 'Просмотр' },
        { id: 3, date: '21.03.2024', name: 'Аноним', topic: 'Уборка', category: 'Организация работы', action: 'Просмотр' },
        { id: 4, date: '24.03.2024', name: 'Петр Петров', category: 'Административные вопросы', action: 'Просмотр' },
        { id: 5, date: '25.03.2024', name: 'Сергей Сергеев', category: 'Финансовые вопросы', action: 'Просмотр' },
        { id: 6, date: '26.03.2024', name: 'Алексей Алексеев', category: 'Кадровые вопросы', action: 'Просмотр' },
        { id: 7, date: '27.03.2024', name: 'Мария Маринова', category: 'Техническая поддержка', action: 'Просмотр' },
        { id: 8, date: '28.03.2024', name: 'Ольга Ольгина', category: 'Организация работы', action: 'Просмотр' },
        { id: 9, date: '29.03.2024', name: 'Николай Николаев', category: 'Административные вопросы', action: 'Просмотр' },
        { id: 10, date: '30.03.2024', name: 'Александр Александров', category: 'Финансовые вопросы', action: 'Просмотр' },
        { id: 11, date: '30.03.2024', name: 'Александр Александров', category: '', action: 'Просмотр' },
        { id: 12, date: '30.03.2024', name: 'Александр Александров', category: '', action: 'Просмотр' },
        { id: 13, date: '30.03.2024', name: 'Александр Александров', category: '', action: 'Просмотр' },
        { id: 14, date: '30.03.2024', name: 'Александр Александров', category: '', action: 'Просмотр' },
        { id: 15, date: '30.03.2024', name: 'Александр Александров', category: '', action: 'Просмотр' },
        { id: 16, date: '30.03.2024', name: 'Александр Александров', category: '', action: 'Просмотр' },
        { id: 17, date: '30.03.2024', name: 'Александр Александров', category: '', action: 'Просмотр' },
    ];

    const predefinedCategories = [
        'Без категории',
        'Кадровые вопросы', 
        'Техническая поддержка', 
        'Организация работы', 
        'Административные вопросы', 
        'Финансовые вопросы'
    ];

    const [searchValue, setSearchValue] = useState("");
    const [records, setRecords] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const [iconActive, setIconActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Все категории");

    const placeholder = searchValue.length === 0 ? "Найти обращение..." : "";

    const columns = [
        { name: <span className="custom-table-header">Дата обращения</span>, selector: 'date', cell: row => <span className="custom-date-cell">{row.date}</span> },
        { name: <span className="custom-table-header">Отправитель</span>, selector: 'name', cell: row => <span className="custom-name-cell">{row.name}</span> },
        { name: <span className="custom-table-header">Тема</span>, selector: 'topic', cell: row => <span className="custom-name-cell">{row.topic}</span> },
        { name: <span className="custom-table-header">Категория</span>, selector: 'category', cell: row => <span className="custom-name-cell">{row.category || 'Без категории'}</span> },
        { name: <span className="custom-table-header">Действие</span>, cell: row => <Button variant="primary" className="custom-action-button">Просмотр</Button> }
    ];

    useEffect(() => {
        const categoryGroups = records.reduce((acc, record) => {
            const category = record.category || 'Без категории';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(record);
            return acc;
        }, {});

        const pages = [];
        Object.keys(categoryGroups).forEach(category => {
            const groupedRecords = categoryGroups[category];
            for (let i = 0; i < groupedRecords.length; i += recordsPerPage) {
                pages.push({
                    category,
                    records: groupedRecords.slice(i, i + recordsPerPage)
                });
            }
        });

        setPages(pages);
        setTotalPages(pages.length);
    }, [records, recordsPerPage]);

    function handleFilter(event) {
        const value = event.target.value.toLowerCase();
        const newData = data.filter(row =>
            row.date.toLowerCase().includes(value) ||
            row.name.toLowerCase().includes(value) ||
            (row.topic && row.topic.toLowerCase().includes(value)) ||
            (row.category && row.category.toLowerCase().includes(value))
        );
        setRecords(newData);
        setCurrentPage(1); // Сброс текущей страницы на первую после фильтрации
    }

    const handleIconClick = () => {
        setIconActive(!iconActive);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "Все категории") {
            setCurrentPage(1);
        } else {
            const pageIndex = pages.findIndex(page => page.category === category);
            if (pageIndex !== -1) {
                setCurrentPage(pageIndex + 1); // Переключение на соответствующую страницу категории
            }
        }
    };

    const [pages, setPages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const currentPageData = pages[currentPage - 1] || { category: 'Без категории', records: [] };
    const currentRecords = currentPageData.records;
    const currentCategory = currentPageData.category;

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
                        <div className="custom-table-name">
                            {currentCategory}
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
                        </div>
                        <DataTable
                            columns={columns}
                            data={currentRecords}
                            fixedHeader
                            className="custom-data-table"
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                        <div className="category-links">
                            {predefinedCategories.map(category => (
                                <a
                                    key={category}
                                    href="#"
                                    className={selectedCategory === category ? 'active-category' : ''}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalAccount;
