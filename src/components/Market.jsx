import {useCrypto} from "../context/cryptoContext";
import {Button, Card, Col, Modal, Row, Statistic} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {useState} from "react";
import LineCoin from "./LineCoin";



export default function Market(){

    const {crypto} = useCrypto()

    const MarketContainer = styled.div`
      padding: 10px;
    `

    const [openModal, setOpenModal] = useState(false)
    const [selectedCoin, setSelectedCoin] = useState({})

    function handleOk() {
        setOpenModal(false)
    }

    function handleCancel() {
        setOpenModal(false)
    }

    function handleModal(coinID){
        const currCoin = crypto.find((value)=>value.id===coinID)
        setSelectedCoin(currCoin)
        setOpenModal(true)

    }





    return(
        <>
            <Modal
                open={openModal}
                title={selectedCoin.name}
                onOk={handleOk}
                onCancel={handleCancel}
                width={'90%'}
                footer={[
                    <Button
                        key={'Cancel'}
                        onClick={handleCancel}
                    >
                        Закрыть
                    </Button>
                ]}
            >
                <LineCoin coinID={selectedCoin.id}/>
            </Modal>
            <MarketContainer>
                <Row gutter={[16, 16]}>
                    {
                        crypto.map((value, index)=>{
                            return (
                                <Col span={8}>
                                    <Card
                                        key={value.id}
                                    >
                                        <Statistic
                                            title={value.name}
                                            value={value.price.toFixed(4)}
                                            precision={2}
                                            valueStyle={{ color: value.priceChange1h>0 ? '#3f8600' : '#cf1322' }}
                                            prefix={value.priceChange1h>0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                            suffix="$"
                                        />
                                        <Button onClick={()=>handleModal(value.id)}>Подробнее</Button>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </MarketContainer>
        </>
    )
}