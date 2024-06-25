import React from 'react';
import Menu from "../pages/Menu.jsx"; 
import Card from "../pages/Card.jsx"; 
import Card1 from "../pages/Card1.jsx"; 
import PieChart from '../pages/PieChart.jsx';
import Graphic from '../pages/Graphic.jsx';
import '../styles/Statistics.css';

const Statistics = () => {
    return (
        <div className="dashboard">
            <Menu />
            <div className="top-row">
                <div className="left1">
                    <Card />
                </div>
                <div className="left2">
                    <Card1 />
                </div>
                <div className="left3">
                    <PieChart />
                </div>
            </div>
            <div className="left4">
                <Graphic />
            </div>
        </div>
    );
};

export default Statistics;
