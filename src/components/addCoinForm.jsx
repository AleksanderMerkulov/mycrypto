import {Button, DatePicker, Form, InputNumber, Result, Select, Space} from "antd";
import {useCrypto} from "../context/cryptoContext";
import {useRef, useState} from "react";


export default function AddCoinForm(){

    const [form] = Form.useForm()
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState({})
    const [success, setSuccess] = useState(false)
    const assetRef = useRef()

    if(!Object.keys(coin).length){
        return (
            <Select
                defaultValue="Выберете монету"
                style={{
                    width: '100%',
                }}
                onSelect={(v) => {
                    setCoin((crypto.find((c) => c.id === v)))
                }}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: 20 }}
                            src={option.data.icon}
                            alt={option.data.label}
                        />{' '}
                        {option.data.label}
                    </Space>
                )}
            />
        )
    }

    if(success){
        return (
            <Result
                status="success"
                title="Монета добавлена"

            />
        )
    }

    function handleAmountChange(amount){
        const price = form.getFieldValue('price')
        form.setFieldValue('total', +(price*amount).toFixed(2))
    }

    function handlePriceChange(price){
        const amount = form.getFieldValue('amount')
        form.setFieldValue('total', +(price*amount).toFixed(2))
    }

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        setSuccess(true)
        assetRef.current = newAsset
        addAsset(newAsset)
    }


    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    price: +coin.price.toFixed(2),
                }}
                onFinish={onFinish}
            >
                <h3>{coin.name}</h3>


                <Form.Item
                    label="Количество"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            message:'Введите коррентное значение'
                        },
                    ]}>
                    <InputNumber
                        placeholder="Введите количество монет"
                        onChange={handleAmountChange}
                        style={{ width: '100%' }}/>
                </Form.Item>

                <Form.Item label="Цена" name="price">
                    <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Дата & Время" name="date">
                    <DatePicker showTime />
                </Form.Item>

                <Form.Item label="Итог" name="total">
                    <InputNumber disabled style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить в кошелёк
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}