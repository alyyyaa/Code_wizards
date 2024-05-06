import React, { useState } from "react";
import css from '../styles/Check_completed_request.css'
import Popup from 'reactjs-popup';
import Head2 from '../views/global/global/Head2'

const Check_completed_request = () => {
    const feedback = {
        name: "Алексей",
        date: "2024-05-01",
        message: "Здесь будет обращение...",
        photo: "url",
        topic: "Сломан принтер"
    };

    return (
        <div>
            <Head2/>
            <div className="main-container">
            <h1 className="feedback-title">{feedback.topic}</h1>
                <div className="left-section">
                    <h3 className="section-title">Детали обращения</h3>
                    <form className="form3">
                    <h3>Пользователь</h3>
                    <p>{feedback.name}</p>
                        <h3>Дата регистрации</h3>
                        <p>{feedback.date}</p>
                        <h3 htmlFor="userMessage">Обращение</h3>
                        <p><textarea id="userMessage" className="input3" type="text" readOnly value={feedback.message}/></p>
                        <h3><img src={feedback.photo} alt="фото 1" /> </h3>
                    </form>
                </div>
                <div className="right-section">
                    <h3 className="section-title">Решение по обращению</h3>
                    <form className="form4">
                        <h3>Дата решения</h3>
                        <p>{feedback.date}</p>
                        <h3 htmlFor="userMessage">Решение</h3>
                        <p><textarea id="userMessage" className="input4" type="text" readOnly value={feedback.message} /> </p>
                        <h3><img src={feedback.photo} alt="фото 1" /> </h3>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Check_completed_request;
