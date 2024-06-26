import React, { useState, useEffect } from "react";
import Head2 from "../views/global/global/Head2";
import css from "../styles/Application.css";
import { InputFile } from "../pages/InputFile.jsx";
import copy from './копирование.png';
import Popup from 'reactjs-popup';
import appl from './обращение.png';
import plane from './plane1.png';
import { MdFileDownload } from "react-icons/md"; 

function Appl() {
    return (
        <img className="appl" src={appl} alt="Application" />
    );
    return (
        <img className="plane" src={plane} alt="plane" />
    );
}


class Main extends React.Component {
    onclick() {
        window.location.assign('/');
    }
    render() {
        return (
            <button className="main" onClick={(e) => this.onclick(e)}>
                <span className="arrow-left"></span>
            </button>
        );
    }
}

const Application = () => {
    const [photo, setPhoto] = useState(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        // Добавляем класс к body при монтировании компонента
        document.body.classList.add('application-background');

        // Удаляем класс с body при размонтировании компонента
        return () => {
            document.body.classList.remove('application-background');
        };
    }, []);

    function closeModal() {
        document.querySelector('.modal').style.display = 'none';
    }
    

    return (
        <div className="body11">
            <Main />
            <div className="container_fon">
                <form className="form_application">
                    <div className="form_right">
                        <p className="text_form">Введите ваше имя и фамилию по желанию</p>
                        <input className="input2" type="text" name="name" />
                        <p className="text_form">Оставьте жалобу или предложение</p>
                        <textarea className="text_input" type="text" name="application" />
                        <div className="file-upload-container">
                            <span className="text_form">Загрузите фото(максимум 3 фото)</span>
                            <label className="file-upload-label">
                                <MdFileDownload className="input-file-icon" />
                                <InputFile accept=".png,.jpg,.jpeg" multiple={true} files={photo} setFiles={setPhoto} />
                            </label>
                        </div>
                        <Popup trigger={
                            <button type="button" className="send">Отправить заявку</button>
                        } modal nested>
                            {
                                close => (
                                    <div className='modal'>
                                        <div className='content'>
                                            <button className="close" onClick={closeModal}>&times;</button>
                                            <img src={plane} alt="plane" className="modal-image" />
                                            Спасибо за заявку!<br />
                                            Ваш ключ для просмотра обратной связи!
                                            <div className="d1">
                                                <div id="textbox" value={inputValue} onChange={e => setInputValue(e.target.value)}></div>
                                                <button className="Copy" onClick={() => { navigator.clipboard.writeText(inputValue) }}>
                                                    <img src={copy} width="30" height="30" alt="Copy" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        </Popup>
                    </div>
                    <div className="form_left">
                        <label className="icon">SecretVoice</label>
                        <Appl />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Application;
