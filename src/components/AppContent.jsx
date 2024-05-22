import {Content} from "antd/es/layout/layout";
import {useCrypto} from "../context/cryptoContext";
import {Spin} from "antd";

export default function AppContent(){
    const {loading, assets, crypto, section} = useCrypto()

    if (loading) {
        return <Spin fullscreen/>
    }



    return(
        <Content>
            {section===1?'fff':'eeee'}
            {
                assets.map((value, index)=>{
                    return <div key={value.id}>{value.name}</div>
                })
            }
        </Content>
    )
}