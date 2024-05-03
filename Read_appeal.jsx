import React, { useState } from "react";
import css from "../styles/Read_appeal.css";
import Popup from 'reactjs-popup';

const BackButton = () => {
    const onClick = () => {
        window.location.assign('/');
    };

    return (
        <button className="back" onClick={onClick}>Назад</button>
    );
};

const Read_appeal = () => {
    const feedback = {
        user: "Аноним",
        date: "2024-05-01",
        message: "Здесь будет обращение...",
        photo: "url"
    };

    return (
        <div>
            <div className="back-container">
                <BackButton />
            </div>
            <div className="main-container">
            <div className="header-container">
                <h1 className="appeal-title">Обращение</h1>
            </div>
            <button type="button" className="reject">Отклонить обращение</button>
                <div className="left-section">                    
                    <div className="form-container">
                    <h3 className="section-title">Детали обращения</h3>
                        <form className="form5">
                            <h3>Пользователь</h3>
                            <p>{feedback.user}</p>
                            <h3>Дата регистрации</h3>
                            <p>{feedback.date}</p>
                            <h3 htmlFor="userMessage">Обращение</h3>
                            <p><input id="userMessage" className="input5" type="text" readOnly value={feedback.message} /> </p>
                            <h3><img src={feedback.photo} alt="фото 1" /> </h3>
                        </form>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button type="button" className="answer">Ответить</button>
            </div>
        </div>
    );
};

export default Read_appeal;
