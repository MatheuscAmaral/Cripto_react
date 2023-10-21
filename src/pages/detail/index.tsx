import {useEffect, useState} from 'react'
import { useParams, useNavigate, Link} from 'react-router-dom'
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
    const navigate = useNavigate();

    useEffect(() => {
        function getData(){
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=b334044337509c83&pref=BRL&symbol=${cripto}`)
            .then((Response) => Response.json())
            .then((data: CoinProp) => {

                if(data.error) {
                    navigate("/")
                }

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
                <div className={style.container}>
                <div className={style.top}>
                    <strong>{details?.name}</strong>
                    <span>{details?.symbol}</span>
                </div>

                <div className={style.low}>
                    <span className={style.info}>
                            <strong>Preço: </strong>
                            {details?.formatedPrice}
                    </span>

                    <span className={style.info}>
                        <strong>Maior preço 24h: </strong>
                        {details?.formatedHighprice}
                    </span>

                    <span className={style.info}>
                        <strong>Menor preço 24h: </strong>
                        {details?.formatedLowprice}
                    </span>

                    <span className={style.info}>
                        <strong>Valor mercado: </strong>
                        {details?.formatedMarket}
                    </span>
                </div>
            </div>  
            }
       </>
    )
}