import React from "react";
import '../styles/Read_request.css';
import Menu from "../pages/Menu.jsx"; 
import Arrow from './Стрелка_назад.png';

const Read_request = () => {
    const feedback = {
        name: "Алексей",
        date: "2024-05-01",
        message: "Здесь будет обращение...",
        photo: "url",
        topic: "Сломан принтер"
    };

    const Back_Arrow = () => {
        const onClick = () => {
            window.location.assign('/completed_requests');
        };
    
        return (
            <button className="back-arrow" onClick={onClick}><img src={Arrow} alt="Стрелка назад" /></button>
        );
    };

    const handleReject = () => {
        
    };

    const handleAnswer = () => {
    
    };

    return (
        <div>
            <Menu />
            <Back_Arrow />
            <div className="main-container-read-request">
                <div className="header-container">
                    <h1 className="title-appeal">Обращение</h1>
                </div>
                <button type="button" className="reject1" onClick={handleReject}>Отклонить</button>
                <div className="left-read-request">
                    <div className="title-left-column1">Информация о пользователе</div>
                    <div className="body-left">
                        <h3>Пользователь</h3>
                        <p><span className="user-name">{feedback.name}</span></p>
                        <h3>Дата регистрации</h3>
                        <p><span className="user-date">{feedback.date}</span></p>
                    </div>
                </div>
                <div className="right-read-request">
                    <div className="title-right-column1">Детали обращения</div>
                    <div className="body-left">
                        <h3 htmlFor="userMessage">Обращение</h3>
                        <p><textarea id="userMessage" className="text-appeal-request" readOnly value={feedback.message} /></p>
                        <h3><img src={feedback.photo} alt="Фото" /></h3>
                    </div>
                </div>
                <div className="button-container">
                    <button type="button" className="answer" onClick={handleAnswer}>Ответить</button>
                </div>
            </div>
        </div>
    );
};

export default Read_request;
