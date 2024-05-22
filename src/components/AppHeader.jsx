import {Header} from "antd/es/layout/layout";
import {useCrypto} from "../context/cryptoContext";
import styled from "styled-components";
import {Statistic} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";


export default function AppHeader(){
    const {assets} = useCrypto()


    const HeaderContainer = styled.div`
      display: flex;
      overflow: hidden;
      max-height: 64px;
      & *{
        color: white;
      }
      .ant-statistic-title{
        color: white;
      }
    `

    function getTotalCryptoAmount() {
        let total = 0
        for (const asset of assets) {
            total +=asset.totalAmount
        }
        return total
    }

    function isAmount() {
        let total = 0
        for (const asset of assets) {
            total +=asset.totalProfit
        }
        return (total>0?true:false)
    }


    return (
        <Header theme={"light"}>
            <HeaderContainer>
                <Statistic
                    title="Баланс"
                    value={getTotalCryptoAmount()}
                    precision={2}
                    suffix={'$'}
                    prefix={isAmount()?<ArrowUpOutlined/>:<ArrowDownOutlined/>}
                    valueStyle={{
                        color: '#fff',
                    }}/>


            </HeaderContainer>
        </Header>
    )
}