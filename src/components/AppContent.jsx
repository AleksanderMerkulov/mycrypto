import {Content} from "antd/es/layout/layout";
import {useCrypto} from "../context/cryptoContext";
import {Spin} from "antd";

export default function AppContent(){
    const {loading, assets, crypto} = useCrypto()

    if (loading) {
        return <Spin fullscreen/>
    }

    return(
        <Content>
            fff
        </Content>
    )
}