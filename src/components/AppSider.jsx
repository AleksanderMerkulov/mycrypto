import Sider from "antd/es/layout/Sider";
import {List} from "antd";
import styled from "styled-components";
import {useState} from "react";

export default function AppSider(){
    const data = [
        'Мой портфель',
        'Рынок'
    ]

    const CryptoLogo = styled.div`
      height: 64px;
      font-weight: bold;
      font-size: 28px;

      display: flex;
      align-items: center;
      justify-content: center;
    `

    const SectionClicker = styled.button`
      border: none;
      
    `

    const [s, setS] = useState(1)

    return (
        <Sider theme={"light"}>
            <CryptoLogo >
                My Crypto {s}
            </CryptoLogo>
            <List
                dataSource={data}
                renderItem={(item) => <List.Item onClick={()=>setS(0)}>{item}</List.Item>}
            >
            </List>

        </Sider>
    )
}