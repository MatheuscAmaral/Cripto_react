import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import style from './detail.module.css'

interface CoinProp {
    name: string;
    price: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    delta_24h: string; 
    rank: number;
    symbol: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedHighprice: string;
    formatedLowprice: string;
    error?: string;

}

export function Detail() {
    const { cripto } = useParams();
    const [details, setDetails] = useState<CoinProp>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function getData(){
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=b334044337509c83&pref=BRL&symbol=${cripto}`)
            .then((Response) => Response.json())
            .then((data: CoinProp) => {
               

                let price = Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL"
                })

                const resultData = {
                    ...data,
                    formatedPrice: price.format(Number(data.price)),
                    formatedMarket: price.format(Number(data.market_cap)),
                    formatedHighprice: price.format(Number(data.low_24h)),
                    formatedLowprice: price.format(Number(data.high_24h))
                }

                setDetails(resultData);
                setLoading(false);
            })
        }

        getData()
    }, [cripto])

    if(loading) {
        return(
            <div className={style.container}>
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
                    <span>Carregando...</span>
            </div>
        )
    }

    return(
       <>
            {
               cripto === details?.symbol ? (
                    <div className={style.container}>
                        <h1 className={style.center}> Nome: {details?.name}</h1>
                        <span>Símbolo: {details?.symbol}</span>
                        <span>Preço: {details?.formatedPrice}</span>
                        <span>Mercado: {details?.formatedMarket}</span>
                        <span>Ranking: {details?.rank}</span>
                    </div>
                ) 
                : 
                (
                    <div>
                        <h1>A moeda pesquisada não existe.</h1>
                    </div>
                )
            }
       </>
    )
}