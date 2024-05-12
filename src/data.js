// https://coinstatsopenapi.readme.io/reference/coincontroller_coinlist

const token = 'ZsO/krEZVo4MXLb4R/mPgqkdz7T1cG2QI311eEu218s='

const assets = [
    {
        id: 'bitcoin',
        price: 69940.2192343,
        amount: 1.153
    },
    {
        id: 'ethereum',
        price: 3499.33699,
        amount: 3.2
    }
]

function getAssets(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(assets)
        }, 1000)
    })
}

async function getCoinsInfo() {
    // let response = await fetch('https://openapiv1.coinstats.app/coins?currency=USD', {headers: {'X-API-KEY': token}})
    let response = await fetch('/allCrypto.json', {headers: {'X-API-KEY': token}})
    if(response.ok)
    {
        return await response.json()
    }
    else
    {
        return new Error(`Ошибка получения данных:${ response.status}`)
    }
}

export {getCoinsInfo, getAssets}