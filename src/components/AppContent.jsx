import {Content} from "antd/es/layout/layout";
import {useCrypto} from "../context/cryptoContext";
import {Spin} from "antd";
import Market from "./Market";
import Wallet from "./Wallet";

export default function AppContent(){
    const {loading, assets, crypto, section} = useCrypto()

    if (loading) {
        return <Spin fullscreen/>
    }

    function showSection(number)
    {
        switch (number) {
            case 1:
            {
                return <Wallet/>
            }
            case 2:
            {
                return <Market/>
            }
        }
    }

    return(
        <Content>
            {showSection(section)}
        </Content>
    )
}