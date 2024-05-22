import Sider from "antd/es/layout/Sider";
import {List} from "antd";
import styled from "styled-components";
import {useState} from "react";
import {useCrypto} from "../context/cryptoContext";

export default function AppSider(){
    const pages = [
        {
            title: 'Мой портфель',
            section: 0
        },
        {
            title: 'Кошелёк',
            section: 1
        },
        {
            title: 'Рынок',
            section: 2
        },
    ]

    const CryptoLogo = styled.div`
      height: 64px;
      font-weight: bold;
      font-size: 28px;

      display: flex;
      align-items: center;
      justify-content: center;
    `

    const ListItem = styled.div`
      padding-left: 10px;
      
      &.active{
        font-weight: bold;
      }
    `

    const {section, setSection} = useCrypto()

    return (
        <Sider theme={"light"}>
            <CryptoLogo >
                My Crypto
            </CryptoLogo>
            <List
                dataSource={pages}
                renderItem={(item) => {
                    return <List.Item onClick={()=>setSection(item.section)}>
                                <ListItem className={section===item.section?"active":""}>{item.title}</ListItem>
                            </List.Item>
                }
                }
            >
            </List>

        </Sider>
    )
}