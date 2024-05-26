import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { useCrypto } from '../context/cryptoContext';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler, Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    BarElement,
} from "chart.js";


function createRandomColor() {
    // Генерируем случайные значения для каждого цветового канала (RGB)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Преобразуем значения в шестнадцатеричный формат и объединяем их
    const color = "#" + ("00" + r.toString(16)).slice(-2) + ("00" + g.toString(16)).slice(-2) + ("00" + b.toString(16)).slice(-2);

    return color;
}

const WalletAnalysis = () => {

    ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

    const { crypto, assets } = useCrypto();

    // Преобразуем данные для круговых диаграмм
    const amountData = {
        labels: assets.map((coin)=>{
            return `${coin.name}(${coin.price.toFixed(2)}$)`
        }),
        datasets: [{
            data: assets.map((value, index, array)=>{
                return value.amount
            }),
            backgroundColor: assets.map(c=>createRandomColor())
        }]
    };

    const totalAmountData = {
        labels: assets.map((coin)=>{
            return `${coin.name}(${coin.price.toFixed(2)}$)`
        }),
        datasets: [{
            data: assets.map((value, index, array)=>{
                return value.totalAmount
            }),
            backgroundColor: assets.map(c=>createRandomColor())
        }]
    };

    const totalProfit = assets.reduce((accum, coin)=>{
        return accum + coin.totalProfit
    }, 0)


    const growData = assets.map(coin=>{
        const item = (
            <Col span={8}>
                <Card>
                    <Statistic
                        title={coin.name}
                        value={coin.totalProfit.toFixed(4)}
                        valueStyle={{ color: coin.totalProfit>0 ? '#3f8600' : '#cf1322' }}
                        prefix={coin.totalProfit>0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="%"/>
                </Card>
            </Col>
        )
        return item
    })







    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Портфель (%)" value={'-'} />
                        <Doughnut data={amountData} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Портфель ($)" value={assets.reduce((accum, coin)=>{
                            return accum + coin.totalAmount
                        }, 0).toFixed(4)} />
                        <Doughnut data={totalAmountData} />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card>
                        <Statistic
                            title="Общий доход"
                            value={totalProfit}
                            valueStyle={{ color: totalProfit>0 ? '#3f8600' : '#cf1322' }}
                            prefix={totalProfit>0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            suffix="$"/>
                    </Card>
                </Col>
                {growData}
            </Row>

        </div>
    );
};

export default WalletAnalysis;
