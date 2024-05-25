import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useEffect, useState} from "react";
import {List, Spin} from "antd";
import {useCrypto} from "../context/cryptoContext";
import styled from "styled-components";

export default function LineCoin({coinID}){

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );

    const [chartData, setChartData] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const [coinData, setCoinData] = useState({})

    const {crypto} = useCrypto()

    useEffect(() => {
        setLoadingData(true)
        async function getData() {
            // let response = await fetch(`https://openapiv1.coinstats.app/coins/${coinID}/charts?period=1w`, {headers: {'X-API-KEY': 'ZsO/krEZVo4MXLb4R/mPgqkdz7T1cG2QI311eEu218s='}})
            let response = await fetch('/chartData.json', {headers: {'X-API-KEY': 'ZsO/krEZVo4MXLb4R/mPgqkdz7T1cG2QI311eEu218s='}})
            if (response.ok) {
                return await response.json()
            } else {
                return new Error(`Ошибка получения данных:${response.status}`)
            }
        }
        getData().then((data)=>{
            setChartData(data)

            setCoinData(crypto.find(v=>v.id==coinID))

            setLoadingData(false)
        })
    }, [coinID]);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `График изменения ${coinID}`,
            },
        },
    };

    const data = {
        labels: chartData.map((v, i)=>i),
        datasets: [
            {
                fill: true,
                label: coinID,
                data: chartData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const ListContainer = styled.ul`

    `

    const ListItem = styled.li`
      list-style: none;
      display: grid;
      grid-template-columns: 180px 1fr;
      padding: 5px 10px;

      font-size: 18px;

      & div:first-child{
        border-right: 1px solid black;
        margin-right: 10px;
        font-weight: bold;
      }

    `

    let content = []
    const hideContent = ['explorers', 'icon', 'id', 'rank']

    for (const coinDataKey in coinData) {

        if(!(hideContent.find(v=>v === coinDataKey)))
            content.push(
                (
                    <ListItem>
                        <div>{coinDataKey}</div>
                        <div>{coinData[coinDataKey]}</div>
                    </ListItem>
                ))
    }

    return (
        <>
            {loadingData?<Spin fullscreen/>:null}
            <Line options={options} data={data} />
            <ListContainer>
                {content}
            </ListContainer>
        </>
    )
}