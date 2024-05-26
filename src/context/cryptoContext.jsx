import {createContext, useContext, useEffect, useState} from "react";
import {getAssets, getCoinsInfo} from "../data";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
    section: 1,
})

export function CryptoContextProvider({ children }){

    const [loading, setLoading] = useState(false)
    const [assets, setAssets] = useState([])
    const [crypto, setCrypto] = useState([])
    const [section, setSection] = useState(0)

    function percentDifference(a, b) {
        return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
    }

    function mapAssets(assets, result){
        return assets.map((asset)=>{
            const coin = result.find((c) => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset,
            }
        })
    }

    useEffect(()=>{
        async function preload(){
            setLoading(true)

            const {result} = await getCoinsInfo()
            const assets = await getAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    function addAsset(newAsset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }

    return (
        <CryptoContext.Provider value={{loading, assets, crypto, addAsset, section, setSection}}>
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext

export function useCrypto(){
    return useContext(CryptoContext)
}