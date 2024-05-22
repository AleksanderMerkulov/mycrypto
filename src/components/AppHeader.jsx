import {Header} from "antd/es/layout/layout";
import {useCrypto} from "../context/cryptoContext";
import {useEffect, useState} from "react";
import styled from "styled-components";

export default function AppHeader(){
    const {crypto} = useCrypto()


    const HeaderContainer = styled.div`
      display: flex;
      overflow: hidden;
      max-height: 64px;
    `



    return (
        <Header theme={"light"}>
            <HeaderContainer>
                {
                    crypto.map((value, index)=>{
                        return <div key={value.id}>{value.name}</div>
                    })
                }
            </HeaderContainer>
        </Header>
    )
}