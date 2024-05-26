import {Button, Card, Col, Modal, Row, Statistic} from "antd";
import {useState} from "react";
import AddCoinForm from "./addCoinForm";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {useCrypto} from "../context/cryptoContext";

export default function Wallet() {

    const [openModal, setOpenModal] = useState(false)
    const {assets} = useCrypto()

    function handleOk() {
        setOpenModal(false)
    }

    function handleCancel() {
        setOpenModal(false)
    }


    return (
        <>
            <Modal
                destroyOnClose
                open={openModal}
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
                ]}>

                <AddCoinForm/>
            </Modal>
            <Row gutter={[16, 16]} >
                {
                    assets.map((value, index) => {
                        return (
                            <Col span={8}>
                                <Card
                                    key={value.id}
                                >
                                    <Statistic
                                        title={value.name}
                                        value={value.price.toFixed(4)}
                                        precision={2}
                                        suffix="$"
                                    />
                                    <Statistic
                                        title={"Количество монет"}
                                        value={value.amount.toFixed(4)}
                                        precision={2}
                                        suffix="шт"
                                    />
                                    <Statistic
                                        title={'Общая стоимость'}
                                        value={value.totalAmount.toFixed(4)}
                                        precision={2}
                                        valueStyle={{color: value.grow > 0 ? '#3f8600' : '#cf1322'}}
                                        prefix={value.grow > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                                        suffix="$"
                                    />

                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            <Button
                onClick={() => setOpenModal(true)}>Click</Button>

        </>
    )
}